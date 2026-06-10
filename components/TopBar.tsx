"use client";

import { motion } from "framer-motion";
import { ShieldCheck, CircleHelp } from "lucide-react";
import { useTelegramUser, getInitials, getDisplayName } from "@/lib/telegram";

interface Props {
  onFaqClick: () => void;
}

export default function TopBar({ onFaqClick }: Props) {
  const tgUser = useTelegramUser();
  const initials = getInitials(tgUser);
  const name = getDisplayName(tgUser);

  return (
    <motion.header
      className="flex items-center justify-between gap-4 mb-5"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div
          className="w-14 h-14 rounded-[18px] flex items-center justify-center font-extrabold text-sm shrink-0"
          style={{
            background: "linear-gradient(135deg, #ffe28a, #f4c84a)",
            color: "#15100a",
            border: "1px solid rgba(244,200,74,0.48)",
          }}
        >
          {initials}
        </div>
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-wide" style={{ color: "var(--yellow)" }}>
            Portfolio
          </p>
          <h1 className="text-xl font-bold leading-tight truncate">{name}</h1>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onFaqClick}
          className="w-11 h-11 rounded-[14px] flex items-center justify-center"
          style={{ background: "var(--panel)", border: "1px solid var(--line)", color: "var(--muted)" }}
          aria-label="FAQ"
        >
          <CircleHelp size={18} />
        </button>
        <button
          className="w-11 h-11 rounded-[14px] flex items-center justify-center"
          style={{ background: "var(--panel)", border: "1px solid var(--line)", color: "var(--text)" }}
          aria-label="Security center"
        >
          <ShieldCheck size={18} />
        </button>
      </div>
    </motion.header>
  );
}
