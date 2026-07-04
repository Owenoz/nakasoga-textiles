"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Package, CheckCircle, Sparkles, Clock, Tag, Users } from "lucide-react";

const glassPanel = {
  background: "rgba(255,252,248,0.68)",
  backdropFilter: "blur(22px) saturate(1.4)",
  WebkitBackdropFilter: "blur(22px) saturate(1.4)",
  border: "1px solid rgba(200,160,80,0.28)",
  boxShadow: "0 8px 32px rgba(139,90,40,0.1), inset 0 1px 0 rgba(255,255,255,0.65)",
};

const inputClass = "glass-input w-full px-4 py-2.5 rounded-xl text-sm text-earth-800 placeholder-earth-400";

const stats = [
  { value: "10+",  label: "Min. Order Quantity", icon: Package, color: "rgba(245,158,11,0.15)", border: "rgba(245,158,11,0.3)", iconColor: "#f59e0b" },
  { value: "24h",  label: "Quote Response Time", icon: Clock,   color: "rgba(22,163,74,0.12)",  border: "rgba(22,163,74,0.28)",  iconColor: "#16a34a" },
  { value: "30%",  label: "Average Bulk Discount", icon: Tag,   color: "rgba(229,106,74,0.12)", border: "rgba(229,106,74,0.28)", iconColor: "#e56a4a" },
  { value: "500+", label: "Wholesale Clients", icon: Users,     color: "rgba(166,124,82,0.12)", border: "rgba(166,124,82,0.25)", iconColor: "#a67c52" },
];

const benefits = [
  "Special wholesale pricing",
  "Flexible payment terms",
  "Priority production & delivery",
  "Dedicated account manager",
  "Custom packaging options",
];

