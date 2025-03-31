// Launchpad Factory

import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import Hash "mo:base/Hash";
import Iter "mo:base/Iter";

actor {
  // Launchpad Structure (Example - Expand)
  public type Launchpad = {
    id: Nat;
    creator: Principal;
    name: Text;
    // Add launchpad-specific data here (e.g., token details, sale parameters)
  };

  // State
  stable var launchpadsEntries : [(Nat, Launchpad)] = [];
  stable var nextLaunchpadId : Nat = 0;

  // Convert stable array to HashMap on upgrade
  system func preupgrade() {
    launchpadsEntries := Iter.toArray(launchpads.entries());
  };

  // Convert back to HashMap on init/upgrade
  system func postupgrade() {
    launchpads := HashMap.fromIter<Nat, Launchpad>(
      launchpadsEntries.vals(), 0, Nat.equal, Hash.hash
    );
    launchpadsEntries := [];
  };

  var launchpads = HashMap.fromIter<Nat, Launchpad>(
    launchpadsEntries.vals(), 0, Nat.equal, Hash.hash
  );

  // Function to create a launchpad
  public shared({caller}) func createLaunchpad(name: Text) : async Nat {
    let id = nextLaunchpadId;
    nextLaunchpadId += 1;
    let launchpad : Launchpad = {
      id = id;
      creator = caller;
      name = name;
    };
    launchpads.put(id, launchpad);
    return id;
  };

  // Function to get a launchpad
  public shared({caller}) func getLaunchpad(launchpadId: Nat) : async ?Launchpad {
    return launchpads.get(launchpadId);
  };

  // TODO: Implement launchpad creation and management logic
  // TODO: Implement token sale parameters
}
