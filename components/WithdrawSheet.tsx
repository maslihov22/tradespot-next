import BottomSheet from "./BottomSheet";
import { AlertTriangle } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function WithdrawSheet({ open, onClose }: Props) {
  return (
    <BottomSheet open={open} onClose={onClose} eyebrow="Withdrawal" title="Review required">
      <div
        className="mt-4 rounded-2xl p-4 flex gap-3"
        style={{ background: "rgba(244,200,74,0.08)", border: "1px solid rgba(244,200,74,0.24)" }}
      >
        <AlertTriangle size={20} style={{ color: "var(--yellow)", flexShrink: 0, marginTop: 2 }} />
        <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
          Para activar el retiro automático, complete la verificación de depósito mínimo.
        </p>
      </div>
      <div
        className="mt-3 rounded-2xl p-4 grid gap-3"
        style={{ background: "rgba(8,10,13,0.5)", border: "1px solid var(--line)" }}
      >
        {[
          ["Reason", "Risk review"],
          ["Evidence", "Audit trail required"],
        ].map(([label, value]) => (
          <div key={label} className="flex justify-between text-sm">
            <span style={{ color: "var(--muted)" }}>{label}</span>
            <strong style={{ color: "var(--text)" }}>{value}</strong>
          </div>
        ))}
      </div>
    </BottomSheet>
  );
}
