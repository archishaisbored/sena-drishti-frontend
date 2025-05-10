import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import useWebSocket from '@/hooks/useWebSocket';

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
  image?: string;
}

interface WebSocketContextType {
  webSocketData: WebSocketData | null;
  isConnected: boolean;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
  const { data, isConnected } = useWebSocket('wss://sena-drishti-python.onrender.com/ws/frontend');
  const [webSocketData, setWebSocketData] = useState<WebSocketData | null>(null);

  useEffect(() => {
    console.log('WebSocket data received in context:', data); // Debug log
    setWebSocketData(data);
  }, [data]);

  return (
    <WebSocketContext.Provider value={{ webSocketData, isConnected }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocketContext = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocketContext must be used within a WebSocketProvider');
  }
  return context;
};