
export const idlFactory = ({ IDL }) => {
  const DigitalID = IDL.Record({
    'createdAt' : IDL.Int,
    'displayName' : IDL.Text,
    'daoMemberships' : IDL.Vec(IDL.Text),
    'wallets' : IDL.Vec(IDL.Text),
  });
  return IDL.Service({
    'getDigitalID' : IDL.Func(
        [],
        [IDL.Opt(DigitalID)],
        ['query'],
      ),
    'heartbeat' : IDL.Func([], [IDL.Text], ['query']),
    'linkWallet' : IDL.Func([IDL.Text, IDL.Text], [IDL.Bool], []),
    'registerDigitalID' : IDL.Func([IDL.Text], [IDL.Bool], []),
  });
};
export const init = ({ IDL }) => { return []; };
