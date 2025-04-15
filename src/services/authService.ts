
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      throw error;
    }
    
    return { data, error: null };
  } catch (error: any) {
    toast({
      title: "Sign in failed",
      description: error.message,
      variant: "destructive"
    });
    return { data: null, error };
  }
}

export async function signUp(email: string, password: string, metadata?: any) {
  try {
    // Get the current URL origin
    const redirectUrl = `${window.location.origin}/auth?verified=true`;
    
    console.log('Signing up with redirect URL:', redirectUrl);
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { 
        data: metadata,
        emailRedirectTo: redirectUrl
      }
    });
    
    if (error) {
      throw error;
    }
    
    // Check if email confirmation is needed
    if (data?.user?.identities?.length === 0) {
      toast({
        title: "Account already exists",
        description: "Please check your email or try signing in",
        variant: "destructive"
      });
      return { data, error: null };
    }
    
    console.log('Sign up successful, email verification status:', data?.user?.email_confirmed_at ? 'Confirmed' : 'Pending');
    
    toast({
      title: "Verification email sent",
      description: "Please check your email to verify your account"
    });
    
    return { data, error: null };
  } catch (error: any) {
    console.error('Sign up error:', error);
    toast({
      title: "Sign up failed",
      description: error.message,
      variant: "destructive"
    });
    return { data: null, error };
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      throw error;
    }
    
    return { error: null };
  } catch (error: any) {
    toast({
      title: "Sign out failed",
      description: error.message,
      variant: "destructive"
    });
    return { error };
  }
}

export async function resetPassword(email: string) {
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    
    if (error) {
      throw error;
    }
    
    toast({
      title: "Password reset email sent",
      description: "Please check your email for the reset link"
    });
    
    return { data, error: null };
  } catch (error: any) {
    toast({
      title: "Password reset failed",
      description: error.message,
      variant: "destructive"
    });
    return { data: null, error };
  }
}

export async function resendVerificationEmail(email: string) {
  try {
    console.log('Resending verification email to:', email);
    const redirectUrl = `${window.location.origin}/auth?verified=true`;
    
    const { data, error } = await supabase.auth.resend({
      type: 'signup',
      email,
      options: {
        emailRedirectTo: redirectUrl
      }
    });

    if (error) {
      console.error('Error resending verification email:', error);
      throw error;
    }

    console.log('Verification email resent successfully');
    toast({
      title: "Verification email sent",
      description: `A new verification email has been sent to ${email}`
    });
    
    return { data, error: null };
  } catch (error: any) {
    console.error('Error in resendVerificationEmail:', error);
    toast({
      title: "Failed to send verification email",
      description: error.message,
      variant: "destructive"
    });
    return { data: null, error };
  }
}

export async function checkUserSession() {
  try {
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      throw error;
    }
    
    return { session: data.session, error: null };
  } catch (error: any) {
    console.error("Error checking user session:", error);
    return { session: null, error };
  }
}

export async function createUserProfile(userId: string, displayName: string) {
  try {
    console.log('Creating user profile for:', userId, 'with display name:', displayName);
    const { error } = await supabase
      .from('profiles')
      .insert({
        id: userId,
        display_name: displayName
      });
    
    if (error) {
      console.error('Error creating profile:', error);
      throw error;
    }
    
    console.log('User profile created successfully');
    return { error: null };
  } catch (error: any) {
    console.error("Error creating user profile:", error);
    return { error };
  }
}
