
import { Step1Agent } from "@/components/agent/Step1Agent";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SpaceBackground } from "@/components/ui/SpaceBackground";
import { Shield, Leaf, Globe, UsersRound, Code, Cpu } from "lucide-react";

export default function Step1AgentPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <SpaceBackground className="fixed inset-0 z-[-1]" />
      
      <div className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto mb-8 text-center">
          <div className="inline-block bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
            Planetary Regeneration AI Assistant
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            Step1 Agent
          </h1>
          <p className="text-lg text-gray-400 mb-6">
            An AI systems architect for global regeneration, designed to amplify human creativity, decentralized governance, 
            and ecological impact through blockchain and community coordination.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <AnimatedCard animation="slide" className="p-6">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center mr-3">
                <Leaf className="h-5 w-5 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold">Regenerative Economics</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Build and participate in tokenomics that fund planetary healing through transparent, community-governed systems.
            </p>
          </AnimatedCard>
          
          <AnimatedCard animation="slide" className="p-6">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center mr-3">
                <Globe className="h-5 w-5 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold">Global Coordination</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Connect with communities across LATAM, Africa, EU, and US through multilingual communication and project management.
            </p>
          </AnimatedCard>
          
          <AnimatedCard animation="slide" className="p-6">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-full bg-purple-500/10 flex items-center justify-center mr-3">
                <UsersRound className="h-5 w-5 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold">DAO Governance</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Participate in decentralized decision-making for planetary healing through proposal creation and community voting.
            </p>
          </AnimatedCard>
        </div>

        <Tabs defaultValue="agent" className="mb-12">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="agent">AI Assistant</TabsTrigger>
            <TabsTrigger value="technical">Technical Architecture</TabsTrigger>
          </TabsList>
          
          <TabsContent value="agent" className="p-0">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-2">
                <AnimatedCard animation="fade" className="p-6 h-full">
                  <h3 className="text-xl font-bold mb-4">Agent Capabilities</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Shield className="h-5 w-5 mr-3 text-blue-400 mt-1" />
                      <div>
                        <h4 className="font-medium mb-1">Digital Identity Creation</h4>
                        <p className="text-sm text-muted-foreground">Secure, portable identity on the Internet Computer</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Code className="h-5 w-5 mr-3 text-green-400 mt-1" />
                      <div>
                        <h4 className="font-medium mb-1">Smart Contract Development</h4>
                        <p className="text-sm text-muted-foreground">Deploy on ICP, Solana, Polygon, and Bitcoin</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Globe className="h-5 w-5 mr-3 text-purple-400 mt-1" />
                      <div>
                        <h4 className="font-medium mb-1">Multilingual Community Support</h4>
                        <p className="text-sm text-muted-foreground">Engagement in Spanish, English, French, Portuguese, Italian</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Cpu className="h-5 w-5 mr-3 text-orange-400 mt-1" />
                      <div>
                        <h4 className="font-medium mb-1">Cross-Chain Integration</h4>
                        <p className="text-sm text-muted-foreground">Connect wallets and assets across blockchains</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-center mt-6">
                      <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white">
                        View Full Capabilities
                      </Button>
                    </div>
                  </div>
                </AnimatedCard>
              </div>
              
              <div className="lg:col-span-3">
                <Step1Agent fullscreen={false} className="h-[600px]" />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="technical">
            <AnimatedCard animation="fade" className="p-6">
              <h3 className="text-xl font-bold mb-4">Technical Architecture</h3>
              <div className="mb-6">
                <p className="text-muted-foreground mb-4">
                  Step1 Agent operates on a hybrid architecture that combines on-chain smart contracts with AI systems, 
                  enabling autonomous operation while maintaining human governance oversight.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Backend Infrastructure</h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                      ICP Canisters for decentralized compute
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                      Multi-chain wallet adapters
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                      Digital ID canister integration
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                      DAO Governance protocols
                    </li>
                  </ul>
                </div>
                
                <div className="border border-border rounded-lg p-4">
                  <h4 className="font-medium mb-2">AI Systems</h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                      LangGraph for reasoning chains
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                      Pinecone for vector memory
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                      Multi-modal understanding
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                      Chain-of-thought reasoning
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="flex justify-center">
                <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white">
                  Technical Documentation
                </Button>
              </div>
            </AnimatedCard>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
}
