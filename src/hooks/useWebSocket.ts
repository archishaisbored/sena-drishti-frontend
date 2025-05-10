import { useState, useEffect, useRef } from 'react';

interface WebSocketData {
  mode?: string;
  action?: string;
  commands?: { commands: string[]; threat_level: string };
  weapons?: Array<{
    type: string;
    confidence: number;
    bbox: number[];
    model: string;
    range: string;
    caliber: string;
    threat_level: string;
    countermeasures: string[];
    engagement_distance: string;
  }>;
  location?: { latitude: number; longitude: number };
  timestamp?: string;
  threat_level?: string;
  verbal_report?: string;
  image?: string; // For binary image data
}

const useWebSocket = (url: string) => {
  const [data, setData] = useState<WebSocketData | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Initialize WebSocket connection
    socketRef.current = new WebSocket(url);

    socketRef.current.onopen = () => {
      console.log('WebSocket connection established');
      setIsConnected(true);
    };

    socketRef.current.onmessage = (event) => {
      // Handle incoming messages
      if (typeof event.data === 'string') {
        // JSON data
        try {
          const parsedData: WebSocketData = JSON.parse(event.data);
          setData(parsedData);
        } catch (error) {
          console.error('Error parsing WebSocket JSON data:', error);
        }
      } else {
        // Binary data (image)
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Image = reader.result as string;
          setData((prev) => ({ ...prev, image: base64Image }));
        };
        reader.readAsDataURL(event.data); // Convert binary to base64
      }
    };

    socketRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
      setIsConnected(false);
    };

    socketRef.current.onclose = () => {
      console.log('WebSocket connection closed');
      setIsConnected(false);
    };

    // Cleanup on unmount
    return () => {
      socketRef.current?.close();
    };
  }, [url]);

  return { data, isConnected };
};

export default useWebSocket;