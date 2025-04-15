
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

// Award tokens to the current user
export const awardTokens = async (
  rewardType: string,
  amount: number,
  description: string
): Promise<boolean> => {
  try {
    // Get the current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      console.error("No authenticated user found");
      return false;
    }
    
    // Award the tokens by creating a record in user_rewards
    const { error } = await supabase
      .from('user_rewards')
      .insert({
        user_id: user.id,
        token_amount: amount,
        reward_type: rewardType,
        description: description
      });
    
    if (error) throw error;
    
    toast({
      title: `${amount} STEP1 Tokens Earned!`,
      description: description,
    });
    
    return true;
  } catch (error) {
    console.error("Error awarding tokens:", error);
    return false;
  }
};

// Get the total token balance for the current user
export const getTotalTokenBalance = async (): Promise<number> => {
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

// Get the reward history for the current user
export const getRewardHistory = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];
    
    const { data, error } = await supabase
      .from('user_rewards')
      .select('*')
      .eq('user_id', user.id)
      .order('earned_at', { ascending: false });
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error("Error getting reward history:", error);
    return [];
  }
};

// Track a completed content item (learning, quest, etc.)
export const trackContentCompletion = async (
  contentId: string,
  contentType: string
): Promise<boolean> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;
    
    // Check if already completed
    const { data: existing } = await supabase
      .from('content_completion')
      .select('*')
      .eq('user_id', user.id)
      .eq('content_id', contentId)
      .single();
    
    if (existing) {
      return true; // Already completed
    }
    
    // Mark as completed
    const { error } = await supabase
      .from('content_completion')
      .insert({
        user_id: user.id,
        content_id: contentId,
        content_type: contentType
      });
    
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error("Error tracking content completion:", error);
    return false;
  }
};
