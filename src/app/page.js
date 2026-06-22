import Banner from "@/components/homepage/Banner";
import FeaturedTasks from "@/components/homepage/FeaturedTasks";
import TopFreelancers from "@/components/homepage/TopFreelancers";
import SmartWorkflow from "@/components/homepage/SmartWorkflow";
import BrowseCategories from "@/components/homepage/BrowseCategories";

export default function Home() {
  return (
    <div>
      <Banner />
      <FeaturedTasks />
      <TopFreelancers />
      <SmartWorkflow />
      <BrowseCategories />
    </div>
  );
}
