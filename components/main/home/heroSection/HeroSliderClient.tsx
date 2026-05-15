"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./HeroSection.module.css";

interface Slide {
  id: string;
  image: string;
  ctaLink: string;
}

interface HeroSliderClientProps {
  slides: Slide[];
}

const HeroSliderClient = ({ slides: originalSlides }: HeroSliderClientProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // ইনফিনিটি ইফেক্টের জন্য স্লাইডগুলোকে ট্রিপল করা হয়েছে
  const slides = [...originalSlides, ...originalSlides, ...originalSlides];
  const totalOriginal = originalSlides.length;

  // শুরুতে স্লাইডারকে মাঝখানের সেটে সেট করা
  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      const slideWidth = container.scrollWidth / slides.length;
      container.scrollLeft = slideWidth * totalOriginal;
    }
  }, [totalOriginal, slides.length]);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollWidth, offsetWidth } = containerRef.current;
    const slideWidth = scrollWidth / slides.length;

    // বর্তমান একটিভ ইনডেক্স বের করা (ডটসের জন্য)
    const currentIndex = Math.round(scrollLeft / slideWidth);
    setActiveIndex(currentIndex % totalOriginal);

    // ইনফিনিটি রিসেট লজিক: 
    // যদি স্ক্রল একেবারে শুরুতে বা শেষে যায়, তবে অ্যানিমেশন ছাড়াই মাঝখানে জাম্প করবে
    if (scrollLeft <= 5) {
      containerRef.current.scrollLeft = slideWidth * totalOriginal;
    } else if (scrollLeft >= scrollWidth - offsetWidth - 5) {
      containerRef.current.scrollLeft = slideWidth * totalOriginal;
    }
  };

  const scrollToSlide = (index: number) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const slideWidth = container.scrollWidth / slides.length;
    
    container.scrollTo({
      left: slideWidth * index,
      behavior: "smooth",
    });
  };

  const slideNext = useCallback(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const slideWidth = container.scrollWidth / slides.length;
    container.scrollBy({ left: slideWidth, behavior: "smooth" });
  }, [slides.length]);

  const slidePrev = () => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const slideWidth = container.scrollWidth / slides.length;
    container.scrollBy({ left: -slideWidth, behavior: "smooth" });
  };

  // অটো-প্লে ইফেক্ট
  useEffect(() => {
    if (isHovered || totalOriginal <= 1) return;
    const timer = setInterval(slideNext, 3000);
    return () => clearInterval(timer);
  }, [isHovered, totalOriginal, slideNext]);

  return (
    <section
      className={styles.sliderWrapper}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={styles.sliderContainer}
        ref={containerRef}
        onScroll={handleScroll}
      >
        {slides.map((slide, index) => (
          <div key={`${slide.id}-${index}`} className={styles.slide}>
            <Link href={slide.ctaLink} className={styles.imageWrapper}>
              <Image
                src={slide.image}
                alt={`Slide ${index}`}
                fill
                className={styles.slideImage}
                priority={index >= totalOriginal && index < totalOriginal * 2}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </Link>
          </div>
        ))}
      </div>

      {/* নেভিগেশন বাটন */}
      {totalOriginal > 1 && (
        <>
          <button className={`${styles.navArrow} ${styles.prevArrow}`} onClick={slidePrev}>
            <ChevronLeft size={24} />
          </button>
          <button className={`${styles.navArrow} ${styles.nextArrow}`} onClick={slideNext}>
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* ডটস / প্যাগিনেশন */}
      <div className={styles.pagination}>
        {originalSlides.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === activeIndex ? styles.activeDot : ""}`}
            onClick={() => scrollToSlide(totalOriginal + index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSliderClient;