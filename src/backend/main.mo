
import Array "mo:base/Array";
import Nat "mo:base/Nat";
import Time "mo:base/Time";
import Debug "mo:base/Debug";
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Iter "mo:base/Iter";
import Option "mo:base/Option";

actor {
  // Types
  public type DigitalID = {
    displayName: Text;
    wallets: [Text];
    daoMemberships: [Text];
    createdAt: Int;
  };

  // User Digital ID storage
  private stable var userDigitalIDEntries : [(Principal, DigitalID)] = [];
  private var userDigitalIDs = HashMap.HashMap<Principal, DigitalID>(10, Principal.equal, Principal.hash);

  system func preupgrade() {
    userDigitalIDEntries := Iter.toArray(userDigitalIDs.entries());
  };

  system func postupgrade() {
    userDigitalIDs := HashMap.fromIter<Principal, DigitalID>(
      userDigitalIDEntries.vals(), 10, Principal.equal, Principal.hash
    );
    userDigitalIDEntries := [];
  };

  // Register a new digital ID
  public shared(msg) func registerDigitalID(displayName: Text) : async Bool {
    let caller = msg.caller;
    
    // Check if user already has a digital ID
    switch (userDigitalIDs.get(caller)) {
      case (?existing) {
        // Already registered
        Debug.print("User already has a digital ID");
        return false;
      };
      case (null) {
        // Create new digital ID
        let newID : DigitalID = {
          displayName = displayName;
          wallets = [];
          daoMemberships = [];
          createdAt = Time.now();
        };
        userDigitalIDs.put(caller, newID);
        Debug.print("New digital ID registered for: " # Principal.toText(caller));
        return true;
      };
    };
  };

  // Get user's digital ID
  public shared(msg) func getDigitalID() : async ?DigitalID {
    let caller = msg.caller;
    return userDigitalIDs.get(caller);
  };

  // Link wallet to digital ID
  public shared(msg) func linkWallet(walletAddress: Text, chainType: Text) : async Bool {
    let caller = msg.caller;
    
    switch (userDigitalIDs.get(caller)) {
      case (?userID) {
        // Check if wallet already exists to avoid duplicates
        let walletExists = Array.find<Text>(userID.wallets, func(w) { w == walletAddress });
        
        switch (walletExists) {
          case (null) {
            // Wallet doesn't exist, add it
            let updatedWallets = Array.tabulate<Text>(userID.wallets.size() + 1, func(i) {
              if (i < userID.wallets.size()) { userID.wallets[i] } else { walletAddress }
            });
            
            let updatedID : DigitalID = {
              displayName = userID.displayName;
              wallets = updatedWallets;
              daoMemberships = userID.daoMemberships;
              createdAt = userID.createdAt;
            };
            
            userDigitalIDs.put(caller, updatedID);
            Debug.print("Wallet linked: " # walletAddress # " on " # chainType);
            return true;
          };
          case (_) {
            // Wallet already exists
            Debug.print("Wallet already linked: " # walletAddress);
            return false;
          };
        };
      };
      case (null) {
        // User doesn't have a digital ID yet
        Debug.print("No digital ID found for user");
        return false;
      };
    };
  };

  // For testing purposes
  public query func heartbeat() : async Text {
    return "Digital ID backend is running!";
  };

  // Get current timestamp
  public func getTimestamp() : async Int {
    return Time.now();
  };

  // Legacy ping method
  public func ping() : async Text {
    return "pong";
  };
}
