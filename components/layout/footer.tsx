import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-earth-900 text-earth-50 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-serif font-bold mb-4">Nakasoga Textile Centre</h3>
            <p className="text-earth-200 text-sm mb-4">
              Premium East African textiles and fashion. Beautiful, high-quality fabrics with African soul.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gold-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-gold-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-gold-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-earth-200">
              <li>
                <Link href="/shop" className="hover:text-gold-400 transition-colors">
                  Shop All
                </Link>
              </li>
              <li>
                <Link href="/bulk-order" className="hover:text-gold-400 transition-colors">
                  Bulk Orders
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gold-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-gold-400 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm text-earth-200">
              <li>
                <Link href="/shipping-returns" className="hover:text-gold-400 transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-gold-400 transition-colors">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-gold-400 transition-colors">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-gold-400 transition-colors">
                  Track Order
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-earth-200">
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div>
                  <div>Magoba Arcade Shop K-02</div>
                  <div>City Mall P3-524</div>
                  <div>City Mall P5-795</div>
                </div>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <div>
                  <div>+256 753 222 207</div>
                  <div>+256 779 905 060</div>
                </div>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>Idriisakimbgwe@yahoo.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-earth-700 mt-8 pt-8 text-center text-sm text-earth-300">
          <p>&copy; {new Date().getFullYear()} Nakasoga Textile Centre. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link href="#" className="hover:text-gold-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-gold-400 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
