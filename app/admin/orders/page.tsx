"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/lib/store/auth-store";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, ShoppingCart, Eye } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  date: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  items: number;
}

export default function OrdersPage() {
  const router = useRouter();
  const { isAuthenticated, isAdmin } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Simulated orders data
  const [orders] = useState<Order[]>([
    {
      id: "ORD-001",
      customerName: "Sarah Nakato",
      customerEmail: "sarah@example.com",
      date: "2026-05-05",
      status: "pending",
      total: 145000,
      items: 3,
    },
    {
      id: "ORD-002",
      customerName: "John Okello",
      customerEmail: "john@example.com",
      date: "2026-05-04",
      status: "processing",
      total: 280000,
      items: 2,
    },
    {
      id: "ORD-003",
      customerName: "Grace Nambi",
      customerEmail: "grace@example.com",
      date: "2026-05-03",
      status: "shipped",
      total: 95000,
      items: 1,
    },
    {
      id: "ORD-004",
      customerName: "David Musoke",
      customerEmail: "david@example.com",
      date: "2026-05-02",
      status: "delivered",
      total: 185000,
      items: 4,
    },
  ]);

  useEffect(() => {
    if (!isAuthenticated || !isAdmin()) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, isAdmin, router]);

  const filteredOrders = selectedStatus === "all" 
    ? orders 
    : orders.filter((order) => order.status === selectedStatus);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    processing: orders.filter((o) => o.status === "processing").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    revenue: orders.reduce((sum, o) => sum + o.total, 0),
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-earth-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-forest-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-earth-50 via-white to-earth-50">
      <div className="bg-white border-b shadow-sm sticky top-0 z-10 backdrop-blur-sm bg-white/95">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <div className="flex items-center gap-3 md:gap-4">
            <Link href="/admin">
              <Button variant="ghost" size="icon" className="hover:bg-forest-50">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl md:text-3xl font-serif font-bold bg-gradient-to-r from-forest-700 to-forest-500 bg-clip-text text-transparent">
                Orders Management
              </h1>
              <p className="text-sm text-muted-foreground font-medium">View and manage customer orders</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-10">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 mb-6 md:mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="text-xs md:text-sm text-muted-foreground mb-2 font-semibold">Total Orders</div>
            <div className="text-2xl md:text-3xl font-bold text-gray-900">{stats.total}</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="text-xs md:text-sm text-muted-foreground mb-2 font-semibold">Pending</div>
            <div className="text-2xl md:text-3xl font-bold text-yellow-600">{stats.pending}</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="text-xs md:text-sm text-muted-foreground mb-2 font-semibold">Processing</div>
            <div className="text-2xl md:text-3xl font-bold text-blue-600">{stats.processing}</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="text-xs md:text-sm text-muted-foreground mb-2 font-semibold">Shipped</div>
            <div className="text-2xl md:text-3xl font-bold text-purple-600">{stats.shipped}</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="text-xs md:text-sm text-muted-foreground mb-2 font-semibold">Delivered</div>
            <div className="text-2xl md:text-3xl font-bold text-green-600">{stats.delivered}</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="text-xs md:text-sm text-muted-foreground mb-2 font-semibold">Revenue</div>
            <div className="text-lg md:text-xl font-bold text-gray-900">{formatPrice(stats.revenue)}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 md:p-5 mb-6 shadow-sm border border-gray-100">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedStatus === "all" ? "default" : "outline"}
              onClick={() => setSelectedStatus("all")}
              className={selectedStatus === "all" ? "bg-gradient-to-r from-forest-600 to-forest-700 shadow-md" : "hover:bg-forest-50"}
              size="sm"
            >
              All Orders
            </Button>
            <Button
              variant={selectedStatus === "pending" ? "default" : "outline"}
              onClick={() => setSelectedStatus("pending")}
              className={selectedStatus === "pending" ? "bg-yellow-600 hover:bg-yellow-700 shadow-md" : "hover:bg-yellow-50"}
              size="sm"
            >
              Pending
            </Button>
            <Button
              variant={selectedStatus === "processing" ? "default" : "outline"}
              onClick={() => setSelectedStatus("processing")}
              className={selectedStatus === "processing" ? "bg-blue-600 hover:bg-blue-700 shadow-md" : "hover:bg-blue-50"}
              size="sm"
            >
              Processing
            </Button>
            <Button
              variant={selectedStatus === "shipped" ? "default" : "outline"}
              onClick={() => setSelectedStatus("shipped")}
              className={selectedStatus === "shipped" ? "bg-purple-600 hover:bg-purple-700 shadow-md" : "hover:bg-purple-50"}
              size="sm"
            >
              Shipped
            </Button>
            <Button
              variant={selectedStatus === "delivered" ? "default" : "outline"}
              onClick={() => setSelectedStatus("delivered")}
              className={selectedStatus === "delivered" ? "bg-green-600 hover:bg-green-700 shadow-md" : "hover:bg-green-50"}
              size="sm"
            >
              Delivered
            </Button>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-earth-100 to-earth-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Order ID</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Customer</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Items</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Total</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Status</th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-earth-50">
                      <td className="px-6 py-4">
                        <span className="font-mono font-semibold">{order.id}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium">{order.customerName}</p>
                          <p className="text-sm text-muted-foreground">{order.customerEmail}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {new Date(order.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-4 text-sm">{order.items} items</td>
                      <td className="px-6 py-4 font-semibold">{formatPrice(order.total)}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                      <p className="text-muted-foreground">No orders found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
