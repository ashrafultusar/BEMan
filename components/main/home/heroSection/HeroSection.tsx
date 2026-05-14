
import HeroSliderClient from "./HeroSliderClient";
import { getSliders } from "@/lib/data/slider";

const HeroSection = async () => {
  // Fetch sliders from the database
  const slidersDB = await getSliders();

  // If there are no sliders, either show nothing or show placeholders
  // We will map DB sliders to what HeroSliderClient expects
  const slides = slidersDB.map((s: any, i: number) => ({
    id: s._id.toString(),
    image: s.image,
    ctaLink: s.ctaLink,
  }));

  // Fallback if no sliders in DB
  const displaySlides = slides.length > 0 ? slides : [
    {
      id: "1",
      image: "/assets/banner/banner1.png",
      ctaLink: "/shop/ramadan-special",
    },
    {
      id: "2",
      image: "/assets/banner/banner2.png",
      ctaLink: "/shop/baby-products",
    },
    {
      id: "3",
      image: "/assets/banner/banner3.png",
      ctaLink: "/shop/offers",
    }
  ];

  return <HeroSliderClient slides={displaySlides} />;
};

export default HeroSection;