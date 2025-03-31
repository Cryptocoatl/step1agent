
import { useState } from "react";
import { StepOneAgent } from "./StepOneAgent";
import { Bot, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export const StepOneAgentButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Fixed floating button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-accent hover:bg-accent/90 shadow-lg z-40 flex items-center justify-center p-0"
        aria-label="Open agent chat"
      >
        <Bot size={24} />
      </Button>

      {/* Dialog for agent */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[450px] p-0 bg-transparent border-none shadow-none overflow-visible">
          <div className="relative">
            <Button
              onClick={() => setIsOpen(false)}
              className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-accent hover:bg-accent/90 shadow-lg z-50 flex items-center justify-center p-0"
              aria-label="Close agent chat"
            >
              <X size={18} />
            </Button>
            <StepOneAgent className="w-full" />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
