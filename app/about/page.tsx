import Image from "next/image";
import { Shield, Leaf, Sparkles, Users, Award, Globe } from "lucide-react";

const values = [
  {
    icon: Award,
    title: "Quality",
    description: "We never compromise on the quality of our products — every piece is carefully inspected.",
    color: "rgba(245,158,11,0.15)",
    border: "rgba(245,158,11,0.3)",
    iconColor: "#f59e0b",
  },
  {
    icon: Sparkles,
    title: "Authenticity",
    description: "Every piece celebrates genuine African heritage, culture, and craftsmanship.",
    color: "rgba(229,106,74,0.12)",
    border: "rgba(229,106,74,0.28)",
    iconColor: "#e56a4a",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description: "We support ethical, fair-trade, and sustainable textile production practices.",
    color: "rgba(22,163,74,0.12)",
    border: "rgba(22,163,74,0.28)",
    iconColor: "#16a34a",
  },
];

const stats = [
  { value: "500+", label: "Products", icon: Sparkles },
  { value: "3", label: "Locations", icon: Globe },
  { value: "5k+", label: "Happy Customers", icon: Users },
  { value: "10+", label: "Years Experience", icon: Shield },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <div className="relative h-[420px] md:h-[500px] overflow-hidden">
        <Image
          src="/images/products/WhatsApp Image 2026-05-05 at 11.05.25.jpeg"
          alt="About Nakasoga Textile Centre"
          fill
          className="object-cover"
          priority
        />
        {/* Multi-layer overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/65" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

        {/* Decorative orbs */}
        <div className="absolute top-16 right-20 w-40 h-40 rounded-full opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(245,158,11,0.7), transparent)", filter: "blur(35px)" }} />
        <div className="absolute bottom-20 left-1/4 w-32 h-32 rounded-full opacity-15 pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(22,163,74,0.7), transparent)", filter: "blur(28px)" }} />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold text-gold-300 mb-5"
              style={{
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <Sparkles className="h-3 w-3" />
              Our Story
            </div>
            <h1
              className="text-4xl md:text-6xl font-serif font-bold mb-4"
              style={{ textShadow: "0 2px 24px rgba(0,0,0,0.4)" }}
            >
              About Us
            </h1>
            <p className="text-lg text-gray-200/90 max-w-xl mx-auto">
              Premium East African Textiles &amp; Fashion
            </p>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[hsl(var(--background))] to-transparent" />
      </div>

      {/* ── Stats strip ── */}
      <div className="container mx-auto px-4 -mt-6 relative z-10 mb-16">
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 rounded-2xl p-6"
          style={{
            background: "rgba(255,252,248,0.72)",
            backdropFilter: "blur(24px) saturate(1.4)",
            WebkitBackdropFilter: "blur(24px) saturate(1.4)",
            border: "1px solid rgba(200,160,80,0.3)",
            boxShadow: "0 12px 40px rgba(100,60,20,0.15), inset 0 1px 0 rgba(255,255,255,0.7)",
          }}
        >
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center py-2">
              <div className="text-2xl md:text-3xl font-bold text-gradient-forest mb-1">{value}</div>
              <div className="text-xs text-earth-500 font-medium tracking-wide uppercase">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="container mx-auto px-4 pb-20">
        <div className="max-w-3xl mx-auto space-y-10">

          {/* Story */}
          <div
            className="rounded-2xl p-8"
            style={{
              background: "rgba(255,252,248,0.62)",
              backdropFilter: "blur(20px) saturate(1.4)",
              WebkitBackdropFilter: "blur(20px) saturate(1.4)",
              border: "1px solid rgba(200,160,80,0.25)",
              boxShadow: "0 4px 24px rgba(139,90,40,0.1), inset 0 1px 0 rgba(255,255,255,0.65)",
            }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="h-8 w-1 rounded-full bg-gradient-to-b from-gold-400 to-terracotta-500" />
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-gradient-earth">Our Story</h2>
            </div>
            <p className="text-earth-600 leading-relaxed">
              Nakasoga Textile Centre was founded with a passion for celebrating the rich heritage of East African textiles.
              We believe that every fabric tells a story, and every pattern carries the soul of our culture. With locations
              at Magoba Arcade and City Mall, we bring beautiful, high-quality fabrics, clothing, and home textiles with
              African soul to our community and beyond.
            </p>
          </div>

          {/* Mission */}
          <div
            className="rounded-2xl p-8"
            style={{
              background: "rgba(255,252,248,0.62)",
              backdropFilter: "blur(20px) saturate(1.4)",
              WebkitBackdropFilter: "blur(20px) saturate(1.4)",
              border: "1px solid rgba(22,163,74,0.2)",
              boxShadow: "0 4px 24px rgba(22,163,74,0.08), inset 0 1px 0 rgba(255,255,255,0.65)",
            }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="h-8 w-1 rounded-full bg-gradient-to-b from-forest-500 to-forest-700" />
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-gradient-forest">Our Mission</h2>
            </div>
            <p className="text-earth-600 leading-relaxed">
              We are committed to preserving traditional textile craftsmanship while embracing modern design. Every piece
              in our collection is carefully selected or crafted to meet the highest standards of quality and authenticity.
              We work directly with local artisans and manufacturers to ensure fair practices and sustainable production.
            </p>
          </div>

          {/* What we offer */}
          <div
            className="rounded-2xl p-8"
            style={{
              background: "rgba(255,252,248,0.62)",
              backdropFilter: "blur(20px) saturate(1.4)",
              WebkitBackdropFilter: "blur(20px) saturate(1.4)",
              border: "1px solid rgba(200,160,80,0.25)",
              boxShadow: "0 4px 24px rgba(139,90,40,0.1), inset 0 1px 0 rgba(255,255,255,0.65)",
            }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="h-8 w-1 rounded-full bg-gradient-to-b from-gold-400 to-gold-600" />
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-gradient-earth">What We Offer</h2>
            </div>
            <ul className="space-y-3">
              {[
                "Authentic Ankara, Kitenge, and traditional East African fabrics",
                "Ready-to-wear clothing for men and women",
                "Beautiful home textiles including bedding, curtains, and decorative pieces",
                "Unique accessories to complete your look",
                "Bulk and wholesale orders with custom pricing",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(22,163,74,0.15)", border: "1px solid rgba(22,163,74,0.3)" }}>
                    <div className="h-1.5 w-1.5 rounded-full bg-forest-500" />
                  </div>
                  <span className="text-earth-600 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Values */}
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-gradient-earth">Our Values</h2>
              <div className="mt-3 mx-auto w-16 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {values.map(({ icon: Icon, title, description, color, border, iconColor }) => (
                <div
                  key={title}
                  className="rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: `rgba(255,252,248,0.65)`,
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: `1px solid ${border}`,
                    boxShadow: `0 4px 20px ${color}, inset 0 1px 0 rgba(255,255,255,0.65)`,
                  }}
                >
                  <div
                    className="h-12 w-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                    style={{ background: color, border: `1px solid ${border}` }}
                  >
                    <Icon className="h-5 w-5" style={{ color: iconColor }} />
                  </div>
                  <h3 className="font-semibold text-earth-800 mb-2">{title}</h3>
                  <p className="text-sm text-earth-500 leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
