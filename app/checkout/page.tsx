"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/store/cart-store";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { sendOrderToWhatsApp, formatPaymentMethod } from "@/lib/whatsapp-notifications";
import { CreditCard, Smartphone, CheckCircle, ChevronLeft, Package } from "lucide-react";

const glassPanel = {
  background: "rgba(255,252,248,0.68)",
  backdropFilter: "blur(22px) saturate(1.4)",
  WebkitBackdropFilter: "blur(22px) saturate(1.4)",
  border: "1px solid rgba(200,160,80,0.28)",
  boxShadow: "0 8px 32px rgba(139,90,40,0.1), inset 0 1px 0 rgba(255,255,255,0.65)",
};

const inputClass = "glass-input w-full px-4 py-2.5 rounded-xl text-sm text-earth-800 placeholder-earth-400";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const total = getTotalPrice();
  const shipping = total > 200000 ? 0 : 10000;
  const finalTotal = total + shipping;

  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "", address: "", city: "", region: "",
  });

  if (typeof window !== "undefined" && items.length === 0 && !orderPlaced) {
    router.push("/cart");
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }
    const orderId = `ORD-${Date.now()}`;
    const orderDetails = {
      orderId,
      customerName: `${formData.firstName} ${formData.lastName}`,
      customerPhone: formData.phone,
      customerEmail: formData.email,
      items: items.map((item) => ({
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price * item.quantity,
      })),
      total: finalTotal,
      shipping,
      shippingAddress: `${formData.address}, ${formData.city}, ${formData.region}`,
      paymentMethod: formatPaymentMethod(paymentMethod),
    };
    sendOrderToWhatsApp(orderDetails);
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex items-center justify-center py-16 px-4">
        <div className="rounded-3xl p-10 max-w-md w-full text-center animate-scale-in" style={glassPanel}>
          <div
            className="h-20 w-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{ background: "rgba(22,163,74,0.12)", border: "1px solid rgba(22,163,74,0.25)", boxShadow: "0 0 32px rgba(22,163,74,0.2)" }}
          >
            <CheckCircle className="h-10 w-10 text-forest-600" />
          </div>
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-forest-600 mb-4"
            style={{ background: "rgba(22,163,74,0.1)", border: "1px solid rgba(22,163,74,0.22)" }}
          >
            <Package className="h-3 w-3" /> Order Confirmed
          </div>
          <h1 className="text-2xl font-bold text-earth-800 mb-3">Order Placed Successfully!</h1>
          <p className="text-earth-500 text-sm mb-2 leading-relaxed">
            Thank you! Your order details have been sent to our team via WhatsApp.
          </p>
          <p className="text-earth-400 text-xs mb-8">
            We&apos;ll contact you shortly to confirm and arrange delivery.
          </p>
          <div className="space-y-3">
            <Button onClick={() => router.push("/account")} className="w-full">
              View Orders
            </Button>
            <Button onClick={() => router.push("/")} variant="outline" className="w-full">
              Continue Shopping
            </Button>
          </div>
          <p className="mt-6 text-xs text-earth-400">
            Need help?{" "}
            <a href="tel:+256753222207" className="text-forest-600 hover:underline font-medium">
              +256 753 222 207
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 relative">
      {/* Ambient orb */}
      <div className="fixed top-1/4 left-0 w-64 h-64 rounded-full pointer-events-none opacity-12"
        style={{ background: "radial-gradient(circle, rgba(22,163,74,0.4), transparent)", filter: "blur(60px)" }} />

      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-gradient-earth mb-8">Checkout</h1>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-4 mb-10">
          {[1, 2].map((s) => (
            <div key={s} className="flex items-center gap-3">
              <div
                className="h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300"
                style={
                  step >= s
                    ? { background: "linear-gradient(135deg, #16a34a, #15803d)", color: "white", boxShadow: "0 4px 14px rgba(22,163,74,0.4)" }
                    : { background: "rgba(200,160,80,0.1)", border: "1px solid rgba(200,160,80,0.25)", color: "#8b6644" }
                }
              >
                {s}
              </div>
              <span className={`text-sm font-medium hidden sm:block ${step >= s ? "text-forest-700" : "text-earth-400"}`}>
                {s === 1 ? "Shipping" : "Payment"}
              </span>
              {s < 2 && (
                <div className="w-16 h-px" style={{ background: step >= 2 ? "linear-gradient(90deg, #16a34a, #15803d)" : "rgba(200,160,80,0.2)" }} />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="rounded-2xl p-6 space-y-5" style={glassPanel}>
              {step === 1 ? (
                <>
                  <h2 className="text-lg font-semibold text-earth-800">Shipping Information</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <input className={inputClass} placeholder="First Name" required
                      value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
                    <input className={inputClass} placeholder="Last Name" required
                      value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
                  </div>
                  <input type="email" className={inputClass} placeholder="Email address" required
                    value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                  <input type="tel" className={inputClass} placeholder="Phone number" required
                    value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                  <input className={inputClass} placeholder="Street address" required
                    value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                  <div className="grid grid-cols-2 gap-4">
                    <input className={inputClass} placeholder="City" required
                      value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
                    <input className={inputClass} placeholder="Region" required
                      value={formData.region} onChange={(e) => setFormData({ ...formData, region: e.target.value })} />
                  </div>
                  <Button type="submit" size="lg" className="w-full">
                    Continue to Payment
                  </Button>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-2">
                    <button type="button" onClick={() => setStep(1)}
                      className="h-8 w-8 flex items-center justify-center rounded-lg text-earth-500 hover:bg-earth-100/70 transition-colors">
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <h2 className="text-lg font-semibold text-earth-800">Payment Method</h2>
                  </div>

                  <div className="space-y-3">
                    {[
                      { id: "card",   Icon: CreditCard,  label: "Credit / Debit Card" },
                      { id: "mpesa",  Icon: Smartphone,  label: "M-Pesa" },
                      { id: "airtel", Icon: Smartphone,  label: "Airtel Money" },
                    ].map(({ id, Icon, label }) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setPaymentMethod(id)}
                        className="w-full p-4 rounded-xl flex items-center gap-3 transition-all duration-200"
                        style={
                          paymentMethod === id
                            ? { background: "rgba(22,163,74,0.1)", border: "1px solid rgba(22,163,74,0.35)", boxShadow: "0 0 0 3px rgba(22,163,74,0.08)" }
                            : { background: "rgba(255,252,248,0.5)", border: "1px solid rgba(200,160,80,0.22)" }
                        }
                      >
                        <div
                          className="h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={paymentMethod === id
                            ? { background: "rgba(22,163,74,0.15)", border: "1px solid rgba(22,163,74,0.3)" }
                            : { background: "rgba(200,160,80,0.1)", border: "1px solid rgba(200,160,80,0.2)" }}
                        >
                          <Icon className="h-4 w-4" style={{ color: paymentMethod === id ? "#16a34a" : "#8b6644" }} />
                        </div>
                        <span className="font-semibold text-sm" style={{ color: paymentMethod === id ? "#15803d" : "#5c4432" }}>
                          {label}
                        </span>
                        {paymentMethod === id && (
                          <div className="ml-auto h-4 w-4 rounded-full flex items-center justify-center"
                            style={{ background: "linear-gradient(135deg, #16a34a, #15803d)" }}>
                            <div className="h-1.5 w-1.5 rounded-full bg-white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>

                  {paymentMethod === "card" && (
                    <div className="space-y-3 pt-1 animate-slide-up">
                      <input className={inputClass} placeholder="Card number" required />
                      <div className="grid grid-cols-2 gap-3">
                        <input className={inputClass} placeholder="MM / YY" required />
                        <input className={inputClass} placeholder="CVV" required />
                      </div>
                    </div>
                  )}
                  {(paymentMethod === "mpesa" || paymentMethod === "airtel") && (
                    <div className="animate-slide-up">
                      <input className={inputClass} placeholder="Mobile number" required />
                    </div>
                  )}

                  <div className="flex gap-3 pt-1">
                    <Button type="button" variant="outline" size="lg" className="flex-1" onClick={() => setStep(1)}>
                      Back
                    </Button>
                    <Button type="submit" size="lg" className="flex-1">
                      Place Order
                    </Button>
                  </div>
                </>
              )}
            </form>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl p-5 sticky top-24" style={glassPanel}>
              <h3 className="font-semibold text-earth-800 mb-4 text-sm">Order Summary</h3>
              <div className="space-y-2 mb-4 max-h-48 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                    className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-earth-100 flex-shrink-0">
                      <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-earth-800 line-clamp-1">{item.product.name}</p>
                      <p className="text-xs text-earth-400">×{item.quantity}</p>
                    </div>
                    <p className="text-xs font-semibold text-earth-700">{formatPrice(item.product.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-2 pt-3" style={{ borderTop: "1px solid rgba(200,160,80,0.2)" }}>
                <div className="flex justify-between text-xs">
                  <span className="text-earth-500">Subtotal</span>
                  <span className="text-earth-700 font-medium">{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-earth-500">Shipping</span>
                  <span className={shipping === 0 ? "text-forest-600 font-medium" : "text-earth-700 font-medium"}>
                    {shipping === 0 ? "Free" : formatPrice(shipping)}
                  </span>
                </div>
                <div
                  className="flex justify-between py-2 px-3 rounded-lg mt-1"
                  style={{ background: "rgba(22,163,74,0.08)", border: "1px solid rgba(22,163,74,0.16)" }}
                >
                  <span className="font-bold text-sm text-earth-800">Total</span>
                  <span className="font-bold text-sm text-forest-700">{formatPrice(finalTotal)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
