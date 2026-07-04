"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ShoppingCart, Heart, Search, Menu, User, LogOut, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/cart-store";
import { useWishlistStore } from "@/lib/store/wishlist-store";
import { useAuthStore } from "@/lib/store/auth-store";
import { useState, useEffect } from "react";

export default function Header() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const totalItems = useCartStore((state) => state.getTotalItems());
  const wishlistItems = useWishlistStore((state) => state.items.length);
  const { user, isAuthenticated, logout, isAdmin } = useAuthStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top announcement banner */}
      <div
        className="relative overflow-hidden py-2 text-center text-sm font-medium text-white"
        style={{
          background: "linear-gradient(90deg, #14532d 0%, #16a34a 40%, #f59e0b 70%, #e56a4a 100%)",
          backgroundSize: "200% 100%",
          animation: "gradientShift 6s ease infinite",
        }}
      >
        <span className="inline-flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5 text-gold-300" />
          Free Shipping on Orders Over UGX 200,000 &nbsp;·&nbsp; Authentic African Textiles
          <Sparkles className="h-3.5 w-3.5 text-gold-300" />
        </span>
      </div>

      {/* Main header glass bar */}
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? "bg-[rgba(253,250,244,0.82)] backdrop-blur-xl shadow-glass border-b border-[rgba(200,160,80,0.25)]"
            : "bg-[rgba(253,250,244,0.65)] backdrop-blur-lg border-b border-[rgba(220,180,100,0.2)]"
        }`}
        style={{ backdropFilter: "blur(20px) saturate(1.5)", WebkitBackdropFilter: "blur(20px) saturate(1.5)" }}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between gap-4">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
              <div className="relative h-11 w-8 flex-shrink-0 drop-shadow-sm group-hover:drop-shadow-md transition-all">
                <Image src="/logo.jpg" alt="Nakasoga Textile Centre" fill className="object-contain" priority />
              </div>
              <div className="hidden sm:block">
                <div className="text-lg font-serif font-bold leading-tight bg-gradient-to-r from-forest-700 via-forest-600 to-forest-700 bg-clip-text text-transparent">
                  Nakasoga Textile
                </div>
                <div className="text-[10px] tracking-widest uppercase text-earth-500 font-medium">
                  Authentic African Textiles
                </div>
              </div>
            </Link>

            {/* Desktop navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {[
                { href: "/shop", label: "Shop All" },
                { href: "/shop?category=traditional-fabrics", label: "Fabrics" },
                { href: "/shop?category=ready-to-wear", label: "Clothing" },
                { href: "/shop?category=home-textiles", label: "Home" },
                { href: "/shop?category=accessories", label: "Accessories" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-3 py-1.5 text-sm font-medium text-earth-700 rounded-lg hover:text-forest-700 hover:bg-forest-50/70 transition-all duration-200 group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 bg-gradient-to-r from-forest-500 to-gold-500 rounded-full group-hover:w-3/4 transition-all duration-300" />
                </Link>
              ))}
              <Link
                href="/bulk-order"
                className="ml-2 px-3 py-1.5 text-sm font-semibold text-terracotta-600 border border-terracotta-200 rounded-lg hover:bg-terracotta-50 hover:border-terracotta-300 transition-all duration-200"
              >
                Bulk Orders
              </Link>
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-1">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="hidden sm:flex h-9 w-9 items-center justify-center rounded-xl text-earth-600 hover:text-forest-700 hover:bg-forest-50/70 transition-all"
                aria-label="Search"
              >
                <Search className="h-4 w-4" style={{ width: "1.125rem", height: "1.125rem" }} />
              </button>

              {/* Wishlist */}
              <Link href="/account">
                <button
                  className="relative h-9 w-9 flex items-center justify-center rounded-xl text-earth-600 hover:text-terracotta-600 hover:bg-terracotta-50/70 transition-all"
                  aria-label="Wishlist"
                >
                  <Heart className="h-4 w-4" style={{ width: "1.125rem", height: "1.125rem" }} />
                  {wishlistItems > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-gradient-to-br from-terracotta-400 to-terracotta-600 text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                      {wishlistItems}
                    </span>
                  )}
                </button>
              </Link>

              {/* Account */}
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="h-9 w-9 flex items-center justify-center rounded-xl text-earth-600 hover:text-forest-700 hover:bg-forest-50/70 transition-all"
                  aria-label="Account"
                >
                  <User style={{ width: "1.125rem", height: "1.125rem" }} />
                </button>

                {showUserMenu && (
                  <div
                    className="absolute right-0 mt-2 w-56 rounded-2xl overflow-hidden animate-scale-in"
                    style={{
                      background: "rgba(255,252,248,0.88)",
                      backdropFilter: "blur(24px) saturate(1.5)",
                      WebkitBackdropFilter: "blur(24px) saturate(1.5)",
                      border: "1px solid rgba(200,160,80,0.3)",
                      boxShadow: "0 16px 48px rgba(100,60,20,0.2), 0 2px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.7)",
                    }}
                  >
                    {isAuthenticated ? (
                      <>
                        <div className="px-4 py-3 border-b border-earth-100/60">
                          <p className="text-sm font-semibold text-earth-800">{user?.name}</p>
                          <p className="text-xs text-earth-500 truncate">{user?.email}</p>
                        </div>
                        {isAdmin() && (
                          <Link href="/admin" className="block px-4 py-2.5 text-sm font-medium text-forest-700 hover:bg-forest-50/70 transition-colors" onClick={() => setShowUserMenu(false)}>
                            Admin Dashboard
                          </Link>
                        )}
                        <Link href="/account" className="block px-4 py-2.5 text-sm text-earth-700 hover:bg-earth-50/70 transition-colors" onClick={() => setShowUserMenu(false)}>
                          My Account
                        </Link>
                        <div className="border-t border-earth-100/60 mt-1">
                          <button onClick={handleLogout} className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50/70 flex items-center gap-2 transition-colors">
                            <LogOut className="h-3.5 w-3.5" /> Logout
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <Link href="/login" className="block px-4 py-2.5 text-sm font-medium text-forest-700 hover:bg-forest-50/70 transition-colors" onClick={() => setShowUserMenu(false)}>
                          Sign In
                        </Link>
                        <Link href="/register" className="block px-4 py-2.5 text-sm text-earth-700 hover:bg-earth-50/70 transition-colors" onClick={() => setShowUserMenu(false)}>
                          Create Account
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Cart */}
              <Link href="/cart">
                <button
                  className="relative h-9 w-9 flex items-center justify-center rounded-xl text-earth-600 hover:text-forest-700 hover:bg-forest-50/70 transition-all"
                  aria-label="Cart"
                >
                  <ShoppingCart style={{ width: "1.125rem", height: "1.125rem" }} />
                  {totalItems > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-gradient-to-br from-forest-500 to-forest-700 text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                      {totalItems}
                    </span>
                  )}
                </button>
              </Link>

              {/* Mobile menu toggle */}
              <button
                className="md:hidden h-9 w-9 flex items-center justify-center rounded-xl text-earth-600 hover:bg-earth-100/70 transition-all"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X style={{ width: "1.125rem", height: "1.125rem" }} /> : <Menu style={{ width: "1.125rem", height: "1.125rem" }} />}
              </button>
            </div>
          </div>

          {/* Search bar */}
          {searchOpen && (
            <div className="py-3 border-t border-earth-100/60 animate-slide-up">
              <form onSubmit={handleSearch} className="flex gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-earth-400" />
                  <input
                    type="text"
                    placeholder="Search fabrics, clothing, accessories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="glass-input w-full pl-9 pr-4 py-2 rounded-xl text-sm focus:outline-none"
                    autoFocus
                  />
                </div>
                <button type="submit" className="btn-gradient px-5 py-2 rounded-xl text-sm font-semibold">
                  Search
                </button>
                <button type="button" onClick={() => setSearchOpen(false)} className="h-9 w-9 flex items-center justify-center rounded-xl hover:bg-earth-100/70 text-earth-500 transition-all">
                  <X className="h-4 w-4" />
                </button>
              </form>
            </div>
          )}

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-earth-100/60 animate-slide-up">
              <nav className="flex flex-col gap-1">
                {[
                  { href: "/shop", label: "Shop All" },
                  { href: "/shop?category=traditional-fabrics", label: "Traditional Fabrics" },
                  { href: "/shop?category=ready-to-wear", label: "Ready-to-Wear" },
                  { href: "/shop?category=home-textiles", label: "Home Textiles" },
                  { href: "/shop?category=accessories", label: "Accessories" },
                  { href: "/bulk-order", label: "Bulk Orders" },
                  { href: "/about", label: "About Us" },
                  { href: "/contact", label: "Contact" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-4 py-2.5 text-sm font-medium text-earth-700 rounded-xl hover:bg-forest-50/70 hover:text-forest-700 transition-all"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="border-t border-earth-100/60 mt-2 pt-2 flex flex-col gap-1">
                  {isAuthenticated ? (
                    <>
                      <Link href="/account" className="px-4 py-2.5 text-sm text-earth-700 rounded-xl hover:bg-earth-50/70 transition-all" onClick={() => setMobileMenuOpen(false)}>
                        My Account
                      </Link>
                      <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="px-4 py-2.5 text-sm text-red-500 rounded-xl hover:bg-red-50/70 text-left transition-all">
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link href="/login" className="px-4 py-2.5 text-sm font-medium text-forest-700 rounded-xl hover:bg-forest-50/70 transition-all" onClick={() => setMobileMenuOpen(false)}>
                        Sign In
                      </Link>
                      <Link href="/register" className="px-4 py-2.5 text-sm text-earth-700 rounded-xl hover:bg-earth-50/70 transition-all" onClick={() => setMobileMenuOpen(false)}>
                        Create Account
                      </Link>
                    </>
                  )}
                </div>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
