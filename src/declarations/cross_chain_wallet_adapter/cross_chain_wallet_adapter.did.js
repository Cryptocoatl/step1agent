export const idlFactory = ({ IDL }) => {
  const ChainType = IDL.Variant({
    'ICP' : IDL.Null,
    'Ethereum' : IDL.Null,
    'Solana' : IDL.Null,
    'Bitcoin' : IDL.Null,
  });
  const UnifiedSigner = IDL.Record({
    'verifyNetwork' : IDL.Func([IDL.Nat], [IDL.Bool], []),
    'signMessage' : IDL.Func(
        [IDL.Vec(IDL.Nat8)],
        [IDL.Opt(IDL.Vec(IDL.Nat8))],
        [],
      ),
    'getAddress' : IDL.Func([IDL.Text], [IDL.Text], []),
  });
  const Wallet = IDL.Record({ 'chain' : ChainType, 'signer' : UnifiedSigner });
  return IDL.Service({
    'connectWallet' : IDL.Func(
        [ChainType, IDL.Vec(IDL.Nat8)],
        [IDL.Opt(Wallet)],
        [],
      ),
    'getWallet' : IDL.Func([], [IDL.Opt(Wallet)], []),
    'helperGetAddress' : IDL.Func([IDL.Text], [IDL.Text], []),
    'helperSignMessage' : IDL.Func(
        [IDL.Vec(IDL.Nat8)],
        [IDL.Opt(IDL.Vec(IDL.Nat8))],
        [],
      ),
    'helperVerifyNetwork' : IDL.Func([IDL.Nat], [IDL.Bool], []),
    'signMessage' : IDL.Func(
        [IDL.Vec(IDL.Nat8)],
        [IDL.Opt(IDL.Vec(IDL.Nat8))],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
