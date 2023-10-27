"use server";
import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectDb } from "../mongoose";
import mongoose from "mongoose";

interface Props {
  userId: string;
  name: string;
  username: string;
  bio: string;
  image: string;
  path: string;
}
export async function updateUser({
  userId,
  name,
  username,
  bio,
  image,
  path,
}: Props): Promise<void> {
  connectDb();
  try {
    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        onBoarded: true,
      },
      { upsert: true },
    );

    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error: any) {
    console.log(`Failed to create/update User:${error.message}`);
  }
}
