"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCartStore } from "@/lib/store/cart-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/utils";
import { Trash2, ShoppingBag, Tag } from "lucide-react";

// Sample promo codes
const promoCodes: Record<string, { discount: number; type: "percentage" | "fixed" }> = {
  "WELCOME10": { discount: 10, type: "percentage" },
  "SAVE20K": { discount: 20000, type: "fixed" },
  "NEWCUSTOMER": { discount: 15, type: "percentage" },
};

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState("");

  const subtotal = getTotalPrice();
  const shipping = subtotal > 200000 ? 0 : 10000;

  // Calculate discount
  let discount = 0;
  if (appliedPromo && promoCodes[appliedPromo]) {
    const promo = promoCodes[appliedPromo];
    if (promo.type === "percentage") {
      discount = Math.round((subtotal * promo.discount) / 100);
    } else {
      discount = promo.discount;
    }
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

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoCode("");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-earth-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="h-24 w-24 mx-auto mb-4 text-muted-foreground" />
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">Add some items to get started</p>
          <Link href="/shop">
            <Button size="lg" className="bg-forest-600 hover:bg-forest-700">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-earth-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                className="bg-white rounded-lg p-4 flex gap-4"
              >
                <div className="relative w-24 h-24 flex-shrink-0 rounded-md overflow-hidden bg-earth-100">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <Link
                    href={`/products/${item.product.slug}`}
                    className="font-semibold hover:text-forest-600 line-clamp-2"
                  >
                    {item.product.name}
                  </Link>
                  <p className="text-sm text-muted-foreground mt-1">
                    Color: {item.selectedColor} | Size: {item.selectedSize}
                  </p>
                  <p className="font-semibold text-forest-700 mt-2">
                    {formatPrice(item.product.price)}
                  </p>
                </div>

                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() =>
                      removeItem(item.product.id, item.selectedColor, item.selectedSize)
                    }
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>

                  <div className="flex items-center gap-2 border rounded-md">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          item.selectedColor,
                          item.selectedSize,
                          item.quantity - 1
                        )
                      }
                      className="w-8 h-8 hover:bg-earth-100"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          item.selectedColor,
                          item.selectedSize,
                          item.quantity + 1
                        )
                      }
                      className="w-8 h-8 hover:bg-earth-100"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

              {/* Promo Code */}
              <div className="mb-4 pb-4 border-b">
                <label className="block text-sm font-medium mb-2">Promo Code</label>
                {appliedPromo ? (
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-md">
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-600">{appliedPromo}</span>
                    </div>
                    <button
                      onClick={handleRemovePromo}
                      className="text-sm text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      onKeyPress={(e) => e.key === "Enter" && handleApplyPromo()}
                    />
                    <Button onClick={handleApplyPromo} variant="outline">
                      Apply
                    </Button>
                  </div>
                )}
                {promoError && (
                  <p className="text-sm text-red-600 mt-2">{promoError}</p>
                )}
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span className="font-semibold">-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? "Free" : formatPrice(shipping)}
                  </span>
                </div>
                {subtotal < 200000 && (
                  <p className="text-xs text-terracotta-600">
                    Add {formatPrice(200000 - subtotal)} more for free shipping
                  </p>
                )}
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-forest-700">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              <Link href="/checkout">
                <Button size="lg" className="w-full bg-forest-600 hover:bg-forest-700 font-semibold">
                  Proceed to Checkout
                </Button>
              </Link>

              <Link href="/shop">
                <Button variant="outline" size="lg" className="w-full mt-3">
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
