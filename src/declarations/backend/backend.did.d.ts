
import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface DigitalID {
  'createdAt' : bigint,
  'displayName' : string,
  'daoMemberships' : Array<string>,
  'wallets' : Array<string>,
}
export interface _SERVICE {
  'getDigitalID' : ActorMethod<[], [] | [DigitalID]>,
  'heartbeat' : ActorMethod<[], string>,
  'linkWallet' : ActorMethod<[string, string], boolean>,
  'registerDigitalID' : ActorMethod<[string], boolean>,
}
