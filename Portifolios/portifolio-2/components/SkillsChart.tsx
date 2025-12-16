import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { SKILL_DATA } from '../constants';

const SkillsChart: React.FC = () => {
  return (
    <div className="col-span-2 bg-[#121318] rounded-2xl p-6 border border-white/5 relative overflow-hidden group">
      
      <div className="flex justify-between items-center mb-2">
        <div>
          <h3 className="text-white font-bold text-lg">Skills</h3>
          <p className="text-gray-400 text-xs">Technical Proficiency</p>
        </div>
        <div className="px-3 py-1 bg-gray-800 rounded-full text-xs text-gray-300 font-mono">
           Level 99
        </div>
      </div>

      <div className="h-[200px] w-full -ml-2">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={SKILL_DATA}>
            <PolarGrid stroke="#334155" strokeDasharray="3 3" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 600 }} />
            <Radar
              name="Skills"
              dataKey="A"
              stroke="#fbbf24"
              strokeWidth={2}
              fill="#fbbf24"
              fillOpacity={0.3}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SkillsChart;