"use client";

import { MessageCircle } from "lucide-react";
import { useState } from "react";

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);
  
  // Your WhatsApp business numbers
  const phoneNumber = "256753222207"; // Format: country code + number (no + or spaces)
  const message = encodeURIComponent("Hello! I'm interested in your textiles. Can you help me?");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 flex items-center gap-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
      {isHovered && (
        <span className="text-sm font-medium whitespace-nowrap animate-fade-in">
          Chat with us
        </span>
      )}
    </a>
  );
}
