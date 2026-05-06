"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuthStore } from "@/lib/store/auth-store";
import { useProductsStore } from "@/lib/store/products-store";
import { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Loader2,
  ArrowLeft,
  Package
} from "lucide-react";
import { formatPrice } from "@/lib/utils";

export default function AdminProductsPage() {
  const router = useRouter();
  const { isAuthenticated, isAdmin } = useAuthStore();
  const { products, deleteProduct } = useProductsStore();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!isAuthenticated || !isAdmin()) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, isAdmin, router]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || 
                           product.category.toLowerCase().replace(/\s+/g, "-") === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDeleteClick = (product: Product) => {
    setDeletingProduct(product);
    setShowDeleteConfirm(product.id);
  };

  const handleDeleteConfirm = () => {
    if (showDeleteConfirm) {
      deleteProduct(showDeleteConfirm);
      setShowDeleteConfirm(null);
      setDeletingProduct(null);
    }
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
      {/* Header */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-10 backdrop-blur-sm bg-white/95">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 md:gap-4">
              <Link href="/admin">
                <Button variant="ghost" size="icon" className="flex-shrink-0 hover:bg-forest-50">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl md:text-3xl font-serif font-bold bg-gradient-to-r from-forest-700 to-forest-500 bg-clip-text text-transparent">
                  Products
                </h1>
                <p className="text-sm text-muted-foreground font-medium">{filteredProducts.length} products</p>
              </div>
            </div>
            <Link href="/admin/products/add" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-gradient-to-r from-forest-600 to-forest-700 hover:from-forest-700 hover:to-forest-800 shadow-md hover:shadow-lg transition-all">
                <Plus className="h-5 w-5 mr-2" />
                Add Product
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 md:py-8">
        {/* Filters */}
        <div className="bg-white rounded-xl p-4 md:p-6 mb-4 md:mb-6 shadow-sm border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-gray-200 focus:border-forest-500 focus:ring-forest-500"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-md text-sm md:text-base focus:border-forest-500 focus:ring-2 focus:ring-forest-200 outline-none transition-all"
              aria-label="Filter by category"
            >
              <option value="all">All Categories</option>
              <option value="traditional-fabrics">Traditional Fabrics</option>
              <option value="ready-to-wear">Ready-to-Wear</option>
              <option value="home-textiles">Home Textiles</option>
              <option value="accessories">Accessories</option>
            </select>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="block md:hidden space-y-3">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex gap-3">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-earth-100 flex-shrink-0 ring-1 ring-gray-200">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm line-clamp-2 mb-1 text-gray-900">{product.name}</h3>
                    <p className="text-xs text-muted-foreground mb-2">{product.category}</p>
                    <p className="font-bold text-forest-700">{formatPrice(product.price)}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                    product.inStock 
                      ? "bg-green-50 text-green-700 ring-1 ring-green-200" 
                      : "bg-red-50 text-red-700 ring-1 ring-red-200"
                  }`}>
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                  <div className="flex gap-2">
                    <Link href={`/admin/products/edit/${product.id}`}>
                      <Button variant="outline" size="sm" className="hover:bg-forest-50 hover:border-forest-300">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteClick(product)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 hover:border-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
              <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground font-medium">No products found</p>
            </div>
          )}
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-earth-100 to-earth-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Product</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Stock</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Status</th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-earth-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-earth-100 flex-shrink-0 ring-1 ring-gray-200">
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold truncate text-gray-900">{product.name}</p>
                            <p className="text-sm text-muted-foreground truncate">
                              {product.subcategory}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{product.category}</td>
                      <td className="px-6 py-4 text-sm font-bold text-forest-700">
                        {formatPrice(product.price)}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className="text-green-600 font-medium">In Stock</span>
                      </td>
                      <td className="px-6 py-4">
                        {product.inStock ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 ring-1 ring-green-200">
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 ring-1 ring-red-200">
                            Inactive
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/admin/products/edit/${product.id}`}>
                            <Button variant="ghost" size="sm" className="hover:bg-forest-50 hover:text-forest-700">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteClick(product)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center">
                      <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-30" />
                      <p className="text-muted-foreground font-medium">No products found</p>
                      <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && deletingProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-red-100 p-3 rounded-full">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Delete Product?</h3>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Are you sure you want to delete <strong className="text-gray-900">{deletingProduct.name}</strong>? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  setShowDeleteConfirm(null);
                  setDeletingProduct(null);
                }}
                className="hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-md"
                onClick={handleDeleteConfirm}
              >
                Delete Product
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
