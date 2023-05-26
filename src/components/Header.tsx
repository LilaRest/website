import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import profilePicture from "~/assets/pp.jpg";
import { ThemeSwitcher } from "@/components/ui";

const Header: FC = () => (
  <header className="pb-[88px] relative z-50">
    <div className="fixed flex h-[76px] justify-between items-center w-screen backdrop-blur-lg">
      <Link href="/" className="flex gap-5 justify-center items-center">
        <Image src={profilePicture} alt="Lila Rest" width={76} height={76} className="rounded-br-3xl" />
        <h1 className="text-2xl font-bold text-fg/90 hover:text-fg transition whitespace-nowrap">Lila Rest</h1>
      </Link>
      <div className="flex pr-5 gap-7">
        <nav className="flex items-center">
          <ul className="flex gap-7">
            <li className="flex justify-center items-center">
              <Link href="" target="_blank">
                Articles
              </Link>
            </li>
            <li className="flex justify-center items-center">
              <Link href="https://twitter.com/LilaRest" target="_blank">
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
          </ul>
        </nav>
        <div className="">
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  </header>
);
export default Header;
