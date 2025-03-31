
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { cn } from "@/lib/utils";
import { Bot, Send } from "lucide-react";
import React, { useState, useEffect } from "react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "agent";
  timestamp: Date;
}

interface StepOneAgentProps extends React.HTMLAttributes<HTMLDivElement> {
  fullscreen?: boolean;
}

// Create a singleton messages array to persist messages between component mounts
let globalMessages: Message[] = [
  {
    id: "welcome",
    content: "Hello! I'm your Step 1 Agent. I can help you set up your digital identity and connect your wallets. How can I assist you today?",
    sender: "agent",
    timestamp: new Date(),
  },
];

const StepOneAgent = ({ className, fullscreen = false, ...props }: StepOneAgentProps) => {
  const [messages, setMessages] = useState<Message[]>(globalMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  // Update the global messages when local messages change
  useEffect(() => {
    globalMessages = messages;
  }, [messages]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

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
      "transition-all duration-300 ease-in-out",
      fullscreen ? "inset-0" : "h-[500px]",
      className
    )} {...props}>
      <GlassPanel
        className="overflow-hidden transition-all duration-300 h-full w-full"
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
            <div ref={messagesEndRef} />
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
