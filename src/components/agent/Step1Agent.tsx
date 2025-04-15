
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { cn } from "@/lib/utils";
import { 
  Bot, Send, ArrowRight, Book, Code, Wallet, Users, Terminal, 
  Globe, ArrowUpRight, RefreshCw, PlusCircle, Sparkles,
  Languages, VideoIcon, Award, Zap, Leaf, Heart
} from "lucide-react";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { useAuth } from "@/providers/SupabaseAuthProvider";

interface Message {
  id: string;
  content: string;
  sender: "user" | "agent";
  timestamp: Date;
  category?: "blockchain" | "governance" | "community" | "content" | "tech" | "general";
}

interface Capability {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  examples: string[];
}

interface Step1AgentProps extends React.HTMLAttributes<HTMLDivElement> {
  fullscreen?: boolean;
  onClose?: () => void;
}

// Create a memory store for agent messages that persists between component mounts
let globalMessages: Message[] = [
  {
    id: "welcome",
    content: "¡Hola! I'm your Step1 Agent. I can help you manage digital identities, cross-chain integrations, DAO governance, and regenerative projects. How can I assist your planetary mission today?",
    sender: "agent",
    timestamp: new Date(),
    category: "general"
  },
];

export const Step1Agent = ({ className, fullscreen = false, onClose, ...props }: Step1AgentProps) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>(globalMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showCapabilities, setShowCapabilities] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<"en" | "es" | "fr" | "pt" | "it">("en");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Define agent capabilities
  const capabilities: Capability[] = [
    {
      id: "blockchain",
      name: "Blockchain & Web3",
      icon: <Code className="h-5 w-5" />,
      description: "Smart contracts, cross-chain identity, tokenomics",
      examples: [
        "Help me create an ICP digital identity",
        "How do I connect my Solana wallet?",
        "Explain the token governance model"
      ]
    },
    {
      id: "governance",
      name: "DAO Governance",
      icon: <Users className="h-5 w-5" />,
      description: "Organize proposals, voting, community treasury",
      examples: [
        "Create a new proposal for waste management",
        "How do we structure DAO voting?",
        "Explain the regenerative tokenomics"
      ]
    },
    {
      id: "tech",
      name: "Technical Support",
      icon: <Terminal className="h-5 w-5" />,
      description: "Integration help, wallet setup, tech troubleshooting",
      examples: [
        "I'm having issues with wallet connection",
        "How do I deploy on ICP?",
        "Integrate my Polygon account"
      ]
    },
    {
      id: "community",
      name: "Community Building",
      icon: <Globe className="h-5 w-5" />,
      description: "Multilingual support, onboarding, global coordination",
      examples: [
        "Help translate our message to Spanish",
        "Connect us with regenerative communities",
        "Organize global cleanup event"
      ]
    },
    {
      id: "content",
      name: "Content & Media",
      icon: <VideoIcon className="h-5 w-5" />,
      description: "Newsletter creation, social media, video editing",
      examples: [
        "Draft a newsletter about our latest project",
        "Create social media strategy for launch",
        "Help edit our beach cleanup footage"
      ]
    }
  ];

  // Update the global messages when local messages change
  useEffect(() => {
    globalMessages = messages;
  }, [messages]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Language translations for the welcome message
  const welcomeMessages = {
    en: "Hello! I'm your Step1 Agent. I can help you manage digital identities, cross-chain integrations, DAO governance, and regenerative projects. How can I assist your planetary mission today?",
    es: "¡Hola! Soy tu Agente Step1. Puedo ayudarte a gestionar identidades digitales, integraciones cross-chain, gobernanza DAO y proyectos regenerativos. ¿Cómo puedo asistir tu misión planetaria hoy?",
    fr: "Bonjour! Je suis votre Agent Step1. Je peux vous aider à gérer les identités numériques, les intégrations multi-chaînes, la gouvernance DAO et les projets régénératifs. Comment puis-je soutenir votre mission planétaire aujourd'hui?",
    pt: "Olá! Sou seu Agente Step1. Posso ajudar a gerenciar identidades digitais, integrações cross-chain, governança DAO e projetos regenerativos. Como posso auxiliar sua missão planetária hoje?",
    it: "Ciao! Sono il tuo Agente Step1. Posso aiutarti a gestire identità digitali, integrazioni cross-chain, governance DAO e progetti rigenerativi. Come posso assistere la tua missione planetaria oggi?"
  };

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
    
    // Detect language category based on user message
    const detectCategory = (message: string): Message["category"] => {
      message = message.toLowerCase();
      if (message.includes("wallet") || message.includes("contract") || message.includes("icp") || 
          message.includes("blockchain") || message.includes("token") || message.includes("nft")) {
        return "blockchain";
      } else if (message.includes("dao") || message.includes("vote") || message.includes("proposal") || 
                message.includes("governance")) {
        return "governance";
      } else if (message.includes("community") || message.includes("people") || 
                message.includes("member") || message.includes("global")) {
        return "community";
      } else if (message.includes("content") || message.includes("newsletter") || 
                message.includes("video") || message.includes("social")) {
        return "content";
      } else if (message.includes("code") || message.includes("technical") || 
                message.includes("integration") || message.includes("deploy")) {
        return "tech";
      }
      return "general";
    };

    // Generate intelligent response based on message content
    setTimeout(() => {
      const category = detectCategory(inputValue);
      
      let response = "";
      
      // Process message semantically to generate appropriate response
      if (inputValue.toLowerCase().includes("identity") || inputValue.toLowerCase().includes("digital id")) {
        response = "Digital Identity is the cornerstone of web3 participation. I can help you set up your ICP identity canister which will allow portability across chains. Would you like me to guide you through creating a secure, cross-chain digital identity?";
      } else if (inputValue.toLowerCase().includes("wallet") || inputValue.toLowerCase().includes("connect")) {
        response = "Cross-chain wallet integration is key to participating in the regenerative ecosystem. I can help you connect wallets from ICP, Solana, Polygon, and Bitcoin to your Step1 identity. Which blockchain would you like to connect first?";
      } else if (inputValue.toLowerCase().includes("dao") || inputValue.toLowerCase().includes("governance")) {
        response = "Our regenerative DAO governance model uses quadratic voting and proof-of-participation to ensure community-driven decisions. I can help you participate in existing proposals or create a new one for your regenerative initiative. Would you like to see active proposals or create a new one?";
      } else if (inputValue.toLowerCase().includes("token") || inputValue.toLowerCase().includes("staking")) {
        response = "The REGEN token model is designed for planetary regeneration, with 40% allocated to community projects, 30% to carbon sequestration, and 30% to ongoing development. Would you like to learn how to stake your tokens toward specific regenerative projects?";
      } else if (inputValue.toLowerCase().includes("project") || inputValue.toLowerCase().includes("mission")) {
        response = "Step1 supports global regenerative projects through technology, funding, and community. I can help structure your idea into an actionable mission with tasks, timelines, and token incentives. Tell me more about your regenerative vision, and we'll bring it to life!";
      } else if (inputValue.toLowerCase().includes("hello") || inputValue.toLowerCase().includes("hi") || inputValue.toLowerCase().includes("hey")) {
        response = "Welcome to the regenerative digital economy! I'm here to help you navigate blockchain for planet-positive impact. I can assist with digital identity, wallet setup, DAO governance, regenerative projects, and community building. What would you like to focus on today?";
      } else {
        // Generate response based on category
        const responses = {
          blockchain: [
            "I can help you navigate the blockchain infrastructure for regenerative projects. Would you like to learn about smart contracts on ICP, wallet integrations, or tokenomics?",
            "Blockchain technology is key to our transparent, regenerative economy. I can guide you through digital identity creation, token staking, or cross-chain operations. What specific area interests you?"
          ],
          governance: [
            "DAO governance enables decentralized decision-making for planetary healing. I can help with proposal creation, voting mechanics, or treasury management. Which aspect would you like to explore?",
            "Our regenerative governance model ensures community voice in planetary healing. Would you like to participate in active proposals, create a new initiative, or learn about the governance framework?"
          ],
          community: [
            "Building global regenerative communities requires multilingual coordination. I can help with translation, regional outreach, or community event planning. How would you like to expand your impact?",
            "Our community spans LATAM, Africa, EU, and US with initiatives in many languages. Would you like assistance with cross-cultural collaboration, event organization, or community onboarding?"
          ],
          content: [
            "Effective communication amplifies regenerative impact. I can help draft newsletters, edit video content, or create social media strategies for your initiatives. What content needs do you have?",
            "Storytelling is essential for movement building. Would you like help creating impact reports, editing event footage, or developing multilingual outreach materials?"
          ],
          tech: [
            "Technical infrastructure supports our regenerative vision. I can assist with wallet setup, smart contract deployment, or integration questions. What technical challenge can I help with?",
            "Building on ICP provides speed and scalability for regenerative applications. Do you need help with canister deployment, wallet connectivity, or technical troubleshooting?"
          ],
          general: [
            "I'm here to support your regenerative mission through technology, governance, and community connection. Could you share more about your specific interests or challenges?",
            "The Step1 ecosystem combines blockchain technology with real-world impact for planetary healing. Would you like to explore our digital identity system, regenerative projects, or community initiatives?"
          ]
        };
        
        // Select a random response from the appropriate category
        const categoryResponses = responses[category] || responses.general;
        response = categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
      }

      const agentMessage: Message = {
        id: `agent-${Date.now()}`,
        content: response,
        sender: "agent",
        timestamp: new Date(),
        category: category
      };

      setMessages((prev) => [...prev, agentMessage]);
      setIsTyping(false);
    }, 1200);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleLanguageChange = (language: "en" | "es" | "fr" | "pt" | "it") => {
    setSelectedLanguage(language);
    
    // Update the welcome message
    const updatedMessages = [...messages];
    const welcomeIndex = updatedMessages.findIndex(msg => msg.id === "welcome");
    
    if (welcomeIndex !== -1) {
      updatedMessages[welcomeIndex] = {
        ...updatedMessages[welcomeIndex],
        content: welcomeMessages[language]
      };
      
      setMessages(updatedMessages);
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    setInputValue(prompt);
  };

  return (
    <div className={cn(
      "transition-all duration-300 ease-in-out",
      fullscreen ? "fixed inset-0 z-50" : "h-[600px]",
      className
    )} {...props}>
      <GlassPanel
        className="overflow-hidden transition-all duration-300 h-full w-full"
        intensity="medium"
      >
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between bg-secondary/50">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
              <Leaf className="text-white h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium text-base">Step1 Agent</h3>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <span>Planetary Regeneration Assistant</span>
                <Heart className="h-3 w-3 text-pink-500 fill-pink-500" />
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              {(["en", "es", "fr", "pt", "it"] as const).map((lang) => (
                <Button
                  key={lang}
                  variant="ghost"
                  size="icon"
                  className={`h-8 w-8 rounded-full ${selectedLanguage === lang ? 'bg-accent text-accent-foreground' : ''}`}
                  onClick={() => handleLanguageChange(lang)}
                >
                  {lang.toUpperCase()}
                </Button>
              ))}
            </div>
            {onClose && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        
        {/* Messages */}
        <div className="p-4 overflow-auto h-[calc(100%-8rem)]">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === "user"
                      ? "bg-accent text-accent-foreground"
                      : "bg-secondary"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg p-3 bg-secondary">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        {/* Quick Actions & Input */}
        <div className="p-4 border-t border-border bg-secondary/30">
          {showCapabilities && (
            <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-2">
              {capabilities.map((cap) => (
                <Button
                  key={cap.id}
                  variant="outline"
                  className="justify-start text-left h-auto py-2 bg-secondary/50 hover:bg-secondary"
                  onClick={() => {
                    handleQuickPrompt(cap.examples[Math.floor(Math.random() * cap.examples.length)]);
                    setShowCapabilities(false);
                  }}
                >
                  <div className="flex items-center">
                    <div className="mr-2 text-accent">{cap.icon}</div>
                    <div className="text-xs">
                      <div className="font-medium">{cap.name}</div>
                      <div className="text-muted-foreground truncate max-w-[180px]">{cap.description}</div>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          )}
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 shrink-0"
              onClick={() => setShowCapabilities(!showCapabilities)}
            >
              <Sparkles className="h-4 w-4" />
            </Button>
            <div className="relative flex-grow">
              <textarea
                className="w-full h-10 min-h-[2.5rem] py-2 px-3 bg-secondary rounded-md resize-none"
                placeholder="Message Step1 Agent..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                }}
              />
            </div>
            <Button
              className="h-10 w-10 shrink-0 rounded-full p-0 bg-accent hover:bg-accent/90"
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </GlassPanel>
    </div>
  );
};
