
import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

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
        
        console.log('Auth state changed:', event);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          setIsEmailVerified(session.user.email_confirmed_at != null);
          
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
                
              // If new sign-up and email is verified, navigate to digital-id
              if (event === 'SIGNED_IN' && session.user.email_confirmed_at) {
                // If this is a new user that just confirmed email
                if (!profileData?.display_name) {
                  toast({
                    title: "Email verified successfully",
                    description: "Your STEP1 Digital ID is being set up",
                  });
                  // We'll handle navigation in the component using this information
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
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        setIsEmailVerified(session.user.email_confirmed_at != null);
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
