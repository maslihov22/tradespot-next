"use client";

import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

export default function RiskStrip() {
  return (
    <motion.section
      className="rounded-[22px] p-4 mt-3 grid gap-2"
      style={{
        background: "rgba(244,200,74,0.08)",
        border: "1px solid rgba(244,200,74,0.24)",
      }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.24, duration: 0.4 }}
    >
      <div className="flex items-center gap-2">
        <AlertTriangle size={16} style={{ color: "var(--yellow)", flexShrink: 0 }} />
        <span className="text-xs" style={{ color: "var(--muted)" }}>Security status</span>
        <strong className="text-sm ml-auto" style={{ color: "var(--yellow)" }}>Withdrawal review required</strong>
      </div>
      <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
        Risk checks are explicit, auditable, and reversible.
      </p>
    </motion.section>
  );
}
