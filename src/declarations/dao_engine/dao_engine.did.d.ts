import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Proposal {
  'id' : bigint,
  'creator' : Principal,
  'votes' : Array<Vote>,
  'description' : string,
  'proposalType' : ProposalType,
}
export type ProposalType = { 'Docs' : { 'docHash' : string } } |
  { 'Role' : { 'member' : Principal, 'roleName' : string } } |
  {
    'Funding' : { 'token' : string, 'recipient' : Principal, 'amount' : bigint }
  };
export interface Vote { 'voter' : Principal, 'vote' : boolean }
export interface _SERVICE {
  'createProposal' : ActorMethod<[string, ProposalType], bigint>,
  'getProposal' : ActorMethod<[bigint], [] | [Proposal]>,
  'vote' : ActorMethod<[bigint, boolean], undefined>,
}
