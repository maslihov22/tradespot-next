"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, AlertTriangle, ArrowDownToLine, ArrowUpFromLine } from "lucide-react";
import { mockTransactions, type TxType, type Transaction } from "@/lib/mock-data";

const FILTERS: { label: string; value: "all" | TxType }[] = [
  { label: "All",         value: "all" },
  { label: "Trades",      value: "trade" },
  { label: "Deposits",    value: "deposit" },
  { label: "Withdrawals", value: "withdrawal" },
];

function TxIcon({ tx }: { tx: Transaction }) {
  const Icon =
    tx.type === "trade"
      ? TrendingUp
      : tx.type === "deposit"
      ? ArrowDownToLine
      : tx.sign === "warn"
      ? AlertTriangle
      : ArrowUpFromLine;

  const bg =
    tx.sign === "warn"
      ? "rgba(244,200,74,0.16)"
      : tx.sign === "plus"
      ? "rgba(56,217,150,0.15)"
      : "rgba(255,95,109,0.15)";
  const color =
    tx.sign === "warn" ? "var(--yellow)" : tx.sign === "plus" ? "var(--green)" : "var(--red)";

  return (
    <div
      className="w-[42px] h-[42px] rounded-[14px] flex items-center justify-center shrink-0"
      style={{ background: bg, color }}
    >
      <Icon size={18} />
    </div>
  );
}

function TxRow({ tx, index }: { tx: Transaction; index: number }) {
  const amountColor =
    tx.sign === "plus" ? "var(--green)" : tx.sign === "warn" ? "var(--yellow)" : "var(--red)";
  const amountPrefix = tx.sign === "minus" ? "-" : "+";

  return (
    <motion.article
      layout
      className="flex items-center gap-3 rounded-2xl p-3 mt-3"
      style={{ background: "rgba(8,10,13,0.38)", border: "1px solid rgba(238,243,247,0.08)" }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ delay: index * 0.06, duration: 0.3 }}
    >
      <TxIcon tx={tx} />
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold leading-tight truncate">{tx.title}</h3>
        <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>{tx.subtitle}</p>
      </div>
      <strong className="text-sm font-bold shrink-0" style={{ color: amountColor }}>
        {amountPrefix}J${tx.amount.toLocaleString("en-US")}
      </strong>
    </motion.article>
  );
}

export default function ActivityFeed() {
  const [active, setActive] = useState<"all" | TxType>("all");

  const filtered =
    active === "all" ? mockTransactions : mockTransactions.filter((tx) => tx.type === active);

  return (
    <motion.section
      className="rounded-[22px] p-4 mt-3"
      style={{
        background: "linear-gradient(180deg, rgba(255,255,255,0.055), rgba(255,255,255,0.02))",
        border: "1px solid rgba(238,243,247,0.1)",
      }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.4 }}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide" style={{ color: "var(--yellow)" }}>
            Activity
          </p>
          <h2 className="text-xl font-bold mt-0.5">Recent transactions</h2>
        </div>
        <span
          className="text-xs font-extrabold px-3 py-1.5 rounded-full"
          style={{ background: "rgba(112,167,255,0.12)", color: "var(--blue)" }}
        >
          Live
        </span>
      </div>

      <div
        className="grid mt-3 p-1 rounded-[15px] gap-1"
        style={{
          gridTemplateColumns: `repeat(${FILTERS.length}, 1fr)`,
          background: "rgba(8,10,13,0.5)",
          border: "1px solid var(--line)",
        }}
      >
        {FILTERS.map(({ label, value }) => (
          <button
            key={value}
            className="h-9 rounded-xl font-bold transition-colors"
            style={{
              background: active === value ? "var(--green)" : "transparent",
              color: active === value ? "#10140f" : "var(--muted)",
              border: "none",
              fontSize: "11px",
            }}
            onClick={() => setActive(value)}
          >
            {label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="popLayout">
        {filtered.map((tx, i) => (
          <TxRow key={tx.id} tx={tx} index={i} />
        ))}
      </AnimatePresence>
    </motion.section>
  );
}
