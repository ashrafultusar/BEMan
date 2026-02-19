'use client';

import React, { useEffect, useState } from 'react';
import styles from './LoadingPage.module.css';

export default function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 1));
    }, 30);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.logoIcon}>
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.svg}
          >
            {/* ব্যাকগ্রাউন্ড গাইড লাইন (খুবই হালকা গ্রে) */}
            <path
              d="M25 20V80M25 20L50 45L75 20V80M40 52H75C80 52 85 56 85 64C85 72 80 76 75 76H25"
              stroke="#f3f3f3"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* মেইন প্রগ্রেস লাইন (পিওর ব্ল্যাক) */}
            <path
              d="M25 20V80M25 20L50 45L75 20V80M40 52H75C80 52 85 56 85 64C85 72 80 76 75 76H25"
              stroke="black"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="400" 
              style={{ 
                strokeDashoffset: 400 - (400 * progress) / 100 
              }}
              className={styles.progressPath}
            />
          </svg>
        </div>
        
       
      </div>
    </div>
  );
}