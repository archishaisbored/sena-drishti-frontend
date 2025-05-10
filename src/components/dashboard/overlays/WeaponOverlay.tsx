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
  image?: string; // Add image prop
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

      <div className="grid grid-cols-1 gap-6 animate-slide-in">
        <div className="lg:col-span-1">
          <div className="tsrs-card-glow space-y-4">
            <div className="p-4 border-b border-tsrs-border">
              <h3 className="text-xl font-semibold">WEAPON IDENTIFICATION</h3>
            </div>

            <div className="px-4">
              <div className="relative">
                <img
                  src={image || "/lovable-uploads/2b0d81c3-7b95-4c38-bad9-154f8a012e88.png"}
                  alt="Surveillance feed showing a person with a weapon in a crowd"
                  className="w-full object-cover"
                  onError={(e) => {
                    console.error("Failed to load image");
                    e.currentTarget.src = "https://via.placeholder.com/300x200?text=Image+Not+Found";
                  }}
                />
                {weaponData.bbox && weaponData.bbox.length >= 4 && (
                  <div
                    className="absolute border-2 border-tsrs-danger"
                    style={{
                      left: `${weaponData.bbox[0]}px`,
                      top: `${weaponData.bbox[1]}px`,
                      width: `${weaponData.bbox[2] - weaponData.bbox[0]}px`,
                      height: `${weaponData.bbox[3] - weaponData.bbox[1]}px`,
                    }}
                  >
                    <div className="absolute -top-7 right-0 bg-tsrs-danger text-white text-xs px-2 py-1">
                      WEAPON DETECTED
                    </div>
                  </div>
                )}
              </div>
            </div>

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
                <span className="font-semibold text-tsrs-danger">{weaponData.threat_level}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-tsrs-text-secondary">Confidence:</span>
                <div className="flex items-center">
                  <div className="bg-gray-700 w-32 h-2 rounded-full overflow-hidden mr-2">
                    <div
                      className="bg-tsrs-accent h-full rounded-full"
                      style={{ width: `${Math.min(weaponData.confidence * 100, 100)}%` }}
                    ></div>
                  </div>
                  <span>{`${Math.round(weaponData.confidence * 100)}%`}</span>
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