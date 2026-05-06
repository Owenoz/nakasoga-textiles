"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/store/cart-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/utils";
import { sendOrderToWhatsApp, formatPaymentMethod } from "@/lib/whatsapp-notifications";
import { CreditCard, Smartphone, CheckCircle } from "lucide-react";

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
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    region: "",
  });

  // Redirect to cart if empty (using useEffect to avoid SSR issues)
  if (typeof window !== 'undefined' && items.length === 0 && !orderPlaced) {
    router.push("/cart");
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      // Generate order ID
      const orderId = `ORD-${Date.now()}`;
      
      // Prepare order details for WhatsApp
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

      // Send order to admin via WhatsApp
      sendOrderToWhatsApp(orderDetails);

      // Mark order as placed and clear cart
      setOrderPlaced(true);
      clearCart();
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-earth-50 flex items-center justify-center py-16 px-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-lg">
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">Order Placed Successfully!</h1>
          <p className="text-muted-foreground mb-2 leading-relaxed">
            Thank you for your order! Your order details have been sent to our team via WhatsApp.
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            We'll contact you shortly to confirm your order and arrange delivery.
          </p>
          <div className="space-y-3">
            <Button
              onClick={() => router.push("/account")}
              className="w-full bg-gradient-to-r from-forest-600 to-forest-700 hover:from-forest-700 hover:to-forest-800 shadow-md"
            >
              View Orders
            </Button>
            <Button onClick={() => router.push("/")} variant="outline" className="w-full hover:bg-forest-50">
              Continue Shopping
            </Button>
          </div>
          <div className="mt-6 pt-6 border-t">
            <p className="text-xs text-muted-foreground">
              Need help? Contact us at{" "}
              <a href="tel:+256753222207" className="text-forest-600 hover:underline font-medium">
                +256 753 222 207
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-earth-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-8">Checkout</h1>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                step >= 1 ? "bg-forest-600 text-white" : "bg-gray-300"
              }`}
            >
              1
            </div>
            <div className={`w-24 h-1 ${step >= 2 ? "bg-forest-600" : "bg-gray-300"}`} />
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                step >= 2 ? "bg-forest-600 text-white" : "bg-gray-300"
              }`}
            >
              2
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 space-y-6">
              {step === 1 ? (
                <>
                  <h2 className="text-xl font-semibold">Shipping Information</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="First Name"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    />
                    <Input
                      placeholder="Last Name"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    />
                  </div>
                  <Input
                    type="email"
                    placeholder="Email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  <Input
                    type="tel"
                    placeholder="Phone Number"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                  <Input
                    placeholder="Address"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="City"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    />
                    <Input
                      placeholder="Region"
                      required
                      value={formData.region}
                      onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full bg-forest-600 hover:bg-forest-700">
                    Continue to Payment
                  </Button>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-semibold">Payment Method</h2>
                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={`w-full p-4 border-2 rounded-lg flex items-center gap-3 transition-colors ${
                        paymentMethod === "card" ? "border-forest-600 bg-forest-50" : "border-gray-200"
                      }`}
                    >
                      <CreditCard className="h-6 w-6" />
                      <span className="font-semibold">Credit/Debit Card</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("mpesa")}
                      className={`w-full p-4 border-2 rounded-lg flex items-center gap-3 transition-colors ${
                        paymentMethod === "mpesa" ? "border-forest-600 bg-forest-50" : "border-gray-200"
                      }`}
                    >
                      <Smartphone className="h-6 w-6" />
                      <span className="font-semibold">M-Pesa</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("airtel")}
                      className={`w-full p-4 border-2 rounded-lg flex items-center gap-3 transition-colors ${
                        paymentMethod === "airtel" ? "border-forest-600 bg-forest-50" : "border-gray-200"
                      }`}
                    >
                      <Smartphone className="h-6 w-6" />
                      <span className="font-semibold">Airtel Money</span>
                    </button>
                  </div>

                  {paymentMethod === "card" && (
                    <div className="space-y-4 pt-4">
                      <Input placeholder="Card Number" required />
                      <div className="grid grid-cols-2 gap-4">
                        <Input placeholder="MM/YY" required />
                        <Input placeholder="CVV" required />
                      </div>
                    </div>
                  )}

                  {(paymentMethod === "mpesa" || paymentMethod === "airtel") && (
                    <div className="pt-4">
                      <Input placeholder="Mobile Number" required />
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      className="flex-1"
                      onClick={() => setStep(1)}
                    >
                      Back
                    </Button>
                    <Button type="submit" size="lg" className="flex-1 bg-forest-600 hover:bg-forest-700">
                      Place Order
                    </Button>
                  </div>
                </>
              )}
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                    className="flex justify-between text-sm"
                  >
                    <span className="line-clamp-1">
                      {item.product.name} x{item.quantity}
                    </span>
                    <span className="font-semibold">{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t">
                  <span>Total</span>
                  <span className="text-forest-700">{formatPrice(finalTotal)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
