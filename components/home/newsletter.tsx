"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate subscription
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <section className="py-16 bg-gradient-to-r from-forest-700 to-forest-600 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <Mail className="h-12 w-12 mx-auto mb-4 text-gold-400" />
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Join Our Community
          </h2>
          <p className="text-lg mb-8 text-forest-100">
            Subscribe to get special offers, free giveaways, and exclusive deals
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white text-black flex-1"
            />
            <Button type="submit" size="lg" className="bg-gold-500 hover:bg-gold-600 text-white font-semibold">
              Subscribe
            </Button>
          </form>

          {subscribed && (
            <p className="mt-4 text-gold-300 animate-fade-in">
              Thank you for subscribing! Check your email for exclusive offers.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
