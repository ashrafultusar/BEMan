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

const HeroSliderClient = ({ slides }: HeroSliderClientProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // বর্তমান স্ক্রল পজিশন
    const scrollLeft = container.scrollLeft;

    // টোটাল স্ক্রল হওয়ার জায়গা থেকে প্রতি স্লাইডের প্রস্থ বের করা 
    const slideWidth = container.scrollWidth / slides.length;

    const currentIndex = Math.round(scrollLeft / slideWidth);
    setActiveIndex(currentIndex);
  };

  const scrollToSlide = useCallback((index: number) => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const slideWidth = container.scrollWidth / slides.length;
    container.scrollTo({
      left: slideWidth * index,
      behavior: "smooth",
    });
  }, [slides.length]);

  const slidePrev = () => {
    setActiveIndex((prevIndex) => {
      const nextIndex = prevIndex - 1 < 0 ? slides.length - 1 : prevIndex - 1;
      scrollToSlide(nextIndex);
      return nextIndex;
    });
  };

  const slideNext = () => {
    setActiveIndex((prevIndex) => {
      const nextIndex = prevIndex + 1 >= slides.length ? 0 : prevIndex + 1;
      scrollToSlide(nextIndex);
      return nextIndex;
    });
  };

  // Auto slide effect
  useEffect(() => {
    if (isHovered || slides.length <= 1) return;

    const timer = setInterval(() => {
      slideNext();
    }, 4000);

    return () => clearInterval(timer);
  }, [isHovered, slides.length, scrollToSlide]);

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
          <div key={index} className={styles.slide}>
            <Link href={slide.ctaLink} className={styles.imageWrapper}>
              <Image
                src={slide.image}
                alt={`Promotion Banner ${index + 1}`}
                fill
                className={styles.slideImage}
                priority={index < 3}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </Link>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button
            className={`${styles.navArrow} ${styles.prevArrow}`}
            onClick={slidePrev}
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className={`${styles.navArrow} ${styles.nextArrow}`}
            onClick={slideNext}
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Pagination */}
      <div className={styles.pagination}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === activeIndex ? styles.activeDot : ""}`}
            onClick={() => scrollToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSliderClient;