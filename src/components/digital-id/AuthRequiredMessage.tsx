
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogIn, AlertCircle, Mail } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { useAuth } from "@/providers/SupabaseAuthProvider";
import { resendVerificationEmail } from "@/services/authService";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export const AuthRequiredMessage = () => {
  const { user, isEmailVerified } = useAuth();
  const [isResending, setIsResending] = useState(false);

  const handleResendVerification = async () => {
    if (!user?.email) return;
    
    try {
      setIsResending(true);
      await resendVerificationEmail(user.email);
    } catch (error) {
      console.error("Failed to resend verification:", error);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          {user && !isEmailVerified ? (
            <>
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-amber-500/20 rounded-full">
                  <AlertCircle className="h-10 w-10 text-amber-500" />
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-4">Email Verification Required</h2>
              <p className="text-muted-foreground mb-6">
                Please verify your email address to access your Digital ID. We've sent a verification 
                link to <strong>{user.email}</strong>.
              </p>
              <Button 
                onClick={handleResendVerification}
                className="button-animated mb-4"
                disabled={isResending}
              >
                <Mail className="mr-2 h-4 w-4" />
                {isResending ? "Sending..." : "Resend Verification Email"}
              </Button>
              <p className="text-sm text-muted-foreground">
                Already verified? Try <Link to="/" className="text-primary hover:underline">refreshing the page</Link>.
              </p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
              <p className="text-muted-foreground mb-6">
                You need to sign in to access your Digital ID
              </p>
              <Link to="/auth">
                <Button className="button-animated">
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};
