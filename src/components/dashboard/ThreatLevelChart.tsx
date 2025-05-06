
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

const ThreatLevelChart: React.FC = () => {
  const data = [
    { time: '09:00', level: 20 },
    { time: '09:05', level: 35 },
    { time: '09:10', level: 30 },
    { time: '09:15', level: 45 },
    { time: '09:20', level: 50 },
    { time: '09:25', level: 70 },
    { time: '09:27', level: 85 },
  ];
  
  // Function to determine point color based on threat level
  const getPointColor = (value: number) => {
    if (value < 40) return '#00CFC9'; // Low - Cyan
    if (value < 70) return '#FFC700'; // Medium - Yellow
    return '#EA384C'; // High - Red
  };

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
              formatter={(value: number) => [`${value}%`, 'Threat Level']}
            />
            <Line 
              type="monotone" 
              dataKey="level" 
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
