import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import profilePicture from "~/assets/pp.jpg";
import { ThemeSwitcher } from "@/components/ui";

const Header: FC = () => (
  <header className="pb-[88px] relative z-50">
    <div className="fixed flex justify-between w-screen backdrop-blur-lg p-8">
      <Link href="/" className="flex gap-5 justify-center items-center">
        <Image src={profilePicture} alt="Lila Rest" width={55} height={55} className="rounded-3xl" />
        <h1 className="text-2xl font-bold text-fg/90 hover:text-fg transition">Lila Rest</h1>
      </Link>
      <nav className="">
        <ul className="flex gap-8">
          <li className="flex justify-center items-center">
            <Link href="" target="_blank">
              Articles
            </Link>
          </li>
          <li className="flex justify-center items-center">
            <Link href="" target="_blank">
              Twitter
            </Link>
          </li>
          <li className="flex justify-center items-center">
            <Link href="https://github.com/LilaRest" target="_blank">
              Github
            </Link>
          </li>
          <li className="flex justify-center items-center">
            <Link href="https://lenster.xyz/u/lilarest" target="_blank">
              Lenster
            </Link>
          </li>
          <li className="flex justify-center items-center">
            <Link href="https://www.linkedin.com/in/lila-rest-5159b423b/" target="_blank">
              LinkedIn
            </Link>
          </li>
          <li className="flex justify-center items-center">
            <ThemeSwitcher />
          </li>
        </ul>
      </nav>
    </div>
  </header>
);
export default Header;
