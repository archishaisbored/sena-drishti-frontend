
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
    if (value < 40) return '#3B82F6'; // Low - Blue
    if (value < 70) return '#FBBF24'; // Medium - Yellow
    return '#DC2626'; // High - Red
  };

  return (
    <div className="bg-white shadow-md rounded-lg border border-slate-200">
      <div className="p-4 border-b border-slate-200">
        <h2 className="text-xl font-semibold text-blue-600">THREAT LEVEL TREND</h2>
      </div>
      <div className="p-6 h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="time" 
              stroke="#64748B" 
              tick={{ fill: '#64748B', fontFamily: 'sans-serif' }}
            />
            <YAxis 
              stroke="#64748B" 
              tick={{ fill: '#64748B', fontFamily: 'sans-serif' }}
              domain={[0, 100]}
              label={{ 
                value: 'Threat Level', 
                angle: -90, 
                position: 'insideLeft', 
                fill: '#64748B',
                fontFamily: 'sans-serif',
                fontSize: 12
              }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#FFFFFF', 
                borderColor: '#E5E7EB',
                fontFamily: 'sans-serif'
              }}
              labelStyle={{ color: '#334155' }}
              itemStyle={{ color: '#3B82F6' }}
              formatter={(value: number) => [`${value}%`, 'Threat Level']}
            />
            <Line 
              type="monotone" 
              dataKey="level" 
              stroke="#3B82F6" 
              strokeWidth={2}
              dot={(props) => {
                const { cx, cy, payload } = props;
                return (
                  <circle 
                    cx={cx} 
                    cy={cy} 
                    r={4} 
                    fill={getPointColor(payload.level)}
                    stroke="#FFFFFF" 
                    strokeWidth={2} 
                  />
                );
              }}
              activeDot={{ r: 6, fill: '#DC2626', stroke: '#FFFFFF', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ThreatLevelChart;
