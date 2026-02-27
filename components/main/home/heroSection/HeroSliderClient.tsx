"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./HeroSection.module.css";

interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  overlay: string;
}

interface HeroSliderClientProps {
  slides: Slide[];
}

const HeroSliderClient = ({ slides }: HeroSliderClientProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [isAnimating, slides.length]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [isAnimating, slides.length]);

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(index);
  };

  // ৩ সেকেন্ড পর পর স্লাইড অটো পরিবর্তন
  useEffect(() => {
    const timer = setInterval(nextSlide, 3000); 
    return () => clearInterval(timer);
  }, [nextSlide]);

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 800);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  return (
    <section className={styles.sliderContainer}>
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`${styles.slide} ${index === currentSlide ? styles.active : ""}`}
        >
          <div className={styles.imageWrapper}>
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className={styles.slideImage}
              priority={index === 0}
              sizes="100vw"
              quality={100}
            />
            <div className={styles.overlay} style={{ background: slide.overlay }} />
          </div>

          <div className={styles.contentWrapper}>
            <div className={styles.animatedContent}>
              <h1 className={styles.title}>{slide.title}</h1>
              <p className={styles.subtitle}>{slide.subtitle}</p>
              <div className={styles.buttonWrapper}>
                <Link href={slide.ctaLink} className={styles.ctaButton}>
                  {slide.ctaText}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button onClick={prevSlide} className={`${styles.navArrow} ${styles.prevArrow}`} aria-label="Prev">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button onClick={nextSlide} className={`${styles.navArrow} ${styles.nextArrow}`} aria-label="Next">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Indicators */}
      <div className={styles.indicators}>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`${styles.indicator} ${index === currentSlide ? styles.activeIndicator : ""}`}
          >
            <div className={styles.indicatorProgress} />
          </button>
        ))}
      </div>
    </section>
  );
};

export default HeroSliderClient;