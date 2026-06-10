export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    id: "deposits",
    question: "How do deposits work?",
    answer:
      "Tap Deposit, choose a payment method, and follow the instructions. Funds appear in your balance after network or payment confirmation.",
  },
  {
    id: "withdrawals",
    question: "How long do withdrawals take?",
    answer:
      "Withdrawals are processed after security checks. Most requests move to processing immediately and complete after confirmation.",
  },
  {
    id: "pnl",
    question: "What does transaction PNL mean?",
    answer:
      "Transaction PNL is calculated from trade transactions attached to your invite link, including the total amount and percentage change.",
  },
  {
    id: "history",
    question: "What is included in history?",
    answer:
      "History includes deposits, withdrawals, and trades. Use the filters to focus on one operation type at a time.",
  },
];
