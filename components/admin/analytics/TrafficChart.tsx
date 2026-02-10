'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface TrafficChartProps {
  data: Array<{
    date: string;
    views: number;
    visitors: number;
  }>;
}

export default function TrafficChart({ data }: TrafficChartProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis 
          dataKey="date" 
          stroke="#64748b"
          tick={{ fontSize: 12 }}
        />
        <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#fff', 
            border: '1px solid #e2e8f0',
            borderRadius: '8px'
          }}
        />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="views" 
          stroke="#FF7B42" 
          strokeWidth={2}
          dot={{ fill: '#FF7B42', r: 4 }}
          activeDot={{ r: 6 }}
          name="Page Views"
        />
        <Line 
          type="monotone" 
          dataKey="visitors" 
          stroke="#3b82f6" 
          strokeWidth={2}
          dot={{ fill: '#3b82f6', r: 4 }}
          activeDot={{ r: 6 }}
          name="Unique Visitors"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

