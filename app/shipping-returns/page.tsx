export default function ShippingReturnsPage() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-8">Shipping & Returns</h1>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Shipping Policy</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We are committed to delivering your orders quickly and safely. Here's what you need to know about our shipping:
                </p>
                <ul className="space-y-2 ml-6">
                  <li className="list-disc">
                    <strong>Free Shipping:</strong> Orders over UGX 200,000 qualify for free standard shipping within Uganda
                  </li>
                  <li className="list-disc">
                    <strong>Standard Shipping:</strong> 3-5 business days (UGX 10,000)
                  </li>
                  <li className="list-disc">
                    <strong>Express Shipping:</strong> 1-2 business days (UGX 25,000)
                  </li>
                  <li className="list-disc">
                    <strong>Processing Time:</strong> Orders are processed within 1-2 business days
                  </li>
                </ul>
                <p>
                  You will receive a tracking number via email once your order ships. Please ensure your shipping address is correct as we cannot redirect packages once shipped.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Returns & Exchanges</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We want you to be completely satisfied with your purchase. If you're not happy with your order, we're here to help.
                </p>
                <h3 className="font-semibold text-foreground">Return Eligibility</h3>
                <ul className="space-y-2 ml-6">
                  <li className="list-disc">Items must be returned within 14 days of delivery</li>
                  <li className="list-disc">Items must be unused and in original condition</li>
                  <li className="list-disc">Original tags and packaging must be intact</li>
                  <li className="list-disc">Custom or personalized items cannot be returned</li>
                </ul>

                <h3 className="font-semibold text-foreground mt-6">How to Return</h3>
                <ol className="space-y-2 ml-6">
                  <li className="list-decimal">Contact our customer service team at info@nakasogatextiles.com</li>
                  <li className="list-decimal">Provide your order number and reason for return</li>
                  <li className="list-decimal">We'll send you return instructions and a return label</li>
                  <li className="list-decimal">Pack the item securely and ship it back</li>
                  <li className="list-decimal">Refund will be processed within 5-7 business days after we receive the item</li>
                </ol>

                <h3 className="font-semibold text-foreground mt-6">Exchanges</h3>
                <p>
                  If you need a different size or color, we're happy to exchange your item. Contact us and we'll arrange the exchange at no additional cost.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Damaged or Defective Items</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  If you receive a damaged or defective item, please contact us immediately with photos of the damage. We'll arrange for a replacement or full refund at no cost to you.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <div className="space-y-2 text-muted-foreground">
                <p>For any questions about shipping or returns, please contact us:</p>
                <p>Email: Idriisakimbgwe@yahoo.com</p>
                <p>Phone: +256 753 222 207 / +256 779 905 060</p>
                <p className="mt-4">
                  <strong>Visit Our Stores:</strong><br />
                  Magoba Arcade - Shop K-02<br />
                  City Mall - Shop P3-524<br />
                  City Mall - Shop P5-795
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
