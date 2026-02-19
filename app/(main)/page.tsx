import CraftedSection from '@/components/main/home/CraftedSection/CraftedSection';
import FeaturedCategories from '@/components/main/home/FeaturedCategories/FeaturedCategories';
import HeroSection from '@/components/main/home/heroSection/HeroSection';
import NewAndPopular from '@/components/main/home/NewAndPopular/NewAndPopular';


const Home = () => {
    return (
        <main>
           <HeroSection/>
           <FeaturedCategories/>
           <NewAndPopular/>
           <CraftedSection/>
        </main>
    );
};

export default Home;