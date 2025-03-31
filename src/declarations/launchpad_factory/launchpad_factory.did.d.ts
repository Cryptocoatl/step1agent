import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Launchpad {
  'id' : bigint,
  'creator' : Principal,
  'name' : string,
}
export interface _SERVICE {
  'createLaunchpad' : ActorMethod<[string], bigint>,
  'getLaunchpad' : ActorMethod<[bigint], [] | [Launchpad]>,
}
