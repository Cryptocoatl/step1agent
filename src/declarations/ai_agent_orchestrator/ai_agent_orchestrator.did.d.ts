import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface AIAgent {
  'id' : Principal,
  'role' : string,
  'modelHash' : string,
  'executionEnv' : string,
}
export interface _SERVICE {
  'getAgent' : ActorMethod<[Principal], [] | [AIAgent]>,
  'registerAgent' : ActorMethod<[AIAgent], Principal>,
  'upgradeAgent' : ActorMethod<[Principal, Uint8Array | number[]], boolean>,
}
