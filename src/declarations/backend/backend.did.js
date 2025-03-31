export const idlFactory = ({ IDL }) => {
  const DigitalID = IDL.Record({
    'displayName' : IDL.Text,
    'createdAt' : IDL.Int,
    'wallets' : IDL.Vec(IDL.Text),
    'daoMemberships' : IDL.Vec(IDL.Text),
  });
  return IDL.Service({
    'getDigitalID' : IDL.Func([], [IDL.Opt(DigitalID)], []),
    'getTimestamp' : IDL.Func([], [IDL.Int], []),
    'heartbeat' : IDL.Func([], [IDL.Text], ['query']),
    'linkWallet' : IDL.Func([IDL.Text, IDL.Text], [IDL.Bool], []),
    'ping' : IDL.Func([], [IDL.Text], []),
    'registerDigitalID' : IDL.Func([IDL.Text], [IDL.Bool], []),
  });
};
export const init = ({ IDL }) => { return []; };
