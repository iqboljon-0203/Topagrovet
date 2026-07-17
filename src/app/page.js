import HeroSection from '@/components/home/HeroSection';
import CategoriesSection from '@/components/home/CategoriesSection';
import FeaturesBar from '@/components/home/FeaturesBar';
import PopularProducts from '@/components/home/PopularProducts';

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <FeaturesBar />
      <PopularProducts />
    </>
  );
}
