
import React from 'react';
import { X, CircleArrowRight } from 'lucide-react';

interface OverlayProps {
  onClose: () => void;
}

const WeaponOverlay: React.FC<OverlayProps> = ({ onClose }) => {
  const weaponData = {
    type: "Semi-Automatic Handgun",
    model: "Suspected Glock 19",
    caliber: "9mm",
    threatLevel: "High",
    detectionConfidence: "87%",
    lastSeen: "09:27:34",
    possibleVariants: ["Glock 17", "Glock 26", "SIG P320"]
  };
  
  const matchingCharacteristics = [
    "Frame size and profile",
    "Barrel length estimation",
    "Grip configuration",
    "Trigger guard shape",
    "Magazine well design"
  ];
  
  const responseRecommendations = [
    "Tactical team with ballistic shields",
    "Maintain 15m+ safe distance",
    "Non-lethal options viable only from cover",
    "Consider civilian evacuation priority high"
  ];

  return (
    <div className="overlay">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-tsrs-accent flex items-center">
          <CircleArrowRight className="mr-2" /> 
          WEAPON TYPE ANALYSIS
        </h2>
        <button 
          onClick={onClose}
          className="text-tsrs-text-secondary hover:text-tsrs-accent p-2 rounded-full transition-colors"
        >
          <X size={32} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-slide-in">
        {/* Left column: Image and primary analysis */}
        <div className="lg:col-span-1">
          <div className="tsrs-card-glow space-y-4">
            <div className="p-4 border-b border-tsrs-border">
              <h3 className="text-xl font-semibold">WEAPON IDENTIFICATION</h3>
            </div>
            
            {/* Enhanced image section */}
            <div className="px-4">
              <div className="relative">
                <img
                  src="/lovable-uploads/2b0d81c3-7b95-4c38-bad9-154f8a012e88.png"
                  alt="Surveillance feed showing a person with a weapon in a crowd"
                  className="w-full object-cover"
                />
                
                {/* Weapon highlight box */}
                <div className="absolute bottom-10 right-10 w-20 h-20 border-2 border-tsrs-danger animate-pulse-danger">
                  <div className="absolute -top-7 right-0 bg-tsrs-danger text-white text-xs px-2 py-1">
                    WEAPON DETECTED
                  </div>
                </div>
              </div>
            </div>
            
            {/* Basic weapon stats */}
            <div className="p-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-tsrs-text-secondary">Type:</span>
                <span className="font-semibold">{weaponData.type}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-tsrs-text-secondary">Model:</span>
                <span className="font-semibold">{weaponData.model}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-tsrs-text-secondary">Caliber:</span>
                <span className="font-semibold">{weaponData.caliber}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-tsrs-text-secondary">Threat Level:</span>
                <span className="font-semibold text-tsrs-danger">{weaponData.threatLevel}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-tsrs-text-secondary">Confidence:</span>
                <div className="flex items-center">
                  <div className="bg-gray-700 w-32 h-2 rounded-full overflow-hidden mr-2">
                    <div 
                      className="bg-tsrs-accent h-full rounded-full" 
                      style={{ width: weaponData.detectionConfidence }}
                    ></div>
                  </div>
                  <span>{weaponData.detectionConfidence}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Middle column: Technical analysis */}
        <div className="lg:col-span-1">
          <div className="tsrs-card-glow h-full">
            <div className="p-4 border-b border-tsrs-border">
              <h3 className="text-xl font-semibold">TECHNICAL ANALYSIS</h3>
            </div>
            
            <div className="p-4">
              <div className="mb-6">
                <h4 className="text-lg mb-2 text-tsrs-accent">Matching Characteristics</h4>
                <ul className="space-y-2">
                  {matchingCharacteristics.map((characteristic, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-1 h-1 bg-tsrs-accent rounded-full mr-2"></div>
                      {characteristic}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-6">
                <h4 className="text-lg mb-2 text-tsrs-accent">Possible Variants</h4>
                <div className="space-y-2">
                  {weaponData.possibleVariants.map((variant, index) => (
                    <div 
                      key={index} 
                      className="tsrs-card p-2 flex justify-between items-center"
                    >
                      <span>{variant}</span>
                      <span className={`text-xs px-2 py-1 rounded-full 
                        ${index === 0 ? 'bg-tsrs-accent/20 text-tsrs-accent' : 'bg-gray-700 text-gray-300'}`}
                      >
                        {index === 0 ? 'Primary match' : `Alt. ${index}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-lg mb-2 text-tsrs-accent">Capabilities</h4>
                <div className="grid grid-cols-2 gap-4 font-mono text-sm">
                  <div className="tsrs-card p-3">
                    <div className="text-tsrs-text-secondary mb-1">Range</div>
                    <div>50m effective</div>
                  </div>
                  <div className="tsrs-card p-3">
                    <div className="text-tsrs-text-secondary mb-1">Capacity</div>
                    <div>15+1 rounds</div>
                  </div>
                  <div className="tsrs-card p-3">
                    <div className="text-tsrs-text-secondary mb-1">Fire Rate</div>
                    <div>Semi-automatic</div>
                  </div>
                  <div className="tsrs-card p-3">
                    <div className="text-tsrs-text-secondary mb-1">Stopping Power</div>
                    <div className="text-tsrs-warning">Medium</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right column: Response recommendations */}
        <div className="lg:col-span-1">
          <div className="tsrs-card-glow h-full">
            <div className="p-4 border-b border-tsrs-border">
              <h3 className="text-xl font-semibold">TACTICAL RESPONSE</h3>
            </div>
            
            <div className="p-4 space-y-6">
              <div>
                <h4 className="text-lg mb-3 text-tsrs-accent">Response Recommendations</h4>
                <ul className="space-y-3">
                  {responseRecommendations.map((recommendation, index) => (
                    <li 
                      key={index} 
                      className="tsrs-card p-3 border-l-4 border-l-tsrs-accent"
                    >
                      {recommendation}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="tsrs-card border-tsrs-danger border p-4 bg-tsrs-danger/10">
                <h4 className="text-lg mb-2 text-tsrs-danger">Critical Awareness</h4>
                <p className="text-sm">
                  Weapon assessment indicates subject has capacity for rapid fire in crowded environment.
                  Ensure all response personnel are aware of backdrop conditions and civilian presence.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <button className="tsrs-button">
                  REQUEST BALLISTICS
                </button>
                <button className="tsrs-button">
                  TACTICAL REFERENCE
                </button>
              </div>
              
              <div className="p-3 tsrs-card bg-gray-800/50">
                <div className="text-sm text-tsrs-text-secondary mb-1">Last Database Update</div>
                <div className="flex justify-between items-center">
                  <span>Weapon signatures database</span>
                  <span className="text-tsrs-accent text-sm">2 hours ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeaponOverlay;
