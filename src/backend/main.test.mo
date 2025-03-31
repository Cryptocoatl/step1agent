import Backend "main.mo";
import Test "mo:test";

// Basic tests for Backend (BFF)
module {
  public func testGetProfile() : async Bool {
    // Placeholder - Implement actual test logic
    let principal = Principal.anonymous();
    let profile = await Backend.getProfile(principal);
    Test.assert(?profile != null, "Get profile failed");
    return true;
  };

  public func testCreateLaunchpad() : async Bool {
    let launchpadId = await Backend.createLaunchpad("Test Launchpad");
    Test.assert(launchpadId != null, "Create launchpad failed");
    return true;
  };
}
