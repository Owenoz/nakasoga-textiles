import HeroBanner from "@/components/home/hero-banner";
import FeaturedCategories from "@/components/home/featured-categories";
import FlashDeals from "@/components/home/flash-deals";
import BestSellers from "@/components/home/best-sellers";
import Newsletter from "@/components/home/newsletter";

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <FeaturedCategories />
      <FlashDeals />
      <BestSellers />
      <Newsletter />
    </>
  );
}
