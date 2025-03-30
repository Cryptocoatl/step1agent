
import Debug "mo:base/Debug";
import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Array "mo:base/Array";

actor {
  // User Digital ID storage
  private type DigitalID = {
    displayName: Text;
    wallets: [Text];
    daoMemberships: [Text];
    createdAt: Int;
  };

  private let users = HashMap.HashMap<Principal, DigitalID>(10, Principal.equal, Principal.hash);

  // Register a new digital ID
  public shared(msg) func registerDigitalID(displayName: Text) : async Bool {
    let caller = msg.caller;
    
    let newID : DigitalID = {
      displayName = displayName;
      wallets = [];
      daoMemberships = [];
      createdAt = 0; // Would use Time module in production
    };
    
    users.put(caller, newID);
    Debug.print("New user registered: " # displayName);
    return true;
  };

  // Get user's digital ID
  public shared(msg) func getDigitalID() : async ?DigitalID {
    let caller = msg.caller;
    return users.get(caller);
  };

  // Link a wallet to user's digital ID
  public shared(msg) func linkWallet(walletAddress: Text, chainType: Text) : async Bool {
    let caller = msg.caller;
    
    switch (users.get(caller)) {
      case (null) {
        // User doesn't exist, create a new profile first
        let newID : DigitalID = {
          displayName = "STEP1 User";
          wallets = [walletAddress];
          daoMemberships = [];
          createdAt = 0; // Would use Time module in production
        };
        users.put(caller, newID);
        Debug.print("New wallet linked for new user: " # walletAddress # " on " # chainType);
        return true;
      };
      case (?userID) {
        // Check if wallet already exists to avoid duplicates
        let walletExists = Array.find<Text>(userID.wallets, func(w) { w == walletAddress });
        
        switch (walletExists) {
          case (null) {
            // Wallet doesn't exist, add it
            let updatedWallets = Array.append<Text>(userID.wallets, [walletAddress]);
            let updatedID : DigitalID = {
              displayName = userID.displayName;
              wallets = updatedWallets;
              daoMemberships = userID.daoMemberships;
              createdAt = userID.createdAt;
            };
            users.put(caller, updatedID);
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
    };
  };

  // Public canister heartbeat
  public func heartbeat() : async Text {
    return "STEP1 Ecosystem Backend is running";
  };
}
