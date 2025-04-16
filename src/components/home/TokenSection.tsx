
import { Link } from 'react-router-dom';
import { AnimatedCard } from '@/components/ui/AnimatedCard';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { Button } from '@/components/ui/button';
import { Step1Token } from '@/components/ui/Step1Token';

export const TokenSection = () => {
  return (
    <AnimatedCard animation="scale" className="mb-20">
      <GlassPanel className="p-8 border border-amber-500/20">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="lg:w-1/3 flex justify-center">
            <Step1Token size="lg" spinning={true} />
          </div>
          <div className="lg:w-2/3">
            <h2 className="text-3xl font-bold mb-4 text-amber-100">STEP1 Token Economy</h2>
            <p className="text-lg text-muted-foreground mb-6">
              The STEP1 token powers our ecosystem, enabling governance voting, rewards for regenerative actions, and access to premium features.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
                <h4 className="font-medium text-amber-200 mb-1">Governance</h4>
                <p className="text-sm text-muted-foreground">Vote on proposals and shape the future of Step1</p>
              </div>
              <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
                <h4 className="font-medium text-amber-200 mb-1">Rewards</h4>
                <p className="text-sm text-muted-foreground">Earn tokens for completing missions and contributing</p>
              </div>
              <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
                <h4 className="font-medium text-amber-200 mb-1">Utility</h4>
                <p className="text-sm text-muted-foreground">Access premium features and services in the ecosystem</p>
              </div>
            </div>
            <Button asChild className="bg-amber-500 hover:bg-amber-600 text-black">
              <Link to="/learn/tokenomics">Learn About Tokenomics</Link>
            </Button>
          </div>
        </div>
      </GlassPanel>
    </AnimatedCard>
  );
};
