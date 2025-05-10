import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { useWebSocketContext } from '../context/WebSocketContext';

interface ThreatData {
  time: string;
  level: string;
  numericLevel: number; // For chart display
}

const ThreatLevelChart: React.FC = () => {
  const { webSocketData } = useWebSocketContext();

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
    switch (level.toLowerCase()) {
      case 'low':
        return '#00CFC9'; // Cyan
      case 'medium':
        return '#FFC700'; // Yellow
      default:
        return '#EA384C'; // High - Red
    }
  };

  // Update chart data with WebSocket data
  useEffect(() => {
    if (webSocketData?.timestamp && webSocketData.threat_level) {
      const { timestamp, threat_level } = webSocketData;
      // Extract time from timestamp (e.g., "2025-05-09 13:19:02" -> "13:19")
      const time = timestamp.split(' ')[1].substring(0, 5);

      // Convert threat level to numeric value
      let numericLevel = 0;
      switch (threat_level.toLowerCase()) {
        case 'low':
          numericLevel = 20;
          break;
        case 'medium':
          numericLevel = 50;
          break;
        case 'high':
          numericLevel = 80;
          break;
        default:
          numericLevel = 40; // For 'Unknown' or other values
          break;
      }

      setData((prevData) => {
        const newData = [...prevData, { time, level: threat_level, numericLevel }];
        // Keep only the most recent 10 points
        if (newData.length > 10) {
          return newData.slice(newData.length - 10);
        }
        return newData;
      });
    }
  }, [webSocketData]);

  return (
    <div className="tsrs-card">
      <div className="p-4 border-b border-tsrs-border">
        <h2 className="text-2xl font-semibold tracking-wider text-tsrs-accent">THREAT LEVEL TREND</h2>
      </div>
      <div className="p-6 h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
            <XAxis dataKey="time" stroke="#94A3B8" tick={{ fill: '#94A3B8', fontFamily: 'JetBrains Mono' }} />
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
                fontSize: 12,
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#131A24',
                borderColor: '#1E293B',
                fontFamily: 'JetBrains Mono',
              }}
              labelStyle={{ color: '#E2E8F0' }}
              itemStyle={{ color: '#00CFC9' }}
              formatter={(value: number, name: string, props: any) => {
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