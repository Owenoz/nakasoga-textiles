"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuthStore } from "@/lib/store/auth-store";
import { products } from "@/lib/data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Loader2, AlertTriangle, Package } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface InventoryItem {
  productId: string;
  productName: string;
  image: string;
  category: string;
  stock: number;
  lowStockThreshold: number;
  price: number;
}

export default function InventoryPage() {
  const router = useRouter();
  const { isAuthenticated, isAdmin } = useAuthStore();
  const [loading, setLoading] = useState(true);

  // Simulated inventory data
  const [inventory, setInventory] = useState<InventoryItem[]>(
    products.map((p) => ({
      productId: p.id,
      productName: p.name,
      image: p.images[0],
      category: p.category,
      stock: Math.floor(Math.random() * 100) + 10,
      lowStockThreshold: 10,
      price: p.price,
    }))
  );

  useEffect(() => {
    if (!isAuthenticated || !isAdmin()) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, isAdmin, router]);

  const handleStockUpdate = (productId: string, newStock: number) => {
    setInventory(
      inventory.map((item) =>
        item.productId === productId ? { ...item, stock: Math.max(0, newStock) } : item
      )
    );
  };

  const lowStockItems = inventory.filter((item) => item.stock <= item.lowStockThreshold);
  const totalValue = inventory.reduce((sum, item) => sum + item.stock * item.price, 0);

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
                Inventory Management
              </h1>
              <p className="text-sm text-muted-foreground font-medium">Track and manage stock levels</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-10">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-muted-foreground">Total Products</span>
              <div className="bg-blue-100 p-2 rounded-lg">
                <Package className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900">{inventory.length}</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-muted-foreground">Low Stock Items</span>
              <div className="bg-orange-100 p-2 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-orange-600">{lowStockItems.length}</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-muted-foreground">Total Inventory Value</span>
              <div className="bg-green-100 p-2 rounded-lg">
                <Package className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">{formatPrice(totalValue)}</div>
          </div>
        </div>

        {/* Low Stock Alert */}
        {lowStockItems.length > 0 && (
          <div className="bg-gradient-to-r from-orange-50 to-orange-100/50 border border-orange-200 rounded-xl p-5 mb-6 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="bg-orange-100 p-2 rounded-lg flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <h3 className="font-bold text-orange-900 mb-1">Low Stock Alert</h3>
                <p className="text-sm text-orange-700 font-medium">
                  {lowStockItems.length} {lowStockItems.length === 1 ? "product" : "products"} running low on stock
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Inventory Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-earth-100 to-earth-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Product</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Stock</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Status</th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {inventory.map((item) => (
                  <tr key={item.productId} className="hover:bg-earth-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-md overflow-hidden bg-earth-100 flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.productName}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium truncate">{item.productName}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">{item.category}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={item.stock}
                          onChange={(e) =>
                            handleStockUpdate(item.productId, parseInt(e.target.value) || 0)
                          }
                          className="w-24"
                        />
                        <span className="text-sm text-muted-foreground">units</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {item.stock <= item.lowStockThreshold ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                          Low Stock
                        </span>
                      ) : item.stock > 50 ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          In Stock
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Normal
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStockUpdate(item.productId, item.stock + 10)}
                        >
                          +10
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStockUpdate(item.productId, item.stock - 10)}
                        >
                          -10
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
