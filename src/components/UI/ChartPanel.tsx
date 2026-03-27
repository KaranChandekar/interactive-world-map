"use client";

import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

interface ChartPanelProps {
  countryName: string;
  population: number;
  area: number;
}

export function ChartPanel({ countryName, population, area }: ChartPanelProps) {
  const popData = [
    { name: countryName, value: population / 1e6 },
    { name: "World Avg", value: 40 },
  ];

  const areaData = [
    { name: countryName, value: area / 1e3 },
    { name: "World Avg", value: 510 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ delay: 0.2 }}
      className="bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-white/10 p-4 w-[380px] shadow-2xl"
    >
      <h4 className="text-sm font-display font-bold text-white mb-3">
        Population (millions)
      </h4>
      <ResponsiveContainer width="100%" height={100}>
        <BarChart data={popData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false} />
          <XAxis type="number" tick={{ fill: "#9ca3af", fontSize: 11 }} />
          <YAxis
            dataKey="name"
            type="category"
            tick={{ fill: "#9ca3af", fontSize: 11 }}
            width={80}
          />
          <Tooltip
            contentStyle={{
              background: "#1f2937",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
              color: "#e5e7eb",
            }}
          />
          <Bar dataKey="value" radius={[0, 4, 4, 0]}>
            <Cell fill="#3b82f6" />
            <Cell fill="#6b7280" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <h4 className="text-sm font-display font-bold text-white mb-3 mt-4">
        Area (thousand km²)
      </h4>
      <ResponsiveContainer width="100%" height={100}>
        <BarChart data={areaData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false} />
          <XAxis type="number" tick={{ fill: "#9ca3af", fontSize: 11 }} />
          <YAxis
            dataKey="name"
            type="category"
            tick={{ fill: "#9ca3af", fontSize: 11 }}
            width={80}
          />
          <Tooltip
            contentStyle={{
              background: "#1f2937",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
              color: "#e5e7eb",
            }}
          />
          <Bar dataKey="value" radius={[0, 4, 4, 0]}>
            <Cell fill="#22c55e" />
            <Cell fill="#6b7280" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
