import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import profilePicture from "~/assets/pp.jpg";

const Header: FC = () => (
  <header className="pb-[88px] relative z-50">
    <div className="fixed flex justify-between w-screen backdrop-blur-lg">
      <Link href="/" className="pl-4 flex gap-5 justify-center items-center">
        <Image src={profilePicture} alt="Lila Rest" width={55} height={55} className="rounded-3xl" />
        <h1 className="text-2xl font-bold text-slate-700">Lila Rest</h1>
      </Link>
      <nav className="p-8">
        <ul className="flex gap-8">
          <li>
            <Link href="" target="_blank">
              Articles
            </Link>
          </li>
          <li>
            <Link href="" target="_blank">
              Twitter
            </Link>
          </li>
          <li>
            <Link href="https://github.com/LilaRest" target="_blank">
              Github
            </Link>
          </li>
          <li>
            <Link href="https://lenster.xyz/u/lilarest" target="_blank">
              Lenster
            </Link>
          </li>
          <li>
            <Link href="https://www.linkedin.com/in/lila-rest-5159b423b/" target="_blank">
              LinkedIn
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
);
export default Header;
