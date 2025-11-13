export interface SupportTier {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  popular?: boolean;
}

export interface OneTimeDonation {
  id: string;
  amount: number;
  label: string;
}

export const supportTiers: SupportTier[] = [
  {
    id: "supporter",
    name: "Supporter",
    price: 5,
    description: "Help us keep the platform running",
    features: [
      "Priority support",
      "Supporter badge",
      "Early access to features",
      "Ad-free experience",
    ],
  },
  {
    id: "champion",
    name: "Champion",
    price: 15,
    description: "Make a bigger impact",
    features: [
      "Everything in Supporter",
      "Custom username color",
      "Exclusive chat rooms",
      "Profile customization",
    ],
    popular: true,
  },
  {
    id: "patron",
    name: "Patron",
    price: 30,
    description: "Maximum support for the community",
    features: [
      "Everything in Champion",
      "VIP support",
      "Direct feedback channel",
      "Special recognition",
    ],
  },
];

export const oneTimeDonations: OneTimeDonation[] = [
  { id: "donation-5", amount: 5, label: "$5" },
  { id: "donation-10", amount: 10, label: "$10" },
  { id: "donation-25", amount: 25, label: "$25" },
  { id: "donation-50", amount: 50, label: "$50" },
  { id: "donation-100", amount: 100, label: "$100" },
  { id: "donation-custom", amount: 0, label: "Custom" },
];

export const benefits = [
  {
    title: "Keep the Platform Free",
    description:
      "Your support helps us maintain and improve the platform for everyone.",
  },
  {
    title: "Priority Features",
    description:
      "Get early access to new features and help shape the future of Chattrix.",
  },
  {
    title: "Community Growth",
    description:
      "Support helps us reach more language learners and build a better community.",
  },
];

export const faqs = [
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, PayPal, and other secure payment methods.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period.",
  },
  {
    question: "Will I lose my benefits if I cancel?",
    answer:
      "You'll keep your benefits until the end of your current billing period. After that, you'll return to the free tier.",
  },
  {
    question: "Is my payment secure?",
    answer:
      "Yes, all payments are processed through secure, encrypted payment gateways. We never store your payment information.",
  },
];

