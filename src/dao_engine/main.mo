import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import Hash "mo:base/Hash";
import Iter "mo:base/Iter";
import Buffer "mo:base/Buffer";

actor {
  // Proposal Types (Example - Expand)
  public type Proposal = {
    id: Nat;
    creator: Principal;
    description: Text;
    proposalType: ProposalType;
    votes: [Vote];
  };

  public type ProposalType = {
    #Funding: {
      token: Text;
      amount: Nat;
      recipient: Principal;
    };
    #Role: {
      roleName: Text;
      member: Principal;
    };
    #Docs: {
      docHash: Text;
    };
  };

  public type Vote = {
    voter: Principal;
    vote: Bool;
  };

  public type Token = {
    symbol: Text;
    address: Text;
    balance: Nat;
  };

  // State
  stable var proposalsEntries : [(Nat, Proposal)] = [];
  stable var nextProposalId : Nat = 0;
  stable var treasury : [Token] = [];
  
  var proposals = HashMap.fromIter<Nat, Proposal>(
    proposalsEntries.vals(), 0, Nat.equal, Hash.hash
  );

  system func preupgrade() {
    proposalsEntries := Iter.toArray(proposals.entries());
  };

  system func postupgrade() {
    proposals := HashMap.fromIter<Nat, Proposal>(
      proposalsEntries.vals(), 0, Nat.equal, Hash.hash
    );
    proposalsEntries := [];
  };

  public shared({caller}) func createProposal(description: Text, proposalType: ProposalType) : async Nat {
    let id = nextProposalId;
    nextProposalId += 1;
    let proposal : Proposal = {
      id = id;
      creator = caller;
      description = description;
      proposalType = proposalType;
      votes = [];
    };
    proposals.put(id, proposal);
    return id;
  };

  public shared({caller}) func vote(proposalId: Nat, vote: Bool) : async () {
    switch (proposals.get(proposalId)) {
      case (?proposal) {
        let voteBuffer = Buffer.fromArray<Vote>(proposal.votes);
        voteBuffer.add({
          voter = caller;
          vote = vote;
        });
        let updatedVotes = Buffer.toArray(voteBuffer);
        let updatedProposal = {
          id = proposal.id;
          creator = proposal.creator;
          description = proposal.description;
          proposalType = proposal.proposalType;
          votes = updatedVotes;
        };
        proposals.put(proposalId, updatedProposal);
      };
      case null {};
    };
  };

  public shared({caller}) func getProposal(proposalId: Nat) : async ?Proposal {
    return proposals.get(proposalId);
  };
}
