import React from 'react';
import { X, CircleArrowRight } from 'lucide-react';

interface Weapon {
  type: string;
  confidence: number;
  bbox?: number[];
  model: string;
  range: string;
  caliber: string;
  threat_level: string;
  countermeasures?: string[];
  engagement_distance: string;
}

interface OverlayProps {
  onClose: () => void;
  weapons?: Weapon[];
  image?: string; // Base64 image string
}

const WeaponOverlay: React.FC<OverlayProps> = ({ onClose, weapons, image }) => {
  console.log('WeaponOverlay weapons:', weapons);
  console.log('WeaponOverlay image:', image);

  const weaponData: Weapon = weapons && weapons.length > 0 ? weapons[0] : {
    type: "Semi-Automatic Handgun",
    model: "Suspected Glock 19",
    caliber: "9mm",
    threat_level: "High",
    confidence: 0.87,
    range: "50m effective",
    engagement_distance: "15+1 rounds",
    countermeasures: [
      "Tactical team with ballistic shields",
      "Maintain 15m+ safe distance",
      "Non-lethal options viable only from cover",
      "Consider civilian evacuation priority high",
    ],
  };

  return (
    <div className="overlay flex flex-col h-full p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl md:text-3xl font-bold text-tsrs-accent flex items-center">
          <CircleArrowRight className="mr-2" />
          WEAPON TYPE ANALYSIS
        </h2>
        <button
          onClick={onClose}
          className="text-tsrs-text-secondary hover:text-tsrs-accent p-2 rounded-full transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 flex-grow">


        {/* Details Section */}
        <div className="md:w-1/2">
          <div className="tsrs-card-glow h-full">
            <div className="p-4 border-b border-tsrs-border">
              <h3 className="text-lg font-semibold"></h3>
            </div>
            <div className="p-4 space-y-3">
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
                <span className="font-semibold text-tsrs-danger">{weaponData.threat_level}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-tsrs-text-secondary">Confidence:</span>
                <div className="flex items-center">
                  <div className="bg-gray-700 w-24 h-2 rounded-full overflow-hidden mr-2">
                    <div
                      className="bg-tsrs-accent h-full rounded-full"
                      style={{ width: `${Math.min(weaponData.confidence * 100, 100)}%` }}
                    ></div>
                  </div>
                  <span>{`${Math.round(weaponData.confidence * 100)}%`}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-tsrs-text-secondary">Range:</span>
                <span className="font-semibold">{weaponData.range}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-tsrs-text-secondary">Engagement Distance:</span>
                <span className="font-semibold">{weaponData.engagement_distance}</span>
              </div>
              {weaponData.countermeasures && (
                <div className="mt-4">
                  <span className="text-tsrs-text-secondary">Countermeasures:</span>
                  <ul className="list-disc list-inside text-sm">
                    {weaponData.countermeasures.map((measure, index) => (
                      <li key={index}>{measure}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeaponOverlay;