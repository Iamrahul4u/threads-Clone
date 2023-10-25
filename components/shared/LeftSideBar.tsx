"use client";
import Image from "next/image";
import { sidebarLinks } from "../../app/constants/sideBarLinks";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SignOutButton, SignedIn, SignedOut } from "@clerk/nextjs";
const LeftSideBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <section className="custom-scrollbar leftsidebar ">
      <div className="flex flex-col w-full px-6 gap-6">
        {sidebarLinks.map((links) => {
          const isactive = pathname.includes(links.route) ? true : false;
          return (
            <Link
              className={`flex gap-2 leftsidebar_link ${
                isactive ? "bg-primary-500" : ""
              }`}
              key={links.label}
              href={links.route}
            >
              <Image
                src={links.imgURL}
                alt={links.label}
                height={20}
                width={20}
              />
              <p>{links.label}</p>
            </Link>
          );
        })}
      </div>
      <div className="mt-10 px-6 cursor-pointer">
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push("/sign-in")}>
            <div className="flex gap-2">
              <Image
                src="/assets/logout.svg"
                alt="logout"
                height={24}
                width={24}
              />
              <p className="text-white max-md:hidden">Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
};

export default LeftSideBar;
