export const idlFactory = ({ IDL }) => {
  const ProposalType = IDL.Variant({
    'Docs' : IDL.Record({ 'docHash' : IDL.Text }),
    'Role' : IDL.Record({ 'member' : IDL.Principal, 'roleName' : IDL.Text }),
    'Funding' : IDL.Record({
      'token' : IDL.Text,
      'recipient' : IDL.Principal,
      'amount' : IDL.Nat,
    }),
  });
  const Vote = IDL.Record({ 'voter' : IDL.Principal, 'vote' : IDL.Bool });
  const Proposal = IDL.Record({
    'id' : IDL.Nat,
    'creator' : IDL.Principal,
    'votes' : IDL.Vec(Vote),
    'description' : IDL.Text,
    'proposalType' : ProposalType,
  });
  return IDL.Service({
    'createProposal' : IDL.Func([IDL.Text, ProposalType], [IDL.Nat], []),
    'getProposal' : IDL.Func([IDL.Nat], [IDL.Opt(Proposal)], []),
    'vote' : IDL.Func([IDL.Nat, IDL.Bool], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
