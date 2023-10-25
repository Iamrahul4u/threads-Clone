import AccountForm from "@/components/forms/AccountForm";
import { currentUser } from "@clerk/nextjs";

const page = () => {
  const user = currentUser();
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
    <main className="mx-auto flex px-10 py-20">
      <h1 className="head-text">Onboarding</h1>
      <p>Create Your Threads Account</p>
      <AccountForm user={userData} btntitle={"submit"} />
    </main>
  );
};

export default page;
