import useAuth from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo.png";
interface Props {
  profilePic: string;
}

export default function Header({ profilePic }: Props) {
  return (
    <header className="p-2 md:px-10  bg-white border-2 fixed top-0 w-full flex items-center justify-between z-50">
      <Link href="/">
        <Image
          className="w-[100px] h-[60px] md:w-[140px] md:h-[80px] object-contain"
          src={logo}
          alt="Nicejob logo"
        />
      </Link>
      <div className="flex items-center gap-4 md:gap-4">
        <button className="bg-[#FF914D] py-2 rounded-md md:px-8 text-white font-medium px-4">
          Upload
        </button>
        <Link href="/admin" className="cursor-pointer">
          <Image
            src={profilePic}
            alt="user photo"
            width={50}
            height={50}
            className="object-cover rounded-[100%]"
          />
        </Link>
      </div>
    </header>
  );
}
