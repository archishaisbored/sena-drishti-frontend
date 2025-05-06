
import React, { useState } from 'react';
import { Shield } from 'lucide-react';
import LiveFeed from './LiveFeed';
import ActionButton from './ActionButton';
import ThreatLevelChart from './ThreatLevelChart';
import CoordinatesOverlay from './overlays/CoordinatesOverlay';
import StrategyOverlay from './overlays/StrategyOverlay';
import WeaponOverlay from './overlays/WeaponOverlay';
import CrowdOverlay from './overlays/CrowdOverlay';
import { toast } from 'sonner';

const TSRSDashboard: React.FC = () => {
  const [activeOverlay, setActiveOverlay] = useState<string | null>(null);
  const [threatDetected, setThreatDetected] = useState(true);

  const closeOverlay = () => setActiveOverlay(null);
  
  const handleDeployResponse = () => {
    toast.success("Response team deployed", {
      description: "ETA: 5 minutes to target location",
      duration: 5000,
    });
  };

  return (
    <div className="min-h-screen bg-tsrs-background text-tsrs-text p-4 md:p-6">
      {/* Header */}
      <header className="flex flex-wrap items-center justify-between mb-6 border-b border-tsrs-border pb-4">
        <div className="flex items-center mb-4 md:mb-0">
          <Shield className="h-10 w-10 text-tsrs-accent mr-3" />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-wider flex items-center">
              <span className="text-white">TSRS</span>
              <span className="hidden md:inline text-tsrs-text-secondary text-lg md:text-xl ml-3 font-light tracking-widest">
                TACTICAL SURVEILLANCE & RESPONSE SYSTEM
              </span>
            </h1>
          </div>
        </div>
        <div className="font-mono text-2xl md:text-3xl font-medium text-tsrs-accent animate-pulse">
          09:27
        </div>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Video Feed */}
        <div className="lg:col-span-3">
          <LiveFeed threatDetected={threatDetected} />
        </div>

        {/* Control Panel */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ActionButton 
              label="View Coordinates" 
              onClick={() => setActiveOverlay('coordinates')} 
            />
            <ActionButton 
              label="GenAI Strategy Captions" 
              onClick={() => setActiveOverlay('strategy')} 
            />
            <ActionButton 
              label="Weapon Type" 
              onClick={() => setActiveOverlay('weapon')} 
            />
            <ActionButton 
              label="Crowd Density" 
              onClick={() => setActiveOverlay('crowd')} 
            />
          </div>
          
          {/* Deploy Response Button */}
          <button 
            onClick={handleDeployResponse}
            className="tsrs-button-danger mt-4 py-5 text-xl animate-pulse-danger"
          >
            DEPLOY RESPONSE
          </button>
        </div>
      </div>
      
      {/* Threat Level Chart */}
      <div className="mt-6">
        <ThreatLevelChart />
      </div>
      
      {/* Overlays */}
      {activeOverlay === 'coordinates' && (
        <CoordinatesOverlay onClose={closeOverlay} />
      )}
      
      {activeOverlay === 'strategy' && (
        <StrategyOverlay onClose={closeOverlay} />
      )}
      
      {activeOverlay === 'weapon' && (
        <WeaponOverlay onClose={closeOverlay} />
      )}
      
      {activeOverlay === 'crowd' && (
        <CrowdOverlay onClose={closeOverlay} />
      )}
    </div>
  );
};

export default TSRSDashboard;