export default function BulkOrderPage() {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", company: "", productType: "", quantity: "", details: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `*BULK ORDER INQUIRY*\n\nName: ${formData.name}\nCompany: ${formData.company}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nProduct Type: ${formData.productType}\nQuantity: ${formData.quantity}\n\nDetails:\n${formData.details}`.trim();
    window.open(`https://wa.me/256753222207?text=${encodeURIComponent(message)}`, "_blank");
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", phone: "", company: "", productType: "", quantity: "", details: "" });
    }, 3000);
  };

  return (
    <div className="min-h-screen py-16 relative">
      {/* Ambient orbs */}
      <div className="fixed top-1/3 right-0 w-72 h-72 rounded-full pointer-events-none opacity-12"
        style={{ background: "radial-gradient(circle, rgba(245,158,11,0.4), transparent)", filter: "blur(65px)" }} />
      <div className="fixed bottom-1/4 left-0 w-60 h-60 rounded-full pointer-events-none opacity-10"
        style={{ background: "radial-gradient(circle, rgba(22,163,74,0.5), transparent)", filter: "blur(60px)" }} />

      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div className="text-center mb-12">
            <div
              className="inline-flex items-center justify-center h-16 w-16 rounded-2xl mx-auto mb-5 animate-float"
              style={{
                background: "rgba(22,163,74,0.12)",
                border: "1px solid rgba(22,163,74,0.28)",
                boxShadow: "0 0 28px rgba(22,163,74,0.18)",
              }}
            >
              <Package className="h-7 w-7 text-forest-600" />
            </div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-forest-600 mb-4"
              style={{ background: "rgba(22,163,74,0.1)", border: "1px solid rgba(22,163,74,0.22)" }}
            >
              <Sparkles className="h-3 w-3" /> Wholesale &amp; Bulk
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-gradient-earth">
              Bulk &amp; Wholesale Orders
            </h1>
            <p className="text-earth-500 max-w-2xl mx-auto leading-relaxed">
              Looking to order in bulk? We offer special pricing for wholesale customers, businesses, and large orders.
              Fill out the form below and we&apos;ll get back to you with a custom quote.
            </p>
            <div className="mt-5 mx-auto w-24 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
          </div>

          {/* Form area */}
          {submitted ? (
            <div className="rounded-2xl p-10 text-center animate-scale-in" style={glassPanel}>
              <div
                className="h-16 w-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                style={{ background: "rgba(22,163,74,0.12)", border: "1px solid rgba(22,163,74,0.25)", boxShadow: "0 0 24px rgba(22,163,74,0.2)" }}
              >
                <CheckCircle className="h-8 w-8 text-forest-600" />
              </div>
              <h2 className="text-2xl font-bold text-earth-800 mb-2">Request Sent!</h2>
              <p className="text-earth-500 mb-6 leading-relaxed">
                We&apos;ve received your bulk order inquiry. Our team will contact you shortly via WhatsApp or email.
              </p>
              <Button onClick={() => setSubmitted(false)} variant="outline">
                Submit Another Request
              </Button>
            </div>
          ) : (
            <div className="rounded-2xl p-8" style={glassPanel}>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-earth-700 mb-1.5">Full Name *</label>
                    <input className={inputClass} placeholder="John Doe" required
                      value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-earth-700 mb-1.5">Company Name</label>
                    <input className={inputClass} placeholder="Your Company Ltd"
                      value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-earth-700 mb-1.5">Email *</label>
                    <input type="email" className={inputClass} placeholder="your@email.com" required
                      value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-earth-700 mb-1.5">Phone Number *</label>
                    <input type="tel" className={inputClass} placeholder="+256 700 000 000" required
                      value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-earth-700 mb-1.5">Product Type *</label>
                    <select
                      className={inputClass}
                      required
                      value={formData.productType}
                      onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
                      style={{ appearance: "none", cursor: "pointer" }}
                    >
                      <option value="">Select product type</option>
                      <option value="Traditional Fabrics">Traditional Fabrics</option>
                      <option value="Ready-to-Wear">Ready-to-Wear Clothing</option>
                      <option value="Home Textiles">Home Textiles</option>
                      <option value="Accessories">Accessories</option>
                      <option value="Mixed">Mixed Products</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-earth-700 mb-1.5">Estimated Quantity *</label>
                    <input className={inputClass} placeholder="e.g., 100 pieces, 50 yards" required
                      value={formData.quantity} onChange={(e) => setFormData({ ...formData, quantity: e.target.value })} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-1.5">Additional Details *</label>
                  <textarea
                    className={`${inputClass} min-h-[130px] resize-none`}
                    placeholder="Specific products, colors, sizes, delivery timeline, etc."
                    required
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  />
                </div>

                {/* Benefits box */}
                <div
                  className="rounded-xl p-4"
                  style={{ background: "rgba(22,163,74,0.08)", border: "1px solid rgba(22,163,74,0.2)" }}
                >
                  <h3 className="font-semibold text-forest-700 mb-3 text-sm flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-forest-500" /> Bulk Order Benefits
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5">
                    {benefits.map((b) => (
                      <div key={b} className="flex items-center gap-2 text-sm text-earth-600">
                        <div className="h-1.5 w-1.5 rounded-full bg-forest-500 flex-shrink-0" />
                        {b}
                      </div>
                    ))}
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Submit Bulk Order Request
                </Button>

                <p className="text-xs text-center text-earth-400">
                  You&apos;ll be redirected to WhatsApp to complete your inquiry. We typically respond within 24 hours.
                </p>
              </form>
            </div>
          )}

          {/* Stats */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map(({ value, label, icon: Icon, color, border, iconColor }) => (
              <div
                key={label}
                className="rounded-2xl p-5 text-center transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "rgba(255,252,248,0.62)",
                  backdropFilter: "blur(18px)",
                  WebkitBackdropFilter: "blur(18px)",
                  border: `1px solid ${border}`,
                  boxShadow: `0 4px 16px ${color}, inset 0 1px 0 rgba(255,255,255,0.6)`,
                }}
              >
                <div className="h-10 w-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                  style={{ background: color, border: `1px solid ${border}` }}>
                  <Icon className="h-4 w-4" style={{ color: iconColor, width: "1.1rem", height: "1.1rem" }} />
                </div>
                <div className="text-2xl font-bold text-gradient-forest mb-1">{value}</div>
                <div className="text-xs text-earth-400 leading-tight">{label}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
