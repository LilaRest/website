import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import profilePicture from "~/assets/pp-transparent.png";
import { ThemeSwitcher } from "@/components/ui";

const Header: FC = () => (
  <header className="pb-[76px] relative z-50">
    {/* <div className="fixed w-10 top-4 left-3 h-10 bg-emerald-500"></div> */}
    <Link
      href="/"
      className="absolute flex opacity-80 hover:opacity-100 transition-opacity"
    >
      <Image
        src={profilePicture}
        alt="Lila Rest"
        width={76}
        height={76}
        className="rounded-br-[2rem]"
      />
      <h1 className="text-3xl pt-3 font-black text-accent-fg/95 font-logo transition whitespace-nowrap tracking-wide">
        Lila Rest
      </h1>
    </Link>
    <div className="fixed right-0 flex p-7 gap-5 items-center">
      <nav className="flex items-center">
        <ul className="flex gap-7 font-semibold text-fg bg-card py-[0.5rem] px-4 rounded-2xl backdrop-blur-lg">
          <li className="flex justify-center items-center hover:text-accent-fg">
            <Link href="" target="_blank">
              Articles
            </Link>
          </li>
          <li className="flex justify-center items-center hover:text-accent-fg">
            <Link href="https://twitter.com/LilaRest">Twitter</Link>
          </li>
          <li className="flex justify-center items-center hover:text-accent-fg">
            <Link href="https://github.com/LilaRest" target="_blank">
              Github
            </Link>
          </li>
          <li className="flex justify-center items-center hover:text-accent-fg">
            <Link href="https://lenster.xyz/u/lilarest" target="_blank">
              Lenster
            </Link>
          </li>
          <li className="flex justify-center items-center hover:text-accent-fg">
            <Link
              href="https://www.linkedin.com/in/lila-rest-5159b423b/"
              target="_blank"
            >
              LinkedIn
            </Link>
          </li>
        </ul>
      </nav>
      <div className="">
        <ThemeSwitcher className="h-[40px] w-[40px]" />
      </div>
    </div>
  </header>
);
export default Header;
