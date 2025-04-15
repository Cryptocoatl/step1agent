
import { supabase } from "@/integrations/supabase/client";
import { getBackendActor } from "./icpService";

// Function to award tokens to a user
export const awardTokens = async (
  rewardType: string,
  amount: number,
  description: string
) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error("User not authenticated");
    }
    
    // First try to use the ICP canister to record the reward
    try {
      const actor = await getBackendActor();
      await actor.earnReward(rewardType, amount, description);
    } catch (error) {
      console.error("Error recording reward in ICP canister:", error);
      // Continue to record in Supabase as fallback
    }
    
    // Also record in Supabase for client-side usage
    const { error } = await supabase
      .from('user_rewards')
      .insert({
        user_id: user.id,
        token_amount: amount,
        reward_type: rewardType,
        description
      });
    
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error("Error awarding tokens:", error);
    return false;
  }
};

// Function to get total token balance
export const getTotalTokenBalance = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return 0;
    }
    
    // Try to get from ICP canister first
    try {
      const actor = await getBackendActor();
      const rewards = await actor.getRewards();
      if (rewards && rewards.length > 0) {
        return rewards.reduce((total, reward) => total + Number(reward.amount), 0);
      }
    } catch (error) {
      console.error("Error getting rewards from ICP canister:", error);
      // Continue to use Supabase as fallback
    }
    
    // Get from Supabase as fallback
    const { data, error } = await supabase
      .from('user_rewards')
      .select('token_amount')
      .eq('user_id', user.id);
    
    if (error) throw error;
    
    return data?.reduce((total, reward) => total + reward.token_amount, 0) || 0;
  } catch (error) {
    console.error("Error getting total token balance:", error);
    return 0;
  }
};
