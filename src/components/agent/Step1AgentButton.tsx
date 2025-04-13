
import { useState } from "react";
import { Step1Agent } from "./Step1Agent";
import { Bot, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export const Step1AgentButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Fixed floating button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 shadow-lg z-40 flex items-center justify-center p-0"
        aria-label="Open Step1 Agent"
      >
        <Bot size={24} className="text-white" />
      </Button>

      {/* Dialog for agent */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[85vw] md:max-w-[75vw] lg:max-w-[65vw] xl:max-w-[50vw] p-0 bg-transparent border-none shadow-none overflow-visible max-h-[90vh]">
          <div className="relative h-[80vh]">
            <Button
              onClick={() => setIsOpen(false)}
              className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-accent hover:bg-accent/90 shadow-lg z-50 flex items-center justify-center p-0"
              aria-label="Close agent chat"
            >
              <X size={18} />
            </Button>
            <Step1Agent className="w-full h-full" onClose={() => setIsOpen(false)} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
