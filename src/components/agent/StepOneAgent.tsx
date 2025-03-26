
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { cn } from "@/lib/utils";
import { ArrowRight, Bot, ChevronDown, ChevronUp, Send } from "lucide-react";
import React, { useState } from "react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "agent";
  timestamp: Date;
}

interface StepOneAgentProps extends React.HTMLAttributes<HTMLDivElement> {
  fullscreen?: boolean;
}

const StepOneAgent = ({ className, fullscreen = false, ...props }: StepOneAgentProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm your Step 1 Agent. I can help you set up your digital identity and connect your wallets. How can I assist you today?",
      sender: "agent",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate agent response
    setTimeout(() => {
      const responses = [
        "I can help you connect your wallets. Would you like to start with ICP or another blockchain?",
        "Your Digital ID will require verification. I can guide you through this process step-by-step.",
        "To access all membership benefits, you'll need to connect at least one wallet. Would you like to see the benefits breakdown?",
        "I can explain how token-gating works for our events and services. Would you like to learn more?",
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      const agentMessage: Message = {
        id: `agent-${Date.now()}`,
        content: randomResponse,
        sender: "agent",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, agentMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={cn(
      "fixed z-40 transition-all duration-300 ease-in-out",
      fullscreen ? "inset-0" : "right-6 bottom-6",
      !isExpanded && !fullscreen && "w-[350px]",
      isExpanded && !fullscreen && "w-[440px] h-[500px]",
      fullscreen && "w-full h-full bg-background/90 backdrop-blur-sm",
      className
    )} {...props}>
      <GlassPanel
        className={cn(
          "overflow-hidden transition-all duration-300 h-full",
          fullscreen ? "w-full max-w-3xl mx-auto mt-16 mb-16" : "w-full"
        )}
        intensity="medium"
      >
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between bg-secondary/50">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center">
              <Bot size={18} className="text-white" />
            </div>
            <div>
              <h3 className="font-medium text-sm">Step 1 Agent</h3>
              <p className="text-xs text-muted-foreground">Online</p>
            </div>
          </div>
          {!fullscreen && (
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {isExpanded ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
            </button>
          )}
        </div>

        {/* Messages */}
        <div className="p-4 overflow-y-auto" style={{ height: "calc(100% - 128px)" }}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.sender === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-xl p-3",
                    message.sender === "user"
                      ? "bg-accent text-accent-foreground"
                      : "bg-secondary text-secondary-foreground"
                  )}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: "2-digit", 
                      minute: "2-digit" 
                    })}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-secondary text-secondary-foreground max-w-[80%] rounded-xl p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border bg-background/50">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about your digital ID..."
              className="flex-1 bg-secondary/50 border-0 rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-accent"
            />
            <Button
              size="icon"
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="h-9 w-9 rounded-lg bg-accent hover:bg-accent/90"
            >
              <Send size={16} />
            </Button>
          </div>
        </div>
      </GlassPanel>
    </div>
  );
};

export { StepOneAgent };
