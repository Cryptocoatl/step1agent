import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Iter "mo:base/Iter";

actor {
  // User Profile Structure
  public type UserProfile = {
    principal: Principal;
    // Add wallets here (e.g., Ethereum, Solana)
    wallets: [Wallet];
    reputation: Float;
  };

  // Wallet Type (Example - Expand for different chains)
  public type Wallet = {
    chain: Text; // "Ethereum", "Solana", "Bitcoin", "ICP"
    address: Text;
  };

  // State
  stable var userProfilesEntries : [(Principal, UserProfile)] = [];
  var userProfiles = HashMap.fromIter<Principal, UserProfile>(
    userProfilesEntries.vals(), 0, Principal.equal, Principal.hash
  );

  system func preupgrade() {
    userProfilesEntries := Iter.toArray(userProfiles.entries());
  };

  system func postupgrade() {
    userProfiles := HashMap.fromIter<Principal, UserProfile>(
      userProfilesEntries.vals(), 0, Principal.equal, Principal.hash
    );
    userProfilesEntries := [];
  };

  // Function to create a user profile (using Internet Identity)
  public shared({caller}) func createProfile() : async UserProfile {
    let principal = caller;
    // TODO: Implement profile creation logic using Internet Identity
    let profile : UserProfile = {
      principal = principal;
      wallets = [];
      reputation = 0.0;
    };
    userProfiles.put(principal, profile);
    return profile;
  };

  // Function to get a user profile
  public shared({caller}) func getProfile(principal: Principal) : async ?UserProfile {
    return userProfiles.get(principal);
  };

  // Function to update user reputation (example)
  public shared({caller}) func updateReputation(principal: Principal, amount: Float) : async () {
    switch (userProfiles.get(principal)) {
      case (?profile) {
        let updatedProfile = {
          principal = profile.principal;
          wallets = profile.wallets;
          reputation = profile.reputation + amount;
        };
        userProfiles.put(principal, updatedProfile);
      };
      case null {};
    };
  };

  // TODO: Implement integration with NFID
  // TODO: Implement decentralized profile storage (e.g., using stable memory or a separate canister)
}
