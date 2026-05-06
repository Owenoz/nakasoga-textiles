"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Product } from "@/lib/types";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
    <Link href={`/products/${product.slug}`} className="group">
      <div className="relative overflow-hidden rounded-lg bg-earth-50 aspect-[3/4]">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          {product.flashDeal && (
            <Badge className="bg-terracotta-500 hover:bg-terracotta-600">Flash Deal</Badge>
          )}
          {product.newArrival && (
            <Badge className="bg-forest-600 hover:bg-forest-700">New</Badge>
          )}
          {discount > 0 && (
            <Badge className="bg-gold-500 hover:bg-gold-600">-{discount}%</Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          className="absolute top-3 right-3 z-10 bg-white/90 hover:bg-white rounded-full p-2 transition-colors"
        >
          <Heart
            className={`h-5 w-5 ${
              isInWishlist ? "fill-terracotta-500 text-terracotta-500" : "text-gray-600"
            }`}
          />
        </button>

        {/* Image */}
        <div className="relative w-full h-full">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-earth-200 animate-pulse" />
          )}
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className={`object-cover transition-all duration-300 ${
              imageLoaded ? "opacity-100 group-hover:scale-105" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        {/* Quick Add to Cart */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            onClick={handleAddToCart}
            className="w-full bg-white text-black hover:bg-earth-100"
            size="sm"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Quick Add
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="mt-3 space-y-1">
        <h3 className="font-medium text-sm line-clamp-2 group-hover:text-forest-600 transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-1">
          <Star className="h-3 w-3 fill-gold-500 text-gold-500" />
          <span className="text-xs text-muted-foreground">
            {product.rating} ({product.reviews})
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-semibold text-forest-700">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
