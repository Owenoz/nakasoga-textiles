// WhatsApp notification utility for admin order notifications

const ADMIN_WHATSAPP = "256753222207"; // Admin WhatsApp number

interface OrderDetails {
  orderId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  shipping: number;
  shippingAddress: string;
  paymentMethod: string;
}

export function sendOrderToWhatsApp(orderDetails: OrderDetails) {
  // Format order message
  const itemsList = orderDetails.items
    .map((item) => `• ${item.name} x${item.quantity} - UGX ${item.price.toLocaleString()}`)
    .join("\n");

  const message = `
🛍️ *NEW ORDER RECEIVED*

📋 *Order ID:* ${orderDetails.orderId}

👤 *Customer Details:*
Name: ${orderDetails.customerName}
Phone: ${orderDetails.customerPhone}
Email: ${orderDetails.customerEmail}

📦 *Items Ordered:*
${itemsList}

💰 *Order Summary:*
Subtotal: UGX ${(orderDetails.total - orderDetails.shipping).toLocaleString()}
Shipping: ${orderDetails.shipping === 0 ? "Free" : `UGX ${orderDetails.shipping.toLocaleString()}`}
*Total: UGX ${orderDetails.total.toLocaleString()}*

📍 *Delivery Address:*
${orderDetails.shippingAddress}

💳 *Payment Method:* ${orderDetails.paymentMethod}

---
Nakasoga Textile Centre
  `.trim();

  // Encode message for WhatsApp URL
  const encodedMessage = encodeURIComponent(message);
  
  // Create WhatsApp URL
  const whatsappUrl = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodedMessage}`;
  
  // Open WhatsApp in new window
  window.open(whatsappUrl, "_blank");
}

export function formatPaymentMethod(method: string): string {
  const methods: Record<string, string> = {
    card: "Credit/Debit Card",
    mpesa: "M-Pesa",
    airtel: "Airtel Money",
  };
  return methods[method] || method;
}
