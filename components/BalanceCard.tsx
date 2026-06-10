"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { mockUser, chartPath, chartArea } from "@/lib/mock-data";

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
  const [pathLen, setPathLen] = useState(0);

  useEffect(() => {
    if (pathRef.current) setPathLen(pathRef.current.getTotalLength());
  }, []);

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
          <AnimatedNumber value={mockUser.balance} prefix="$" />
        </strong>
        <span
          className="text-sm font-extrabold px-3 py-1.5 rounded-full mb-1"
          style={{ background: "var(--green)", color: "#05100b" }}
        >
          +{mockUser.pnlPercent}%
        </span>
      </div>

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
            transition={{ delay: 0.6, duration: 0.6 }}
          />
          <motion.path
            ref={pathRef}
            d={chartPath}
            fill="none"
            stroke="var(--green)"
            strokeWidth={3.5}
            strokeLinecap="round"
            style={
              pathLen
                ? { strokeDasharray: pathLen, strokeDashoffset: pathLen }
                : {}
            }
            animate={pathLen ? { strokeDashoffset: 0 } : {}}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          />
        </svg>
      </div>

      <div className="relative z-10 flex gap-2 mt-3">
        {[
          { label: "PNL", value: `$${mockUser.pnl.toLocaleString()}` },
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
