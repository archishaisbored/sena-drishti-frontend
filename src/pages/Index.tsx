import { useState, useEffect } from 'react';
import TSRSDashboard from '@/components/dashboard/TSRSDashboard';
import PatrioticChatInterface from '@/components/chat/PatrioticChatInterface';
import VoiceActivatedLanding from '@/components/landing/VoiceActivatedLanding';
import { useWebSocketContext } from '@/components/context/WebSocketContext';

const Index = () => {
  const [isTSRSActive, setIsTSRSActive] = useState(false);
  const [showChatInterface, setShowChatInterface] = useState(false);
  const [emptyCycleCount, setEmptyCycleCount] = useState(0);

  const { webSocketData, isConnected } = useWebSocketContext();

  useEffect(() => {
    if (!webSocketData) return;

    // Mode-switching logic
    if (webSocketData.mode === 'conversation') {
      setShowChatInterface(true); // Show chat interface in conversation mode
      setEmptyCycleCount((prev) => {
        const newCount = prev + 1;
        if (newCount >= 3) {
          setShowChatInterface(false);
          setIsTSRSActive(false);
          return 0; // Reset counter
        }
        return newCount;
      });
    } else if (webSocketData.mode === 'surveillance' && webSocketData.weapons && webSocketData.weapons.length > 0) {
      setIsTSRSActive(true); // Activate TSRS if a weapon is detected
      setShowChatInterface(false);
      setEmptyCycleCount(0); // Reset counter
    }

    // Handle TSRS activation
    if (webSocketData.action === 'ACTIVATE_TSRS') {
      setIsTSRSActive(true);
    } else if (webSocketData.action === 'DEACTIVATE_TSRS') {
      setIsTSRSActive(false);
    }
  }, [webSocketData]);

  const handleActivateTSRS = () => {
    setIsTSRSActive(true);
  };

  const handleActivateChat = () => {
    setShowChatInterface(true);
  };

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
      {!isConnected && (
        <div className="p-4 bg-red-500 text-white text-center">
          WebSocket connection lost. Attempting to reconnect...
        </div>
      )}
      {renderComponent()}
    </>
  );
};

export default Index;