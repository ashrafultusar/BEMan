import FeaturedCategories from '@/components/main/home/FeaturedCategories/FeaturedCategories';
import HeroSection from '@/components/main/home/heroSection/HeroSection';
import NewAndPopular from '@/components/main/home/NewAndPopular/NewAndPopular';


const Home = () => {
    return (
        <main>
           <HeroSection/>
           <FeaturedCategories/>
           <NewAndPopular/>
        </main>
    );
};

export default Home;