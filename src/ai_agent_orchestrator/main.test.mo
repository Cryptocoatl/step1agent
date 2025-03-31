import AIAgentOrchestrator "main.mo";
import Test "mo:test";

// Basic tests for AIAgentOrchestrator
module {
  public func testRegisterAgent() : async Bool {
    let agent : AIAgentOrchestrator.AIAgent = {
      id = Principal.anonymous();
      role = "Governance";
      modelHash = "Qm...";
      executionEnv = "Wasm";
    };
    let agentId = await AIAgentOrchestrator.registerAgent(agent);
    Test.assert(agentId != null, "Agent registration failed");
    return true;
  };

  public func testGetAgent() : async Bool {
    let agent : AIAgentOrchestrator.AIAgent = {
      id = Principal.anonymous();
      role = "Governance";
      modelHash = "Qm...";
      executionEnv = "Wasm";
    };
    let agentId = await AIAgentOrchestrator.registerAgent(agent);
    let retrievedAgent = await AIAgentOrchestrator.getAgent(agentId);
    Test.assert(?retrievedAgent != null, "Agent retrieval failed");
    return true;
  };
}
