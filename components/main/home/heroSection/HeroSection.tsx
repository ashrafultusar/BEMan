
import Link from 'next/link';
import Image from 'next/image';
import styles from './HeroSection.module.css';

const HeroSection = () => {
    return (
        <section className={styles.heroContainer}>
            {/* Background Image - Server Optimized */}
            <div className="absolute inset-0">
                <Image 
                    src="/assets/logo.jpg" 
                    alt="Bemen Collection" 
                    fill 
                    className="object-cover brightness-75"
                    priority // Hero image jate shob age load hoy
                />
            </div>

            <div className={styles.overlay} />

            <div className={styles.contentWrapper}>
                {/* Pure CSS Animation applied here */}
                <div className={styles.animatedContent}>
                    <h1 className={styles.title}>
                        New Collection
                    </h1>
                    
                    <p className={styles.subtitle}>
                        Timeless Essentials — Spring 2026
                    </p>

                    <Link href="/homestay" className={styles.shopButton}>
                        Shop Now
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;