
import React from 'react';

interface LiveFeedProps {
  threatDetected: boolean;
}

const LiveFeed: React.FC<LiveFeedProps> = ({ threatDetected }) => {
  return (
    <div className="bg-white shadow-md rounded-lg h-full min-h-[350px] border border-slate-200">
      <div className="p-4 border-b border-slate-200">
        <h2 className="text-xl font-semibold text-blue-600">LIVE VIDEO FEED</h2>
      </div>
      <div className={`relative flex justify-center items-center p-4 h-[400px]`}>
        <div className={`relative w-full h-full overflow-hidden ${threatDetected ? 'border-2 border-red-600' : ''}`}>
          <img
            src="https://source.unsplash.com/random/?gunfight,action,scene"
            alt="Surveillance feed showing a gun fight scene"
            className="object-cover w-full h-full"
          />
          
          {/* Overlay UI Elements */}
          {threatDetected && (
            <div className="absolute top-4 right-4 bg-red-600 px-3 py-2 rounded-md text-white font-semibold flex items-center">
              <div className="w-3 h-3 rounded-full bg-white animate-pulse mr-2"></div>
              THREAT DETECTED
            </div>
          )}
          
          <div className="absolute bottom-4 left-4 text-xs font-mono text-white bg-black/50 px-2 py-1 rounded">
            <div>FEED: SECTOR-7 CAM-12</div>
            <div>TIMESTAMP: 09:27:34</div>
          </div>
          
          <div className="absolute bottom-4 right-4 text-xs font-mono text-white bg-black/50 px-2 py-1 rounded">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
              LIVE
            </div>
            <div>RES: 1920×1080</div>
          </div>
          
          {/* Target tracking frame */}
          {threatDetected && (
            <div className="absolute left-1/4 top-1/5 w-32 h-64 border-2 border-red-600">
              <div className="absolute -top-6 left-0 bg-red-600 text-white text-xs px-2 py-1">
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
