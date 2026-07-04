"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCartStore } from "@/lib/store/cart-store";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { Trash2, ShoppingBag, Tag, ChevronRight, X } from "lucide-react";

const promoCodes: Record<string, { discount: number; type: "percentage" | "fixed" }> = {
  "WELCOME10":   { discount: 10,    type: "percentage" },
  "SAVE20K":     { discount: 20000, type: "fixed" },
  "NEWCUSTOMER": { discount: 15,    type: "percentage" },
};

const glassPanel = {
  background: "rgba(255,252,248,0.68)",
  backdropFilter: "blur(22px) saturate(1.4)",
  WebkitBackdropFilter: "blur(22px) saturate(1.4)",
  border: "1px solid rgba(200,160,80,0.28)",
  boxShadow: "0 8px 32px rgba(139,90,40,0.1), inset 0 1px 0 rgba(255,255,255,0.65)",
};

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState("");

  const subtotal = getTotalPrice();
  const shipping = subtotal > 200000 ? 0 : 10000;

  let discount = 0;
  if (appliedPromo && promoCodes[appliedPromo]) {
    const promo = promoCodes[appliedPromo];
    discount = promo.type === "percentage"
      ? Math.round((subtotal * promo.discount) / 100)
      : promo.discount;
  }

  const finalTotal = subtotal - discount + shipping;

  const handleApplyPromo = () => {
    const code = promoCode.toUpperCase().trim();
    if (promoCodes[code]) {
      setAppliedPromo(code);
      setPromoError("");
      setPromoCode("");
    } else {
      setPromoError("Invalid promo code");
      setTimeout(() => setPromoError(""), 3000);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center py-16 px-4">
        <div
          className="text-center rounded-3xl p-12 max-w-sm w-full"
          style={glassPanel}
        >
          <div
            className="h-20 w-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{ background: "rgba(200,160,80,0.12)", border: "1px solid rgba(200,160,80,0.25)" }}
          >
            <ShoppingBag className="h-10 w-10 text-earth-400" />
          </div>
          <h1 className="text-2xl font-bold text-earth-800 mb-2">Your cart is empty</h1>
          <p className="text-earth-500 mb-8 text-sm">Add some items to get started</p>
          <Link href="/shop">
            <Button size="lg" className="w-full">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 relative">
      {/* Ambient orbs */}
      <div className="fixed top-1/3 right-0 w-64 h-64 rounded-full pointer-events-none opacity-12"
        style={{ background: "radial-gradient(circle, rgba(245,158,11,0.4), transparent)", filter: "blur(60px)" }} />

      <div className="container mx-auto px-4">
        {/* Page title */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-gradient-earth">Shopping Cart</h1>
          <p className="text-earth-500 text-sm mt-1">{items.length} {items.length === 1 ? "item" : "items"} in your cart</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-3">
            {items.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                className="rounded-2xl p-4 flex gap-4 group transition-all duration-300 hover:-translate-y-0.5"
                style={glassPanel}
              >
                {/* Image */}
                <Link href={`/products/${item.product.slug}`} className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-earth-100">
                  <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                </Link>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <Link href={`/products/${item.product.slug}`}
                    className="font-semibold text-sm text-earth-800 hover:text-forest-700 transition-colors line-clamp-2 leading-snug">
                    {item.product.name}
                  </Link>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span
                      className="text-xs px-2 py-0.5 rounded-full text-earth-500"
                      style={{ background: "rgba(200,160,80,0.1)", border: "1px solid rgba(200,160,80,0.2)" }}
                    >
                      {item.selectedColor}
                    </span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full text-earth-500"
                      style={{ background: "rgba(200,160,80,0.1)", border: "1px solid rgba(200,160,80,0.2)" }}
                    >
                      {item.selectedSize}
                    </span>
                  </div>
                  <p className="font-bold text-forest-700 text-sm mt-2">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                </div>

                {/* Controls */}
                <div className="flex flex-col items-end justify-between gap-2">
                  <button
                    onClick={() => removeItem(item.product.id, item.selectedColor, item.selectedSize)}
                    className="h-7 w-7 flex items-center justify-center rounded-lg text-earth-400 hover:text-red-500 hover:bg-red-50 transition-all"
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>

                  {/* Quantity */}
                  <div
                    className="flex items-center rounded-xl overflow-hidden"
                    style={{ border: "1px solid rgba(200,160,80,0.28)", background: "rgba(255,252,248,0.7)" }}
                  >
                    <button
                      onClick={() => updateQuantity(item.product.id, item.selectedColor, item.selectedSize, item.quantity - 1)}
                      className="w-7 h-7 flex items-center justify-center text-earth-600 hover:bg-earth-100/70 text-sm font-medium transition-colors"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm font-semibold text-earth-800">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.selectedColor, item.selectedSize, item.quantity + 1)}
                      className="w-7 h-7 flex items-center justify-center text-earth-600 hover:bg-earth-100/70 text-sm font-medium transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl p-6 sticky top-24" style={glassPanel}>
              <h2 className="text-lg font-semibold text-earth-800 mb-5">Order Summary</h2>

              {/* Promo code */}
              <div className="mb-5 pb-5" style={{ borderBottom: "1px solid rgba(200,160,80,0.2)" }}>
                <label className="block text-sm font-medium text-earth-700 mb-2">Promo Code</label>
                {appliedPromo ? (
                  <div
                    className="flex items-center justify-between p-3 rounded-xl"
                    style={{ background: "rgba(22,163,74,0.08)", border: "1px solid rgba(22,163,74,0.22)" }}
                  >
                    <div className="flex items-center gap-2">
                      <Tag className="h-3.5 w-3.5 text-forest-600" />
                      <span className="text-sm font-semibold text-forest-700">{appliedPromo}</span>
                    </div>
                    <button onClick={() => setAppliedPromo(null)}
                      className="h-5 w-5 flex items-center justify-center rounded-full text-red-400 hover:bg-red-50 transition-colors">
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      placeholder="Enter code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      onKeyPress={(e) => e.key === "Enter" && handleApplyPromo()}
                      className="glass-input flex-1 px-3 py-2 rounded-xl text-sm"
                    />
                    <Button onClick={handleApplyPromo} variant="outline" size="sm" className="px-4">
                      Apply
                    </Button>
                  </div>
                )}
                {promoError && (
                  <p className="text-xs text-red-500 mt-1.5">{promoError}</p>
                )}
              </div>

              {/* Line items */}
              <div className="space-y-2.5 mb-5">
                <div className="flex justify-between text-sm">
                  <span className="text-earth-500">Subtotal</span>
                  <span className="font-semibold text-earth-800">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-forest-600">
                    <span>Discount</span>
                    <span className="font-semibold">−{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-earth-500">Shipping</span>
                  <span className="font-semibold text-earth-800">
                    {shipping === 0 ? (
                      <span className="text-forest-600">Free</span>
                    ) : formatPrice(shipping)}
                  </span>
                </div>
                {subtotal < 200000 && (
                  <p className="text-xs text-terracotta-600 pt-1">
                    Add {formatPrice(200000 - subtotal)} more for free shipping
                  </p>
                )}
              </div>

              {/* Total */}
              <div
                className="flex justify-between items-center py-3 mb-5 rounded-xl px-3"
                style={{ background: "rgba(22,163,74,0.08)", border: "1px solid rgba(22,163,74,0.18)" }}
              >
                <span className="font-bold text-earth-800">Total</span>
                <span className="text-xl font-bold text-forest-700">{formatPrice(finalTotal)}</span>
              </div>

              <Link href="/checkout">
                <Button size="lg" className="w-full">
                  Checkout <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
              <Link href="/shop">
                <Button variant="ghost" size="sm" className="w-full mt-2 text-earth-500">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
