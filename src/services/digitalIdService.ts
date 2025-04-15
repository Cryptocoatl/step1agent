
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { awardTokens } from './rewardsService';
import { getBackendActor } from './icpService';

// Fetch a user's profile from Supabase
export const fetchUserProfile = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
};

// Update the user's display name
export const updateDisplayName = async (userId: string, displayName: string) => {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ display_name: displayName })
      .eq('id', userId);
    
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error("Error updating display name:", error);
    toast({
      title: "Update Failed",
      description: "Failed to update your display name",
      variant: "destructive"
    });
    return false;
  }
};

// Complete a Digital ID step
export const completeDigitalIdStep = async (
  user: User,
  stepIndex: number,
  currentCompletedSteps: number[],
  displayName: string
) => {
  if (!user) {
    return { success: false };
  }
  
  try {
    // If this is step 0 (setting display name), update the profile
    if (stepIndex === 0) {
      const updated = await updateDisplayName(user.id, displayName);
      
      if (!updated) {
        return { success: false };
      }
      
      // Register the digital ID on the Internet Computer
      try {
        const actor = await getBackendActor();
        await actor.registerDigitalID(displayName);
      } catch (err) {
        console.warn("Failed to register with ICP backend, continuing anyway:", err);
      }
    }
    
    // Award tokens for completing this step (if not already completed)
    if (!currentCompletedSteps.includes(stepIndex)) {
      const tokenAmount = getTokenAmountForStep(stepIndex);
      const description = getRewardDescriptionForStep(stepIndex);
      
      await awardTokens('step_completion', tokenAmount, description);
      
      // Get updated token balance
      const tokenBalance = await getTotalTokenBalance();
      
      // Add the step to completed steps
      const newCompletedSteps = [...currentCompletedSteps, stepIndex];
      
      return {
        success: true,
        tokenBalance,
        completedSteps: newCompletedSteps
      };
    }
    
    return { success: true };
  } catch (error) {
    console.error("Error completing digital ID step:", error);
    toast({
      title: "Step Completion Failed",
      description: "There was an error completing this step",
      variant: "destructive"
    });
    return { success: false };
  }
};

// Determine which steps the user has completed based on their profile data
export const determineCompletedSteps = async (profile: any) => {
  const completedSteps: number[] = [];
  
  // Step 0: Display name set
  if (profile.display_name) {
    completedSteps.push(0);
  }
  
  // Step 1: Wallet connected
  try {
    const { data: wallets } = await supabase
      .from('user_wallets')
      .select('*')
      .eq('user_id', profile.id);
    
    if (wallets && wallets.length > 0) {
      completedSteps.push(1);
    }
  } catch (err) {
    console.error("Error fetching wallet data:", err);
  }
  
  // Additional step completions can be checked here
  // Step 2, 3, etc.
  
  return completedSteps;
};

// Get token amount for each step
const getTokenAmountForStep = (stepIndex: number): number => {
  const rewards = {
    0: 10, // Set display name
    1: 20, // Connect wallet
    2: 30, // Join DAO
    3: 40  // Complete profile
  };
  
  return rewards[stepIndex as keyof typeof rewards] || 5;
};

// Get reward description for each step
const getRewardDescriptionForStep = (stepIndex: number): string => {
  const descriptions = {
    0: "Created your Digital ID profile",
    1: "Connected a wallet to your Digital ID",
    2: "Joined your first DAO",
    3: "Completed your Digital ID profile"
  };
  
  return descriptions[stepIndex as keyof typeof descriptions] || "Completed Digital ID step";
};

// Get the total token balance for the current user
const getTotalTokenBalance = async (): Promise<number> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return 0;
    
    const { data, error } = await supabase
      .from('user_rewards')
      .select('token_amount')
      .eq('user_id', user.id);
    
    if (error) throw error;
    
    return data.reduce((total, reward) => total + reward.token_amount, 0);
  } catch (error) {
    console.error("Error getting token balance:", error);
    return 0;
  }
};
