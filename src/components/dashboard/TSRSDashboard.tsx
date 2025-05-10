import React, { useState, useEffect } from 'react';
import { Shield, Clock } from 'lucide-react';
import LiveFeed from './LiveFeed';
import ActionButton from './ActionButton';
import ThreatLevelChart from './ThreatLevelChart';
import CoordinatesOverlay from './overlays/CoordinatesOverlay';
import StrategyOverlay from './overlays/StrategyOverlay';
import WeaponOverlay from './overlays/WeaponOverlay';
import { toast } from 'sonner';
import { useWebSocketContext } from '../context/WebSocketContext';

const TSRSDashboard: React.FC = () => {
  const { webSocketData } = useWebSocketContext();
  const [activeOverlay, setActiveOverlay] = useState<string | null>(null);
  const [threatDetected, setThreatDetected] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update threat detection based on WebSocket data
    setThreatDetected(!!(webSocketData?.weapons && webSocketData.weapons.length > 0));
  }, [webSocketData]);

  const closeOverlay = () => setActiveOverlay(null);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time to Indian Standard Time
  const formatIndianTime = () => {
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'Asia/Kolkata',
    };
    return new Intl.DateTimeFormat('en-IN', options).format(currentTime);
  };

  const handleDeployResponse = () => {
    toast.success('Response team deployed', {
      description: 'ETA: 5 minutes to target location',
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
            <h1 className="text-3xl md:text-4xl font-bold flex items-center">
              <span className="text-white">TSRS</span>
              <span className="hidden md:inline text-tsrs-text-secondary text-lg md:text-xl ml-3 font-light">
                TACTICAL SURVEILLANCE & RESPONSE SYSTEM
              </span>
            </h1>
          </div>
        </div>
        <div className="font-mono text-2xl md:text-3xl font-medium text-tsrs-accent flex items-center">
          <Clock className="h-6 w-6 mr-2" />
          {formatIndianTime()}
        </div>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Video Feed */}
        <div className="lg:col-span-3">
          <LiveFeed threatDetected={threatDetected} image={webSocketData?.image} />
        </div>

        {/* Control Panel */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ActionButton label="View Coordinates" onClick={() => setActiveOverlay('coordinates')} />
            <ActionButton label="Strategy Captions" onClick={() => setActiveOverlay('strategy')} />
            <ActionButton label="Weapon Analysis" onClick={() => setActiveOverlay('weapon')} />
            <ActionButton label="Return to Chat" onClick={() => window.location.reload()} />
          </div>

          {/* Deploy Response Button */}
          <button onClick={handleDeployResponse} className="tsrs-button-danger mt-4 py-5 text-xl">
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
        <CoordinatesOverlay onClose={closeOverlay} location={webSocketData?.location} />
      )}

      {activeOverlay === 'strategy' && (
        <StrategyOverlay onClose={closeOverlay} commands={webSocketData?.commands} />
      )}

      {activeOverlay === 'weapon' && (
        <WeaponOverlay onClose={closeOverlay} weapons={webSocketData?.weapons} />
      )}
    </div>
  );
};

export default TSRSDashboard;