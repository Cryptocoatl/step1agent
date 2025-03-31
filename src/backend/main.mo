import Time "mo:base/Time";
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Array "mo:base/Array";
import Text "mo:base/Text";
import Buffer "mo:base/Buffer";

actor Backend {
  // Types
  public type DigitalID = {
    createdAt : Int;
    displayName : Text;
    daoMemberships : [Text];
    wallets : [Text];
  };

  // State
  private stable var digitalIDEntries : [(Principal, DigitalID)] = [];
  private var digitalIDs = HashMap.HashMap<Principal, DigitalID>(0, Principal.equal, Principal.hash);

  system func preupgrade() {
    let entries = Buffer.Buffer<(Principal, DigitalID)>(digitalIDs.size());
    for ((id, digitalID) in digitalIDs.entries()) {
      entries.add((id, digitalID));
    };
    digitalIDEntries := Buffer.toArray(entries);
  };

  system func postupgrade() {
    digitalIDs := HashMap.fromIter<Principal, DigitalID>(
      digitalIDEntries.vals(), 0, Principal.equal, Principal.hash
    );
    digitalIDEntries := [];
  };

  // Required interface methods
  public shared({caller}) func registerDigitalID(displayName : Text) : async Bool {
    let newID : DigitalID = {
      createdAt = Time.now();
      displayName = displayName;
      daoMemberships = [];
      wallets = [];
    };
    digitalIDs.put(caller, newID);
    true
  };

  public shared({caller}) func getDigitalID() : async ?DigitalID {
    digitalIDs.get(caller)
  };

  public shared({caller}) func linkWallet(chain : Text, address : Text) : async Bool {
    switch (digitalIDs.get(caller)) {
      case (?id) {
        let updatedWallets = Array.append(id.wallets, [address]);
        let updatedID : DigitalID = {
          createdAt = id.createdAt;
          displayName = id.displayName;
          daoMemberships = id.daoMemberships;
          wallets = updatedWallets;
        };
        digitalIDs.put(caller, updatedID);
        true
      };
      case null { false };
    }
  };

  public query func heartbeat() : async Text {
    "OK"
  };

  // Legacy methods
  public shared({caller}) func ping() : async Text {
    "pong"
  };

  public shared({caller}) func getTimestamp() : async Int {
    Time.now()
  };
}
