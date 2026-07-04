"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    title: "Premium East African Textiles",
    subtitle: "Discover authentic Ankara, Kitenge & traditional fabrics",
    badge: "New Collection 2026",
    image: "/images/products/WhatsApp Image 2026-05-05 at 11.05.22.jpeg",
    cta: "Shop Fabrics",
    link: "/shop?category=traditional-fabrics",
    accentColor: "from-gold-500 to-terracotta-500",
  },
  {
    id: 2,
    title: "Ready-to-Wear Collection",
    subtitle: "Beautiful clothing crafted for every occasion",
    badge: "Trending Now",
    image: "/images/products/WhatsApp Image 2026-05-05 at 11.05.23.jpeg",
    cta: "Shop Clothing",
    link: "/shop?category=ready-to-wear",
    accentColor: "from-forest-500 to-forest-700",
  },
  {
    id: 3,
    title: "Transform Your Space",
    subtitle: "Elegant home textiles with African soul",
    badge: "Editor's Pick",
    image: "/images/products/WhatsApp Image 2026-05-05 at 11.05.24.jpeg",
    cta: "Shop Home",
    link: "/shop?category=home-textiles",
    accentColor: "from-terracotta-500 to-gold-600",
  },
];

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      goToNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setIsTransitioning(false);
    }, 100);
  };

  const goToPrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setIsTransitioning(false);
    }, 100);
  };

  const slide = slides[currentSlide];

  return (
    <div className="relative h-[520px] md:h-[640px] overflow-hidden bg-earth-950">
      {/* Slides */}
      {slides.map((s, index) => (
        <div
          key={s.id}
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{ opacity: index === currentSlide ? 1 : 0 }}
        >
          <Image
            src={s.image}
            alt={s.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          {/* Multi-layer gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/15" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>
      ))}

      {/* Decorative floating orbs */}
      <div className="absolute top-16 right-16 w-48 h-48 rounded-full opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(245,158,11,0.6), transparent)", filter: "blur(40px)" }} />
      <div className="absolute bottom-20 left-1/3 w-32 h-32 rounded-full opacity-15 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(22,163,74,0.7), transparent)", filter: "blur(30px)" }} />

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl text-white">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-5 animate-fade-in"
              style={{
                background: "rgba(255,255,255,0.12)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.25)",
                boxShadow: "0 2px 12px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.2)",
              }}
            >
              <Sparkles className="h-3 w-3 text-gold-300" />
              <span className="text-gold-200">{slide.badge}</span>
            </div>

            {/* Heading */}
            <h1
              className="text-4xl md:text-6xl font-serif font-bold mb-4 leading-tight animate-fade-in"
              style={{ textShadow: "0 2px 20px rgba(0,0,0,0.4)" }}
            >
              {slide.title}
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl mb-8 text-gray-200/90 leading-relaxed animate-fade-in max-w-lg">
              {slide.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 animate-fade-in">
              <Link href={slide.link}>
                <button className="btn-gradient-amber px-8 py-3 rounded-xl text-base font-semibold transition-all duration-300 hover:-translate-y-1">
                  {slide.cta}
                </button>
              </Link>
              <Link href="/shop">
                <button
                  className="px-8 py-3 rounded-xl text-base font-semibold transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: "rgba(255,255,255,0.12)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.3)",
                    color: "white",
                  }}
                >
                  View All
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      {[
        { onClick: goToPrev, side: "left-4", Icon: ChevronLeft, label: "Previous slide" },
        { onClick: goToNext, side: "right-4", Icon: ChevronRight, label: "Next slide" },
      ].map(({ onClick, side, Icon, label }) => (
        <button
          key={label}
          onClick={onClick}
          aria-label={label}
          className={`absolute ${side} top-1/2 -translate-y-1/2 transition-all duration-200 hover:scale-110`}
          style={{
            background: "rgba(255,255,255,0.12)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.25)",
            borderRadius: "50%",
            padding: "0.6rem",
            color: "white",
            boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
          }}
        >
          <Icon className="h-6 w-6" />
        </button>
      ))}

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 items-center">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className="transition-all duration-300"
            style={{
              height: "6px",
              width: index === currentSlide ? "28px" : "6px",
              borderRadius: "99px",
              background: index === currentSlide
                ? "linear-gradient(90deg, #f59e0b, #e56a4a)"
                : "rgba(255,255,255,0.45)",
            }}
          />
        ))}
      </div>

      {/* Bottom glass shelf */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(253,250,244,0.08), transparent)",
        }}
      />
    </div>
  );
}
