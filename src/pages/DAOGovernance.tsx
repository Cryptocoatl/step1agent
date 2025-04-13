import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Users, BarChart2, Vote, Clock, ChevronRight, History, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { StepOneAgent } from "@/components/agent/StepOneAgent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

type Proposal = {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'passed' | 'rejected' | 'pending';
  votes: {
    yes: number;
    no: number;
    abstain: number;
  };
  endTime: string;
  dao: string;
};

const DAOGovernance = () => {
  const [showAgent, setShowAgent] = useState(false);
  const [activeDAO, setActiveDAO] = useState('cacao');
  
  const daos = [
    { id: 'cacao', name: 'CACAO DAO', members: 325, proposals: 12 },
    { id: 'refi-tulum', name: 'ReFi Tulum', members: 187, proposals: 8 },
    { id: 'refi-rides', name: 'ReFi Rides', members: 93, proposals: 5 },
  ];
  
  const proposals: Proposal[] = [
    {
      id: 'prop-1',
      title: 'Fund regenerative cacao farm in Quintana Roo',
      description: 'Allocate 5000 ICP to support the development of regenerative cacao farming practices in the Quintana Roo region.',
      status: 'active',
      votes: { yes: 142, no: 28, abstain: 15 },
      endTime: '2025-04-15T23:59:59Z',
      dao: 'cacao'
    },
    {
      id: 'prop-2',
      title: 'Community event planning for Q2',
      description: 'Approve budget and plan for community events in Q2 focused on education and outreach.',
      status: 'pending',
      votes: { yes: 0, no: 0, abstain: 0 },
      endTime: '2025-04-20T23:59:59Z',
      dao: 'cacao'
    },
    {
      id: 'prop-3',
      title: 'Integrate with ReFi Austin initiatives',
      description: 'Create a bridge between ReFi Tulum and ReFi Austin to share resources and knowledge.',
      status: 'passed',
      votes: { yes: 156, no: 12, abstain: 9 },
      endTime: '2025-03-30T23:59:59Z',
      dao: 'refi-tulum'
    },
    {
      id: 'prop-4',
      title: 'EV charging stations expansion',
      description: 'Expand EV charging network to 5 new locations in partnership with local businesses.',
      status: 'active',
      votes: { yes: 45, no: 12, abstain: 8 },
      endTime: '2025-04-10T23:59:59Z',
      dao: 'refi-rides'
    }
  ];
  
  const filteredProposals = proposals.filter(p => p.dao === activeDAO);
  
  const calculateVotePercentage = (proposal: Proposal) => {
    const total = proposal.votes.yes + proposal.votes.no + proposal.votes.abstain;
    if (total === 0) return { yes: 0, no: 0, abstain: 0 };
    
    return {
      yes: Math.round((proposal.votes.yes / total) * 100),
      no: Math.round((proposal.votes.no / total) * 100),
      abstain: Math.round((proposal.votes.abstain / total) * 100)
    };
  };
  
  const handleVote = (proposalId: string, vote: 'yes' | 'no' | 'abstain') => {
    toast({
      title: "Vote submitted",
      description: `Your ${vote} vote has been recorded.`,
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1">
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          <div className="mb-8">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center mb-6">
              <ArrowLeft size={16} className="mr-2" />
              Back to Home
            </Link>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold">DAO Governance</h1>
                <p className="text-muted-foreground mt-1">Participate in decision-making across the Step1 ecosystem</p>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={() => setShowAgent(true)}
                  variant="outline"
                  className="button-animated"
                >
                  Get Help
                </Button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
            <div className="lg:col-span-1">
              <GlassPanel className="p-6">
                <h3 className="font-medium mb-4 flex items-center">
                  <Users size={18} className="mr-2 text-accent" />
                  Available DAOs
                </h3>
                
                <div className="space-y-2">
                  {daos.map((dao) => (
                    <button
                      key={dao.id}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${activeDAO === dao.id ? 'bg-accent/10 border border-accent/30' : 'hover:bg-secondary/50 bg-secondary/30'}`}
                      onClick={() => setActiveDAO(dao.id)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{dao.name}</p>
                          <p className="text-xs text-muted-foreground">{dao.members} members</p>
                        </div>
                        <ChevronRight size={16} className={activeDAO === dao.id ? "text-accent" : "text-muted-foreground"} />
                      </div>
                    </button>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Voting Power</span>
                    <span>15 ICP</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delegations</span>
                    <span>None</span>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full mt-4 button-animated"
                >
                  <History size={16} className="mr-2" />
                  Voting History
                </Button>
              </GlassPanel>
            </div>
            
            <div className="lg:col-span-3">
              <div className="mb-6">
                <GlassPanel className="p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                    <h2 className="text-xl font-semibold">
                      {daos.find(d => d.id === activeDAO)?.name || 'DAO'} Dashboard
                    </h2>
                    
                    <div className="flex gap-2 mt-2 sm:mt-0">
                      <Button variant="outline" size="sm" className="h-8">
                        <BarChart2 size={16} className="mr-2" />
                        Analytics
                      </Button>
                      <Button size="sm" className="h-8 bg-accent hover:bg-accent/90">
                        <Vote size={16} className="mr-2" />
                        New Proposal
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-secondary/30 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">Active Proposals</p>
                      <h3 className="text-2xl font-bold">
                        {filteredProposals.filter(p => p.status === 'active').length}
                      </h3>
                    </div>
                    
                    <div className="bg-secondary/30 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">Your Participation</p>
                      <h3 className="text-2xl font-bold">87%</h3>
                    </div>
                    
                    <div className="bg-secondary/30 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">Community Health</p>
                      <h3 className="text-2xl font-bold text-green-500">Good</h3>
                    </div>
                  </div>
                </GlassPanel>
              </div>
              
              <AnimatedCard animation="fade" className="mb-6">
                <Tabs defaultValue="active">
                  <div className="p-6 pb-0">
                    <TabsList>
                      <TabsTrigger value="active">Active Proposals</TabsTrigger>
                      <TabsTrigger value="pending">Pending</TabsTrigger>
                      <TabsTrigger value="past">Past Proposals</TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <TabsContent value="active" className="p-6 pt-4">
                    <div className="space-y-6">
                      {filteredProposals.filter(p => p.status === 'active').map((proposal) => {
                        const percentages = calculateVotePercentage(proposal);
                        return (
                          <div key={proposal.id} className="bg-secondary/30 p-4 rounded-lg">
                            <div className="flex justify-between items-start mb-3">
                              <h3 className="font-medium">{proposal.title}</h3>
                              <div className="bg-blue-500/20 text-blue-500 px-2 py-1 rounded-full text-xs">
                                Active
                              </div>
                            </div>
                            
                            <p className="text-sm text-muted-foreground mb-4">{proposal.description}</p>
                            
                            <div className="mb-4">
                              <div className="flex justify-between text-xs mb-1">
                                <span>Yes: {percentages.yes}%</span>
                                <span>No: {percentages.no}%</span>
                                <span>Abstain: {percentages.abstain}%</span>
                              </div>
                              <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                                <div className="flex h-full">
                                  <div 
                                    className="bg-green-500 h-full" 
                                    style={{ width: `${percentages.yes}%` }}
                                  ></div>
                                  <div 
                                    className="bg-red-500 h-full" 
                                    style={{ width: `${percentages.no}%` }}
                                  ></div>
                                  <div 
                                    className="bg-gray-400 h-full" 
                                    style={{ width: `${percentages.abstain}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex justify-between items-center">
                              <div className="flex items-center text-xs text-muted-foreground">
                                <Clock size={14} className="mr-1" />
                                Ends {new Date(proposal.endTime).toLocaleDateString()}
                              </div>
                              
                              <div className="flex gap-2">
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  className="h-8 bg-green-500/10 text-green-500 hover:bg-green-500/20 hover:text-green-600"
                                  onClick={() => handleVote(proposal.id, 'yes')}
                                >
                                  Yes
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  className="h-8 bg-red-500/10 text-red-500 hover:bg-red-500/20 hover:text-red-600"
                                  onClick={() => handleVote(proposal.id, 'no')}
                                >
                                  No
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  className="h-8"
                                  onClick={() => handleVote(proposal.id, 'abstain')}
                                >
                                  Abstain
                                </Button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      
                      {filteredProposals.filter(p => p.status === 'active').length === 0 && (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">No active proposals at this time</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="pending" className="p-6 pt-4">
                    <div className="space-y-6">
                      {filteredProposals.filter(p => p.status === 'pending').map((proposal) => (
                        <div key={proposal.id} className="bg-secondary/30 p-4 rounded-lg">
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="font-medium">{proposal.title}</h3>
                            <div className="bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded-full text-xs">
                              Pending
                            </div>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-4">{proposal.description}</p>
                          
                          <div className="flex items-center text-xs text-muted-foreground">
                            <AlertTriangle size={14} className="mr-1 text-yellow-500" />
                            Voting not yet started • Opens on {new Date(proposal.endTime).toLocaleDateString()}
                          </div>
                        </div>
                      ))}
                      
                      {filteredProposals.filter(p => p.status === 'pending').length === 0 && (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">No pending proposals</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="past" className="p-6 pt-4">
                    <div className="space-y-6">
                      {filteredProposals.filter(p => p.status === 'passed' || p.status === 'rejected').map((proposal) => (
                        <div key={proposal.id} className="bg-secondary/30 p-4 rounded-lg">
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="font-medium">{proposal.title}</h3>
                            <div className={`px-2 py-1 rounded-full text-xs ${proposal.status === 'passed' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                              {proposal.status === 'passed' ? 'Passed' : 'Rejected'}
                            </div>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-4">{proposal.description}</p>
                          
                          <div className="mb-4">
                            <div className="flex justify-between text-xs mb-1">
                              <span>Yes: {proposal.votes.yes}</span>
                              <span>No: {proposal.votes.no}</span>
                              <span>Abstain: {proposal.votes.abstain}</span>
                            </div>
                            <Progress value={calculateVotePercentage(proposal).yes} className="h-2" />
                          </div>
                          
                          <div className="flex items-center text-xs text-muted-foreground">
                            <CheckCircle size={14} className="mr-1 text-green-500" />
                            Proposal {proposal.status} on {new Date(proposal.endTime).toLocaleDateString()}
                          </div>
                        </div>
                      ))}
                      
                      {filteredProposals.filter(p => p.status === 'passed' || p.status === 'rejected').length === 0 && (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">No past proposals</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </AnimatedCard>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
      
      {showAgent && <StepOneAgent />}
    </div>
  );
};

export default DAOGovernance;
