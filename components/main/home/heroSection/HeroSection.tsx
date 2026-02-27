import HeroSliderClient from "./HeroSliderClient";

const HeroSection = () => {
  const slides = [
    {
      id: 1,
      image: "/assets/banner/banner.jpg",
      title: "New Collection",
      subtitle: "Timeless Essentials — Spring 2026",
      ctaText: "Shop Now",
      ctaLink: "/shop/all",
      overlay: "linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.1) 60%)"
    },
    {
      id: 2,
      image: "/assets/banner/banner2.jpg",
      title: "Minimal Design",
      subtitle: "Modern Simplicity — Summer 2026",
      ctaText: "Discover More",
      ctaLink: "/shop/summer",
      overlay: "linear-gradient(to top, rgba(0, 0, 50, 0.6) 0%, rgba(0, 0, 0, 0.1) 60%)"
    },
    {
      id: 3,
      image: "/assets/banner/banner3.jpg",
      title: "Luxury Comfort",
      subtitle: "Premium Fabrics — Limited Edition",
      ctaText: "Explore",
      ctaLink: "/shop/luxury",
      overlay: "linear-gradient(45deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.2) 80%)"
    }
  ];

  return <HeroSliderClient slides={slides} />;
};

export default HeroSection;