"use client";

import { MessageCircle } from "lucide-react";
import { useState } from "react";

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);

  const phoneNumber = "256753222207";
  const message = encodeURIComponent("Hello! I'm interested in your textiles. Can you help me?");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 transition-all duration-300"
      style={{
        background: isHovered
          ? "linear-gradient(135deg, #25d366, #128c7e)"
          : "linear-gradient(135deg, #25d366cc, #128c7ecc)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(37,211,102,0.4)",
        borderRadius: isHovered ? "1.25rem" : "50%",
        padding: isHovered ? "0.6rem 1rem 0.6rem 0.75rem" : "0.75rem",
        boxShadow: isHovered
          ? "0 8px 32px rgba(37,211,102,0.5), 0 2px 8px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.2)"
          : "0 4px 20px rgba(37,211,102,0.4), 0 2px 8px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.15)",
        transform: isHovered ? "translateY(-2px) scale(1.02)" : "translateY(0) scale(1)",
      }}
    >
      <MessageCircle
        className="flex-shrink-0 transition-transform duration-200"
        style={{
          width: "1.4rem",
          height: "1.4rem",
          color: "white",
          transform: isHovered ? "rotate(-5deg) scale(1.1)" : "none",
        }}
      />
      {isHovered && (
        <span className="text-sm font-semibold text-white whitespace-nowrap animate-fade-in">
          Chat with us
        </span>
      )}
    </a>
  );
}
