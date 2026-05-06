"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { searchProducts } from "@/lib/data/products";
import ProductCard from "@/components/products/product-card";
import { Search } from "lucide-react";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState(searchProducts(query));

  useEffect(() => {
    setResults(searchProducts(query));
  }, [query]);

  return (
    <div className="min-h-screen bg-earth-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">Search Results</h1>
          <p className="text-muted-foreground">
            {results.length > 0 ? (
              <>
                Found {results.length} {results.length === 1 ? "result" : "results"} for "{query}"
              </>
            ) : (
              <>No results found for "{query}"</>
            )}
          </p>
        </div>

        {results.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Search className="h-24 w-24 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h2 className="text-xl font-semibold mb-2">No products found</h2>
            <p className="text-muted-foreground mb-6">
              Try searching with different keywords or browse our categories
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-earth-50 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">Search Results</h1>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </div>
    }>
      <SearchResults />
    </Suspense>
  );
}
