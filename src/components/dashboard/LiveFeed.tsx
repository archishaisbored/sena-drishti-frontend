
import React from 'react';

interface LiveFeedProps {
  threatDetected: boolean;
}

const LiveFeed: React.FC<LiveFeedProps> = ({ threatDetected }) => {
  return (
    <div className="tsrs-card h-full min-h-[350px]">
      <div className="p-4 border-b border-tsrs-border">
        <h2 className="text-2xl font-semibold tracking-wider text-tsrs-accent">LIVE VIDEO FEED</h2>
      </div>
      <div className={`relative flex justify-center items-center p-4 h-[400px] ${threatDetected ? 'animate-pulse-danger' : ''}`}>
        <div className={`relative w-full h-full overflow-hidden ${threatDetected ? 'border-4 border-tsrs-danger' : ''}`}>
          <img
            src="/lovable-uploads/2b0d81c3-7b95-4c38-bad9-154f8a012e88.png"
            alt="Surveillance feed showing a person with a weapon in a crowd"
            className="object-cover w-full h-full"
          />
          
          {/* Overlay UI Elements */}
          {threatDetected && (
            <div className="absolute top-4 right-4 bg-tsrs-danger/90 px-3 py-2 rounded-md text-white font-semibold flex items-center">
              <div className="w-3 h-3 rounded-full bg-white animate-pulse mr-2"></div>
              THREAT DETECTED
            </div>
          )}
          
          <div className="absolute bottom-4 left-4 text-xs font-mono text-white/70">
            <div>FEED: SECTOR-7 CAM-12</div>
            <div>TIMESTAMP: 09:27:34</div>
          </div>
          
          <div className="absolute bottom-4 right-4 text-xs font-mono text-white/70">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
              LIVE
            </div>
            <div>RES: 1920×1080</div>
          </div>
          
          {/* Target tracking frame */}
          {threatDetected && (
            <div className="absolute left-1/4 top-1/5 w-32 h-64 border-2 border-tsrs-danger">
              <div className="absolute -top-6 left-0 bg-tsrs-danger/80 text-white text-xs px-2 py-1">
                SUBJECT TRACKED
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveFeed;
