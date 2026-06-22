import Banner from "@/components/homepage/Banner";
import FeaturedTasks from "@/components/homepage/FeaturedTasks";
import Image from "next/image";

export default function Home() {
  return (
    <div>
    <Banner/>
     <FeaturedTasks/>
     {/* <TopFreelancers/>
     <HowItWorks/>
     <PopularCategories/> */}
    </div>
  );
}
