
import { supabase } from "@/integrations/supabase/client";

// Function to get all connected wallets
export const getConnectedWallets = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error("User not authenticated");
    }
    
    const { data, error } = await supabase
      .from('user_wallets')
      .select('*')
      .eq('user_id', user.id);
    
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error("Error fetching connected wallets:", error);
    return [];
  }
};

// Function to connect a wallet
export const connectWallet = async (
  walletAddress: string,
  walletType: string,
  chainType: string
) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error("User not authenticated");
    }
    
    // Check if wallet already exists
    const { data: existingWallet } = await supabase
      .from('user_wallets')
      .select()
      .eq('wallet_address', walletAddress)
      .single();
    
    if (existingWallet) {
      console.log("Wallet already connected");
      return true;
    }
    
    // Insert the wallet
    const { error } = await supabase
      .from('user_wallets')
      .insert({
        user_id: user.id,
        wallet_address: walletAddress,
        wallet_type: walletType,
        chain_type: chainType
      });
    
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error("Error connecting wallet:", error);
    return false;
  }
};

// Function to disconnect a wallet
export const disconnectWallet = async (walletId: string) => {
  try {
    const { error } = await supabase
      .from('user_wallets')
      .delete()
      .eq('id', walletId);
    
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error("Error disconnecting wallet:", error);
    return false;
  }
};
