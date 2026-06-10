"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown } from "lucide-react";
import { faqItems } from "@/lib/faq-data";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function FaqModal({ open, onClose }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);

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
            className="fixed bottom-0 left-0 right-0 z-50 rounded-t-[28px]"
            style={{
              background: "var(--panel-2)",
              border: "1px solid var(--line)",
              borderBottom: "none",
              maxWidth: 430,
              margin: "0 auto",
              maxHeight: "80dvh",
              display: "flex",
              flexDirection: "column",
            }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 320 }}
          >
            {/* header */}
            <div className="flex items-center justify-between p-5 pb-4 shrink-0">
              <div>
                <p
                  className="text-xs font-bold uppercase tracking-wide"
                  style={{ color: "var(--yellow)" }}
                >
                  Support
                </p>
                <h2 className="text-2xl font-bold mt-1" style={{ color: "var(--text)" }}>
                  FAQ
                </h2>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: "var(--panel)",
                  border: "1px solid var(--line)",
                  color: "var(--text)",
                }}
                aria-label="Close FAQ"
              >
                <X size={16} />
              </button>
            </div>

            {/* scrollable list */}
            <div className="overflow-y-auto px-5 pb-8" style={{ overscrollBehavior: "contain" }}>
              {faqItems.map((item, i) => {
                const isOpen = activeId === item.id;
                return (
                  <motion.article
                    key={item.id}
                    className="rounded-2xl overflow-hidden mb-2"
                    style={{
                      background: isOpen
                        ? "rgba(56,217,150,0.06)"
                        : "rgba(8,10,13,0.42)",
                      border: isOpen
                        ? "1px solid rgba(56,217,150,0.2)"
                        : "1px solid rgba(238,243,247,0.08)",
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between gap-3 p-4 text-left"
                      style={{ background: "transparent", border: "none", color: "var(--text)" }}
                      onClick={() => setActiveId(isOpen ? null : item.id)}
                    >
                      <span className="text-sm font-semibold leading-snug">
                        {item.question}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="shrink-0"
                        style={{ color: "var(--muted)" }}
                      >
                        <ChevronDown size={18} />
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="answer"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                          style={{ overflow: "hidden" }}
                        >
                          <p
                            className="text-sm leading-relaxed px-4 pb-4"
                            style={{ color: "var(--muted)" }}
                          >
                            {item.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.article>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
