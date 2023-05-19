import HomeBoard from "@/components/HomeBoard";
import { HiddenMask } from "@/components/ui";
import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-center h-[calc(100vh-92px)]">
      <HomeBoard />
      {/* <section className="relative grid grid-cols-3 grid-rows-3 gap-10 columns-3 rows-3 w-[100vh] h-[85vh] overflow-hidden">
        <article className="col-span-3 height-[85vh] bg-slate-400 relative hover:static">
          <div className="absolute rounded-3xl min-h-0 inset-0 hover:min-h-screen bg-red-500 duration-1000 transition-all"></div>
        </article>
        <article className="row-span-2 bg-blue-500 rounded-3xl hover:absolute hover:inset-0 transition-all duration-500"></article>
        <article className=" relative hover:static transition-all duration-1000">
          <div className="bg-green-500 absolute rounded-3xl inset-0 transition-all duration-1000"></div>
        </article>
        <article className="bg-purple-500 rounded-3xl hover:absolute hover:inset-0 transition-all duration-500"></article>
        <article className="col-span-2 bg-orange-500 rounded-3xl hover:absolute hover:inset-0 transition-all duration-500"></article>
      </section> */}
    </div>
  );
};
export default Home;
