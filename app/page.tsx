"use client";

import { useState } from "react";
import TopBar from "@/components/TopBar";
import BalanceCard from "@/components/BalanceCard";
import ActionButtons from "@/components/ActionButtons";
import RiskStrip from "@/components/RiskStrip";
import ActivityFeed from "@/components/ActivityFeed";
import DepositSheet from "@/components/DepositSheet";
import WithdrawSheet from "@/components/WithdrawSheet";

export default function Home() {
  const [depositOpen, setDepositOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);

  return (
    <>
      <div
        className="min-h-screen flex items-start justify-center"
        style={{ padding: "clamp(0px, 3vw, 36px)" }}
      >
        <main
          className="phone-shell relative overflow-hidden w-full mx-auto px-5 py-6 pb-10"
          style={{
            maxWidth: 430,
            minHeight: "100dvh",
            background: "linear-gradient(180deg, rgba(255,255,255,0.04), transparent 22%), #0c1015",
            border: "1px solid rgba(238,243,247,0.12)",
            borderRadius: "clamp(0px, 4vw, 34px)",
            boxShadow: "0 34px 90px rgba(0,0,0,0.52), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          <TopBar />
          <BalanceCard />
          <ActionButtons
            onDeposit={() => setDepositOpen(true)}
            onWithdraw={() => setWithdrawOpen(true)}
          />
          <RiskStrip />
          <ActivityFeed />
        </main>
      </div>

      <DepositSheet open={depositOpen} onClose={() => setDepositOpen(false)} />
      <WithdrawSheet open={withdrawOpen} onClose={() => setWithdrawOpen(false)} />
    </>
  );
}
