"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";

const faqs = [
  {
    question: "What payment methods do you accept?",
    answer: "We accept credit/debit cards (Visa, Mastercard), M-Pesa, and Airtel Money for your convenience.",
    category: "Payment",
  },
  {
    question: "How long does shipping take?",
    answer: "Standard shipping within Uganda takes 3–5 business days. Express shipping is available for 1–2 business days delivery.",
    category: "Shipping",
  },
  {
    question: "Do you offer free shipping?",
    answer: "Yes! We offer free shipping on all orders over UGX 200,000 within Uganda.",
    category: "Shipping",
  },
  {
    question: "What is your return policy?",
    answer: "We accept returns within 14 days of delivery. Items must be unused and in original condition with tags attached.",
    category: "Returns",
  },
  {
    question: "Are your fabrics authentic?",
    answer: "Absolutely! We source all our fabrics directly from trusted manufacturers and artisans to ensure authenticity and quality.",
    category: "Products",
  },
  {
    question: "Can I track my order?",
    answer: "Yes, once your order ships, you'll receive a tracking number via email to monitor your delivery.",
    category: "Orders",
  },
  {
    question: "Do you ship internationally?",
    answer: "Currently, we ship within Uganda. International shipping will be available soon. Subscribe to our newsletter for updates.",
    category: "Shipping",
  },
  {
    question: "How do I care for my African textiles?",
    answer: "Care instructions vary by fabric type. Generally, we recommend cold water wash and air drying. Specific care instructions are provided with each product.",
    category: "Products",
  },
];

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  Payment:  { bg: "rgba(245,158,11,0.12)", text: "#d97706", border: "rgba(245,158,11,0.25)" },
  Shipping: { bg: "rgba(22,163,74,0.1)",   text: "#16a34a", border: "rgba(22,163,74,0.22)" },
  Returns:  { bg: "rgba(229,106,74,0.1)",  text: "#d24d2e", border: "rgba(229,106,74,0.22)" },
  Products: { bg: "rgba(166,124,82,0.1)",  text: "#8b6644", border: "rgba(166,124,82,0.22)" },
  Orders:   { bg: "rgba(139,102,68,0.1)",  text: "#6f5139", border: "rgba(139,102,68,0.22)" },
};

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen py-16 relative">
      {/* Ambient orbs */}
      <div className="fixed top-20 right-10 w-56 h-56 rounded-full pointer-events-none opacity-15"
        style={{ background: "radial-gradient(circle, rgba(245,158,11,0.5), transparent)", filter: "blur(55px)" }} />
      <div className="fixed bottom-20 left-10 w-48 h-48 rounded-full pointer-events-none opacity-12"
        style={{ background: "radial-gradient(circle, rgba(22,163,74,0.5), transparent)", filter: "blur(50px)" }} />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <div
            className="inline-flex items-center justify-center h-14 w-14 rounded-2xl mx-auto mb-5 animate-float"
            style={{
              background: "rgba(245,158,11,0.12)",
              border: "1px solid rgba(245,158,11,0.25)",
              boxShadow: "0 0 24px rgba(245,158,11,0.2)",
            }}
          >
            <HelpCircle className="h-6 w-6 text-gold-500" />
          </div>
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-gold-600 mb-4"
            style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.22)" }}
          >
            <Sparkles className="h-3 w-3" /> Quick Answers
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-gradient-earth">
            Frequently Asked Questions
          </h1>
          <p className="text-earth-500 max-w-2xl mx-auto leading-relaxed">
            Find answers to common questions about our products, shipping, and policies
          </p>
          <div className="mt-5 mx-auto w-24 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const cat = categoryColors[faq.category] ?? categoryColors["Orders"];

            return (
              <div
                key={index}
                className="rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                  background: isOpen
                    ? "rgba(255,252,248,0.82)"
                    : "rgba(255,252,248,0.62)",
                  backdropFilter: "blur(20px) saturate(1.4)",
                  WebkitBackdropFilter: "blur(20px) saturate(1.4)",
                  border: isOpen
                    ? "1px solid rgba(22,163,74,0.3)"
                    : "1px solid rgba(200,160,80,0.25)",
                  boxShadow: isOpen
                    ? "0 8px 32px rgba(22,163,74,0.1), inset 0 1px 0 rgba(255,255,255,0.7)"
                    : "0 2px 12px rgba(139,90,40,0.07), inset 0 1px 0 rgba(255,255,255,0.6)",
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left gap-4 group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className="hidden sm:block flex-shrink-0 px-2 py-0.5 rounded-full text-[10px] font-semibold whitespace-nowrap"
                      style={{ background: cat.bg, color: cat.text, border: `1px solid ${cat.border}` }}
                    >
                      {faq.category}
                    </span>
                    <span className="font-semibold text-sm text-earth-800 group-hover:text-forest-700 transition-colors">
                      {faq.question}
                    </span>
                  </div>
                  <div
                    className="flex-shrink-0 h-7 w-7 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{
                      background: isOpen ? "rgba(22,163,74,0.15)" : "rgba(200,160,80,0.12)",
                      border: isOpen ? "1px solid rgba(22,163,74,0.3)" : "1px solid rgba(200,160,80,0.22)",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  >
                    <ChevronDown
                      className="h-3.5 w-3.5 transition-colors"
                      style={{ color: isOpen ? "#16a34a" : "#8b6644" }}
                    />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 animate-slide-up">
                    <div className="h-px bg-gradient-to-r from-forest-200/60 via-gold-200/40 to-transparent mb-4" />
                    <p className="text-sm text-earth-500 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <div
            className="inline-block rounded-2xl px-8 py-6"
            style={{
              background: "rgba(255,252,248,0.62)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(200,160,80,0.25)",
              boxShadow: "0 4px 24px rgba(139,90,40,0.1)",
            }}
          >
            <p className="text-earth-600 mb-3 text-sm">Still have questions?</p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 btn-gradient px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
