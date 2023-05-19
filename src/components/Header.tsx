import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import profilePicture from "~/assets/pp.jpg";

const Header: FC = () => (
  <header className="flex justify-between">
    <Link href="/" className="pl-4 flex gap-5 justify-center items-center">
      <Image
        src={profilePicture}
        alt="Lila Rest"
        width={55}
        height={55}
        className="rounded-3xl"
      />
      <h1 className="text-3xl font-bold text-slate-700">Lila Rest</h1>
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
          <Link href="" target="_blank">
            Github
          </Link>
        </li>
        <li>
          <Link href="" target="_blank">
            Lens
          </Link>
        </li>
        <li>
          <Link href="" target="_blank">
            LinkedIn
          </Link>
        </li>
      </ul>
    </nav>
  </header>
);
export default Header;
