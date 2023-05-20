import HomeBoard from "@/components/home/HomeBoard";
import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-center h-[calc(100vh-92px)] justify-center">
      <HomeBoard />
    </div>
  );
};
export default Home;
