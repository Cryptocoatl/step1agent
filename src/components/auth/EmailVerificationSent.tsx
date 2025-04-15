
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

interface EmailVerificationSentProps {
  email: string;
  onBackToLogin: () => void;
  onResendVerification: () => void;
}

export const EmailVerificationSent: React.FC<EmailVerificationSentProps> = ({
  email,
  onBackToLogin,
  onResendVerification,
}) => {
  return (
    <div className="text-center py-6">
      <div className="flex justify-center mb-4">
        <CheckCircle2 className="h-16 w-16 text-green-500" />
      </div>
      <h2 className="text-xl font-medium mb-3">Verification Email Sent</h2>
      <p className="text-muted-foreground mb-6">
        We've sent a verification email to <strong>{email}</strong>.
        Please check your inbox and click the verification link.
      </p>
      <div className="space-y-4">
        <Button 
          onClick={onBackToLogin}
          variant="outline" 
          className="w-full"
        >
          Return to Login
        </Button>
        <p className="text-sm text-muted-foreground">
          Didn't receive the email? Check your spam folder or{" "}
          <Button 
            variant="link" 
            className="p-0 h-auto text-sm"
            onClick={onResendVerification}
          >
            click here to resend
          </Button>
        </p>
      </div>
    </div>
  );
};
