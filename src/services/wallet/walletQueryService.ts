
import { supabase } from "@/integrations/supabase/client";
import { Wallet } from "./types";

// Function to get all connected wallets
export const getConnectedWallets = async (): Promise<Wallet[]> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return [];
    }
    
    const { data, error } = await supabase
      .from('user_wallets')
      .select('*')
      .eq('user_id', user.id);
    
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error('Error getting connected wallets:', error);
    return [];
  }
};

// Function to check if a user has a specific type of wallet
export const hasWalletType = async (chainType: string): Promise<boolean> => {
  try {
    const wallets = await getConnectedWallets();
    return wallets.some(wallet => wallet.chain_type === chainType);
  } catch (error) {
    console.error('Error checking wallet type:', error);
    return false;
  }
};
