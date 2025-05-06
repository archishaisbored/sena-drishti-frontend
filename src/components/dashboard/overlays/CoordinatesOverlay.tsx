
import React from 'react';
import { X, MapPin } from 'lucide-react';

interface OverlayProps {
  onClose: () => void;
}

const CoordinatesOverlay: React.FC<OverlayProps> = ({ onClose }) => {
  const coordinates = {
    latitude: "37.7749° N",
    longitude: "122.4194° W",
    address: "Financial District, Downtown Metro Area",
    sector: "Sector-7",
    camera: "CAM-12",
    elevation: "15.2m (Street Level)",
    landmarks: [
      { name: "City Hall Plaza", distance: "120m SE" },
      { name: "Metro Station", distance: "85m NW" },
      { name: "Commercial Center", distance: "230m E" }
    ]
  };

  return (
    <div className="overlay">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-tsrs-accent flex items-center">
          <MapPin className="mr-2" /> 
          VIEW COORDINATES
        </h2>
        <button 
          onClick={onClose}
          className="text-tsrs-text-secondary hover:text-tsrs-accent p-2 rounded-full transition-colors"
        >
          <X size={32} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-slide-in">
        {/* Map View */}
        <div className="tsrs-card-glow h-[500px] flex flex-col">
          <div className="p-4 border-b border-tsrs-border">
            <h3 className="text-xl font-semibold">LOCATION MAP</h3>
          </div>
          <div className="flex-1 bg-tsrs-card p-4 relative">
            {/* This would be a real map in a production app */}
            <div className="absolute inset-0 bg-[#1A2432] overflow-hidden">
              <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 gap-[1px] opacity-30">
                {Array(12).fill(0).map((_, rowIndex) => 
                  Array(12).fill(0).map((_, colIndex) => (
                    <div 
                      key={`${rowIndex}-${colIndex}`}
                      className="border border-tsrs-accent/20"
                    />
                  ))
                )}
              </div>
              
              {/* Map Marker */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="h-6 w-6 rounded-full bg-tsrs-danger animate-pulse-danger"></div>
                  <div className="absolute -top-1 -left-1 h-8 w-8 rounded-full border-2 border-tsrs-danger animate-data-ping opacity-60"></div>
                </div>
              </div>
              
              <div className="absolute bottom-4 right-4 text-xs font-mono text-tsrs-text-secondary">
                GRID REF: S7-445.872
              </div>
            </div>
          </div>
        </div>

        {/* Coordinates Data */}
        <div className="tsrs-card-glow flex flex-col">
          <div className="p-4 border-b border-tsrs-border">
            <h3 className="text-xl font-semibold">LOCATION DETAILS</h3>
          </div>
          <div className="flex-1 p-6 space-y-6 font-mono">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="tsrs-card p-4">
                <div className="text-sm text-tsrs-text-secondary mb-1">LATITUDE</div>
                <div className="text-xl text-tsrs-accent">{coordinates.latitude}</div>
              </div>
              <div className="tsrs-card p-4">
                <div className="text-sm text-tsrs-text-secondary mb-1">LONGITUDE</div>
                <div className="text-xl text-tsrs-accent">{coordinates.longitude}</div>
              </div>
            </div>
            
            <div className="tsrs-card p-4">
              <div className="text-sm text-tsrs-text-secondary mb-1">ADDRESS</div>
              <div className="text-xl">{coordinates.address}</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="tsrs-card p-4">
                <div className="text-sm text-tsrs-text-secondary mb-1">SECTOR</div>
                <div>{coordinates.sector}</div>
              </div>
              <div className="tsrs-card p-4">
                <div className="text-sm text-tsrs-text-secondary mb-1">CAMERA</div>
                <div>{coordinates.camera}</div>
              </div>
              <div className="tsrs-card p-4">
                <div className="text-sm text-tsrs-text-secondary mb-1">ELEVATION</div>
                <div>{coordinates.elevation}</div>
              </div>
            </div>
            
            <div>
              <div className="text-sm text-tsrs-text-secondary mb-2">NEARBY LANDMARKS</div>
              <div className="space-y-2">
                {coordinates.landmarks.map((landmark, index) => (
                  <div key={index} className="tsrs-card p-3 flex justify-between">
                    <span>{landmark.name}</span>
                    <span className="text-tsrs-accent">{landmark.distance}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoordinatesOverlay;
