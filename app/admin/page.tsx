"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/auth-store";
import { products } from "@/lib/data/products";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  TrendingUp,
  Loader2 
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const router = useRouter();
  const { isAuthenticated, isAdmin } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || !isAdmin()) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, isAdmin, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-earth-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-forest-600" />
      </div>
    );
  }

  const stats = [
    {
      title: "Total Products",
      value: products.length,
      icon: Package,
      color: "bg-blue-500",
      link: "/admin/products",
    },
    {
      title: "Total Orders",
      value: "0",
      icon: ShoppingCart,
      color: "bg-green-500",
      link: "/admin/orders",
    },
    {
      title: "Total Customers",
      value: "0",
      icon: Users,
      color: "bg-purple-500",
      link: "/admin/customers",
    },
    {
      title: "Revenue",
      value: "UGX 0",
      icon: TrendingUp,
      color: "bg-orange-500",
      link: "/admin/analytics",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-earth-50 via-white to-earth-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-10 backdrop-blur-sm bg-white/95">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl md:text-3xl font-serif font-bold bg-gradient-to-r from-forest-700 to-forest-500 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-sm text-muted-foreground mt-1">Manage your store efficiently</p>
            </div>
            <Link
              href="/"
              className="text-sm font-medium text-forest-600 hover:text-forest-700 transition-colors flex items-center gap-1 group"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              Back to Store
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-10">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Link
                key={stat.title}
                href={stat.link}
                className="group bg-white rounded-xl p-5 md:p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-forest-200 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`${stat.color} p-3 rounded-lg shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-5 w-5 md:h-6 md:w-6 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-1 text-gray-900">{stat.value}</h3>
                <p className="text-xs md:text-sm text-muted-foreground font-medium">{stat.title}</p>
              </Link>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl md:text-2xl font-serif font-bold mb-4 md:mb-6 text-gray-900">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <Link
              href="/admin/products"
              className="group bg-white rounded-xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-forest-300 hover:-translate-y-1"
            >
              <div className="bg-forest-50 w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:bg-forest-100 transition-colors">
                <Package className="h-7 w-7 text-forest-600" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 group-hover:text-forest-700 transition-colors">
                Manage Products
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Add, edit, or delete products from your inventory
              </p>
            </Link>

            <Link
              href="/admin/inventory"
              className="group bg-white rounded-xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-forest-300 hover:-translate-y-1"
            >
              <div className="bg-forest-50 w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:bg-forest-100 transition-colors">
                <LayoutDashboard className="h-7 w-7 text-forest-600" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 group-hover:text-forest-700 transition-colors">
                Inventory Management
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Track stock levels and manage inventory
              </p>
            </Link>

            <Link
              href="/admin/orders"
              className="group bg-white rounded-xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-forest-300 hover:-translate-y-1"
            >
              <div className="bg-forest-50 w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:bg-forest-100 transition-colors">
                <ShoppingCart className="h-7 w-7 text-forest-600" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 group-hover:text-forest-700 transition-colors">
                View Orders
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Process and manage customer orders
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
