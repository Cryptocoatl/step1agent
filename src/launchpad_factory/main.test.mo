import LaunchpadFactory "main.mo";
import Test "mo:test";

// Basic tests for LaunchpadFactory
module {
  public func testCreateLaunchpad() : async Bool {
    let launchpadId = await LaunchpadFactory.createLaunchpad("Test Launchpad");
    Test.assert(launchpadId != null, "Launchpad creation failed");
    return true;
  };

  public func testGetLaunchpad() : async Bool {
    let launchpadId = await LaunchpadFactory.createLaunchpad("Test Launchpad");
    let launchpad = await LaunchpadFactory.getLaunchpad(launchpadId);
    Test.assert(?launchpad != null, "Launchpad retrieval failed");
    return true;
  };
}
