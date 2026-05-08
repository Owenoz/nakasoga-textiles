"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingCart, Heart, Search, Menu, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/cart-store";
import { useWishlistStore } from "@/lib/store/wishlist-store";
import { useAuthStore } from "@/lib/store/auth-store";
import { useState } from "react";

export default function Header() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const totalItems = useCartStore((state) => state.getTotalItems());
  const wishlistItems = useWishlistStore((state) => state.items.length);
  const { user, isAuthenticated, logout, isAdmin } = useAuthStore();

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
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-forest-700 to-forest-600 text-white py-2 text-center text-sm">
        <p>Free Shipping on Orders Over UGX 200,000 | Secure Payment</p>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-serif font-bold text-forest-700">
              Nakasoga
            </div>
            <div className="hidden sm:block text-xs text-muted-foreground">
              Textile Centre
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/shop" className="text-sm font-medium hover:text-forest-600 transition-colors">
              Shop All
            </Link>
            <Link href="/shop?category=traditional-fabrics" className="text-sm font-medium hover:text-forest-600 transition-colors">
              Fabrics
            </Link>
            <Link href="/shop?category=ready-to-wear" className="text-sm font-medium hover:text-forest-600 transition-colors">
              Clothing
            </Link>
            <Link href="/shop?category=home-textiles" className="text-sm font-medium hover:text-forest-600 transition-colors">
              Home
            </Link>
            <Link href="/shop?category=accessories" className="text-sm font-medium hover:text-forest-600 transition-colors">
              Accessories
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="hidden sm:flex"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Wishlist */}
            <Link href="/account">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-5 w-5" />
                {wishlistItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-terracotta-500 text-white text-xs flex items-center justify-center">
                    {wishlistItems}
                  </span>
                )}
              </Button>
            </Link>

            {/* Account */}
            <div className="relative hidden sm:block">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <User className="h-5 w-5" />
              </Button>
              
              {/* User Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border py-2 z-50">
                  {isAuthenticated ? (
                    <>
                      <div className="px-4 py-2 border-b">
                        <p className="text-sm font-semibold">{user?.name}</p>
                        <p className="text-xs text-muted-foreground">{user?.email}</p>
                      </div>
                      {isAdmin() && (
                        <Link
                          href="/admin"
                          className="block px-4 py-2 text-sm hover:bg-earth-50"
                          onClick={() => setShowUserMenu(false)}
                        >
                          Admin Dashboard
                        </Link>
                      )}
                      <Link
                        href="/account"
                        className="block px-4 py-2 text-sm hover:bg-earth-50"
                        onClick={() => setShowUserMenu(false)}
                      >
                        My Account
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-earth-50 text-red-600 flex items-center gap-2"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="block px-4 py-2 text-sm hover:bg-earth-50"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/register"
                        className="block px-4 py-2 text-sm hover:bg-earth-50"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Create Account
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-terracotta-500 text-white text-xs flex items-center justify-center font-semibold">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="py-4 border-t animate-fade-in">
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-forest-600"
                autoFocus
              />
              <Button type="submit" className="bg-forest-600 hover:bg-forest-700">
                Search
              </Button>
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t animate-fade-in">
            <nav className="flex flex-col space-y-3">
              <Link
                href="/shop"
                className="text-sm font-medium hover:text-forest-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop All
              </Link>
              <Link
                href="/shop?category=traditional-fabrics"
                className="text-sm font-medium hover:text-forest-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Traditional Fabrics
              </Link>
              <Link
                href="/shop?category=ready-to-wear"
                className="text-sm font-medium hover:text-forest-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Ready-to-Wear
              </Link>
              <Link
                href="/shop?category=home-textiles"
                className="text-sm font-medium hover:text-forest-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home Textiles
              </Link>
              <Link
                href="/shop?category=accessories"
                className="text-sm font-medium hover:text-forest-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Accessories
              </Link>
              <Link
                href="/account"
                className="text-sm font-medium hover:text-forest-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {isAuthenticated ? "My Account" : "Sign In"}
              </Link>
              {isAuthenticated && isAdmin() && (
                <Link
                  href="/admin"
                  className="text-sm font-medium hover:text-forest-600 transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Admin Dashboard
                </Link>
              )}
              {isAuthenticated && (
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium hover:text-forest-600 transition-colors py-2 text-left text-red-600"
                >
                  Logout
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
