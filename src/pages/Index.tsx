
import { useState, useEffect } from 'react';
import TSRSDashboard from '@/components/dashboard/TSRSDashboard';
import PatrioticChatInterface from '@/components/chat/PatrioticChatInterface';
import VoiceActivatedLanding from '@/components/landing/VoiceActivatedLanding';

const Index = () => {
  const [isTSRSActive, setIsTSRSActive] = useState(false);
  const [showChatInterface, setShowChatInterface] = useState(false);
  
  useEffect(() => {
    // WebSocket connection for receiving trigger events
    const socket = new WebSocket('wss://echo.websocket.org'); // Replace with your actual WebSocket endpoint
    
    socket.onopen = () => {
      console.log('WebSocket connection established');
    };
    
    socket.onmessage = (event) => {
      // Check if the message is the trigger to activate TSRS
      if (event.data === 'ACTIVATE_TSRS') {
        setIsTSRSActive(true);
      }
      
      // Optional: Allow deactivation via WebSocket as well
      if (event.data === 'DEACTIVATE_TSRS') {
        setIsTSRSActive(false);
      }
    };
    
    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    
    socket.onclose = () => {
      console.log('WebSocket connection closed');
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
