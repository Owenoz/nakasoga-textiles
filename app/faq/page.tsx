"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What payment methods do you accept?",
    answer: "We accept credit/debit cards (Visa, Mastercard), M-Pesa, and Airtel Money for your convenience.",
  },
  {
    question: "How long does shipping take?",
    answer: "Standard shipping within Uganda takes 3-5 business days. Express shipping is available for 1-2 business days delivery.",
  },
  {
    question: "Do you offer free shipping?",
    answer: "Yes! We offer free shipping on all orders over UGX 200,000 within Uganda.",
  },
  {
    question: "What is your return policy?",
    answer: "We accept returns within 14 days of delivery. Items must be unused and in original condition with tags attached.",
  },
  {
    question: "Are your fabrics authentic?",
    answer: "Absolutely! We source all our fabrics directly from trusted manufacturers and artisans to ensure authenticity and quality.",
  },
  {
    question: "Can I track my order?",
    answer: "Yes, once your order ships, you'll receive a tracking number via email to monitor your delivery.",
  },
  {
    question: "Do you ship internationally?",
    answer: "Currently, we ship within Uganda. International shipping will be available soon. Subscribe to our newsletter for updates.",
  },
  {
    question: "How do I care for my African textiles?",
    answer: "Care instructions vary by fabric type. Generally, we recommend cold water wash and air drying. Specific care instructions are provided with each product.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-earth-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our products, shipping, and policies
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-earth-50 transition-colors"
              >
                <span className="font-semibold">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 text-forest-600 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-muted-foreground animate-fade-in">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
