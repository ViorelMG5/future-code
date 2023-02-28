import useAuth from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo.png";
import AddProjectModal from "./AddProjectModal";
interface Props {
  profilePic: string;
}

export default function Header({ profilePic }: Props) {
  const { user } = useAuth();
  return (
    <header className="p-2 px-4  bg-white border-2 fixed top-0 w-full  z-50">
      <div className="container flex items-center justify-between mx-auto">
        <Link href="/">
          <Image
            className="w-[100px] h-[60px] md:w-[140px] md:h-[80px] object-contain"
            src={logo}
            alt="Nicejob logo"
          />
        </Link>
        <div className="flex items-center gap-4 md:gap-8">
          {user ? (
            <AddProjectModal editProjects={false} />
          ) : (
            <button className="bg-[#FF914D] py-2 rounded-md md:px-8 text-white font-medium px-4">
              Contact
            </button>
          )}
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
      </div>
    </header>
  );
}
