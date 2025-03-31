import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type ChainType = { 'ICP' : null } |
  { 'Ethereum' : null } |
  { 'Solana' : null } |
  { 'Bitcoin' : null };
export interface UnifiedSigner {
  'verifyNetwork' : [Principal, string],
  'signMessage' : [Principal, string],
  'getAddress' : [Principal, string],
}
export interface Wallet { 'chain' : ChainType, 'signer' : UnifiedSigner }
export interface _SERVICE {
  'connectWallet' : ActorMethod<
    [ChainType, Uint8Array | number[]],
    [] | [Wallet]
  >,
  'getWallet' : ActorMethod<[], [] | [Wallet]>,
  'helperGetAddress' : ActorMethod<[string], string>,
  'helperSignMessage' : ActorMethod<
    [Uint8Array | number[]],
    [] | [Uint8Array | number[]]
  >,
  'helperVerifyNetwork' : ActorMethod<[bigint], boolean>,
  'signMessage' : ActorMethod<
    [Uint8Array | number[]],
    [] | [Uint8Array | number[]]
  >,
}
