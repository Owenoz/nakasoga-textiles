import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/data/products";
import { ArrowRight } from "lucide-react";

export default function FeaturedCategories() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-xs font-semibold tracking-widest uppercase text-gold-600 mb-3">
            Curated Collections
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-gradient-earth">
            Shop by Category
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Explore our carefully curated collection of authentic African textiles and fashion
          </p>
          <div className="mt-5 mx-auto w-24 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((category, i) => (
            <Link
              key={category.id}
              href={`/shop?category=${category.slug}`}
              className="group relative overflow-hidden rounded-2xl aspect-[3/4] bg-earth-100"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {/* Image */}
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Gradient overlay — stronger on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent transition-opacity duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Glass label card at bottom */}
              <div
                className="absolute bottom-0 left-0 right-0 p-5 transition-all duration-300 group-hover:pb-7"
                style={{
                  background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)",
                }}
              >
                <div
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold text-gold-300 mb-2"
                  style={{
                    background: "rgba(245,158,11,0.18)",
                    border: "1px solid rgba(245,158,11,0.3)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  Explore
                </div>
                <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-gold-200 transition-colors">
                  {category.name}
                </h3>
                <p className="text-xs text-gray-300/80 leading-relaxed line-clamp-2">{category.description}</p>

                {/* Arrow indicator */}
                <div className="flex items-center gap-1 mt-3 text-xs font-medium text-gold-300 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  Shop now <ArrowRight className="h-3 w-3" />
                </div>
              </div>

              {/* Corner accent */}
              <div
                className="absolute top-3 right-3 h-7 w-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100"
                style={{
                  background: "rgba(255,255,255,0.18)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.3)",
                }}
              >
                <ArrowRight className="h-3.5 w-3.5 text-white -rotate-45" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
