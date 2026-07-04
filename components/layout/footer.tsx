import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-20 overflow-hidden">
      {/* Decorative orbs */}
      <div className="orb orb-gold absolute -top-24 -left-24 w-72 h-72 opacity-20" />
      <div className="orb orb-terracotta absolute -top-16 right-1/3 w-56 h-56 opacity-15" />
      <div className="orb orb-forest absolute bottom-0 right-0 w-64 h-64 opacity-15" />

      {/* Main footer body */}
      <div
        className="relative"
        style={{
          background:
            "radial-gradient(ellipse at 10% 0%, rgba(245,158,11,0.18) 0%, transparent 45%)," +
            "radial-gradient(ellipse at 90% 100%, rgba(22,163,74,0.15) 0%, transparent 45%)," +
            "linear-gradient(160deg, #1c110a 0%, #2d1a08 35%, #1a1008 65%, #0f0803 100%)",
        }}
      >
        {/* Sheen top border */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />

        <div className="container mx-auto px-4 py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

            {/* Brand column */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-5">
                <div className="relative h-12 w-8 flex-shrink-0 rounded overflow-hidden ring-1 ring-gold-500/30">
                  <Image src="/logo.jpg" alt="Nakasoga Textile Centre" fill className="object-contain" />
                </div>
                <div>
                  <h3 className="text-base font-serif font-bold text-earth-50 leading-tight">
                    Nakasoga Textile
                  </h3>
                  <p className="text-[10px] tracking-widest uppercase text-gold-400/80">Centre</p>
                </div>
              </div>
              <p className="text-earth-300/80 text-sm leading-relaxed mb-6">
                Premium East African textiles and fashion. Beautiful, high-quality fabrics with African soul — crafted for every occasion.
              </p>
              {/* Social links */}
              <div className="flex gap-3">
                {[
                  { Icon: Facebook, label: "Facebook" },
                  { Icon: Instagram, label: "Instagram" },
                  { Icon: Twitter, label: "Twitter" },
                ].map(({ Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="h-9 w-9 flex items-center justify-center rounded-xl transition-all duration-200 bg-[rgba(255,220,120,0.08)] border border-[rgba(200,150,60,0.2)] hover:bg-[rgba(245,158,11,0.2)] hover:border-[rgba(245,158,11,0.4)]"
                  >
                    <Icon className="h-4 w-4 text-gold-400" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="text-sm font-semibold text-earth-100 mb-5 flex items-center gap-2">
                <span className="h-px w-4 bg-gradient-to-r from-gold-500 to-transparent" />
                Quick Links
              </h4>
              <ul className="space-y-2.5">
                {[
                  { href: "/shop", label: "Shop All" },
                  { href: "/shop?category=traditional-fabrics", label: "Traditional Fabrics" },
                  { href: "/shop?category=ready-to-wear", label: "Ready-to-Wear" },
                  { href: "/bulk-order", label: "Bulk Orders" },
                  { href: "/about", label: "About Us" },
                  { href: "/faq", label: "FAQ" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-1.5 text-sm text-earth-300/75 hover:text-gold-400 transition-colors duration-200"
                    >
                      <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer service */}
            <div>
              <h4 className="text-sm font-semibold text-earth-100 mb-5 flex items-center gap-2">
                <span className="h-px w-4 bg-gradient-to-r from-gold-500 to-transparent" />
                Customer Service
              </h4>
              <ul className="space-y-2.5">
                {[
                  { href: "/shipping-returns", label: "Shipping & Returns" },
                  { href: "/account", label: "My Account" },
                  { href: "/cart", label: "Shopping Cart" },
                  { href: "/contact", label: "Contact Us" },
                  { href: "#", label: "Track Order" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-1.5 text-sm text-earth-300/75 hover:text-gold-400 transition-colors duration-200"
                    >
                      <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact info */}
            <div>
              <h4 className="text-sm font-semibold text-earth-100 mb-5 flex items-center gap-2">
                <span className="h-px w-4 bg-gradient-to-r from-gold-500 to-transparent" />
                Contact Us
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="h-7 w-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.25)" }}>
                    <MapPin className="h-3.5 w-3.5 text-gold-400" />
                  </div>
                  <div className="text-sm text-earth-300/75 leading-relaxed">
                    <div>Magoba Arcade — Shop K-02</div>
                    <div>City Mall — P3-524 &amp; P5-795</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-7 w-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: "rgba(22,163,74,0.15)", border: "1px solid rgba(22,163,74,0.25)" }}>
                    <Phone className="h-3.5 w-3.5 text-forest-400" />
                  </div>
                  <div className="text-sm text-earth-300/75 leading-relaxed">
                    <div>+256 753 222 207</div>
                    <div>+256 779 905 060</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-7 w-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: "rgba(229,106,74,0.15)", border: "1px solid rgba(229,106,74,0.25)" }}>
                    <Mail className="h-3.5 w-3.5 text-terracotta-400" />
                  </div>
                  <a href="mailto:Idriisakimbgwe@yahoo.com" className="text-sm text-earth-300/75 hover:text-gold-400 transition-colors break-all">
                    Idriisakimbgwe@yahoo.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-earth-800/60">
          <div className="container mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-earth-400/60">
            <p>&copy; {new Date().getFullYear()} Nakasoga Textile Centre. All rights reserved.</p>
            <div className="flex gap-5">
              <Link href="#" className="hover:text-gold-400 transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-gold-400 transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
