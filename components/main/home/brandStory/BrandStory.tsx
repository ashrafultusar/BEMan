"use client";

import React, { useEffect, useRef } from 'react';
import styles from './BrandStory.module.css';

const stats = [
  { value: "10K+", label: "Happy Customers" },
  { value: "500+", label: "Unique Designs" },
  { value: "4.9★", label: "Average Rating" },
];

const BrandStory = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observerOptions = { threshold: 0.15 };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Section er vitore thaka sob reveal class ke active kore dibe
          const elements = entry.target.querySelectorAll(`.${styles.reveal}, .${styles.goldLine}`);
          elements.forEach((el) => el.classList.add(styles.active));
        }
      });
    }, observerOptions);

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="story" className={styles.section}>
      <div className={styles.grid}>
        
        {/* Image side */}
        <div className={styles.imageSide}>
          <img
            src="/assets/brandstory/brandstory.jpg"
            alt="BEMEN brand lifestyle"
            className={styles.brandImg}
          />
        </div>

        {/* Content side */}
        <div className={styles.contentSide}>
          <div className={styles.maxW}>
            
            <div className={styles.goldLine} />

            <p className={`${styles.storyLabel} ${styles.reveal}`}>
              Our Story
            </p>

            <h2 className={`${styles.title} ${styles.reveal}`} style={{ transitionDelay: '0.2s' }}>
              Crafted With <br />
              <span className={styles.italicGold}>Purpose & Passion</span>
            </h2>

            <p className={`${styles.description} ${styles.reveal}`} style={{ transitionDelay: '0.4s' }}>
              Every piece at BEMEN is a testament to our commitment to excellence. We believe
              fashion should be both beautiful and enduring — garments that feel as good as they
              look, designed for the modern man who values quality above all.
            </p>

            <p className={`${styles.description} ${styles.reveal}`} style={{ transitionDelay: '0.5s' }}>
              From sourcing premium fabrics to perfecting every stitch, our attention to detail
              ensures that each collection tells a story of sophistication and style.
            </p>

            {/* Stats */}
            <div className={`${styles.statsGrid} ${styles.reveal}`} style={{ transitionDelay: '0.6s' }}>
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className={styles.statValue}>{stat.value}</p>
                  <p className={styles.statLabel}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;