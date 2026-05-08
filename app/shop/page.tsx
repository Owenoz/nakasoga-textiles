"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useProductsStore } from "@/lib/store/products-store";
import ProductCard from "@/components/products/product-card";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";

function ShopContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const { products } = useProductsStore();
  
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [sortBy, setSortBy] = useState("featured");

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => 
        p.category.toLowerCase().replace(/\s+/g, "-") === selectedCategory
      );
    }

    // Price filter
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Sort
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        filtered.sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0));
        break;
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return filtered;
  }, [selectedCategory, priceRange, sortBy]);

  const categories = [
    { value: "all", label: "All Products" },
    { value: "traditional-fabrics", label: "Traditional Fabrics" },
    { value: "ready-to-wear", label: "Ready-to-Wear" },
    { value: "home-textiles", label: "Home Textiles" },
    { value: "accessories", label: "Accessories" },
  ];

  return (
    <div className="min-h-screen bg-earth-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">Shop All Products</h1>
          <p className="text-muted-foreground">
            Showing {filteredProducts.length} products
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Categories */}
              <div>
                <h3 className="font-semibold mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => setSelectedCategory(cat.value)}
                      className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                        selectedCategory === cat.value
                          ? "bg-forest-600 text-white"
                          : "hover:bg-earth-100"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-semibold mb-3">Price Range</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setPriceRange([0, 50000])}
                    className="block w-full text-left px-3 py-2 rounded-md hover:bg-earth-100 text-sm"
                  >
                    Under UGX 50,000
                  </button>
                  <button
                    onClick={() => setPriceRange([50000, 100000])}
                    className="block w-full text-left px-3 py-2 rounded-md hover:bg-earth-100 text-sm"
                  >
                    UGX 50,000 - 100,000
                  </button>
                  <button
                    onClick={() => setPriceRange([100000, 200000])}
                    className="block w-full text-left px-3 py-2 rounded-md hover:bg-earth-100 text-sm"
                  >
                    UGX 100,000 - 200,000
                  </button>
                  <button
                    onClick={() => setPriceRange([200000, 1000000])}
                    className="block w-full text-left px-3 py-2 rounded-md hover:bg-earth-100 text-sm"
                  >
                    Over UGX 200,000
                  </button>
                  <button
                    onClick={() => setPriceRange([0, 1000000])}
                    className="block w-full text-left px-3 py-2 rounded-md hover:bg-earth-100 text-sm"
                  >
                    All Prices
                  </button>
                </div>
              </div>

              {/* Reset Filters */}
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSelectedCategory("all");
                  setPriceRange([0, 1000000]);
                  setSortBy("featured");
                }}
              >
                Reset Filters
              </Button>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter Toggle & Sort */}
            <div className="flex items-center justify-between mb-6 gap-4">
              <Button
                variant="outline"
                className="lg:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border rounded-md bg-white"
                aria-label="Sort products"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="lg:hidden mb-6 p-4 bg-white rounded-lg border space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.value}
                        onClick={() => {
                          setSelectedCategory(cat.value);
                          setShowFilters(false);
                        }}
                        className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                          selectedCategory === cat.value
                            ? "bg-forest-600 text-white"
                            : "hover:bg-earth-100"
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">No products found matching your filters.</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSelectedCategory("all");
                    setPriceRange([0, 1000000]);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-earth-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">Shop All Products</h1>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
