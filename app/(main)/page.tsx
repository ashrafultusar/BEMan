import BrandStory from "@/components/main/home/brandStory/BrandStory";
import CraftedSection from "@/components/main/home/craftedSection/CraftedSection";
import CategorySkeleton from "@/components/main/home/FeaturedCategories/CategorySkeleton";
import FeaturedCategories from "@/components/main/home/FeaturedCategories/FeaturedCategories";
import HeroSection from "@/components/main/home/heroSection/HeroSection";
import NewAndPopular from "@/components/main/home/NewAndPopular/NewAndPopular";
import Testimonials from "@/components/main/home/testimonials/Testimonials";
import ProductSkeleton from "@/components/main/ProductCard/ProductSkeleton";
import { Suspense } from "react";

const Home = () => {
  return (
    <main>
      <HeroSection />
      <Suspense fallback={<CategorySkeleton/>}>
        <FeaturedCategories />
      </Suspense>
      <Suspense fallback={<ProductSkeleton />}>
        <NewAndPopular />
      </Suspense>
      <BrandStory/>
      <Testimonials/>
      <CraftedSection />
    </main>
  );
};

export default Home;
