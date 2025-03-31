import Array "mo:base/Array";
import Nat "mo:base/Nat";
import Time "mo:base/Time";
import Debug "mo:base/Debug";
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Text "mo:base/Text";

actor Backend {
  // User Digital ID storage
  private type DigitalID = {
    displayName: Text;
    wallets: [Text];
    daoMemberships: [Text];
    createdAt: Int;
    email: ?Text;
  };

  // Reward type
  private type Reward = {
    rewardType: Text;
    amount: Nat;
    description: Text;
    earnedAt: Int;
  };

  private let users = HashMap.HashMap<Principal, DigitalID>(10, Principal.equal, Principal.hash);
  private let userRewards = HashMap.HashMap<Principal, [Reward]>(10, Principal.equal, Principal.hash);

  // Register a new digital ID with email
  public shared(msg) func registerDigitalID(displayName: Text, email: ?Text) : async () {
    let caller = msg.caller;
    
    let newID : DigitalID = {
      displayName = displayName;
      wallets = [];
      daoMemberships = [];
      createdAt = Time.now();
      email = email;
    };
    ignore users.put(caller, newID);
  };

  public shared(msg) func getDigitalID() : async ?DigitalID {
    users.get(msg.caller)
  };

  // Link a wallet to user's digital ID
  public shared(msg) func linkWallet(walletAddress: Text, chainType: Text) : async () {
    let caller = msg.caller;
    
    switch (users.get(caller)) {
      case (null) {
        // User doesn't exist, create a new profile first
        let newID : DigitalID = {
          displayName = "STEP1 User";
          wallets = [walletAddress];
          daoMemberships = [];
          createdAt = Time.now();
          email = null;
        };
        ignore users.put(caller, newID);
        Debug.print("New wallet linked for new user: " # walletAddress # " on " # chainType);
        
        // Award an initial bonus for the first wallet connection
        await awardReward(caller, "initial_wallet", 15, "Initial wallet connection bonus");
      };
      case (?userID) {
        // Check if wallet already exists to avoid duplicates
        let walletExists = Array.find<Text>(userID.wallets, func(w) { w == walletAddress });
        
        switch (walletExists) {
          case (null) {
            // Wallet doesn't exist, add it
            let updatedWallets = Array.tabulate<Text>(userID.wallets.size() + 1, func(i) {
              if (i < userID.wallets.size()) userID.wallets[i] else walletAddress
            });
            let updatedID : DigitalID = {
              displayName = userID.displayName;
              wallets = updatedWallets;
              daoMemberships = userID.daoMemberships;
              createdAt = userID.createdAt;
              email = userID.email;
            };
            ignore users.put(caller, updatedID);
            Debug.print("Wallet linked: " # walletAddress # " on " # chainType);
            
            // Award tokens for linking an additional wallet
            await awardReward(caller, "wallet_connect", 5, "Reward for connecting " # chainType # " wallet");
          };
          case (_) {
            // Wallet already exists
            Debug.print("Wallet already linked: " # walletAddress);
          };
        };
      };
    };
  };

  // Award reward to a user
  public shared({caller = msg}) func awardReward(user: Principal, rewardType: Text, amount: Nat, description: Text) : async () {
    let newReward : Reward = {
      rewardType = rewardType;
      amount = amount;
      description = description;
      earnedAt = Time.now();
    };
    
    // Get existing rewards or create new array
    let existingRewards = switch (userRewards.get(user)) {
      case (null) { [] };
      case (?rewards) { rewards };
    };
    
    let updatedRewards = Array.tabulate<Reward>(existingRewards.size() + 1, func(i) {
      if (i < existingRewards.size()) existingRewards[i] else newReward
    });
    ignore userRewards.put(user, updatedRewards);
    
    Debug.print("Reward awarded: " # description # " to user");
    ()
  };

  // Get user's rewards
  public shared(msg) func getUserRewards() : async [Reward] {
    let caller = msg.caller;
    
    return switch (userRewards.get(caller)) {
      case (null) { [] };
      case (?rewards) { rewards };
    };
  };

  public shared({caller}) func heartbeat() : async Text {
    "OK"
  };

  // Legacy methods
  public shared(msg) func ping() : async Text {
    "pong"
  };

  public shared(msg) func getTimestamp() : async Int {
    Time.now()
  };
}
