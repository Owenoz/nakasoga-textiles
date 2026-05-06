"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/lib/store/auth-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Loader2, Plus, X, Upload } from "lucide-react";

export default function AddProductPage() {
  const router = useRouter();
  const { isAuthenticated, isAdmin } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "",
    subcategory: "",
    material: "",
    care: "",
    pattern: "",
    inStock: true,
    featured: false,
    trending: false,
    newArrival: false,
    flashDeal: false,
  });

  const [colors, setColors] = useState([{ name: "", hex: "#000000" }]);
  const [sizes, setSizes] = useState([""]);
  const [images, setImages] = useState<string[]>([]);
  const [imageInput, setImageInput] = useState("");

  useEffect(() => {
    if (!isAuthenticated || !isAdmin()) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, isAdmin, router]);

  const handleAddColor = () => {
    setColors([...colors, { name: "", hex: "#000000" }]);
  };

  const handleRemoveColor = (index: number) => {
    setColors(colors.filter((_, i) => i !== index));
  };

  const handleColorChange = (index: number, field: "name" | "hex", value: string) => {
    const newColors = [...colors];
    newColors[index][field] = value;
    setColors(newColors);
  };

  const handleAddSize = () => {
    setSizes([...sizes, ""]);
  };

  const handleRemoveSize = (index: number) => {
    setSizes(sizes.filter((_, i) => i !== index));
  };

  const handleSizeChange = (index: number, value: string) => {
    const newSizes = [...sizes];
    newSizes[index] = value;
    setSizes(newSizes);
  };

  const handleAddImage = () => {
    if (imageInput.trim()) {
      setImages([...images, imageInput.trim()]);
      setImageInput("");
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    // Create product object
    const newProduct = {
      id: `product-${Date.now()}`,
      slug: formData.name.toLowerCase().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-"),
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
      category: formData.category,
      subcategory: formData.subcategory,
      images: images.length > 0 ? images : ["/images/products/placeholder.jpg"],
      colors: colors.filter((c) => c.name && c.hex),
      sizes: sizes.filter((s) => s.trim()),
      material: formData.material,
      care: formData.care,
      pattern: formData.pattern,
      rating: 0,
      reviews: 0,
      inStock: formData.inStock,
      featured: formData.featured,
      trending: formData.trending,
      newArrival: formData.newArrival,
      flashDeal: formData.flashDeal,
    };

    // In production, this would save to database
    console.log("New Product:", newProduct);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSaving(false);
    router.push("/admin/products");
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
          <div className="flex items-center gap-3 md:gap-4">
            <Link href="/admin/products">
              <Button variant="ghost" size="icon" className="hover:bg-forest-50">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl md:text-3xl font-serif font-bold bg-gradient-to-r from-forest-700 to-forest-500 bg-clip-text text-transparent">
                Add New Product
              </h1>
              <p className="text-sm text-muted-foreground font-medium">Create a new product listing</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-10">
        <form onSubmit={handleSubmit} className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl p-6 md:p-8 space-y-8 shadow-sm border border-gray-100">
            {/* Basic Information */}
            <div>
              <h2 className="text-xl font-bold mb-5 text-gray-900 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-forest-100 flex items-center justify-center">
                  <span className="text-forest-700 font-bold text-sm">1</span>
                </div>
                Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Product Name *</label>
                  <Input
                    placeholder="e.g., Ankara Print Fabric - Gold Burst"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="border-gray-200 focus:border-forest-500 focus:ring-forest-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Description *</label>
                  <textarea
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg min-h-[120px] focus:border-forest-500 focus:ring-2 focus:ring-forest-200 outline-none transition-all resize-none"
                    placeholder="Detailed product description..."
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    aria-label="Product description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Category *</label>
                  <select
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-forest-500 focus:ring-2 focus:ring-forest-200 outline-none transition-all"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    aria-label="Product category"
                  >
                    <option value="">Select category</option>
                    <option value="Traditional Fabrics">Traditional Fabrics</option>
                    <option value="Ready-to-Wear">Ready-to-Wear</option>
                    <option value="Home Textiles">Home Textiles</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Subcategory</label>
                  <Input
                    placeholder="e.g., Ankara, Dresses, Pillows"
                    value={formData.subcategory}
                    onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                    className="border-gray-200 focus:border-forest-500 focus:ring-forest-500"
                  />
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div>
              <h2 className="text-xl font-bold mb-5 text-gray-900 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-forest-100 flex items-center justify-center">
                  <span className="text-forest-700 font-bold text-sm">2</span>
                </div>
                Pricing
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Price (UGX) *</label>
                  <Input
                    type="number"
                    placeholder="45000"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="border-gray-200 focus:border-forest-500 focus:ring-forest-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Original Price (UGX)</label>
                  <Input
                    type="number"
                    placeholder="60000"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    className="border-gray-200 focus:border-forest-500 focus:ring-forest-500"
                  />
                  <p className="text-xs text-muted-foreground mt-2">Leave empty if no discount</p>
                </div>
              </div>
            </div>

            {/* Images */}
            <div>
              <h2 className="text-xl font-bold mb-5 text-gray-900 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-forest-100 flex items-center justify-center">
                  <span className="text-forest-700 font-bold text-sm">3</span>
                </div>
                Product Images
              </h2>
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input
                    placeholder="Image URL or path (e.g., /images/products/image.jpg)"
                    value={imageInput}
                    onChange={(e) => setImageInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddImage())}
                    className="flex-1 border-gray-200 focus:border-forest-500 focus:ring-forest-500"
                  />
                  <Button type="button" onClick={handleAddImage} className="bg-forest-600 hover:bg-forest-700 w-full sm:w-auto" aria-label="Add image">
                    <Plus className="h-4 w-4 sm:mr-0" />
                    <span className="sm:hidden ml-2">Add Image</span>
                  </Button>
                </div>
                {images.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {images.map((img, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square bg-earth-100 rounded-lg overflow-hidden ring-1 ring-gray-200">
                          <img src={img} alt={`Product ${index + 1}`} className="w-full h-full object-cover" />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                          aria-label="Remove image"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Upload className="h-3 w-3" />
                  Add image URLs. First image will be the main product image.
                </p>
              </div>
            </div>

            {/* Colors */}
            <div>
              <h2 className="text-xl font-bold mb-5 text-gray-900 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-forest-100 flex items-center justify-center">
                  <span className="text-forest-700 font-bold text-sm">4</span>
                </div>
                Colors
              </h2>
              <div className="space-y-3">
                {colors.map((color, index) => (
                  <div key={index} className="flex flex-col sm:flex-row gap-2">
                    <Input
                      placeholder="Color name (e.g., Gold)"
                      value={color.name}
                      onChange={(e) => handleColorChange(index, "name", e.target.value)}
                      className="flex-1 border-gray-200 focus:border-forest-500 focus:ring-forest-500"
                    />
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={color.hex}
                        onChange={(e) => handleColorChange(index, "hex", e.target.value)}
                        className="w-full sm:w-20 h-12 border border-gray-200 rounded-lg cursor-pointer"
                        aria-label="Color picker"
                      />
                      {colors.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => handleRemoveColor(index)}
                          className="flex-shrink-0 hover:bg-red-50 hover:border-red-300 hover:text-red-600"
                          aria-label="Remove color"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={handleAddColor} className="w-full sm:w-auto hover:bg-forest-50 hover:border-forest-300">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Color
                </Button>
              </div>
            </div>

            {/* Sizes */}
            <div>
              <h2 className="text-xl font-bold mb-5 text-gray-900 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-forest-100 flex items-center justify-center">
                  <span className="text-forest-700 font-bold text-sm">5</span>
                </div>
                Sizes
              </h2>
              <div className="space-y-3">
                {sizes.map((size, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="Size (e.g., M, 2 yards, One Size)"
                      value={size}
                      onChange={(e) => handleSizeChange(index, e.target.value)}
                      className="flex-1 border-gray-200 focus:border-forest-500 focus:ring-forest-500"
                    />
                    {sizes.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => handleRemoveSize(index)}
                        className="flex-shrink-0 hover:bg-red-50 hover:border-red-300 hover:text-red-600"
                        aria-label="Remove size"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={handleAddSize} className="w-full sm:w-auto hover:bg-forest-50 hover:border-forest-300">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Size
                </Button>
              </div>
            </div>

            {/* Product Details */}
            <div>
              <h2 className="text-xl font-bold mb-5 text-gray-900 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-forest-100 flex items-center justify-center">
                  <span className="text-forest-700 font-bold text-sm">6</span>
                </div>
                Product Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Material</label>
                  <Input
                    placeholder="e.g., 100% Cotton"
                    value={formData.material}
                    onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                    className="border-gray-200 focus:border-forest-500 focus:ring-forest-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Pattern</label>
                  <Input
                    placeholder="e.g., Geometric, Floral"
                    value={formData.pattern}
                    onChange={(e) => setFormData({ ...formData, pattern: e.target.value })}
                    className="border-gray-200 focus:border-forest-500 focus:ring-forest-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Care Instructions</label>
                  <Input
                    placeholder="e.g., Machine wash cold, tumble dry low"
                    value={formData.care}
                    onChange={(e) => setFormData({ ...formData, care: e.target.value })}
                    className="border-gray-200 focus:border-forest-500 focus:ring-forest-500"
                  />
                </div>
              </div>
            </div>

            {/* Status & Features */}
            <div>
              <h2 className="text-xl font-bold mb-5 text-gray-900 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-forest-100 flex items-center justify-center">
                  <span className="text-forest-700 font-bold text-sm">7</span>
                </div>
                Status & Features
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-forest-50 hover:border-forest-300 cursor-pointer transition-all">
                  <input
                    type="checkbox"
                    checked={formData.inStock}
                    onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                    className="w-5 h-5 text-forest-600 rounded focus:ring-forest-500"
                  />
                  <span className="text-sm font-medium">In Stock</span>
                </label>

                <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-forest-50 hover:border-forest-300 cursor-pointer transition-all">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-5 h-5 text-forest-600 rounded focus:ring-forest-500"
                  />
                  <span className="text-sm font-medium">Featured Product</span>
                </label>

                <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-forest-50 hover:border-forest-300 cursor-pointer transition-all">
                  <input
                    type="checkbox"
                    checked={formData.trending}
                    onChange={(e) => setFormData({ ...formData, trending: e.target.checked })}
                    className="w-5 h-5 text-forest-600 rounded focus:ring-forest-500"
                  />
                  <span className="text-sm font-medium">Trending</span>
                </label>

                <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-forest-50 hover:border-forest-300 cursor-pointer transition-all">
                  <input
                    type="checkbox"
                    checked={formData.newArrival}
                    onChange={(e) => setFormData({ ...formData, newArrival: e.target.checked })}
                    className="w-5 h-5 text-forest-600 rounded focus:ring-forest-500"
                  />
                  <span className="text-sm font-medium">New Arrival</span>
                </label>

                <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-forest-50 hover:border-forest-300 cursor-pointer transition-all sm:col-span-2">
                  <input
                    type="checkbox"
                    checked={formData.flashDeal}
                    onChange={(e) => setFormData({ ...formData, flashDeal: e.target.checked })}
                    className="w-5 h-5 text-forest-600 rounded focus:ring-forest-500"
                  />
                  <span className="text-sm font-medium">Flash Deal</span>
                </label>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-forest-600 to-forest-700 hover:from-forest-700 hover:to-forest-800 shadow-md hover:shadow-lg transition-all py-6 text-base font-semibold"
                disabled={saving}
              >
                {saving ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Creating Product...
                  </>
                ) : (
                  "Create Product"
                )}
              </Button>
              <Link href="/admin/products" className="flex-1">
                <Button type="button" variant="outline" className="w-full py-6 text-base font-semibold hover:bg-gray-50">
                  Cancel
                </Button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
