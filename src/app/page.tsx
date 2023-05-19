import { HiddenMask } from "@/components/ui";
import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="min-h-screen">
      <HiddenMask pattern="dots" className="mb-36">
        <div className="h-36"></div>
      </HiddenMask>
      <HiddenMask pattern="dots" className="mb-36">
        <div className="h-36"></div>
      </HiddenMask>
      <HiddenMask pattern="dots" className="mb-36">
        <div className="h-36"></div>
      </HiddenMask>
    </div>
  );
};
export default Home;
