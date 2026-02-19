import Link from "next/link";
import Image from "next/image";
import styles from "./HeroSection.module.css";

const HeroSection = () => {
  return (
    <section className={styles.heroContainer}>
      <div className="absolute inset-0">
        <Image
          src="/assets/banner/banner.jpg"
          alt="Bemen Collection"
          fill
          className="object-cover brightness-75"
          priority
        />
      </div>

      <div className={styles.overlay} />

      <div className={styles.contentWrapper}>
        <div className={styles.animatedContent}>
          <h1 className={styles.title}>New Collection</h1>

          <p className={styles.subtitle}>Timeless Essentials — Spring 2026</p>

          <Link href="/shop/all" className="bg-white px-6 py-3 " >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
