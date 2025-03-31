import DAOEngine "main.mo";
import Test "mo:test";

// Basic tests for DAOEngine
module {
  public func testCreateProposal() : async Bool {
    let proposalId = await DAOEngine.createProposal("Test Proposal", {Funding = {token = "TEST"; amount = 100; recipient = Principal.anonymous()}});
    Test.assert(proposalId != null, "Proposal creation failed");
    return true;
  };

  public func testGetProposal() : async Bool {
    let proposalId = await DAOEngine.createProposal("Test Proposal", {Funding = {token = "TEST"; amount = 100; recipient = Principal.anonymous()}});
    let proposal = await DAOEngine.getProposal(proposalId);
    Test.assert(?proposal != null, "Proposal retrieval failed");
    return true;
  };
}
