import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface UserProfile {
  'principal' : Principal,
  'reputation' : number,
  'wallets' : Array<Wallet>,
}
export interface Wallet { 'chain' : string, 'address' : string }
export interface _SERVICE {
  'createProfile' : ActorMethod<[], UserProfile>,
  'getProfile' : ActorMethod<[Principal], [] | [UserProfile]>,
  'updateReputation' : ActorMethod<[Principal, number], undefined>,
}
