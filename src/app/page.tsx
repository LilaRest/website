import Board from "@/components/home/Board";
import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="flex h-[calc(100vh-89px)] justify-center">
      <Board />
    </div>
  );
};
export default Home;
