
import { useState, useEffect } from 'react';
import TSRSDashboard from '@/components/dashboard/TSRSDashboard';
import PatrioticChatInterface from '@/components/chat/PatrioticChatInterface';

const Index = () => {
  const [isTSRSActive, setIsTSRSActive] = useState(false);
  
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
    
    // For testing purposes - remove in production
    const triggerTimeout = setTimeout(() => {
      // Simulate WebSocket trigger for development/testing
      console.log('Simulating WebSocket trigger in 10 seconds (for testing purposes)');
    }, 10000);
    
    // Clean up connection
    return () => {
      socket.close();
      clearTimeout(triggerTimeout);
    };
  }, []);
  
  // For easy testing toggle (remove in production)
  const handleToggle = () => {
    setIsTSRSActive(!isTSRSActive);
  };
  
  return (
    <>
      {isTSRSActive ? <TSRSDashboard /> : <PatrioticChatInterface onActivateTSRS={handleToggle} />}
    </>
  );
};

export default Index;
