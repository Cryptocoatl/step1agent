export const idlFactory = ({ IDL }) => {
  const Launchpad = IDL.Record({
    'id' : IDL.Nat,
    'creator' : IDL.Principal,
    'name' : IDL.Text,
  });
  return IDL.Service({
    'createLaunchpad' : IDL.Func([IDL.Text], [IDL.Nat], []),
    'getLaunchpad' : IDL.Func([IDL.Nat], [IDL.Opt(Launchpad)], []),
  });
};
export const init = ({ IDL }) => { return []; };
