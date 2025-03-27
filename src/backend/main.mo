
import Debug "mo:base/Debug";
import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";

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
        return false;
      };
      case (?userID) {
        let updatedWallets = Array.append<Text>(userID.wallets, [walletAddress]);
        let updatedID : DigitalID = {
          displayName = userID.displayName;
          wallets = updatedWallets;
          daoMemberships = userID.daoMemberships;
          createdAt = userID.createdAt;
        };
        users.put(caller, updatedID);
        return true;
      };
    };
  };

  // Public canister heartbeat
  public func heartbeat() : async Text {
    return "STEP1 Ecosystem Backend is running";
  };
}
