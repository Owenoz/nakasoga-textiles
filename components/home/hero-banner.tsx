"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    title: "Premium East African Textiles",
    subtitle: "Discover authentic Ankara, Kitenge & traditional fabrics",
    image: "/images/products/WhatsApp Image 2026-05-05 at 11.05.22.jpeg",
    cta: "Shop Fabrics",
    link: "/shop?category=traditional-fabrics",
  },
  {
    id: 2,
    title: "Ready-to-Wear Collection",
    subtitle: "Beautiful clothing for every occasion",
    image: "/images/products/WhatsApp Image 2026-05-05 at 11.05.23.jpeg",
    cta: "Shop Clothing",
    link: "/shop?category=ready-to-wear",
  },
  {
    id: 3,
    title: "Transform Your Space",
    subtitle: "Elegant home textiles with African soul",
    image: "/images/products/WhatsApp Image 2026-05-05 at 11.05.24.jpeg",
    cta: "Shop Home",
    link: "/shop?category=home-textiles",
  },
];

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-[500px] md:h-[600px] overflow-hidden bg-earth-100">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
          
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl text-white">
                <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 animate-fade-in">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl mb-8 text-gray-200 animate-fade-in">
                  {slide.subtitle}
                </p>
                <Link href={slide.link}>
                  <Button size="lg" className="bg-gold-500 hover:bg-gold-600 text-white font-semibold px-8">
                    {slide.cta}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide ? "w-8 bg-gold-500" : "w-2 bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
