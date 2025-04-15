
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { AnimatedCard } from '@/components/ui/AnimatedCard'
import { Step1Token } from '@/components/ui/Step1Token'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { Leaf, Wallet, Users, Globe, ChevronRight } from 'lucide-react'

export default function DAOPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/90 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/10 via-background to-background z-0 opacity-70" />
      <div className="star-field absolute inset-0 z-0 opacity-25" />
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="flex items-center gap-4 mb-8">
          <Step1Token size="md" spinning={true} />
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
              STEP1 DAO & Tokenomics
            </h1>
            <p className="text-muted-foreground mt-1">
              Governance, Tokenomics and Ecosystem Information
            </p>
          </div>
        </div>

        <Tabs defaultValue="tokenomics" className="mb-8">
          <TabsList className="bg-background/50 border border-amber-500/20 mb-6">
            <TabsTrigger value="tokenomics">Tokenomics</TabsTrigger>
            <TabsTrigger value="governance">Governance</TabsTrigger>
            <TabsTrigger value="whitepaper">White Paper</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tokenomics">
            <AnimatedCard animation="scale" className="mb-8">
              <GlassPanel variant="gold" intensity="medium" glow={true} className="p-8 border border-amber-500/30">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                  <div className="lg:w-1/3 flex justify-center">
                    <Step1Token size="lg" spinning={true} />
                  </div>
                  <div className="lg:w-2/3">
                    <h2 className="text-3xl font-bold mb-4 text-amber-100">STEP1 Token Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-amber-950/30 p-4 rounded-lg border border-amber-500/30">
                        <h4 className="font-medium text-amber-200 mb-1">Token Name</h4>
                        <p className="text-amber-100">STEP1</p>
                      </div>
                      <div className="bg-amber-950/30 p-4 rounded-lg border border-amber-500/30">
                        <h4 className="font-medium text-amber-200 mb-1">Network</h4>
                        <p className="text-amber-100">Internet Computer Protocol (ICP)</p>
                      </div>
                      <div className="bg-amber-950/30 p-4 rounded-lg border border-amber-500/30">
                        <h4 className="font-medium text-amber-200 mb-1">Total Supply</h4>
                        <p className="text-amber-100">111,111,111 STEP1 (Fixed)</p>
                      </div>
                      <div className="bg-amber-950/30 p-4 rounded-lg border border-amber-500/30">
                        <h4 className="font-medium text-amber-200 mb-1">Purpose</h4>
                        <p className="text-amber-100">DAO governance, token validation, staking</p>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassPanel>
            </AnimatedCard>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <AnimatedCard animation="fade" delay={100}>
                <GlassPanel variant="gold" intensity="medium" glow={false} className="h-full border border-amber-500/30">
                  <CardHeader>
                    <CardTitle className="text-amber-100">Token Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-amber-950/20 p-3 rounded-lg border border-amber-500/20 flex justify-between items-center">
                        <span className="text-amber-100">DAO Treasury</span>
                        <div className="text-right">
                          <span className="text-amber-200 font-medium">30%</span>
                          <span className="text-amber-200/70 block text-sm">33,333,333</span>
                        </div>
                      </div>
                      
                      <div className="bg-amber-950/20 p-3 rounded-lg border border-amber-500/20 flex justify-between items-center">
                        <span className="text-amber-100">Airdrops & Community</span>
                        <div className="text-right">
                          <span className="text-amber-200 font-medium">20%</span>
                          <span className="text-amber-200/70 block text-sm">22,222,222</span>
                        </div>
                      </div>
                      
                      <div className="bg-amber-950/20 p-3 rounded-lg border border-amber-500/20 flex justify-between items-center">
                        <span className="text-amber-100">Missions & Rewards</span>
                        <div className="text-right">
                          <span className="text-amber-200 font-medium">15%</span>
                          <span className="text-amber-200/70 block text-sm">16,666,666</span>
                        </div>
                      </div>
                      
                      <div className="bg-amber-950/20 p-3 rounded-lg border border-amber-500/20 flex justify-between items-center">
                        <span className="text-amber-100">Initial Liquidity</span>
                        <div className="text-right">
                          <span className="text-amber-200 font-medium">10%</span>
                          <span className="text-amber-200/70 block text-sm">11,111,111</span>
                        </div>
                      </div>
                      
                      <div className="bg-amber-950/20 p-3 rounded-lg border border-amber-500/20 flex justify-between items-center">
                        <span className="text-amber-100">Founders & Advisors</span>
                        <div className="text-right">
                          <span className="text-amber-200 font-medium">10%</span>
                          <span className="text-amber-200/70 block text-sm">11,111,111</span>
                        </div>
                      </div>
                      
                      <div className="bg-amber-950/20 p-3 rounded-lg border border-amber-500/20 flex justify-between items-center">
                        <span className="text-amber-100">Strategic Partners</span>
                        <div className="text-right">
                          <span className="text-amber-200 font-medium">5%</span>
                          <span className="text-amber-200/70 block text-sm">5,555,555</span>
                        </div>
                      </div>
                      
                      <div className="bg-amber-950/20 p-3 rounded-lg border border-amber-500/20 flex justify-between items-center">
                        <span className="text-amber-100">Ecosystem Reserve</span>
                        <div className="text-right">
                          <span className="text-amber-200 font-medium">10%</span>
                          <span className="text-amber-200/70 block text-sm">11,111,111</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </GlassPanel>
              </AnimatedCard>

              <AnimatedCard animation="fade" delay={200}>
                <GlassPanel variant="gold" intensity="medium" glow={false} className="h-full border border-amber-500/30">
                  <CardHeader>
                    <CardTitle className="text-amber-100">Governance Mechanism</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="bg-amber-950/20 p-4 rounded-lg border border-amber-500/20">
                        <h4 className="font-medium text-amber-200 mb-2">Voting Rights</h4>
                        <p className="text-amber-100">1 STEP1 = 1 vote</p>
                      </div>
                      
                      <div className="bg-amber-950/20 p-4 rounded-lg border border-amber-500/20">
                        <h4 className="font-medium text-amber-200 mb-2">Voting System</h4>
                        <p className="text-amber-100">Quadratic voting system that rewards active participation and prevents whale dominance</p>
                      </div>
                      
                      <div className="bg-amber-950/20 p-4 rounded-lg border border-amber-500/20">
                        <h4 className="font-medium text-amber-200 mb-2">Proposal Structure</h4>
                        <p className="text-amber-100">Local and global proposal systems allowing for both targeted community initiatives and ecosystem-wide governance</p>
                      </div>
                      
                      <div className="mt-6">
                        <Button asChild variant="outline" className="border-amber-500/30 hover:bg-amber-500/10 text-amber-100">
                          <Link to="/dao-governance">
                            View Governance Dashboard <ChevronRight className="h-4 w-4 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </GlassPanel>
              </AnimatedCard>
            </div>
          </TabsContent>
          
          <TabsContent value="governance">
            <AnimatedCard animation="fade">
              <GlassPanel variant="gold" intensity="medium" glow={false} className="p-6 border border-amber-500/30">
                <h2 className="text-2xl font-bold mb-4 text-amber-100">Active Proposals</h2>
                
                <div className="bg-amber-950/30 p-6 rounded-lg border border-amber-500/20 text-center mb-4">
                  <p className="text-amber-100 mb-4">
                    Connect your wallet to view and participate in active governance proposals
                  </p>
                  <Button className="bg-amber-500 hover:bg-amber-600 text-black">
                    Connect Wallet
                  </Button>
                </div>
                
                <div className="mt-6">
                  <Button asChild variant="outline" className="border-amber-500/30 hover:bg-amber-500/10 text-amber-100">
                    <Link to="/dao-governance">
                      Go to Full Governance Dashboard <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </GlassPanel>
            </AnimatedCard>
          </TabsContent>
          
          <TabsContent value="whitepaper">
            <AnimatedCard animation="fade">
              <GlassPanel variant="gold" intensity="medium" glow={false} className="p-6 border border-amber-500/30">
                <h2 className="text-3xl font-bold mb-6 text-amber-100">STEP1 White Paper</h2>
                <div className="prose prose-amber prose-invert max-w-none">
                  <div className="mb-8">
                    <h3 className="text-2xl font-semibold text-amber-200 mb-3">Vision</h3>
                    <p className="text-amber-100 mb-4">
                      STEP1 is a decentralized infrastructure that merges digital identity, DAO governance, and regenerative 
                      economies into a unified system built on the Internet Computer Protocol (ICP). Its mission is to empower 
                      glocal communities with accessible, intelligent, and interoperable Web3 tools.
                    </p>
                    <p className="text-amber-100">
                      STEP1 serves as the multichain heart of an ecosystem of community tokens, personalized AI agents, 
                      decentralized DAOs, and user-centered Web2.5/Web5 experiences.
                    </p>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-2xl font-semibold text-amber-200 mb-3">Core Components</h3>
                    
                    <h4 className="text-xl font-medium text-amber-300 mb-2">1. Digital Identity (dID)</h4>
                    <ul className="list-disc pl-5 mb-4 text-amber-100 space-y-1">
                      <li>Soulbound NFT issued on ICP</li>
                      <li>Links to wallets from multiple chains (EVM, Solana, Bitcoin, Holochain, ICP)</li>
                      <li>Tracks contributions, completed missions, and validated tokens</li>
                      <li>Integrated with reputation protocol and verifiable credentials</li>
                    </ul>
                    
                    <h4 className="text-xl font-medium text-amber-300 mb-2">2. DAO Infrastructure</h4>
                    <ul className="list-disc pl-5 mb-4 text-amber-100 space-y-1">
                      <li>Back-end: ICP Canisters coded in Motoko/Rust</li>
                      <li>Front-end: React + Tailwind + shadcn/ui</li>
                      <li>Hypha DAO SDK enables on-chain proposals, voting, and resource distribution</li>
                      <li>Multi-layer governance (local/global)</li>
                    </ul>
                    
                    <h4 className="text-xl font-medium text-amber-300 mb-2">3. Multichain Wallet Connector</h4>
                    <ul className="list-disc pl-5 mb-4 text-amber-100 space-y-1">
                      <li>One-click login</li>
                      <li>Session persistence without custody</li>
                      <li>Interoperability with validated contracts across chains</li>
                      <li>ENS-like standard for unified identifiers</li>
                    </ul>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-2xl font-semibold text-amber-200 mb-3">Activation Roadmap</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-amber-500/20 text-amber-100">
                        <thead>
                          <tr>
                            <th className="px-4 py-2 text-left text-amber-300">Phase</th>
                            <th className="px-4 py-2 text-left text-amber-300">Objective</th>
                            <th className="px-4 py-2 text-left text-amber-300">Date</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-amber-500/20">
                          <tr>
                            <td className="px-4 py-3">Phase 1</td>
                            <td className="px-4 py-3">Digital ID + Multichain Wallets</td>
                            <td className="px-4 py-3">May 2025</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3">Phase 2</td>
                            <td className="px-4 py-3">Activation of ReFi Tulum + CACAO DAO</td>
                            <td className="px-4 py-3">June 2025</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3">Phase 3</td>
                            <td className="px-4 py-3">STEP1 DEX + Multichain LP Launch</td>
                            <td className="px-4 py-3">July 2025</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3">Phase 4</td>
                            <td className="px-4 py-3">Hypha DAO Integration + AI Agents</td>
                            <td className="px-4 py-3">August 2025</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3">Phase 5</td>
                            <td className="px-4 py-3">Web5 Launch + Gaia Education Activation</td>
                            <td className="px-4 py-3">Q4 2025</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-semibold text-amber-200 mb-3">Conclusion</h3>
                    <p className="text-amber-100 italic">
                      "From local action to a glocal network with regenerative awareness. It all starts with one step. 
                      It all starts with STEP1."
                    </p>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Button asChild className="bg-amber-500 hover:bg-amber-600 text-black">
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      Download Full White Paper
                    </a>
                  </Button>
                </div>
              </GlassPanel>
            </AnimatedCard>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
