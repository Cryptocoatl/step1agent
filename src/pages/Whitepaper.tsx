
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { AnimatedCard } from '@/components/ui/AnimatedCard';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { FileText, Download, ArrowLeft, Clock, Users, Leaf, Globe, Wallet, Shield } from 'lucide-react';
import { Step1Logo } from '@/components/ui/Step1Logo';
import { useState } from 'react';

export default function WhitepaperPage() {
  const [activeSection, setActiveSection] = useState<string>('overview');

  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'vision', label: 'Vision & Mission' },
    { id: 'technology', label: 'Technology' },
    { id: 'identity', label: 'Digital Identity' },
    { id: 'dao', label: 'DAO Governance' },
    { id: 'token', label: 'Tokenomics' },
    { id: 'roadmap', label: 'Roadmap' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-background/90">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-12 relative">
        <Link to="/" className="inline-flex items-center text-amber-400 hover:text-amber-300 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
        
        <div className="flex items-center gap-4 mb-8">
          <Step1Logo size="md" />
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-amber-100">STEP1 Whitepaper</h1>
            <p className="text-muted-foreground mt-2">Version 1.0 - April 2025</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <AnimatedCard animation="fade" className="sticky top-24">
              <GlassPanel className="p-4 border border-amber-500/20">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-amber-200 mb-3 pl-3">Contents</p>
                  {sections.map(section => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        activeSection === section.id 
                          ? 'bg-amber-500/20 text-amber-100' 
                          : 'hover:bg-amber-500/10 text-muted-foreground hover:text-amber-200'
                      }`}
                    >
                      {section.label}
                    </button>
                  ))}
                </div>
                
                <div className="mt-6 border-t border-amber-500/20 pt-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full border-amber-500/30 hover:bg-amber-500/10"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </GlassPanel>
            </AnimatedCard>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            <AnimatedCard animation="fade">
              <GlassPanel className="p-6 md:p-8 border border-amber-500/20">
                {activeSection === 'overview' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6 text-amber-100">
                      <FileText className="inline-block mr-2 h-6 w-6 text-amber-400" />
                      Overview
                    </h2>
                    
                    <p className="text-lg mb-6 leading-relaxed">
                      STEP1 is a revolutionary digital identity platform built on the Internet Computer Protocol (ICP), 
                      designed to create a regenerative digital ecosystem that empowers individuals with sovereign 
                      identity control while connecting communities across blockchains for positive global impact.
                    </p>
                    
                    <p className="text-lg mb-6 leading-relaxed">
                      In the rapidly evolving Web3 landscape, digital identity has emerged as a fundamental 
                      building block for the future of online interaction. STEP1 addresses the critical challenges 
                      of fragmentation, sovereignty, and utility that have hindered widespread adoption of digital 
                      identity solutions to date.
                    </p>
                    
                    <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl mb-6">
                      <h3 className="text-lg font-medium mb-2 text-amber-100">Key Innovations</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start">
                          <Shield className="h-5 w-5 text-amber-400 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Self-sovereign digital identity secured by the Internet Computer</span>
                        </li>
                        <li className="flex items-start">
                          <Globe className="h-5 w-5 text-amber-400 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Cross-chain integration for seamless wallet and identity connectivity</span>
                        </li>
                        <li className="flex items-start">
                          <Users className="h-5 w-5 text-amber-400 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Regenerative DAO framework for community-driven development</span>
                        </li>
                        <li className="flex items-start">
                          <Leaf className="h-5 w-5 text-amber-400 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Token-based incentives for positive-sum ecosystem participation</span>
                        </li>
                      </ul>
                    </div>
                    
                    <p className="text-lg mb-6 leading-relaxed">
                      This whitepaper outlines our vision, technology stack, tokenomics, and roadmap for 
                      creating a more connected, sovereign, and regenerative digital future. STEP1 represents 
                      not just an evolution in digital identity technology, but a fundamental rethinking of how 
                      digital identities can empower communities to create positive global impact.
                    </p>
                  </div>
                )}
                
                {activeSection === 'vision' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6 text-amber-100">
                      <Leaf className="inline-block mr-2 h-6 w-6 text-amber-400" />
                      Vision & Mission
                    </h2>
                    
                    <div className="border-l-4 border-amber-500 pl-6 py-1 mb-8">
                      <p className="text-xl text-amber-100 italic">
                        "To create a regenerative digital ecosystem that empowers individuals with sovereign 
                        identity control while connecting communities across blockchains for positive global impact."
                      </p>
                    </div>
                    
                    <h3 className="text-xl font-medium mb-4 text-amber-100">Our Vision</h3>
                    <p className="text-lg mb-6 leading-relaxed">
                      STEP1 envisions a digital landscape where individuals have complete sovereignty over their 
                      digital identities, while simultaneously being able to connect and collaborate across 
                      previously siloed blockchain ecosystems. We see a future where digital identity is not just 
                      a collection of credentials, but a powerful tool for coordinating regenerative activities 
                      that benefit both local communities and global ecosystems.
                    </p>
                    
                    <h3 className="text-xl font-medium mb-4 text-amber-100">Our Mission</h3>
                    <p className="text-lg mb-6 leading-relaxed">
                      Our mission is to build the technical infrastructure and social coordination mechanisms 
                      that enable a regenerative digital economy. We are committed to creating tools that respect 
                      individual sovereignty, incentivize positive-sum interactions, and facilitate cross-chain 
                      collaboration for projects that generate positive externalities for society and the planet.
                    </p>
                    
                    <div className="bg-amber-500/10 border border-amber-500/20 p-5 rounded-xl mb-6">
                      <h3 className="text-lg font-medium mb-3 text-amber-100">Core Values</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-amber-500/5 rounded-lg">
                          <h4 className="font-medium text-amber-200 mb-1">Sovereignty</h4>
                          <p className="text-sm text-muted-foreground">Users maintain full control over their data and digital presence</p>
                        </div>
                        <div className="p-4 bg-amber-500/5 rounded-lg">
                          <h4 className="font-medium text-amber-200 mb-1">Interoperability</h4>
                          <p className="text-sm text-muted-foreground">Breaking down walls between blockchain ecosystems</p>
                        </div>
                        <div className="p-4 bg-amber-500/5 rounded-lg">
                          <h4 className="font-medium text-amber-200 mb-1">Regeneration</h4>
                          <p className="text-sm text-muted-foreground">Creating positive-sum outcomes for ecosystems and communities</p>
                        </div>
                        <div className="p-4 bg-amber-500/5 rounded-lg">
                          <h4 className="font-medium text-amber-200 mb-1">Accessibility</h4>
                          <p className="text-sm text-muted-foreground">Building technology that is usable by people of all technical abilities</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeSection === 'technology' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6 text-amber-100">
                      <Globe className="inline-block mr-2 h-6 w-6 text-amber-400" />
                      Technology
                    </h2>
                    
                    <p className="text-lg mb-6 leading-relaxed">
                      STEP1 is built on a robust technology stack, with the Internet Computer Protocol (ICP) 
                      serving as our primary blockchain infrastructure. This strategic choice provides us with 
                      the scalability, speed, and cost-effectiveness required to build a truly user-friendly 
                      digital identity platform.
                    </p>
                    
                    <h3 className="text-xl font-medium mb-4 text-amber-100">Core Technology Components</h3>
                    
                    <div className="space-y-6 mb-8">
                      <div className="border border-amber-500/20 rounded-lg p-5">
                        <h4 className="font-medium text-amber-200 mb-2">Digital Identity Manager</h4>
                        <p className="text-muted-foreground mb-3">
                          Our identity management system is built as a collection of ICP canisters that enable 
                          self-sovereign identity creation, verification, and management. The identity manager 
                          implements W3C Decentralized Identifier (DID) and Verifiable Credential (VC) standards, 
                          ensuring interoperability with the broader decentralized identity ecosystem.
                        </p>
                      </div>
                      
                      <div className="border border-amber-500/20 rounded-lg p-5">
                        <h4 className="font-medium text-amber-200 mb-2">Cross-Chain Wallet Adapter</h4>
                        <p className="text-muted-foreground mb-3">
                          The adapter enables seamless integration with wallets across multiple blockchains, 
                          including Ethereum, Solana, Polkadot, and more. This allows users to connect their 
                          existing wallets to their STEP1 identity without transferring assets or compromising 
                          security.
                        </p>
                      </div>
                      
                      <div className="border border-amber-500/20 rounded-lg p-5">
                        <h4 className="font-medium text-amber-200 mb-2">DAO Engine</h4>
                        <p className="text-muted-foreground mb-3">
                          Built on ICP, our DAO Engine provides a flexible framework for creating and managing 
                          decentralized organizations. It includes customizable governance mechanisms, proposal 
                          systems, and voting protocols, all designed with regenerative principles in mind.
                        </p>
                      </div>
                      
                      <div className="border border-amber-500/20 rounded-lg p-5">
                        <h4 className="font-medium text-amber-200 mb-2">AI Agent Orchestrator</h4>
                        <p className="text-muted-foreground mb-3">
                          A unique feature of STEP1 is our AI Agent system, which provides personalized assistance 
                          for navigating the ecosystem. These agents help users discover relevant DAOs, understand 
                          governance proposals, and find opportunities for contribution that align with their 
                          interests and values.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeSection === 'identity' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6 text-amber-100">
                      <Shield className="inline-block mr-2 h-6 w-6 text-amber-400" />
                      Digital Identity
                    </h2>
                    
                    <p className="text-lg mb-6 leading-relaxed">
                      At the core of STEP1 is our approach to digital identity—self-sovereign, interoperable, 
                      and designed to unlock value across Web3 ecosystems. Our digital identity system is built 
                      on the principle that users should have complete control over their data while being able 
                      to selectively disclose information when necessary.
                    </p>
                    
                    <h3 className="text-xl font-medium mb-4 text-amber-100">Identity Architecture</h3>
                    <p className="text-lg mb-6 leading-relaxed">
                      STEP1 identities are built on the W3C DID (Decentralized Identifier) standard, providing 
                      a globally unique identifier that is fully controlled by the identity owner. This DID 
                      serves as the foundation for a rich ecosystem of Verifiable Credentials that can be 
                      issued, held, and verified within the STEP1 system.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-amber-500/10 border border-amber-500/20 p-5 rounded-lg">
                        <h4 className="font-medium text-amber-200 mb-2">Key Management</h4>
                        <p className="text-muted-foreground">
                          STEP1 employs advanced key management techniques, including key rotation, social recovery, 
                          and hardware security module integration, to ensure that users never permanently lose 
                          access to their digital identities.
                        </p>
                      </div>
                      
                      <div className="bg-amber-500/10 border border-amber-500/20 p-5 rounded-lg">
                        <h4 className="font-medium text-amber-200 mb-2">Credential System</h4>
                        <p className="text-muted-foreground">
                          Our credential system allows for the issuance, holding, and verification of a wide range 
                          of credentials, from basic identity verification to specialized credentials for specific 
                          ecosystem activities.
                        </p>
                      </div>
                      
                      <div className="bg-amber-500/10 border border-amber-500/20 p-5 rounded-lg">
                        <h4 className="font-medium text-amber-200 mb-2">Privacy Preservation</h4>
                        <p className="text-muted-foreground">
                          STEP1 utilizes zero-knowledge proofs and selective disclosure to allow users to prove 
                          statements about their credentials without revealing the underlying data, preserving 
                          privacy while enabling verification.
                        </p>
                      </div>
                      
                      <div className="bg-amber-500/10 border border-amber-500/20 p-5 rounded-lg">
                        <h4 className="font-medium text-amber-200 mb-2">Cross-Chain Identity</h4>
                        <p className="text-muted-foreground">
                          Our identity system is designed to link identities across multiple blockchains, allowing 
                          users to maintain a consistent identity regardless of which blockchain ecosystem they are 
                          interacting with.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeSection === 'dao' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6 text-amber-100">
                      <Users className="inline-block mr-2 h-6 w-6 text-amber-400" />
                      DAO Governance
                    </h2>
                    
                    <p className="text-lg mb-6 leading-relaxed">
                      STEP1's DAO governance framework is designed to enable effective coordination of 
                      regenerative activities. Our approach emphasizes scalable decision-making, transparent 
                      operations, and alignment of incentives around positive-sum outcomes.
                    </p>
                    
                    <h3 className="text-xl font-medium mb-4 text-amber-100">Regenerative DAOs</h3>
                    <p className="text-lg mb-6 leading-relaxed">
                      The STEP1 platform enables the creation of Regenerative DAOs—decentralized organizations 
                      explicitly focused on creating positive externalities for communities and ecosystems. These 
                      DAOs can focus on a wide range of activities, from environmental conservation to education 
                      to healthcare, all coordinated through the STEP1 platform.
                    </p>
                    
                    <div className="space-y-6 mb-8">
                      <div className="border border-amber-500/20 rounded-lg p-5">
                        <h4 className="font-medium text-amber-200 mb-2">DAO Creation and Management</h4>
                        <p className="text-muted-foreground">
                          The STEP1 platform provides tools for creating, customizing, and managing DAOs, with 
                          templates specifically designed for regenerative activities. These templates include 
                          predefined governance structures, proposal frameworks, and incentive mechanisms that 
                          align with regenerative principles.
                        </p>
                      </div>
                      
                      <div className="border border-amber-500/20 rounded-lg p-5">
                        <h4 className="font-medium text-amber-200 mb-2">Governance Mechanisms</h4>
                        <p className="text-muted-foreground">
                          STEP1 DAOs can implement a variety of governance mechanisms, including token-weighted 
                          voting, quadratic voting, conviction voting, and more. The platform also supports 
                          delegation of voting power and the creation of specialized committees for specific 
                          decision domains.
                        </p>
                      </div>
                      
                      <div className="border border-amber-500/20 rounded-lg p-5">
                        <h4 className="font-medium text-amber-200 mb-2">Proposal and Funding Systems</h4>
                        <p className="text-muted-foreground">
                          The platform includes robust tools for creating, discussing, and voting on proposals, 
                          as well as for allocating funds to approved projects. These systems are designed to be 
                          transparent and accountable, with clear tracking of proposal status and fund usage.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeSection === 'token' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6 text-amber-100">
                      <Wallet className="inline-block mr-2 h-6 w-6 text-amber-400" />
                      Tokenomics
                    </h2>
                    
                    <p className="text-lg mb-6 leading-relaxed">
                      The STEP1 token is the native utility token of the platform, designed to incentivize 
                      participation in the ecosystem and to align the interests of all stakeholders around 
                      regenerative activities.
                    </p>
                    
                    <h3 className="text-xl font-medium mb-4 text-amber-100">Token Utility</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                        <h4 className="font-medium text-amber-200 mb-1">Governance</h4>
                        <p className="text-sm text-muted-foreground">Vote on platform upgrades and ecosystem funding allocations</p>
                      </div>
                      <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                        <h4 className="font-medium text-amber-200 mb-1">Staking</h4>
                        <p className="text-sm text-muted-foreground">Earn rewards for providing security and liquidity to the network</p>
                      </div>
                      <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                        <h4 className="font-medium text-amber-200 mb-1">Access</h4>
                        <p className="text-sm text-muted-foreground">Unlock premium features and services on the platform</p>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-medium mb-4 text-amber-100">Tokenomics Design</h3>
                    <p className="text-lg mb-6 leading-relaxed">
                      The STEP1 token economy is designed to be sustainable and scalable, with a focus on 
                      creating long-term value for all participants in the ecosystem. The token supply and 
                      distribution are carefully calibrated to ensure that the ecosystem can grow organically 
                      while maintaining economic stability.
                    </p>
                    
                    <div className="border border-amber-500/20 rounded-lg p-5 mb-6">
                      <h4 className="font-medium text-amber-200 mb-3">Token Distribution</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Community Treasury</span>
                          <span className="text-amber-200">40%</span>
                        </div>
                        <div className="h-2 bg-amber-950 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 rounded-full" style={{ width: '40%' }}></div>
                        </div>
                        
                        <div className="flex justify-between items-center mt-4">
                          <span className="text-muted-foreground">Ecosystem Development</span>
                          <span className="text-amber-200">25%</span>
                        </div>
                        <div className="h-2 bg-amber-950 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 rounded-full" style={{ width: '25%' }}></div>
                        </div>
                        
                        <div className="flex justify-between items-center mt-4">
                          <span className="text-muted-foreground">Core Team</span>
                          <span className="text-amber-200">15%</span>
                        </div>
                        <div className="h-2 bg-amber-950 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 rounded-full" style={{ width: '15%' }}></div>
                        </div>
                        
                        <div className="flex justify-between items-center mt-4">
                          <span className="text-muted-foreground">Investors</span>
                          <span className="text-amber-200">10%</span>
                        </div>
                        <div className="h-2 bg-amber-950 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 rounded-full" style={{ width: '10%' }}></div>
                        </div>
                        
                        <div className="flex justify-between items-center mt-4">
                          <span className="text-muted-foreground">Liquidity Provision</span>
                          <span className="text-amber-200">10%</span>
                        </div>
                        <div className="h-2 bg-amber-950 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 rounded-full" style={{ width: '10%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeSection === 'roadmap' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6 text-amber-100">
                      <Clock className="inline-block mr-2 h-6 w-6 text-amber-400" />
                      Roadmap
                    </h2>
                    
                    <p className="text-lg mb-6 leading-relaxed">
                      The STEP1 platform is being developed according to a phased roadmap, with each phase 
                      building on the previous one to create a comprehensive ecosystem for regenerative 
                      activities. Our development approach emphasizes continuous user feedback and iterative 
                      improvement.
                    </p>
                    
                    <div className="space-y-8 mb-6">
                      <div className="relative pl-8 border-l-2 border-amber-500/30">
                        <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-amber-500"></div>
                        <h3 className="text-xl font-medium mb-2 text-amber-100">Phase 1: Foundation (Q2 2025)</h3>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>• Launch of basic digital identity management system</li>
                          <li>• Integration with ICP and Ethereum networks</li>
                          <li>• Initial version of the STEP1 token</li>
                          <li>• Core platform documentation and developer resources</li>
                        </ul>
                      </div>
                      
                      <div className="relative pl-8 border-l-2 border-amber-500/30">
                        <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-amber-500/60"></div>
                        <h3 className="text-xl font-medium mb-2 text-amber-100">Phase 2: Expansion (Q4 2025)</h3>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>• Cross-chain wallet adapter for additional networks</li>
                          <li>• Beta version of the DAO Engine</li>
                          <li>• Verifiable Credentials system for identity attributes</li>
                          <li>• Initial community funding for regenerative projects</li>
                        </ul>
                      </div>
                      
                      <div className="relative pl-8 border-l-2 border-amber-500/30">
                        <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-amber-500/40"></div>
                        <h3 className="text-xl font-medium mb-2 text-amber-100">Phase 3: Ecosystem (Q2 2026)</h3>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>• Full launch of the DAO Engine with advanced governance features</li>
                          <li>• AI Agent Orchestrator for personalized ecosystem navigation</li>
                          <li>• Comprehensive cross-chain support for major blockchains</li>
                          <li>• Developer SDK for building on the STEP1 platform</li>
                        </ul>
                      </div>
                      
                      <div className="relative pl-8">
                        <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-amber-500/20"></div>
                        <h3 className="text-xl font-medium mb-2 text-amber-100">Phase 4: Scaling (Q4 2026)</h3>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>• Scalable governance solutions for large-scale DAOs</li>
                          <li>• Advanced interoperability with traditional systems</li>
                          <li>• Mobile applications and expanded user interfaces</li>
                          <li>• Integration with physical world identity systems</li>
                        </ul>
                      </div>
                    </div>
                    
                    <p className="text-lg mb-6 leading-relaxed">
                      This roadmap is subject to adjustment based on technological developments, market conditions, 
                      and community feedback. The STEP1 team is committed to transparent communication about progress 
                      and any changes to the development timeline.
                    </p>
                  </div>
                )}
              </GlassPanel>
            </AnimatedCard>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
