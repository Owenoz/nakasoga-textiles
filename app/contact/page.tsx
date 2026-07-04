"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Clock, Loader2, CheckCircle, Send } from "lucide-react";
import { sendContactEmail } from "@/app/actions/contact";

const contactInfo = [
  {
    icon: MapPin,
    title: "Our Locations",
    content: ["Magoba Arcade — Shop K-02", "City Mall — P3-524", "City Mall — P5-795"],
    color: "rgba(245,158,11,0.15)",
    border: "rgba(245,158,11,0.3)",
    iconColor: "#f59e0b",
  },
  {
    icon: Phone,
    title: "Phone",
    content: ["+256 753 222 207", "+256 779 905 060"],
    color: "rgba(22,163,74,0.12)",
    border: "rgba(22,163,74,0.28)",
    iconColor: "#16a34a",
  },
  {
    icon: Mail,
    title: "Email",
    content: ["Idriisakimbgwe@yahoo.com"],
    color: "rgba(229,106,74,0.12)",
    border: "rgba(229,106,74,0.28)",
    iconColor: "#e56a4a",
  },
  {
    icon: Clock,
    title: "Business Hours",
    content: ["Mon–Fri: 9:00 AM – 6:00 PM", "Saturday: 10:00 AM – 4:00 PM", "Sunday: Closed"],
    color: "rgba(166,124,82,0.12)",
    border: "rgba(166,124,82,0.25)",
    iconColor: "#a67c52",
  },
];

const glassPanel = {
  background: "rgba(255,252,248,0.65)",
  backdropFilter: "blur(22px) saturate(1.4)",
  WebkitBackdropFilter: "blur(22px) saturate(1.4)",
  border: "1px solid rgba(200,160,80,0.28)",
  boxShadow: "0 8px 32px rgba(139,90,40,0.12), inset 0 1px 0 rgba(255,255,255,0.65)",
};

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    const result = await sendContactEmail(formData);
    if (result.success) {
      setStatus("success");
      setStatusMessage(result.message);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } else {
      setStatus("error");
      setStatusMessage(result.message);
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <div className="min-h-screen py-16 relative">
      {/* Ambient orbs */}
      <div className="fixed top-1/4 left-0 w-72 h-72 rounded-full pointer-events-none opacity-20"
        style={{ background: "radial-gradient(circle, rgba(245,158,11,0.5), transparent)", filter: "blur(60px)" }} />
      <div className="fixed bottom-1/4 right-0 w-64 h-64 rounded-full pointer-events-none opacity-15"
        style={{ background: "radial-gradient(circle, rgba(22,163,74,0.5), transparent)", filter: "blur(55px)" }} />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-gold-600 mb-4"
            style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.22)" }}
          >
            <Mail className="h-3 w-3" /> Get In Touch
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-gradient-earth">Contact Us</h1>
          <p className="text-earth-500 max-w-2xl mx-auto leading-relaxed">
            Have a question? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
          </p>
          <div className="mt-5 mx-auto w-24 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">

          {/* Contact form */}
          <div className="rounded-2xl p-8" style={glassPanel}>
            <h2 className="text-xl font-semibold text-earth-800 mb-6 flex items-center gap-2">
              <Send className="h-5 w-5 text-forest-600" />
              Send us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { label: "Name", type: "text", key: "name", placeholder: "Your full name" },
                { label: "Email", type: "email", key: "email", placeholder: "your@email.com" },
                { label: "Subject", type: "text", key: "subject", placeholder: "How can we help?" },
              ].map(({ label, type, key, placeholder }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-earth-700 mb-1.5">{label}</label>
                  <input
                    type={type}
                    placeholder={placeholder}
                    required
                    value={formData[key as keyof typeof formData]}
                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                    disabled={status === "loading"}
                    className="glass-input w-full px-4 py-2.5 rounded-xl text-sm text-earth-800 placeholder-earth-400 disabled:opacity-50"
                  />
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium text-earth-700 mb-1.5">Message</label>
                <textarea
                  placeholder="Your message..."
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  disabled={status === "loading"}
                  className="glass-input w-full px-4 py-2.5 rounded-xl text-sm text-earth-800 placeholder-earth-400 disabled:opacity-50 resize-none"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={status === "loading"}
              >
                {status === "loading" ? (
                  <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Sending…</>
                ) : (
                  <><Send className="h-4 w-4 mr-2" /> Send Message</>
                )}
              </Button>

              {status === "success" && (
                <div className="flex items-center gap-2 p-3 rounded-xl text-sm text-forest-700 animate-scale-in"
                  style={{ background: "rgba(22,163,74,0.1)", border: "1px solid rgba(22,163,74,0.25)" }}>
                  <CheckCircle className="h-4 w-4 flex-shrink-0" />
                  {statusMessage}
                </div>
              )}
              {status === "error" && (
                <div className="flex items-center gap-2 p-3 rounded-xl text-sm text-red-600 animate-scale-in"
                  style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
                  {statusMessage}
                </div>
              )}
            </form>
          </div>

          {/* Contact info */}
          <div className="space-y-4">
            {contactInfo.map(({ icon: Icon, title, content, color, border, iconColor }) => (
              <div
                key={title}
                className="rounded-2xl p-5 flex items-start gap-4 transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: "rgba(255,252,248,0.62)",
                  backdropFilter: "blur(18px) saturate(1.4)",
                  WebkitBackdropFilter: "blur(18px) saturate(1.4)",
                  border: `1px solid ${border}`,
                  boxShadow: `0 4px 16px ${color}, inset 0 1px 0 rgba(255,255,255,0.65)`,
                }}
              >
                <div className="h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: color, border: `1px solid ${border}` }}>
                  <Icon className="h-4 w-4" style={{ color: iconColor, width: "1.1rem", height: "1.1rem" }} />
                </div>
                <div>
                  <h3 className="font-semibold text-earth-800 mb-1 text-sm">{title}</h3>
                  {content.map((line, i) => (
                    <p key={i} className="text-sm text-earth-500 leading-relaxed">{line}</p>
                  ))}
                </div>
              </div>
            ))}

            {/* WhatsApp quick contact */}
            <a
              href="https://wa.me/256753222207?text=Hello! I have a question about your textiles."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              style={{
                background: "rgba(37,211,102,0.1)",
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
                border: "1px solid rgba(37,211,102,0.28)",
                boxShadow: "0 4px 16px rgba(37,211,102,0.1), inset 0 1px 0 rgba(255,255,255,0.5)",
              }}
            >
              <div className="h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(37,211,102,0.2)", border: "1px solid rgba(37,211,102,0.35)" }}>
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#25d366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <div>
                <p className="font-semibold text-sm text-green-700">Chat on WhatsApp</p>
                <p className="text-xs text-green-600/70">Typically replies in minutes</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
