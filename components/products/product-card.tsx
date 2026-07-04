"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Star, Zap } from "lucide-react";
import { Product } from "@/lib/types";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { useWishlistStore } from "@/lib/store/wishlist-store";
import { useCartStore } from "@/lib/store/cart-store";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist(product.id));
  const toggleWishlist = useWishlistStore((state) => state.toggleItem);
  const addToCart = useCartStore((state) => state.addItem);

  const discount = product.originalPrice
    ? calculateDiscount(product.price, product.originalPrice)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, 1, product.colors[0].name, product.sizes[0]);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(product.id);
  };

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      {/* Image container */}
      <div className="relative overflow-hidden rounded-2xl aspect-[3/4] bg-earth-100">

        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          {product.flashDeal && (
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold text-white"
              style={{ background: "linear-gradient(135deg, #e56a4a, #d24d2e)", boxShadow: "0 2px 8px rgba(229,106,74,0.45)" }}
            >
              <Zap className="h-2.5 w-2.5" /> Flash
            </span>
          )}
          {product.newArrival && (
            <span
              className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white"
              style={{ background: "linear-gradient(135deg, #16a34a, #15803d)", boxShadow: "0 2px 8px rgba(22,163,74,0.4)" }}
            >
              New
            </span>
          )}
          {discount > 0 && (
            <span
              className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white"
              style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)", boxShadow: "0 2px 8px rgba(245,158,11,0.4)" }}
            >
              -{discount}%
            </span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          onClick={handleToggleWishlist}
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-3 right-3 z-10 h-8 w-8 flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110"
          style={{
            background: isInWishlist ? "rgba(229,106,74,0.15)" : "rgba(255,252,248,0.82)",
            backdropFilter: "blur(10px)",
            border: isInWishlist ? "1px solid rgba(229,106,74,0.4)" : "1px solid rgba(200,160,80,0.25)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <Heart
            className="h-4 w-4 transition-colors"
            style={{
              fill: isInWishlist ? "#e56a4a" : "none",
              color: isInWishlist ? "#e56a4a" : "#7c6040",
            }}
          />
        </button>

        {/* Product image */}
        <div className="relative w-full h-full">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-earth-100 to-earth-200 animate-pulse" />
          )}
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className={`object-cover transition-all duration-500 ${
              imageLoaded ? "opacity-100 group-hover:scale-105" : "opacity-0"
            }`}
            style={{ transform: imageLoaded ? undefined : undefined }}
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        {/* Quick-add overlay */}
        <div
          className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)",
          }}
        >
          <button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:brightness-110"
            style={{
              background: "rgba(255,255,255,0.18)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.3)",
              boxShadow: "0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.2)",
            }}
          >
            <ShoppingCart className="h-4 w-4" />
            Quick Add
          </button>
        </div>
      </div>

      {/* Product info */}
      <div className="mt-3 space-y-1.5 px-0.5">
        <h3 className="font-medium text-sm text-earth-800 line-clamp-2 group-hover:text-forest-700 transition-colors leading-snug">
          {product.name}
        </h3>

        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="h-3 w-3"
              style={{
                fill: i < Math.floor(product.rating) ? "#f59e0b" : "none",
                color: i < Math.floor(product.rating) ? "#f59e0b" : "#d1c4b0",
              }}
            />
          ))}
          <span className="text-[11px] text-earth-400 ml-1">({product.reviews})</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-bold text-forest-700 text-sm">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-xs text-earth-400 line-through">{formatPrice(product.originalPrice)}</span>
          )}
          {discount > 0 && (
            <span className="text-[10px] font-semibold text-terracotta-600 bg-terracotta-50 px-1.5 py-0.5 rounded-full">
              Save {discount}%
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
