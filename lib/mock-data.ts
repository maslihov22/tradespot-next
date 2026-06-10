export const mockUser = {
  name: "Carlos Mendoza",
  initials: "CM",
  balance: 2320.40,
  pnl: 1440,
  pnlPercent: 14.8,
  events: 5,
  reviewTime: "1h",
};

export type TxType = "trade" | "deposit" | "withdrawal";

export interface Transaction {
  id: string;
  type: TxType;
  title: string;
  subtitle: string;
  amount: number;
  sign: "plus" | "minus" | "warn";
}

export const mockTransactions: Transaction[] = [
  { id: "1", type: "trade",      title: "BTC/USDT swing trade", subtitle: "Sell · Completed",  amount: 730,  sign: "plus" },
  { id: "2", type: "withdrawal", title: "Withdrawal attempt",   subtitle: "Manual review",     amount: 120,  sign: "warn" },
  { id: "3", type: "trade",      title: "BTC/USDT grid close",  subtitle: "Sell · Completed",  amount: 492,  sign: "plus" },
  { id: "4", type: "deposit",    title: "USDT deposit",         subtitle: "Confirmed",         amount: 1000, sign: "plus" },
  { id: "5", type: "trade",      title: "ETH/USDT long",        subtitle: "Buy · Completed",   amount: 218,  sign: "plus" },
];

export const chartPath =
  "M0 88 C42 82 54 54 88 62 C128 72 136 28 174 38 C212 48 220 78 258 58 C298 36 312 24 360 18";
export const chartArea =
  "M0 88 C42 82 54 54 88 62 C128 72 136 28 174 38 C212 48 220 78 258 58 C298 36 312 24 360 18 L360 118 L0 118 Z";
