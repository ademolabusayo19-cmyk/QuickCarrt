import BestSeller from "../../components/home/BestSeller";
import CategoryGrid from "../../components/home/CategoryGrid";
import FeaturedProducts from "../../components/home/FeaturedProducts";
import FlashSale from "../../components/home/FlashSale";
import HeroSection from "../../components/home/HeroSection";
import NewsletterBanner from "../../components/home/NewsletterBanner";
import PromoBanner from "../../components/home/PromoBanner";
import RecommendedForYou from "../../components/home/RecommendedForYou";
import Testimonials from "../../components/home/Testimonials";
import TodaysDeal from "../../components/home/TodaysDeal";
import TrustBar from "../../components/home/TrustBar";
import NewArrivalCard from "../../components/product/NewArrivalCard";

const HomePage = () => {
  return (
    <div className="mx-auto flex max-w-360 flex-col gap-10 px-4 pt-10 pb-20 md:px-12">
      <HeroSection />
      <TrustBar />
      <CategoryGrid />
      <FlashSale />
      <FeaturedProducts />
      <TodaysDeal />
      <BestSeller />
      <PromoBanner />
      <NewArrivalCard />
      <RecommendedForYou />
      <Testimonials />
      <NewsletterBanner />
    </div>
  );
};

export default HomePage;
