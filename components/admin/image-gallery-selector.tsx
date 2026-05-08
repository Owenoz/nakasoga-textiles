"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Check, Search, Image as ImageIcon } from "lucide-react";
import { getAvailableImages } from "@/lib/utils/image-gallery";

interface ImageGallerySelectorProps {
  selectedImages: string[];
  onImagesChange: (images: string[]) => void;
}

export function ImageGallerySelector({ selectedImages, onImagesChange }: ImageGallerySelectorProps) {
  const [showGallery, setShowGallery] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const availableImages = getAvailableImages();

  const filteredImages = availableImages.filter((img) =>
    img.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleImage = (image: string) => {
    if (selectedImages.includes(image)) {
      onImagesChange(selectedImages.filter((img) => img !== image));
    } else {
      onImagesChange([...selectedImages, image]);
    }
  };

  const isSelected = (image: string) => selectedImages.includes(image);

  return (
    <div>
      <Button
        type="button"
        variant="outline"
        onClick={() => setShowGallery(true)}
        className="w-full sm:w-auto hover:bg-forest-50 hover:border-forest-300"
      >
        <ImageIcon className="h-4 w-4 mr-2" />
        Choose from Gallery ({availableImages.length} images)
      </Button>

      {showGallery && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="p-4 md:p-6 border-b border-gray-200 flex-shrink-0">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900">Image Gallery</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedImages.length} selected
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowGallery(false)}
                  className="hover:bg-gray-100"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search images..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-gray-200 focus:border-forest-500 focus:ring-forest-500"
                />
              </div>
            </div>

            {/* Gallery Grid */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                {filteredImages.map((image, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => toggleImage(image)}
                    className={`relative aspect-square rounded-lg overflow-hidden group cursor-pointer transition-all ${
                      isSelected(image)
                        ? "ring-4 ring-forest-500 scale-95"
                        : "ring-1 ring-gray-200 hover:ring-2 hover:ring-forest-300 hover:scale-105"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`Gallery image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    {isSelected(image) && (
                      <div className="absolute inset-0 bg-forest-600/80 flex items-center justify-center">
                        <div className="bg-white rounded-full p-2">
                          <Check className="h-6 w-6 text-forest-600" />
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>

              {filteredImages.length === 0 && (
                <div className="text-center py-12">
                  <ImageIcon className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-30" />
                  <p className="text-muted-foreground">No images found</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 md:p-6 border-t border-gray-200 flex-shrink-0">
              <div className="flex flex-col sm:flex-row gap-3 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowGallery(false)}
                  className="hover:bg-gray-50"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={() => setShowGallery(false)}
                  className="bg-gradient-to-r from-forest-600 to-forest-700 hover:from-forest-700 hover:to-forest-800 shadow-md"
                >
                  Done ({selectedImages.length} selected)
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
