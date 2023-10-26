import AccountForm from "@/components/forms/AccountForm";
import { currentUser } from "@clerk/nextjs";

const Page = async () => {
  const user = await currentUser();
  const userInfo = {};
  const userData = {
    id: user?.id,
    objectId: user?._id,
    username: userInfo?.username || user?.username,
    name: userInfo?.name || user?.firstName || "",
    bio: userInfo?.bio || user?.bio || "",
    image: userInfo?.image || user?.imageUrl || "",
  };
  return (
    <section className="flex flex-col flex-1 px-10 py-20">
      <header className="justify-start mx-auto ">
        <h1 className="text-heading1-bold text-2xl">Onboarding</h1>
        <p className="body-bold mb-5">Create Your Threads Account</p>
      </header>
      <main className="w-1/2 mx-auto">
        <AccountForm user={userData} btntitle={"submit"} />
      </main>
    </section>
  );
};

export default Page;
