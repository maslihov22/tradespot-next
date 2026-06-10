import BottomSheet from "./BottomSheet";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function DepositSheet({ open, onClose }: Props) {
  return (
    <BottomSheet open={open} onClose={onClose} eyebrow="Funding" title="Deposit funds">
      <p className="text-sm mt-3 leading-relaxed" style={{ color: "var(--muted)" }}>
        Transfer to the details below, then tap&nbsp;<strong style={{ color: "var(--text)" }}>I paid</strong>.
      </p>
      <div
        className="mt-4 rounded-2xl p-4 grid gap-3"
        style={{ background: "rgba(8,10,13,0.5)", border: "1px solid var(--line)" }}
      >
        {[
          ["Method", "Bank transfer"],
          ["Bank", "Banco Pichincha"],
          ["Card", "4556 7302 8841 2190"],
          ["Minimum", "$250.00"],
          ["Reference", "Pago de verificacion"],
        ].map(([label, value]) => (
          <div key={label} className="flex justify-between text-sm">
            <span style={{ color: "var(--muted)" }}>{label}</span>
            <strong style={{ color: "var(--text)" }}>{value}</strong>
          </div>
        ))}
      </div>
      <button
        className="w-full mt-4 h-12 rounded-2xl font-bold text-sm"
        style={{ background: "var(--yellow)", color: "#11151b" }}
      >
        I paid — confirm deposit
      </button>
    </BottomSheet>
  );
}
