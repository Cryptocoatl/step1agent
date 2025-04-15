
export const idlFactory = ({ IDL }) => {
  const UserProfile = IDL.Record({
    'principal' : IDL.Principal,
    'wallets' : IDL.Vec(IDL.Record({
      'chain' : IDL.Text,
      'address' : IDL.Text,
    })),
    'reputation' : IDL.Float64,
  });
  return IDL.Service({
    'createProfile' : IDL.Func([], [UserProfile], []),
    'getProfile' : IDL.Func([IDL.Principal], [IDL.Opt(UserProfile)], ['query']),
    'updateReputation' : IDL.Func([IDL.Principal, IDL.Float64], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
