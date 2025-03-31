import DigitalIdentityManager "main.mo";
import Test "mo:test";

// Basic tests for DigitalIdentityManager
module {
  public func testCreateProfile() : async Bool {
    let profile = await DigitalIdentityManager.createProfile();
    Test.assert(profile.principal != null, "Profile creation failed");
    return true;
  };

  public func testGetProfile() : async Bool {
    let profile = await DigitalIdentityManager.createProfile();
    let retrievedProfile = await DigitalIdentityManager.getProfile(profile.principal);
    Test.assert(retrievedProfile != null, "Profile retrieval failed");
    return true;
  };
}
