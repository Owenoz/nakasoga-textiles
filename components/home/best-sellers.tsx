import { getFeaturedProducts } from "@/lib/data/products";
import ProductCard from "@/components/products/product-card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function BestSellers() {
  const bestSellers = getFeaturedProducts().slice(0, 8);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Best Sellers</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our most loved pieces - customer favorites that never go out of style
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/shop">
            <Button size="lg" variant="outline" className="border-forest-600 text-forest-600 hover:bg-forest-50">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
