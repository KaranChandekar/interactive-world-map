"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CONTROLS = [
  { key: "Drag", desc: "Rotate globe" },
  { key: "Scroll", desc: "Zoom in/out" },
  { key: "Click", desc: "Select country" },
  { key: "Esc", desc: "Deselect country" },
  { key: "Arrow keys", desc: "Rotate globe" },
  { key: "+/-", desc: "Zoom" },
];

export function ControlsLegend() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="absolute bottom-6 left-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-gray-900/60 backdrop-blur-md rounded-lg border border-white/10 text-xs text-gray-400 hover:text-white transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Controls
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="absolute bottom-full left-0 mb-2 bg-gray-900/90 backdrop-blur-xl rounded-xl border border-white/10 p-4 w-[220px] shadow-2xl"
          >
            <p className="text-xs font-bold text-white mb-3">
              Keyboard & Mouse
            </p>
            <div className="space-y-2">
              {CONTROLS.map(({ key, desc }) => (
                <div key={key} className="flex items-center gap-3">
                  <kbd className="px-1.5 py-0.5 text-[10px] bg-white/10 rounded border border-white/20 text-gray-300 font-mono shrink-0 min-w-[60px] text-center">
                    {key}
                  </kbd>
                  <span className="text-xs text-gray-400">{desc}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
