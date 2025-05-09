
import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { connectWallet } from '@/services/wallet/walletConnectionService';
import { awardTokens } from '@/services/rewardsService';

export function useSupabaseAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  useEffect(() => {
    let mounted = true;
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!mounted) return;
        
        console.log('Auth state changed:', event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          const emailConfirmed = session.user.email_confirmed_at != null;
          console.log('Email confirmed at:', session.user.email_confirmed_at);
          setIsEmailVerified(emailConfirmed);
          
          // To avoid potential deadlock, defer fetching profile data with setTimeout
          setTimeout(async () => {
            if (!mounted) return;
            try {
              // Check if user has a profile already
              const { data: profileData } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single();
                
              console.log('Profile data:', profileData);
                
              // If new sign-up and email is verified, prepare for digital-id
              if (event === 'SIGNED_IN' && emailConfirmed) {
                // If this is a new user that just confirmed email
                if (!profileData?.display_name) {
                  toast({
                    title: "Email verified successfully",
                    description: "Your STEP1 Digital ID is being set up",
                  });
                  
                  // Create user profile if it doesn't exist
                  if (!profileData) {
                    const defaultName = session.user.email?.split('@')[0] || "STEP1 User";
                    console.log('Creating default profile with name:', defaultName);
                    await supabase
                      .from('profiles')
                      .insert({
                        id: session.user.id,
                        display_name: defaultName
                      });
                  }
                  
                  // Generate ICP wallet for new verified users
                  // Generate a deterministic "simulated" ICP address based on the user's id
                  const walletAddress = `icp-${session.user.id.substring(0, 8)}`;
                  
                  console.log('Creating ICP wallet with address:', walletAddress);
                  
                  // Connect the wallet
                  const walletConnected = await connectWallet(
                    walletAddress,
                    'Smart Wallet',
                    'icp'
                  );
                  
                  console.log('Wallet connected:', walletConnected);
                  
                  // Award tokens for completing verification
                  if (walletConnected) {
                    await awardTokens(
                      'account_verification',
                      25,
                      'Welcome reward for verifying your account'
                    );
                  }
                }
              }
            } catch (error) {
              console.error("Error fetching profile data:", error);
            }
          }, 0);
        }
        
        if (event === 'SIGNED_IN') {
          toast({
            title: "Signed in successfully",
            description: "Welcome to STEP1!"
          });
        } else if (event === 'SIGNED_OUT') {
          toast({
            title: "Signed out",
            description: "You have been signed out"
          });
        } else if (event === 'USER_UPDATED') {
          // Check if email was just confirmed
          if (session?.user?.email_confirmed_at) {
            setIsEmailVerified(true);
            toast({
              title: "Email verified",
              description: "Your email has been successfully verified!"
            });
          }
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;
      
      console.log('Initial session check:', session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        const emailConfirmed = session.user.email_confirmed_at != null;
        console.log('Initial email confirmed check:', emailConfirmed);
        setIsEmailVerified(emailConfirmed);
      }
      
      setIsLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return {
    user,
    session,
    isLoading,
    isEmailVerified
  };
}
