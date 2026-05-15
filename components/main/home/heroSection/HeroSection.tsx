import HeroSliderClient from "./HeroSliderClient";
import { getSliders } from "@/lib/data/slider";

const HeroSection = async () => {
  const slidersDB = await getSliders();

  // ডাটাবেস থেকে আসা ডাটাকে ম্যাপ করা
  const displaySlides = slidersDB.map((s: any) => ({
    id: s._id.toString(),
    image: s.image,
    ctaLink: s.ctaLink,
  }));

  if (displaySlides.length === 0) return null;

  return <HeroSliderClient slides={displaySlides} />;
};

export default HeroSection;