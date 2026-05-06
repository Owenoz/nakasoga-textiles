import { getFlashDeals } from "@/lib/data/products";
import ProductCard from "@/components/products/product-card";

export default function FlashDeals() {
  const flashDeals = getFlashDeals();

  if (flashDeals.length === 0) return null;

  return (
    <section className="py-16 bg-terracotta-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-2">Flash Deals</h2>
            <p className="text-muted-foreground">Limited time offers - grab them while they last!</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {flashDeals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
