"use client";

import { motion } from "framer-motion";
import { ArrowDownToLine, ArrowUpFromLine } from "lucide-react";

interface Props {
  onDeposit: () => void;
  onWithdraw: () => void;
}

export default function ActionButtons({ onDeposit, onWithdraw }: Props) {
  return (
    <motion.div
      className="flex gap-3 mt-3"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.18, duration: 0.4 }}
    >
      <motion.button
        className="flex-1 h-12 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2"
        style={{ background: "var(--yellow)", color: "#11151b", border: "none" }}
        whileTap={{ scale: 0.96 }}
        onClick={onDeposit}
      >
        <ArrowDownToLine size={16} />
        Deposit
      </motion.button>
      <motion.button
        className="flex-1 h-12 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2"
        style={{ background: "var(--panel)", color: "var(--text)", border: "1px solid var(--line)" }}
        whileTap={{ scale: 0.96 }}
        onClick={onWithdraw}
      >
        <ArrowUpFromLine size={16} />
        Withdraw
      </motion.button>
    </motion.div>
  );
}
