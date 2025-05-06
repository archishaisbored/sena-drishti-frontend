
import React from 'react';
import { X, ChartBar, ChartLine } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface OverlayProps {
  onClose: () => void;
}

const CrowdOverlay: React.FC<OverlayProps> = ({ onClose }) => {
  const densityData = [
    { sector: "NW", density: 65 },
    { sector: "NE", density: 42 },
    { sector: "C", density: 85 },
    { sector: "SE", density: 53 },
    { sector: "SW", density: 78 },
  ];
  
  const demographicData = [
    { name: 'Adults', value: 68 },
    { name: 'Children', value: 12 },
    { name: 'Elderly', value: 20 }
  ];
  
  const movementData = [
    { time: "09:00", influx: 20, outflow: 15 },
    { time: "09:05", influx: 35, outflow: 18 },
    { time: "09:10", influx: 30, outflow: 25 },
    { time: "09:15", influx: 25, outflow: 30 },
    { time: "09:20", influx: 40, outflow: 22 },
    { time: "09:25", influx: 50, outflow: 15 },
  ];
  
  const COLORS = ['#00CFC9', '#FFC700', '#EA384C'];
  
  // Function to determine color based on density level
  const getDensityColor = (value: number) => {
    if (value < 40) return '#00CFC9'; // Low - Cyan
    if (value < 70) return '#FFC700'; // Medium - Yellow
    return '#EA384C'; // High - Red
  };

  return (
    <div className="overlay">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-tsrs-accent flex items-center">
          <ChartBar className="mr-2" /> 
          CROWD DENSITY ANALYSIS
        </h2>
        <button 
          onClick={onClose}
          className="text-tsrs-text-secondary hover:text-tsrs-accent p-2 rounded-full transition-colors"
        >
          <X size={32} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-slide-in">
        {/* Left column: Map visualization */}
        <div className="lg:col-span-1">
          <div className="tsrs-card-glow">
            <div className="p-4 border-b border-tsrs-border">
              <h3 className="text-xl font-semibold">CROWD DISTRIBUTION</h3>
            </div>
            <div className="p-4 flex flex-col">
              {/* Heat Map Visualization */}
              <div className="relative h-[300px] bg-tsrs-card mb-4">
                <div className="absolute inset-0 grid grid-cols-5 grid-rows-5 p-1">
                  {/* This would ideally be a real heatmap in production */}
                  {Array(25).fill(0).map((_, index) => {
                    const row = Math.floor(index / 5);
                    const col = index % 5;
                    const isCenter = row === 2 && col === 2;
                    const isAdjacent = 
                      (row === 1 && col === 2) || 
                      (row === 2 && col === 1) || 
                      (row === 3 && col === 2) || 
                      (row === 2 && col === 3);
                    
                    const density = isCenter ? 90 : isAdjacent ? 75 : Math.floor(Math.random() * 60);
                    
                    return (
                      <div 
                        key={index}
                        className="flex items-center justify-center border border-tsrs-border/20 text-xs font-mono m-[1px]"
                        style={{
                          backgroundColor: `${getDensityColor(density)}${Math.round((density/100) * 50).toString(16)}`
                        }}
                      >
                        {isCenter && (
                          <div className="w-3 h-3 bg-tsrs-danger rounded-full animate-pulse"></div>
                        )}
                      </div>
                    );
                  })}
                </div>
                
                <div className="absolute top-2 right-2 bg-tsrs-background/80 backdrop-blur-sm p-2 rounded text-xs font-mono">
                  <div className="flex items-center mb-1">
                    <div className="w-3 h-3 mr-1" style={{backgroundColor: '#00CFC980'}}></div>
                    <span>Low Density</span>
                  </div>
                  <div className="flex items-center mb-1">
                    <div className="w-3 h-3 mr-1" style={{backgroundColor: '#FFC70080'}}></div>
                    <span>Medium Density</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 mr-1" style={{backgroundColor: '#EA384C80'}}></div>
                    <span>High Density</span>
                  </div>
                </div>
                
                <div className="absolute bottom-2 right-2 text-xs font-mono text-tsrs-text-secondary">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-tsrs-danger rounded-full mr-1"></div>
                    Subject Location
                  </div>
                </div>
              </div>
              
              {/* Bar Chart */}
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={densityData}>
                    <XAxis dataKey="sector" stroke="#94A3B8" />
                    <YAxis stroke="#94A3B8" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#131A24', 
                        borderColor: '#1E293B',
                        fontFamily: 'JetBrains Mono'
                      }}
                      formatter={(value: number) => [`${value}%`, 'Density']}
                    />
                    <Bar dataKey="density">
                      {densityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={getDensityColor(entry.density)} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
        
        {/* Middle column: Demographics data */}
        <div className="lg:col-span-1">
          <div className="tsrs-card-glow h-full">
            <div className="p-4 border-b border-tsrs-border">
              <h3 className="text-xl font-semibold">CROWD DEMOGRAPHICS</h3>
            </div>
            <div className="p-4 h-full flex flex-col">
              {/* Pie chart */}
              <div className="h-[250px] mb-4 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={demographicData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {demographicData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#131A24', 
                        borderColor: '#1E293B',
                        fontFamily: 'JetBrains Mono'
                      }}
                      formatter={(value: number) => [`${value}%`, 'Percentage']}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              {/* Statistics Cards */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="tsrs-card p-4">
                    <div className="text-sm text-tsrs-text-secondary mb-1">TOTAL COUNT</div>
                    <div className="text-2xl text-tsrs-accent font-mono">~385</div>
                  </div>
                  <div className="tsrs-card p-4">
                    <div className="text-sm text-tsrs-text-secondary mb-1">AVG. DENSITY</div>
                    <div className="text-2xl text-tsrs-warning font-mono">64.6%</div>
                  </div>
                </div>
                
                <div className="tsrs-card p-4 border-tsrs-warning border bg-tsrs-warning/10">
                  <h4 className="font-semibold mb-2 text-tsrs-warning">HIGH DENSITY ALERT</h4>
                  <p className="text-sm">Central area exceeds 80% capacity. Recommend crowd flow management to prevent bottlenecks and improve evacuation routes.</p>
                </div>
                
                <div className="tsrs-card p-4">
                  <div className="text-sm text-tsrs-text-secondary mb-2">DENSITY TREND (LAST 30 MIN)</div>
                  <div className="flex items-center text-tsrs-danger">
                    <ChartLine className="mr-2" size={16} />
                    <span>+28% Increasing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right column: Movement analysis */}
        <div className="lg:col-span-1">
          <div className="tsrs-card-glow h-full">
            <div className="p-4 border-b border-tsrs-border">
              <h3 className="text-xl font-semibold">CROWD MOVEMENT</h3>
            </div>
            <div className="p-4 flex flex-col space-y-4">
              {/* Movement Chart */}
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={movementData}>
                    <XAxis dataKey="time" stroke="#94A3B8" />
                    <YAxis stroke="#94A3B8" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#131A24', 
                        borderColor: '#1E293B',
                        fontFamily: 'JetBrains Mono'
                      }}
                    />
                    <Legend />
                    <Bar dataKey="influx" name="Entering" fill="#00CFC9" />
                    <Bar dataKey="outflow" name="Exiting" fill="#FFC700" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="tsrs-card p-3">
                  <div className="text-sm text-tsrs-text-secondary mb-1">MAJOR FLOW</div>
                  <div className="font-mono">North → South</div>
                </div>
                <div className="tsrs-card p-3">
                  <div className="text-sm text-tsrs-text-secondary mb-1">CHOKE POINTS</div>
                  <div className="font-mono">2 Detected</div>
                </div>
              </div>
              
              <div className="tsrs-card p-4">
                <h4 className="text-lg mb-2 text-tsrs-accent">Evacuation Path Analysis</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-tsrs-accent rounded-full mr-2"></div>
                    South exit: Optimal route (120m)
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-tsrs-accent rounded-full mr-2"></div>
                    East corridor: Secondary route (175m)
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-tsrs-danger rounded-full mr-2"></div>
                    North entrance: Blocked by crowd density
                  </li>
                </ul>
              </div>
              
              <button className="tsrs-button mt-auto">
                SIMULATE EVACUATION
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrowdOverlay;
