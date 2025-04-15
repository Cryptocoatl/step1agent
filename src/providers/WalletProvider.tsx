
import { createContext, useContext, useState, useEffect } from 'react'
import { AuthClient } from '@dfinity/auth-client'
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { connectWallet } from '@/services/wallet';
import { useAuth } from './SupabaseAuthProvider';

type WalletContextType = {
  isConnected: boolean
  principal: string | null
  connect: () => Promise<void>
  disconnect: () => Promise<void>
  createWallet: () => Promise<void>
  isLoading: boolean
}

const WalletContext = createContext<WalletContextType | null>(null)

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false)
  const [principal, setPrincipal] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuth();

  // Check for existing wallet connection on mount
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const authClient = await AuthClient.create();
        const isAuthenticated = await authClient.isAuthenticated();
        
        if (isAuthenticated) {
          setIsConnected(true);
          setPrincipal(authClient.getIdentity().getPrincipal().toString());
        }
      } catch (error) {
        console.error("Error checking wallet connection:", error);
      }
    };
    
    checkConnection();
  }, []);

  // Auto-connect wallet for authenticated users
  useEffect(() => {
    if (user && !isConnected && !isLoading) {
      // Check if the user already has an ICP wallet connected in the database
      const checkUserWallet = async () => {
        try {
          const { data } = await supabase
            .from('user_wallets')
            .select('*')
            .eq('user_id', user.id)
            .eq('chain_type', 'icp')
            .single();
            
          if (data?.wallet_address) {
            console.log("Found existing ICP wallet:", data.wallet_address);
            setPrincipal(data.wallet_address);
            setIsConnected(true);
          }
        } catch (error) {
          console.error("Error checking user wallet:", error);
        }
      };
      
      checkUserWallet();
    }
  }, [user, isConnected, isLoading]);

  const createWallet = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to create a wallet",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Generate a mock STEP1 wallet identity (in real app, we'd use ICP SDK to generate this)
      const mockPrincipal = `step1-${Math.random().toString(36).substring(2, 10)}`;
      
      // Store wallet in Supabase
      const success = await connectWallet(
        mockPrincipal,
        'Smart Wallet', 
        'icp'
      );
      
      if (success) {
        setIsConnected(true);
        setPrincipal(mockPrincipal);
        
        toast({
          title: "Wallet created successfully",
          description: "Your STEP1 wallet is now ready to use"
        });
      }
    } catch (error) {
      console.error("Error creating wallet:", error);
      toast({
        title: "Wallet creation failed",
        description: "There was an error creating your wallet",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const connect = async () => {
    setIsLoading(true);
    
    try {
      const authClient = await AuthClient.create();
      await authClient.login({
        identityProvider: import.meta.env.VITE_DFX_NETWORK === 'ic' 
          ? 'https://identity.ic0.app' 
          : `http://localhost:4943?canisterId=${import.meta.env.VITE_CANISTER_ID_INTERNET_IDENTITY}`
      });
      
      setIsConnected(true);
      const principalId = authClient.getIdentity().getPrincipal().toString();
      setPrincipal(principalId);
      
      // If user is authenticated, save the wallet connection
      if (user) {
        await connectWallet(
          principalId,
          'Internet Identity',
          'icp'
        );
      }
      
      toast({
        title: "Wallet connected",
        description: "Your Internet Identity wallet has been connected"
      });
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast({
        title: "Connection failed",
        description: "There was an error connecting your wallet",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const disconnect = async () => {
    setIsLoading(true);
    
    try {
      const authClient = await AuthClient.create();
      await authClient.logout();
      
      setIsConnected(false);
      setPrincipal(null);
      
      toast({
        title: "Wallet disconnected",
        description: "Your wallet has been disconnected"
      });
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
      toast({
        title: "Disconnect failed",
        description: "There was an error disconnecting your wallet",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <WalletContext.Provider value={{ 
      isConnected, 
      principal, 
      connect, 
      disconnect,
      createWallet,
      isLoading
    }}>
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider')
  }
  return context
}
