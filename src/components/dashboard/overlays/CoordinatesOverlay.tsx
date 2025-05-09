
import React, { useState, useEffect, useRef } from 'react';
import { X, MapPin, Navigation } from 'lucide-react';

interface OverlayProps {
  onClose: () => void;
}

const CoordinatesOverlay: React.FC<OverlayProps> = ({ onClose }) => {
  const [coordinates, setCoordinates] = useState({
    latitude: "Calculating...",
    longitude: "Calculating...",
    address: "Determining location...",
    sector: "Sector-7",
    camera: "CAM-12",
    elevation: "15.2m (Street Level)",
  });
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapUrl, setMapUrl] = useState("");

  useEffect(() => {
    // WebSocket connection for coordinates data
    const socket = new WebSocket('wss://echo.websocket.org'); // Replace with your actual WebSocket endpoint
    
    socket.onopen = () => {
      console.log('WebSocket connection established for coordinates');
    };
    
    socket.onmessage = (event) => {
      try {
        // Parse incoming data
        const locationData = JSON.parse(event.data);
        if (locationData.coordinates) {
          setCoordinates(prevState => ({
            ...prevState,
            ...locationData.coordinates
          }));
        }
      } catch (error) {
        console.error('Error parsing coordinates data:', error);
      }
    };
    
    socket.onerror = (error) => {
      console.error('WebSocket error in coordinates:', error);
    };
    
    // Simulate fetching the user's location
    const fetchLocation = async () => {
      try {
        // Check if geolocation is available
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            // Success callback
            (position) => {
              const { latitude, longitude } = position.coords;
              
              setCoordinates(prev => ({
                ...prev,
                latitude: `${latitude.toFixed(4)}° ${latitude >= 0 ? 'N' : 'S'}`,
                longitude: `${longitude.toFixed(4)}° ${longitude >= 0 ? 'E' : 'W'}`,
                address: "Your Current Location",
              }));

              // Create a map URL for the current location using OpenStreetMap
              const mapImageUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.01}%2C${latitude - 0.01}%2C${longitude + 0.01}%2C${latitude + 0.01}&layer=mapnik&marker=${latitude}%2C${longitude}`;
              setMapUrl(mapImageUrl);
              
              console.log("Location obtained:", latitude, longitude);
            },
            // Error callback
            (error) => {
              console.error("Error getting location:", error);
              // If user denies permission or any other error, use a default location (Delhi, India)
              setCoordinates(prev => ({
                ...prev,
                latitude: "28.6139° N",
                longitude: "77.2090° E",
                address: "New Delhi, India (Default)",
              }));
              
              // Create a map URL for the default location
              const defaultLat = 28.6139;
              const defaultLng = 77.2090;
              const mapImageUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${defaultLng - 0.01}%2C${defaultLat - 0.01}%2C${defaultLng + 0.01}%2C${defaultLat + 0.01}&layer=mapnik&marker=${defaultLat}%2C${defaultLng}`;
              setMapUrl(mapImageUrl);
            },
            // Options
            { 
              enableHighAccuracy: true,
              timeout: 5000,
              maximumAge: 0
            }
          );
        } else {
          // Fallback for browsers without geolocation
          setCoordinates(prev => ({
            ...prev,
            latitude: "28.6139° N",
            longitude: "77.2090° E",
            address: "New Delhi, India (Default)",
          }));
          
          // Create a map URL for the default location
          const defaultLat = 28.6139;
          const defaultLng = 77.2090;
          const mapImageUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${defaultLng - 0.01}%2C${defaultLat - 0.01}%2C${defaultLng + 0.01}%2C${defaultLat + 0.01}&layer=mapnik&marker=${defaultLat}%2C${defaultLng}`;
          setMapUrl(mapImageUrl);
        }
      } catch (error) {
        console.error("Location fetch error:", error);
        // Fallback if any unexpected error occurs
        setCoordinates(prev => ({
          ...prev,
          latitude: "28.6139° N",
          longitude: "77.2090° E",
          address: "New Delhi, India (Default)",
        }));
        
        // Create a map URL for the default location
        const defaultLat = 28.6139;
        const defaultLng = 77.2090;
        const mapImageUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${defaultLng - 0.01}%2C${defaultLat - 0.01}%2C${defaultLng + 0.01}%2C${defaultLat + 0.01}&layer=mapnik&marker=${defaultLat}%2C${defaultLng}`;
        setMapUrl(mapImageUrl);
      }
    };

    fetchLocation();
    
    return () => {
      socket.close();
    };
  }, []);

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
          <div className="p-4 border-b border-tsrs-border flex justify-between items-center">
            <h3 className="text-xl font-semibold">LOCATION MAP</h3>
            <div className="flex items-center text-sm text-tsrs-accent">
              <Navigation size={16} className="mr-1" />
              <span>LIVE TRACKING</span>
            </div>
          </div>
          <div className="flex-1 bg-tsrs-card p-0 relative overflow-hidden">
            {mapUrl ? (
              <iframe 
                src={mapUrl} 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="no" 
                title="Location Map"
                className="absolute inset-0"
              ></iframe>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-tsrs-card">
                <p className="text-tsrs-text-secondary">Loading map...</p>
              </div>
            )}
            <div className="absolute bottom-4 right-4 text-xs font-mono bg-tsrs-background/70 px-2 py-1 rounded">
              GRID REF: S7-445.872
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoordinatesOverlay;
