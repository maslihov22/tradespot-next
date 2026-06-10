"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  eyebrow: string;
  children: React.ReactNode;
}

export default function BottomSheet({ open, onClose, title, eyebrow, children }: BottomSheetProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-40"
            style={{ background: "rgba(0,0,0,0.72)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            key="sheet"
            className="fixed bottom-0 left-0 right-0 z-50 rounded-t-[28px] p-5"
            style={{
              background: "var(--panel-2)",
              border: "1px solid var(--line)",
              borderBottom: "none",
              maxWidth: 430,
              margin: "0 auto",
            }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 320 }}
          >
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs font-bold uppercase tracking-wide" style={{ color: "var(--yellow)" }}>
                {eyebrow}
              </p>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "var(--panel)", border: "1px solid var(--line)", color: "var(--text)" }}
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>
            <h2 className="text-2xl font-bold mt-2 mb-1" style={{ color: "var(--text)" }}>
              {title}
            </h2>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
