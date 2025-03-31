export const idlFactory = ({ IDL }) => {
  const Wallet = IDL.Record({ 'chain' : IDL.Text, 'address' : IDL.Text });
  const UserProfile = IDL.Record({
    'principal' : IDL.Principal,
    'reputation' : IDL.Float64,
    'wallets' : IDL.Vec(Wallet),
  });
  return IDL.Service({
    'createProfile' : IDL.Func([], [UserProfile], []),
    'getProfile' : IDL.Func([IDL.Principal], [IDL.Opt(UserProfile)], []),
    'updateReputation' : IDL.Func([IDL.Principal, IDL.Float64], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
