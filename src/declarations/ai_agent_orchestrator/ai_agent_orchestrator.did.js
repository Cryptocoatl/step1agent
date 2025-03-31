export const idlFactory = ({ IDL }) => {
  const AIAgent = IDL.Record({
    'id' : IDL.Principal,
    'role' : IDL.Text,
    'modelHash' : IDL.Text,
    'executionEnv' : IDL.Text,
  });
  return IDL.Service({
    'getAgent' : IDL.Func([IDL.Principal], [IDL.Opt(AIAgent)], []),
    'registerAgent' : IDL.Func([AIAgent], [IDL.Principal], []),
    'upgradeAgent' : IDL.Func(
        [IDL.Principal, IDL.Vec(IDL.Nat8)],
        [IDL.Bool],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
