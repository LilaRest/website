import { HiddenMask } from "@/components/ui";
import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-center h-[calc(100vh-92px)]">
      <section className="grid grid-cols-3 grid-rows-3 gap-10 columns-3 rows-3 w-[100vh] h-[85vh]">
        <article className="col-span-3 bg-red-500 rounded-3xl"></article>
        <article className="row-span-2 bg-blue-500 rounded-3xl"></article>
        <article className="bg-green-500 rounded-3xl"></article>
        <article className="bg-purple-500 rounded-3xl"></article>
        <article className="col-span-2 bg-orange-500 rounded-3xl"></article>
      </section>
    </div>
  );
};
export default Home;
