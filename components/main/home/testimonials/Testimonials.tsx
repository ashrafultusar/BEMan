"use client";

import React, { useEffect, useRef } from 'react';
import { Star, Quote } from "lucide-react";
import styles from './Testimonials.module.css';

const reviews = [
  {
    name: "Rafiq Ahmed",
    location: "Dhaka",
    text: "The quality is unmatched. I've been buying from BEMEN for 2 years and every piece still looks brand new. The attention to detail is incredible.",
    rating: 5,
    product: "Premium Oversized Tee",
  },
  {
    name: "Tanvir Hassan",
    location: "Chittagong",
    text: "Finally found a brand that understands modern Bangladeshi fashion. The slim jeans fit perfectly and the fabric quality is premium.",
    rating: 5,
    product: "Dark Wash Slim Jeans",
  },
  {
    name: "Mahir Khan",
    location: "Sylhet",
    text: "Fast delivery, amazing packaging, and the hoodie exceeded my expectations. This is now my go-to brand for everything.",
    rating: 5,
    product: "Streetwear Hoodie",
  },
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(`.${styles.reveal}`);
            elements.forEach((el) => el.classList.add(styles.active));
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        
        <div className={`${styles.header} ${styles.reveal}`}>
          <span className={styles.label}>Reviews</span>
          <h2 className={styles.title}>
            What Our <span className={styles.italicGold}>Customers Say</span>
          </h2>
        </div>

        <div className={styles.grid}>
          {reviews.map((review, i) => (
            <div 
              key={review.name} 
              className={`${styles.card} ${styles.reveal}`}
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              <Quote className={styles.quoteIcon} size={32} />
              
              <div className={styles.stars}>
                {[...Array(review.rating)].map((_, si) => (
                  <Star 
                    key={si} 
                    size={14} 
                    fill="#c5a47e" 
                    color="#c5a47e" 
                  />
                ))}
              </div>

              <p className={styles.reviewText}>
                "{review.text}"
              </p>

              <div className={styles.footer}>
                <p className={styles.name}>{review.name}</p>
                <p className={styles.meta}>
                  {review.location} • {review.product}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;