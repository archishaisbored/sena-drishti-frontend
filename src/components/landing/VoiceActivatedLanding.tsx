
import React, { useState, useEffect, useRef } from 'react';
import { Flag, Mic, MicOff, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface VoiceActivatedLandingProps {
  onActivateTSRS?: () => void;
}

const VoiceActivatedLanding: React.FC<VoiceActivatedLandingProps> = ({ onActivateTSRS }) => {
  const [isListening, setIsListening] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  const [message, setMessage] = useState('');
  const micRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const sampleQuestions = [
    "What is the role of the Indian Army?",
    "Who is the current Chief of Army Staff?",
    "Tell me something inspirational.",
    "How many commands are there in the Indian Army?"
  ];

  // Simulate voice recognition
  const toggleVoiceRecognition = () => {
    if (!isListening) {
      setIsListening(true);
      toast.info("Listening for 'Jai Hind'...", { duration: 3000 });
      // Simulate voice detection after 3 seconds
      setTimeout(() => {
        setIsActivated(true);
        setIsListening(false);
        toast.success("Voice command recognized!", { duration: 2000 });
        // Redirect to chat interface
        if (onActivateTSRS) {
          setTimeout(() => {
            window.location.href = '/chat';
          }, 1000);
        }
      }, 3000);
    } else {
      setIsListening(false);
      toast.info("Voice recognition stopped", { duration: 2000 });
    }
  };

  const handleSwitchToTSRS = () => {
    if (onActivateTSRS) {
      onActivateTSRS();
    }
  };

  // Pulsing animation effect
  useEffect(() => {
    if (isListening && micRef.current) {
      micRef.current.classList.add('animate-pulse');
    } else if (micRef.current) {
      micRef.current.classList.remove('animate-pulse');
    }
  }, [isListening]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col items-center justify-between p-8">
      {/* Top Section */}
      <div className="w-full flex justify-between items-center">
        <div className="relative">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Say <span className="text-blue-400">Jai Hind</span> to Activate
          </h1>
          <div className="h-1 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 rounded-full mt-1 animate-pulse"></div>
        </div>
        <div className="relative">
          <div className="w-16 h-12 animate-wave">
            <Flag className="h-12 w-12 text-[#FF9933]" strokeWidth={1.5} />
          </div>
        </div>
      </div>

      {/* Middle Section */}
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="relative mb-8">
          <div 
            ref={micRef}
            onClick={toggleVoiceRecognition}
            className="w-24 h-24 rounded-full bg-gray-800 border-2 border-blue-400 flex items-center justify-center cursor-pointer transition-all hover:bg-gray-700 hover:border-blue-300"
          >
            {isListening ? 
              <Mic className="h-12 w-12 text-blue-400" /> :
              <MicOff className="h-12 w-12 text-gray-400" />
            }
          </div>
        </div>
        
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 max-w-md relative mb-8">
          <MessageCircle className="absolute -top-3 -left-3 h-6 w-6 text-blue-400" />
          <p className="text-xl text-center text-gray-300">
            {isActivated ? "How can I assist you today?" : "Awaiting voice input..."}
          </p>
        </div>
      </div>

      {/* Sample Questions */}
      <div className="w-full max-w-2xl">
        <h2 className="text-lg text-gray-400 mb-4">Try asking:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {sampleQuestions.map((question, index) => (
            <button
              key={index}
              className="bg-gray-800 border border-gray-700 hover:border-blue-500 hover:bg-gray-700 rounded-full py-3 px-5 text-left transition-all duration-300"
            >
              {question}
            </button>
          ))}
        </div>
        
        {/* TSRS Switch Button (Temporary) */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm mb-2">
            For development/testing:
          </p>
          <button 
            onClick={handleSwitchToTSRS}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors duration-300"
          >
            Activate TSRS Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoiceActivatedLanding;
