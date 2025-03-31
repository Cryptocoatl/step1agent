import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Hash "mo:base/Hash";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Buffer "mo:base/Buffer";

actor {
  // Unified Signer Interface (shared functions)
  public type UnifiedSigner = {
    signMessage : shared (message : Blob) -> async ?Blob;
    getAddress : shared (chain : Text) -> async Text;
    verifyNetwork : shared (chainId : Nat) -> async Bool;
  };

  // Chain Types
  public type ChainType = {
    #Ethereum;
    #Solana;
    #Bitcoin;
    #ICP;
  };

  // Wallet Abstraction Layer
  public type Wallet = {
    chain : ChainType;
    signer : UnifiedSigner;
  };

  // Stable type for storage
  public type StableWallet = {
    chain : {
      #Ethereum;
      #Solana;
      #Bitcoin;
      #ICP;
    };
    signer : {
      signMessage : shared (message : Blob) -> async ?Blob;
      getAddress : shared (chain : Text) -> async Text;
      verifyNetwork : shared (chainId : Nat) -> async Bool;
    };
  };

  // State
  stable var connectedWalletsEntries : [(Principal, StableWallet)] = [];
  var connectedWallets = HashMap.fromIter<Principal, Wallet>(
    connectedWalletsEntries.vals(), 0, Principal.equal, Principal.hash
  );

  system func preupgrade() {
    let entries = Buffer.Buffer<(Principal, StableWallet)>(connectedWallets.size());
    for ((principal, wallet) in connectedWallets.entries()) {
      entries.add((principal, {
        chain = wallet.chain;
        signer = {
          signMessage = wallet.signer.signMessage;
          getAddress = wallet.signer.getAddress;
          verifyNetwork = wallet.signer.verifyNetwork;
        };
      }));
    };
    connectedWalletsEntries := Buffer.toArray(entries);
  };

  system func postupgrade() {
    connectedWallets := HashMap.fromIter<Principal, Wallet>(
      connectedWalletsEntries.vals(), 0, Principal.equal, Principal.hash
    );
    connectedWalletsEntries := [];
  };

  // Helper functions for the wallet signer
  public shared({caller}) func helperSignMessage(message: Blob) : async ?Blob { 
    ?message 
  };
  
  public shared({caller}) func helperGetAddress(chain: Text) : async Text { 
    "0x0" 
  };
  
  public shared({caller}) func helperVerifyNetwork(chainId: Nat) : async Bool { 
    true 
  };

  // Function to connect a wallet (Placeholder - needs actual implementation)
  public shared({caller}) func connectWallet(chain: ChainType, walletData: Blob) : async ?Wallet {
    let signer : UnifiedSigner = {
      signMessage = helperSignMessage;
      getAddress = helperGetAddress;
      verifyNetwork = helperVerifyNetwork;
    };
    let wallet : Wallet = {
      chain = chain;
      signer = signer;
    };
    connectedWallets.put(caller, wallet);
    return ?{
      chain = wallet.chain;
      signer = {
        signMessage = wallet.signer.signMessage;
        getAddress = wallet.signer.getAddress;
        verifyNetwork = wallet.signer.verifyNetwork;
      };
    };
  };

  // Function to get a connected wallet
  public shared({caller}) func getWallet() : async ?Wallet {
    switch (connectedWallets.get(caller)) {
      case (?wallet) {
        return ?{
          chain = wallet.chain;
          signer = {
            signMessage = wallet.signer.signMessage;
            getAddress = wallet.signer.getAddress;
            verifyNetwork = wallet.signer.verifyNetwork;
          };
        };
      };
      case null { return null };
    };
  };

  public shared({caller}) func signMessage(message: Blob) : async ?Blob {
    switch (connectedWallets.get(caller)) {
      case (?wallet) {
        return await wallet.signer.signMessage(message);
      };
      case null { return null };
    };
  };

  // TODO: Implement EIP-1271 and IPC-25 signature verification
  // TODO: Implement UTXO management for Bitcoin
  // TODO: Implement auto-detection of networks in EVM chains
}
