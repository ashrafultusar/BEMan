import AboutSection from "@/components/main/home/aboutSection/AboutSection";
import CategorySkeleton from "@/components/main/home/FeaturedCategories/CategorySkeleton";
import FeaturedCategories from "@/components/main/home/FeaturedCategories/FeaturedCategories";
import HeroSection from "@/components/main/home/heroSection/HeroSection";
import InstagramFeed from "@/components/main/home/instagramFeed/InstagramFeed";
import NewAndPopular from "@/components/main/home/NewAndPopular/NewAndPopular";
import Testimonials from "@/components/main/home/Testimonials/Testimonials";
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
      <AboutSection/>
      <Testimonials/>
      <InstagramFeed/>
    </main>
  );
};

export default Home;
