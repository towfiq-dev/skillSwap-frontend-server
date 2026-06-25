import Banner from "@/components/homepage/Banner";
import FeaturedTasks from "@/components/FeaturedTasks";
import SmartWorkflow from "@/components/homepage/SmartWorkflow";
import BrowseCategories from "@/components/homepage/BrowseCategories";
import TopFreelancers from "@/components/TopFreelancers";
import SkillSwapHowItWorks from "@/components/homepage/SkillSwapHowItWorks";

export default function Home() {
  return (
    <div>
      <Banner />
      <FeaturedTasks />
      <TopFreelancers />
      <SmartWorkflow />
      <SkillSwapHowItWorks/>
      <BrowseCategories />
    </div>
  );
}
