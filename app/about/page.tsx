import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-[400px] bg-earth-900">
        <Image
          src="/images/products/WhatsApp Image 2026-05-05 at 11.05.25.jpeg"
          alt="About Nakasoga Textile Centre"
          fill
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">About Us</h1>
            <p className="text-xl">Premium East African Textiles & Fashion</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto space-y-8">
          <div>
            <h2 className="text-3xl font-serif font-bold mb-4">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed">
              Nakasoga Textile Centre was founded with a passion for celebrating the rich heritage of East African textiles. 
              We believe that every fabric tells a story, and every pattern carries the soul of our culture. With locations 
              at Magoba Arcade and City Mall, we bring beautiful, high-quality fabrics, clothing, and home textiles with 
              African soul to our community and beyond.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-serif font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              We are committed to preserving traditional textile craftsmanship while embracing modern design. Every piece 
              in our collection is carefully selected or crafted to meet the highest standards of quality and authenticity. 
              We work directly with local artisans and manufacturers to ensure fair practices and sustainable production.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-serif font-bold mb-4">What We Offer</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start">
                <span className="text-forest-600 mr-2">•</span>
                <span>Authentic Ankara, Kitenge, and traditional East African fabrics</span>
              </li>
              <li className="flex items-start">
                <span className="text-forest-600 mr-2">•</span>
                <span>Ready-to-wear clothing for men and women</span>
              </li>
              <li className="flex items-start">
                <span className="text-forest-600 mr-2">•</span>
                <span>Beautiful home textiles including bedding, curtains, and decorative pieces</span>
              </li>
              <li className="flex items-start">
                <span className="text-forest-600 mr-2">•</span>
                <span>Unique accessories to complete your look</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-serif font-bold mb-4">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-earth-50 rounded-lg">
                <h3 className="font-semibold mb-2">Quality</h3>
                <p className="text-sm text-muted-foreground">
                  We never compromise on the quality of our products
                </p>
              </div>
              <div className="text-center p-6 bg-earth-50 rounded-lg">
                <h3 className="font-semibold mb-2">Authenticity</h3>
                <p className="text-sm text-muted-foreground">
                  Every piece celebrates genuine African heritage
                </p>
              </div>
              <div className="text-center p-6 bg-earth-50 rounded-lg">
                <h3 className="font-semibold mb-2">Sustainability</h3>
                <p className="text-sm text-muted-foreground">
                  We support ethical and sustainable practices
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
