
import { useState, useEffect } from 'react';
import TSRSDashboard from '@/components/dashboard/TSRSDashboard';
import PatrioticChatInterface from '@/components/chat/PatrioticChatInterface';
import VoiceActivatedLanding from '@/components/landing/VoiceActivatedLanding';

const Index = () => {
  const [isTSRSActive, setIsTSRSActive] = useState(false);
  const [showChatInterface, setShowChatInterface] = useState(false);
  
  useEffect(() => {
    // WebSocket connection for receiving trigger events and all data
    const socket = new WebSocket('wss://echo.websocket.org'); // Replace with your actual WebSocket endpoint
    
    socket.onopen = () => {
      console.log('Main WebSocket connection established');
    };
    
    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        
        // Handle UI state transitions
        if (data.action === 'ACTIVATE_TSRS') {
          setIsTSRSActive(true);
        } else if (data.action === 'DEACTIVATE_TSRS') {
          setIsTSRSActive(false);
        } else if (data.action === 'ACTIVATE_CHAT') {
          setShowChatInterface(true);
        }
        
        // You can handle more data types here
        console.log('Received data:', data);
      } catch (error) {
        console.error('Error parsing WebSocket data:', error);
        
        // Handle string-based commands (for backward compatibility)
        if (event.data === 'ACTIVATE_TSRS') {
          setIsTSRSActive(true);
        } else if (event.data === 'DEACTIVATE_TSRS') {
          setIsTSRSActive(false);
        }
      }
    };
    
    socket.onerror = (error) => {
      console.error('Main WebSocket error:', error);
    };
    
    socket.onclose = () => {
      console.log('Main WebSocket connection closed');
      
      // Attempt to reconnect after a delay
      setTimeout(() => {
        console.log('Attempting to reconnect WebSocket...');
        // In a production app, you would implement proper reconnection logic here
      }, 3000);
    };
    
    // Clean up connection
    return () => {
      socket.close();
    };
  }, []);
  
  // For easy testing toggle (remove in production)
  const handleActivateTSRS = () => {
    setIsTSRSActive(true);
  };
  
  const handleActivateChat = () => {
    setShowChatInterface(true);
  };
  
  // Determine which component to render
  const renderComponent = () => {
    if (isTSRSActive) {
      return <TSRSDashboard />;
    }
    
    if (showChatInterface) {
      return <PatrioticChatInterface onActivateTSRS={handleActivateTSRS} />;
    }
    
    return <VoiceActivatedLanding onActivateTSRS={handleActivateTSRS} />;
  };
  
  return (
    <>
      {renderComponent()}
    </>
  );
};

export default Index;
