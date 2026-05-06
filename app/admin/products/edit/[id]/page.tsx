"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/lib/store/auth-store";
import { products } from "@/lib/data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Loader2, Plus, X } from "lucide-react";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const { isAuthenticated, isAdmin } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const product = products.find((p) => p.id === params.id);

  const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price.toString() || "",
    originalPrice: product?.originalPrice?.toString() || "",
    category: product?.category || "",
    subcategory: product?.subcategory || "",
    material: product?.material || "",
    care: product?.care || "",
    pattern: product?.pattern || "",
    inStock: product?.inStock ?? true,
    featured: product?.featured ?? false,
    trending: product?.trending ?? false,
    newArrival: product?.newArrival ?? false,
    flashDeal: product?.flashDeal ?? false,
  });

  const [colors, setColors] = useState(product?.colors || [{ name: "", hex: "#000000" }]);
  const [sizes, setSizes] = useState(product?.sizes || [""]);
  const [images, setImages] = useState<string[]>(product?.images || []);
  const [imageInput, setImageInput] = useState("");

  useEffect(() => {
    if (!isAuthenticated || !isAdmin()) {
      router.push("/login");
    } else if (!product) {
      router.push("/admin/products");
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, isAdmin, product, router]);

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

    const updatedProduct = {
      ...product,
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
      category: formData.category,
      subcategory: formData.subcategory,
      images,
      colors: colors.filter((c) => c.name && c.hex),
      sizes: sizes.filter((s) => s.trim()),
      material: formData.material,
      care: formData.care,
      pattern: formData.pattern,
      inStock: formData.inStock,
      featured: formData.featured,
      trending: formData.trending,
      newArrival: formData.newArrival,
      flashDeal: formData.flashDeal,
    };

    console.log("Updated Product:", updatedProduct);
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
    <div className="min-h-screen bg-earth-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link href="/admin/products">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-serif font-bold">Edit Product</h1>
              <p className="text-muted-foreground">{product?.name}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg p-6 space-y-6">
            {/* Same form fields as Add Product */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Product Name *</label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Description *</label>
                  <textarea
                    className="w-full px-4 py-2 border rounded-md min-h-[100px]"
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Category *</label>
                  <select
                    className="w-full px-4 py-2 border rounded-md"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="">Select category</option>
                    <option value="Traditional Fabrics">Traditional Fabrics</option>
                    <option value="Ready-to-Wear">Ready-to-Wear</option>
                    <option value="Home Textiles">Home Textiles</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Subcategory</label>
                  <Input
                    value={formData.subcategory}
                    onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Pricing</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Price (UGX) *</label>
                  <Input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Original Price (UGX)</label>
                  <Input
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Product Images</h2>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    placeholder="Image URL or path"
                    value={imageInput}
                    onChange={(e) => setImageInput(e.target.value)}
                  />
                  <Button type="button" onClick={handleAddImage}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {images.map((img, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square bg-earth-100 rounded-md overflow-hidden">
                          <img src={img} alt={`Product ${index + 1}`} className="w-full h-full object-cover" />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Colors</h2>
              <div className="space-y-3">
                {colors.map((color, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="Color name"
                      value={color.name}
                      onChange={(e) => handleColorChange(index, "name", e.target.value)}
                    />
                    <input
                      type="color"
                      value={color.hex}
                      onChange={(e) => handleColorChange(index, "hex", e.target.value)}
                      className="w-20 h-10 border rounded-md cursor-pointer"
                    />
                    {colors.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => handleRemoveColor(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={handleAddColor}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Color
                </Button>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Sizes</h2>
              <div className="space-y-3">
                {sizes.map((size, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="Size"
                      value={size}
                      onChange={(e) => handleSizeChange(index, e.target.value)}
                    />
                    {sizes.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => handleRemoveSize(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={handleAddSize}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Size
                </Button>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Product Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Material</label>
                  <Input
                    value={formData.material}
                    onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Pattern</label>
                  <Input
                    value={formData.pattern}
                    onChange={(e) => setFormData({ ...formData, pattern: e.target.value })}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Care Instructions</label>
                  <Input
                    value={formData.care}
                    onChange={(e) => setFormData({ ...formData, care: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Status & Features</h2>
              <div className="space-y-3">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.inStock}
                    onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">In Stock</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Featured Product</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.trending}
                    onChange={(e) => setFormData({ ...formData, trending: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Trending</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.newArrival}
                    onChange={(e) => setFormData({ ...formData, newArrival: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">New Arrival</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.flashDeal}
                    onChange={(e) => setFormData({ ...formData, flashDeal: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Flash Deal</span>
                </label>
              </div>
            </div>

            <div className="flex gap-3 pt-6 border-t">
              <Button
                type="submit"
                className="flex-1 bg-forest-600 hover:bg-forest-700"
                disabled={saving}
              >
                {saving ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Update Product"
                )}
              </Button>
              <Link href="/admin/products" className="flex-1">
                <Button type="button" variant="outline" className="w-full">
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
