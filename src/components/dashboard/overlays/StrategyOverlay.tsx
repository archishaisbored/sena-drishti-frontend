import React from 'react';
import { X, FileText } from 'lucide-react';

interface OverlayProps {
  onClose: () => void;
  commands?: { commands: string[]; threat_level: string };
}

const StrategyOverlay: React.FC<OverlayProps> = ({ onClose, commands }) => {
  console.log('StrategyOverlay commands:', commands); // Debug log

  const defaultStrategies = [
    {
      title: "Primary Containment",
      description: "Deploy tactical units to create a perimeter at 50m radius from subject. Clear civilians from immediate area using non-alarming verbal commands.",
      priority: "High",
      timeframe: "Immediate",
    },
    {
      title: "De-escalation Protocol",
      description: "Initiate verbal contact from covered position. Use psychological profiling module suggestions for communication approach.",
      priority: "High",
      timeframe: "Within 2 minutes",
    },
  ];

  const strategies = commands?.commands
    ? commands.commands.map((cmd, index) => ({
        title: `Strategy ${index + 1}`,
        description: cmd,
        priority: commands.threat_level === 'Unknown' ? 'Medium' : 'High',
        timeframe: 'Immediate',
      }))
    : defaultStrategies;

  return (
    <div className="overlay">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-tsrs-accent flex items-center">
          <FileText className="mr-2" />
          GENAI STRATEGY CAPTIONS
        </h2>
        <button
          onClick={onClose}
          className="text-tsrs-text-secondary hover:text-tsrs-accent p-2 rounded-full transition-colors"
        >
          <X size={32} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-slide-in">
        <div className="lg:col-span-1">
          <div className="tsrs-card-glow">
            <div className="p-4 border-b border-tsrs-border">

              <div className="mt-4 p-4 tsrs-card font-mono text-sm">
                <div className="text-tsrs-text-secondary mb-2">ANALYSIS PARAMETERS</div>
                <div className="grid grid-cols-2 gap-2">
                  <div>Scene type: <span className="text-tsrs-accent">Public space</span></div>
                  <div>Crowd density: <span className="text-tsrs-accent">High</span></div>
                  <div>Threat level: <span className="text-tsrs-danger">{commands?.threat_level || 'Severe'}</span></div>
                  <div>Response priority: <span className="text-tsrs-danger">Critical</span></div>
                </div>
              </div>

              <div className="mt-4 p-4 tsrs-card bg-tsrs-danger/10 border-tsrs-danger border font-mono">
                <div className="text-tsrs-danger mb-2 font-bold">CAUTION</div>
                <p className="text-sm">
                  High civilian presence requires precision response tactics. Excessive force may result in collateral casualties.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="tsrs-card-glow h-full">
            <div className="p-4 border-b border-tsrs-border">
              <h3 className="text-xl font-semibold">AI-GENERATED RESPONSE STRATEGIES</h3>
            </div>
            <div className="p-4 space-y-4">
              {strategies.map((strategy, index) => (
                <div
                  key={index}
                  className={`tsrs-card p-4 transition-all duration-300 hover:shadow-[0_0_10px_rgba(0,207,201,0.3)]
                    ${
                      strategy.priority === 'High'
                        ? 'border-l-4 border-l-tsrs-danger'
                        : strategy.priority === 'Medium'
                        ? 'border-l-4 border-l-tsrs-warning'
                        : 'border-l-4 border-l-tsrs-accent'
                    }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-lg font-bold">{strategy.title}</h4>
                    <div
                      className={`text-sm px-2 py-1 rounded font-medium
                        ${
                          strategy.priority === 'High'
                            ? 'bg-tsrs-danger/20 text-tsrs-danger'
                            : strategy.priority === 'Medium'
                            ? 'bg-tsrs-warning/20 text-tsrs-warning'
                            : 'bg-tsrs-accent/20 text-tsrs-accent'
                        }`}
                    >
                      {strategy.priority} Priority
                    </div>
                  </div>
                  <p className="mb-2 text-tsrs-text-secondary">{strategy.description}</p>
                  <div className="flex justify-between items-center text-sm">
                    <div className="font-mono">Timeframe: {strategy.timeframe}</div>
                    <button className="px-3 py-1 rounded bg-tsrs-accent/10 text-tsrs-accent hover:bg-tsrs-accent/20">
                      Initiate
                    </button>
                  </div>
                </div>
              ))}

              <div className="mt-6 flex gap-4">
                <button className="tsrs-button flex-1">GENERATE NEW STRATEGIES</button>
                <button className="tsrs-button-danger flex-1">OVERRIDE AI RECOMMENDATIONS</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategyOverlay;