import HomeBoard from "@/components/home/HomeBoard";
import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-92px)]">
      <HomeBoard />
    </div>
  );
};
export default Home;
