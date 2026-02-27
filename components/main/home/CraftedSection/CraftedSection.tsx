"use client";



import React from 'react';

import Link from 'next/link';

import { MoveRight } from 'lucide-react';

import styles from './CraftedSection.module.css';



const CraftedSection: React.FC = () => {

  return (

    <section className={styles.section}>

      {/* Decorative Elements */}

      <div className={styles.dot} style={{ top: '20%', left: '10%' }} />

      <div className={styles.dot} style={{ bottom: '15%', right: '12%' }} />



      <div className={styles.container}>

        {/* Subtle Label */}

        <span className={styles.label}>Est. 2024 — BEMEN</span>

        

        {/* Unique Heading */}

        <h2 className={styles.title}>

          Crafted With <span className={styles.italic}>Purpose</span> <br /> 

          & Enduring <span className={styles.italic}>Style</span>

        </h2>

        

        {/* Elegant Description */}

        <p className={styles.description}>

          Every piece is designed to last. We focus on premium materials, 

          thoughtful construction, and a timeless aesthetic that transcends 

          fleeting trends.

        </p>



        {/* Unique Action Button */}

        <div className={styles.btnWrapper}>

          <Link href="/shop/all" className={styles.button}>

            Explore Collection 

            <MoveRight size={16} />

          </Link>

        </div>

      </div>

    </section>

  );

};



export default CraftedSection;