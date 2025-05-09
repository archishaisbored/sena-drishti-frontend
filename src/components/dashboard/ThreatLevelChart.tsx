import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

interface ThreatData {
  time: string;
  level: string;
  numericLevel: number; // For chart display
}

const ThreatLevelChart: React.FC = () => {
  // Initial data
  const initialData: ThreatData[] = [
    { time: '09:00', level: 'Low', numericLevel: 20 },
    { time: '09:05', level: 'Low', numericLevel: 35 },
    { time: '09:10', level: 'Low', numericLevel: 30 },
    { time: '09:15', level: 'Medium', numericLevel: 45 },
    { time: '09:20', level: 'Medium', numericLevel: 50 },
    { time: '09:25', level: 'Medium', numericLevel: 70 },
    { time: '09:27', level: 'High', numericLevel: 85 },
  ];
  
  const [data, setData] = useState<ThreatData[]>(initialData);
  
  // Function to determine point color based on threat level string
  const getPointColor = (level: string) => {
    switch(level.toLowerCase()) {
      case 'low': return '#00CFC9'; // Cyan
      case 'medium': return '#FFC700'; // Yellow
      default: return '#EA384C'; // High - Red
    }
  };
  
  // WebSocket connection for real-time threat data
  useEffect(() => {
    const socket = new WebSocket('wss://echo.websocket.org'); // Replace with your actual WebSocket endpoint
    
    socket.onopen = () => {
      console.log('WebSocket connection established for threat data');
    };
    
    socket.onmessage = (event) => {
      try {
        // Parse incoming data - assuming format: { time: '09:30', level: 'High' }
        const incomingData = JSON.parse(event.data);
        
        if (incomingData.time && incomingData.level) {
          // Convert string level to numeric level for chart display
          let numericLevel = 0;
          switch(incomingData.level.toLowerCase()) {
            case 'low': 
              numericLevel = Math.floor(Math.random() * 30) + 10; // 10-40 range
              break;
            case 'medium': 
              numericLevel = Math.floor(Math.random() * 30) + 40; // 40-70 range
              break;
            case 'high': 
              numericLevel = Math.floor(Math.random() * 30) + 70; // 70-100 range
              break;
          }
          
          // Add new data point
          setData(prevData => {
            const newData = [...prevData, {
              time: incomingData.time,
              level: incomingData.level,
              numericLevel: numericLevel
            }];
            
            // Keep only the most recent 10 points for better visualization
            if (newData.length > 10) {
              return newData.slice(newData.length - 10);
            }
            return newData;
          });
        }
      } catch (error) {
        console.error('Error parsing threat data:', error);
      }
    };
    
    socket.onerror = (error) => {
      console.error('WebSocket error in threat chart:', error);
    };
    
    // Clean up connection
    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="tsrs-card">
      <div className="p-4 border-b border-tsrs-border">
        <h2 className="text-2xl font-semibold tracking-wider text-tsrs-accent">THREAT LEVEL TREND</h2>
      </div>
      <div className="p-6 h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
            <XAxis 
              dataKey="time" 
              stroke="#94A3B8" 
              tick={{ fill: '#94A3B8', fontFamily: 'JetBrains Mono' }}
            />
            <YAxis 
              stroke="#94A3B8" 
              tick={{ fill: '#94A3B8', fontFamily: 'JetBrains Mono' }}
              domain={[0, 100]}
              label={{ 
                value: 'Threat Level', 
                angle: -90, 
                position: 'insideLeft', 
                fill: '#94A3B8',
                fontFamily: 'JetBrains Mono',
                fontSize: 12
              }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#131A24', 
                borderColor: '#1E293B',
                fontFamily: 'JetBrains Mono'
              }}
              labelStyle={{ color: '#E2E8F0' }}
              itemStyle={{ color: '#00CFC9' }}
              formatter={(value: number, name: string, props: any) => {
                // Show the string threat level in tooltip
                return [props.payload.level, 'Threat Level'];
              }}
            />
            <Line 
              type="monotone" 
              dataKey="numericLevel" 
              stroke="#00CFC9" 
              strokeWidth={2}
              dot={(props) => {
                const { cx, cy, payload } = props;
                return (
                  <circle 
                    cx={cx} 
                    cy={cy} 
                    r={5} 
                    fill={getPointColor(payload.level)}
                    stroke="#0B0E14" 
                    strokeWidth={2} 
                  />
                );
              }}
              activeDot={{ r: 8, fill: '#EA384C', stroke: '#0B0E14', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ThreatLevelChart;
