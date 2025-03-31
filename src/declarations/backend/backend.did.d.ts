import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface DigitalID {
  'displayName' : string,
  'createdAt' : bigint,
  'wallets' : Array<string>,
  'daoMemberships' : Array<string>,
}
export interface _SERVICE {
  'getDigitalID' : ActorMethod<[], [] | [DigitalID]>,
  'getTimestamp' : ActorMethod<[], bigint>,
  'heartbeat' : ActorMethod<[], string>,
  'linkWallet' : ActorMethod<[string, string], boolean>,
  'ping' : ActorMethod<[], string>,
  'registerDigitalID' : ActorMethod<[string], boolean>,
}
