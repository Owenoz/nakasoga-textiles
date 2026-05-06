"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWishlistStore } from "@/lib/store/wishlist-store";
import { useAuthStore } from "@/lib/store/auth-store";
import { products } from "@/lib/data/products";
import ProductCard from "@/components/products/product-card";
import { Button } from "@/components/ui/button";
import { User, Heart, Package, LogOut, Loader2 } from "lucide-react";

export default function AccountPage() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState("orders");
  const [loading, setLoading] = useState(true);
  
  const wishlistIds = useWishlistStore((state) => state.items);
  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));

  useEffect(() => {
    // Check authentication
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, router]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-earth-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-forest-600" />
      </div>
    );
  }

  const tabs = [
    { id: "orders", label: "Orders", icon: Package },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <div className="min-h-screen bg-earth-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-8">My Account</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-4 space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                      activeTab === tab.id
                        ? "bg-forest-600 text-white"
                        : "hover:bg-earth-100"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-md hover:bg-earth-100 text-destructive">
                <LogOut className="h-5 w-5" />
                <span className="font-medium" onClick={handleLogout}>Logout</span>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeTab === "orders" && (
              <div className="bg-white rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-6">Order History</h2>
                <div className="text-center py-12 text-muted-foreground">
                  <Package className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>No orders yet</p>
                  <p className="text-sm mt-2">Start shopping to see your orders here</p>
                </div>
              </div>
            )}

            {activeTab === "wishlist" && (
              <div className="bg-white rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-6">
                  My Wishlist ({wishlistProducts.length})
                </h2>
                {wishlistProducts.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {wishlistProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <Heart className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p>Your wishlist is empty</p>
                    <p className="text-sm mt-2">Save items you love for later</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "profile" && (
              <div className="bg-white rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-6">Profile Information</h2>
                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border rounded-md"
                      value={user?.name || ""}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 border rounded-md"
                      value={user?.email || ""}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Account Type</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border rounded-md bg-earth-50"
                      value={user?.role === "admin" ? "Administrator" : "Customer"}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Member Since</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border rounded-md bg-earth-50"
                      value={user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : ""}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
