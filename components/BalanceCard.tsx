"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { mockUser, mockTransactions, chartPath, chartArea } from "@/lib/mock-data";

function AnimatedNumber({ value, prefix = "" }: { value: number; prefix?: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) =>
    `${prefix}${v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  );
  const [display, setDisplay] = useState(`${prefix}0.00`);

  useEffect(() => {
    const unsub = rounded.on("change", setDisplay);
    const ctrl = animate(count, value, { duration: 1.2, ease: [0.16, 1, 0.3, 1] });
    return () => {
      ctrl.stop();
      unsub();
    };
  }, [value]);

  return <span>{display}</span>;
}

export default function BalanceCard() {
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLen, setPathLen] = useState<number | null>(null);

  useEffect(() => {
    if (pathRef.current) {
      const len = pathRef.current.getTotalLength();
      setPathLen(len);
    }
  }, []);

  const trades = mockTransactions.filter((t) => t.type === "trade");
  const deposits = mockTransactions.filter((t) => t.type === "deposit");
  const pnlAmount = trades.reduce(
    (sum, t) => sum + (t.sign === "plus" ? t.amount : -t.amount),
    0,
  );
  const totalDeposited = deposits.reduce((sum, t) => sum + t.amount, 0);
  const pnlPercent = totalDeposited > 0 ? (pnlAmount / totalDeposited) * 100 : 0;
  const pnlPositive = pnlAmount >= 0;

  return (
    <motion.section
      className="relative overflow-hidden rounded-[22px] p-5"
      style={{
        background: "linear-gradient(180deg, rgba(255,255,255,0.055), rgba(255,255,255,0.02))",
        border: "1px solid rgba(238,243,247,0.1)",
      }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.08 }}
    >
      <div
        className="absolute pointer-events-none"
        style={{
          top: -120, right: -130, width: 260, height: 260,
          background: "conic-gradient(from 160deg, rgba(56,217,150,0.28), rgba(112,167,255,0.16), transparent)",
          filter: "blur(8px)",
        }}
      />

      <div className="relative z-10 flex items-center justify-between text-sm" style={{ color: "var(--muted)" }}>
        <span>Available equity</span>
        <span
          className="text-xs font-bold px-3 py-1 rounded-full"
          style={{ background: "rgba(56,217,150,0.12)", color: "var(--green)" }}
        >
          Verified session
        </span>
      </div>

      <div className="relative z-10 flex items-end justify-between mt-3 gap-3">
        <strong className="text-[42px] leading-none font-bold">
          <AnimatedNumber value={mockUser.balance} prefix="J$" />
        </strong>
        <span
          className="font-extrabold px-2.5 py-1.5 rounded-full mb-1"
          style={{ background: "var(--green)", color: "#05100b", fontSize: "9px" }}
        >
          +{mockUser.pnlPercent}%
        </span>
      </div>

      {/* chart — рисуется слева направо */}
      <div className="relative z-10 mt-4">
        <svg viewBox="0 0 360 118" className="block w-full" style={{ height: 118 }} aria-hidden>
          <defs>
            <linearGradient id="area-grad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#38d996" stopOpacity={0.36} />
              <stop offset="1" stopColor="#38d996" stopOpacity={0} />
            </linearGradient>
          </defs>
          <motion.path
            d={chartArea}
            fill="url(#area-grad)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          />
          {/* невидимый путь для замера длины */}
          <path
            ref={pathRef}
            d={chartPath}
            fill="none"
            stroke="transparent"
            strokeWidth={0}
          />
          {/* анимированный путь — запускается только когда длина известна */}
          {pathLen !== null && (
            <motion.path
              d={chartPath}
              fill="none"
              stroke="var(--green)"
              strokeWidth={3.5}
              strokeLinecap="round"
              initial={{ strokeDasharray: pathLen, strokeDashoffset: pathLen }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            />
          )}
        </svg>
      </div>

      {/* PNL строка */}
      <motion.div
        className="relative z-10 flex items-center justify-between mt-3 px-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.4 }}
      >
        <div>
          <p className="text-xs" style={{ color: "var(--muted)" }}>Transaction PNL</p>
          <strong className="text-sm font-bold" style={{ color: pnlPositive ? "var(--green)" : "var(--red)" }}>
            {pnlPositive ? "+" : "-"}
            J${Math.abs(pnlAmount).toLocaleString("en-US", { maximumFractionDigits: 0 })}
          </strong>
        </div>
        <span
          className="text-xs font-extrabold px-2.5 py-1 rounded-full"
          style={{
            background: pnlPositive ? "rgba(56,217,150,0.12)" : "rgba(255,95,109,0.12)",
            color: pnlPositive ? "var(--green)" : "var(--red)",
          }}
        >
          {pnlPositive ? "+" : ""}{pnlPercent.toFixed(1)}%
        </span>
      </motion.div>

      <div className="relative z-10 flex gap-2 mt-3">
        {[
          { label: "Events", value: mockUser.events },
          { label: "Review", value: mockUser.reviewTime },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="flex-1 rounded-[14px] px-2.5 py-2.5 text-xs"
            style={{
              background: "rgba(8,10,13,0.42)",
              border: "1px solid rgba(238,243,247,0.08)",
              color: "var(--muted)",
            }}
          >
            <strong className="block text-sm mb-0.5" style={{ color: "var(--text)" }}>{value}</strong>
            {label}
          </div>
        ))}
      </div>
    </motion.section>
  );
}
