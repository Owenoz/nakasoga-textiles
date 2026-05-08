"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useProductsStore } from "@/lib/store/products-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { Heart, ShoppingCart, Star, Truck, Shield, RefreshCw, MessageCircle, ZoomIn, X } from "lucide-react";
import { useCartStore } from "@/lib/store/cart-store";
import { useWishlistStore } from "@/lib/store/wishlist-store";
import { useRecentlyViewedStore } from "@/lib/store/recently-viewed-store";
import ProductCard from "@/components/products/product-card";
import ProductReviews from "@/components/products/product-reviews";
import SizeGuide from "@/components/products/size-guide";

export default function ProductPage() {
  const params = useParams();
  const { products, getProductBySlug } = useProductsStore();
  const product = getProductBySlug(params.slug as string);

  const [selectedImage, setSelectedImage] = useState(0);
  const [showZoom, setShowZoom] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0].name || "");
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || "");
  const [quantity, setQuantity] = useState(1);

  const addToCart = useCartStore((state) => state.addItem);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist(product?.id || ""));
  const toggleWishlist = useWishlistStore((state) => state.toggleItem);
  const addToRecentlyViewed = useRecentlyViewedStore((state) => state.addProduct);

  // Add to recently viewed when product loads
  if (product) {
    addToRecentlyViewed(product.id);
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Link href="/shop">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  const discount = product.originalPrice
    ? calculateDiscount(product.price, product.originalPrice)
    : 0;

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm mb-8 text-muted-foreground">
          <Link href="/" className="hover:text-forest-600">Home</Link>
          {" / "}
          <Link href="/shop" className="hover:text-forest-600">Shop</Link>
          {" / "}
          <Link href={`/shop?category=${product.category.toLowerCase().replace(/\s+/g, "-")}`} className="hover:text-forest-600">
            {product.category}
          </Link>
          {" / "}
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-lg overflow-hidden bg-earth-50 group">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {discount > 0 && (
                <Badge className="absolute top-4 left-4 bg-terracotta-500">-{discount}%</Badge>
              )}
              {/* Zoom Button */}
              <button
                onClick={() => setShowZoom(true)}
                className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ZoomIn className="h-5 w-5" />
              </button>
              {/* Stock Badge */}
              {product.inStock ? (
                <Badge className="absolute bottom-4 left-4 bg-green-600">In Stock</Badge>
              ) : (
                <Badge className="absolute bottom-4 left-4 bg-red-600">Out of Stock</Badge>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? "border-forest-600" : "border-transparent"
                    }`}
                  >
                    <Image src={image} alt={`${product.name} ${index + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Image Zoom Modal */}
          {showZoom && (
            <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setShowZoom(false)}>
              <button
                onClick={() => setShowZoom(false)}
                className="absolute top-4 right-4 text-white hover:text-gray-300"
              >
                <X className="h-8 w-8" />
              </button>
              <div className="relative w-full h-full max-w-4xl max-h-[90vh]">
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage(index);
                    }}
                    className={`w-3 h-3 rounded-full ${
                      selectedImage === index ? "bg-white" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? "fill-gold-500 text-gold-500"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-bold text-forest-700">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="font-semibold mb-3">Color: {selectedColor}</h3>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      selectedColor === color.name ? "border-forest-600 scale-110" : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Size: {selectedSize}</h3>
                <button
                  onClick={() => setShowSizeGuide(true)}
                  className="text-sm text-forest-600 hover:underline"
                >
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-md transition-colors ${
                      selectedSize === size
                        ? "bg-forest-600 text-white border-forest-600"
                        : "border-gray-300 hover:border-forest-600"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Guide Modal */}
            {showSizeGuide && (
              <SizeGuide onClose={() => setShowSizeGuide(false)} category={product.category} />
            )}

            {/* Quantity */}
            <div>
              <h3 className="font-semibold mb-3">Quantity</h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border rounded-md hover:bg-earth-100"
                >
                  -
                </button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border rounded-md hover:bg-earth-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                size="lg"
                className="flex-1 bg-forest-600 hover:bg-forest-700 text-white font-semibold"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => toggleWishlist(product.id)}
                className={isInWishlist ? "border-terracotta-500" : ""}
              >
                <Heart
                  className={`h-5 w-5 ${
                    isInWishlist ? "fill-terracotta-500 text-terracotta-500" : ""
                  }`}
                />
              </Button>
            </div>

            {/* WhatsApp Order Button */}
            <a
              href={`https://wa.me/256753222207?text=${encodeURIComponent(
                `Hi! I'm interested in:\n${product.name}\nPrice: ${formatPrice(product.price)}\nColor: ${selectedColor}\nSize: ${selectedSize}\nQuantity: ${quantity}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <Button
                size="lg"
                variant="outline"
                className="w-full border-green-500 text-green-600 hover:bg-green-50"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Order via WhatsApp
              </Button>
            </a>

            {/* Trust Signals */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <Truck className="h-6 w-6 mx-auto mb-2 text-forest-600" />
                <p className="text-xs text-muted-foreground">Free Shipping</p>
              </div>
              <div className="text-center">
                <Shield className="h-6 w-6 mx-auto mb-2 text-forest-600" />
                <p className="text-xs text-muted-foreground">Secure Payment</p>
              </div>
              <div className="text-center">
                <RefreshCw className="h-6 w-6 mx-auto mb-2 text-forest-600" />
                <p className="text-xs text-muted-foreground">Easy Returns</p>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-4 pt-6 border-t">
              <div>
                <h3 className="font-semibold mb-2">Material</h3>
                <p className="text-muted-foreground">{product.material}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Care Instructions</h3>
                <p className="text-muted-foreground">{product.care}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Reviews */}
        <div className="max-w-4xl mx-auto">
          <ProductReviews
            productId={product.id}
            averageRating={product.rating}
            totalReviews={product.reviews}
          />
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
