import {
  OrganizationSwitcher,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";

const TopBar = () => {
  return (
    <div className="topbar flex justify-between">
      <div className="flex gap-4 items-center">
        <Image src="/assets/logo.svg" alt="logo" height={28} width={28} />
        <p className="text-heading3-bold">Threads</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="md:hidden end-0">
          <SignedIn>
            <SignOutButton>
              <div className="flex gap-2">
                <Image
                  src="/assets/logout.svg"
                  alt="logout"
                  height={24}
                  width={24}
                />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>
        <OrganizationSwitcher
          appearance={{
            elements: {
              organizationSwitcherTrigger: "px-2 py-4 text-white ",
            },
          }}
        />
      </div>
    </div>
  );
};

export default TopBar;
