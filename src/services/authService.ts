
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
    
    toast({
      title: "Verification email sent",
      description: "Please check your email to verify your account"
    });
    
    return { data, error: null };
  } catch (error: any) {
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
    const { data, error } = await supabase.auth.resend({
      type: 'signup',
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth?verified=true`
      }
    });

    if (error) {
      throw error;
    }

    toast({
      title: "Verification email sent",
      description: `A new verification email has been sent to ${email}`
    });
    
    return { data, error: null };
  } catch (error: any) {
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
