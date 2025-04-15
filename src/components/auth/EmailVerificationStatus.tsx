
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface EmailVerificationStatusProps {
  isProcessingAuth: boolean;
  isVerified: boolean;
  hasUser: boolean;
}

export const EmailVerificationStatus: React.FC<EmailVerificationStatusProps> = ({
  isProcessingAuth,
  isVerified,
  hasUser
}) => {
  if (!isProcessingAuth && !isVerified) return null;
  
  return (
    <>
      {isProcessingAuth && (
        <Alert className="mb-8 bg-primary/10 border-primary/30">
          <AlertCircle className="h-5 w-5 text-primary" />
          <AlertTitle>Processing verification</AlertTitle>
          <AlertDescription>
            Please wait while we verify your email...
          </AlertDescription>
        </Alert>
      )}
      
      {isVerified && hasUser && (
        <Alert className="mb-8 border-green-500/50 bg-green-500/10">
          <CheckCircle2 className="h-5 w-5 text-green-500" />
          <AlertTitle>Email Verified Successfully!</AlertTitle>
          <AlertDescription>
            Your email has been verified. Redirecting you to set up your Digital ID...
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};
