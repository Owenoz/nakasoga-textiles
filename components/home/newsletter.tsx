"use client";

import { useState } from "react";
import { Mail, Sparkles } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-mesh-forest" />

      {/* Decorative orbs */}
      <div className="orb orb-gold absolute -top-16 left-1/4 w-48 h-48 opacity-25" />
      <div className="orb orb-amber absolute bottom-0 right-1/4 w-40 h-40 opacity-20" />

      {/* Sheen lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-forest-400/30 to-transparent" />

      <div className="relative container mx-auto px-4">
        <div className="max-w-xl mx-auto text-center">
          {/* Icon */}
          <div
            className="inline-flex items-center justify-center h-16 w-16 rounded-2xl mx-auto mb-6 animate-float"
            style={{
              background: "rgba(255,220,100,0.18)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(245,158,11,0.35)",
              boxShadow: "0 0 30px rgba(245,158,11,0.25)",
            }}
          >
            <Mail className="h-7 w-7 text-gold-300" />
          </div>

          {/* Heading */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-gold-300 mb-4"
            style={{
              background: "rgba(245,158,11,0.15)",
              border: "1px solid rgba(245,158,11,0.25)",
            }}
          >
            <Sparkles className="h-3 w-3" /> Exclusive Offers
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-3">
            Join Our Community
          </h2>
          <p className="text-forest-100/80 mb-8 leading-relaxed">
            Subscribe for special offers, new arrivals, and exclusive deals on authentic African textiles.
          </p>

          {/* Form */}
          {subscribed ? (
            <div
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold text-gold-300 animate-scale-in"
              style={{
                background: "rgba(245,158,11,0.15)",
                border: "1px solid rgba(245,158,11,0.3)",
                backdropFilter: "blur(12px)",
              }}
            >
              <Sparkles className="h-4 w-4" />
              Thank you! Check your email for exclusive offers.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40 pointer-events-none" />
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder-white/40 focus:outline-none"
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1)",
                  }}
                  onFocus={(e) => {
                    e.target.style.border = "1px solid rgba(245,158,11,0.5)";
                    e.target.style.boxShadow = "0 0 0 3px rgba(245,158,11,0.15), inset 0 2px 4px rgba(0,0,0,0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.border = "1px solid rgba(255,255,255,0.2)";
                    e.target.style.boxShadow = "inset 0 2px 4px rgba(0,0,0,0.1)";
                  }}
                />
              </div>
              <button
                type="submit"
                className="btn-gradient-amber px-7 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all hover:-translate-y-0.5"
              >
                Subscribe
              </button>
            </form>
          )}

          <p className="mt-4 text-xs text-forest-200/50">
            No spam, ever. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
