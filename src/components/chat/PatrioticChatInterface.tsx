import React, { useState, useRef, useEffect } from 'react';
import { Flag, Send, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { useWebSocketContext } from '../context/WebSocketContext';

interface ChatMessage {
  sender: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface PatrioticChatInterfaceProps {
  onActivateTSRS?: () => void;
}

const PatrioticChatInterface: React.FC<PatrioticChatInterfaceProps> = ({ onActivateTSRS }) => {
  const { webSocketData } = useWebSocketContext();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'ai',
      content: 'Namaste! How can I assist you today?',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const sampleQuestions = [
    "What is the role of the Indian Army?",
    "How many commands does the Indian Army have?",
    "Who is the current Chief of Army Staff?",
    "Tell me something inspirational.",
  ];

  // Handle WebSocket verbal reports
  useEffect(() => {
    if (webSocketData?.mode === 'conversation' && webSocketData.verbal_report) {
      const aiMessage: ChatMessage = {
        sender: 'ai',
        content: webSocketData.verbal_report,
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    }
  }, [webSocketData]);

  useEffect(() => {
    scrollToBottom();
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      sender: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputMessage('');

    // Simulate AI response after a short delay (for testing)
    setTimeout(() => {
      let responseContent = '';

      const lowerCaseMessage = inputMessage.toLowerCase();

      if (lowerCaseMessage.includes('role') && lowerCaseMessage.includes('army')) {
        responseContent =
          "The Indian Army's primary role is to protect the nation from external aggression and threats, maintain peace within its borders, and provide aid during natural calamities. It also contributes to UN peacekeeping missions worldwide.";
      } else if (lowerCaseMessage.includes('commands') && lowerCaseMessage.includes('army')) {
        responseContent =
          "The Indian Army has seven operational commands: Northern, Eastern, Southern, Western, Central, South Western, and Army Training Command (ARTRAC).";
      } else if (lowerCaseMessage.includes('chief') || lowerCaseMessage.includes('coas')) {
        responseContent = "General Manoj Pande is the current Chief of Army Staff of the Indian Army.";
      } else if (lowerCaseMessage.includes('inspirational')) {
        responseContent =
          '"Courage is not the absence of fear, but the triumph over it. The brave man is not he who does not feel afraid, but he who conquers that fear." - Sardar Vallabhbhai Patel';
      } else if (lowerCaseMessage.includes('activate') || lowerCaseMessage.includes('tsrs') || lowerCaseMessage.includes('surveillance')) {
        responseContent = "Initiating TSRS activation sequence...";
        setTimeout(() => {
          if (onActivateTSRS) {
            onActivateTSRS();
          }
        }, 1500);
      } else {
        responseContent =
          "I'm here to assist with information about the Indian Armed Forces and national security. How else may I help you today?";
      }

      const aiMessage: ChatMessage = {
        sender: 'ai',
        content: responseContent,
        timestamp: new Date(),
      };

      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    }, 800);
  };

  const handleSampleQuestion = (question: string) => {
    setInputMessage(question);
    inputRef.current?.focus();
  };

  const flagAnimation = (
    <div className="relative h-16 w-12 mr-3">
      <div className="absolute inset-0 flex items-center justify-center animate-wave">
        <Flag className="h-10 w-10 text-[#FF9933]" />
      </div>
    </div>
  );

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold tracking-wider text-white">
            <span className="text-[#FF9933]">J</span>
            <span className="text-white">a</span>
            <span className="text-white">i </span>
            <span className="text-white">H</span>
            <span className="text-white">i</span>
            <span className="text-[#138808]">n</span>
            <span className="text-white">d</span>
            <span className="text-[#00CFC9]">!</span>
          </h1>
        </div>
        <div className="flex items-center">{flagAnimation}</div>
      </header>

      {/* Main Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-800 border border-gray-700'
              }`}
            >
              <div className="flex flex-col">
                <div className="mb-1">{message.content}</div>
                <div
                  className={`text-xs ${
                    message.sender === 'user' ? 'text-blue-200' : 'text-gray-400'
                  } text-right`}
                >
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Sample Questions */}
      <div className="px-6 py-3 bg-gray-800 border-t border-gray-700">
        <p className="text-sm text-gray-400 mb-2">Suggested questions:</p>
        <div className="flex flex-wrap gap-2">
          {sampleQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleSampleQuestion(question)}
              className="bg-gray-700 hover:bg-gray-600 text-sm text-white px-3 py-1.5 rounded-full flex items-center transition-colors"
            >
              {question}
              <ChevronRight className="ml-1 h-4 w-4" />
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-gray-800 border-t border-gray-700 px-4 py-4">
        <form onSubmit={handleSubmit} className="flex items-center">
          <input
            type="text"
            ref={inputRef}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-gray-700 border border-gray-600 rounded-l-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-r-lg flex items-center justify-center transition-colors"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default PatrioticChatInterface;