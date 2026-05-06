"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Package, CheckCircle } from "lucide-react";

export default function BulkOrderPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    productType: "",
    quantity: "",
    details: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create WhatsApp message
    const message = `
*BULK ORDER INQUIRY*

Name: ${formData.name}
Company: ${formData.company}
Email: ${formData.email}
Phone: ${formData.phone}

Product Type: ${formData.productType}
Quantity: ${formData.quantity}

Details:
${formData.details}
    `.trim();

    // Open WhatsApp
    const whatsappUrl = `https://wa.me/256753222207?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        productType: "",
        quantity: "",
        details: "",
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-earth-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <Package className="h-16 w-16 mx-auto mb-4 text-forest-600" />
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Bulk & Wholesale Orders
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Looking to order in bulk? We offer special pricing for wholesale customers, 
              businesses, and large orders. Fill out the form below and we'll get back to you 
              with a custom quote.
            </p>
          </div>

          {submitted ? (
            <div className="bg-white rounded-lg p-8 text-center">
              <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-600" />
              <h2 className="text-2xl font-bold mb-2">Request Sent!</h2>
              <p className="text-muted-foreground mb-6">
                We've received your bulk order inquiry. Our team will contact you shortly 
                via WhatsApp or email with a custom quote.
              </p>
              <Button onClick={() => setSubmitted(false)} variant="outline">
                Submit Another Request
              </Button>
            </div>
          ) : (
            <div className="bg-white rounded-lg p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name *</label>
                    <Input
                      placeholder="John Doe"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Company Name</label>
                    <Input
                      placeholder="Your Company Ltd"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number *</label>
                    <Input
                      type="tel"
                      placeholder="+256 700 000 000"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Product Type *</label>
                    <select
                      className="w-full px-4 py-2 border rounded-md"
                      required
                      value={formData.productType}
                      onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
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
                    <label className="block text-sm font-medium mb-2">Estimated Quantity *</label>
                    <Input
                      placeholder="e.g., 100 pieces, 50 yards"
                      required
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Additional Details *
                  </label>
                  <textarea
                    className="w-full px-4 py-2 border rounded-md min-h-[150px]"
                    placeholder="Please provide details about your order: specific products, colors, sizes, delivery timeline, etc."
                    required
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  />
                </div>

                <div className="bg-forest-50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">💼 Bulk Order Benefits</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Special wholesale pricing</li>
                    <li>• Flexible payment terms</li>
                    <li>• Priority production & delivery</li>
                    <li>• Dedicated account manager</li>
                    <li>• Custom packaging options</li>
                  </ul>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-forest-600 hover:bg-forest-700 font-semibold"
                >
                  Submit Bulk Order Request
                </Button>

                <p className="text-sm text-center text-muted-foreground">
                  By submitting this form, you'll be redirected to WhatsApp to complete your inquiry.
                  Our team typically responds within 24 hours.
                </p>
              </form>
            </div>
          )}

          {/* Additional Info */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-forest-600 mb-2">10+</div>
              <div className="text-sm text-muted-foreground">Minimum Order Quantity</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-forest-600 mb-2">24h</div>
              <div className="text-sm text-muted-foreground">Quote Response Time</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-forest-600 mb-2">30%</div>
              <div className="text-sm text-muted-foreground">Average Bulk Discount</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
