import Banner from "@/components/homepage/Banner";
import FeaturedTasks from "@/components/homepage/FeaturedTasks";
import HowItWorks from "@/components/homepage/HowItWorks";
import PopularCategories from "@/components/homepage/PopularCategories";
import TopFreelancers from "@/components/homepage/TopFreelancers";

export default function Home() {
  return (
    <div>
      <Banner />
      <FeaturedTasks />
      <TopFreelancers />
      <HowItWorks />
      <PopularCategories />
    </div>
  );
}
