"use client";
import { sidebarLinks } from "@/app/constants/sideBarLinks";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const BottomBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <section className="bottombar">
      <div className="bottombar_container ">
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
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default BottomBar;
