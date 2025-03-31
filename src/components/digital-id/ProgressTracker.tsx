
import { Key, Globe, Award } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ProgressTrackerProps {
  progress: number;
  title?: string;
}

export const ProgressTracker = ({ progress, title = "Verification Progress" }: ProgressTrackerProps) => {
  return (
    <>
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Key className="mr-2 h-5 w-5 text-accent" />
        {title}
      </h2>
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span>Progress</span>
          <span>{progress}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
    </>
  );
};
