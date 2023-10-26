"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserValidation } from "@/lib/validations/UserSchema";
import * as z from "zod";
import Image from "next/image";
import { Textarea } from "../ui/textarea";
import { useUploadThing } from "@/lib/uploadthing";

import { isBase64Image } from "@/lib/utils";
interface AccountFormProps {
  user: {
    id: number;
    objectId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
  };
  btntitle: string;
}
const AccountForm = ({ user, btntitle }: AccountFormProps) => {
  const [File, SetFile] = useState<File[]>([]);
  const { startUpload } = useUploadThing("media");
  const form = useForm({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      username: user?.username || "",
      profile_photo: user?.image || "",
      name: user?.name || "",
      bio: user?.bio || "",
    },
  });
  function handleImage(
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void,
  ) {
    e.preventDefault();
    const fileReader = new FileReader();
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (!file.type.includes("image")) return;
      SetFile(Array.from(e.target.files));
      fileReader.onload = async (event) => {
        fieldChange((event?.target?.result as string) || "");
      };
      fileReader.readAsDataURL(file);
    }
  }
  async function onSubmit(values: z.infer<typeof UserValidation>) {
    const blob = values.profile_photo;
    const hasImageChanged = isBase64Image(blob);
    if (hasImageChanged) {
      const imgres = await startUpload(File);
      if (imgres && imgres[0].url) {
        values.profile_photo = imgres[0].url;
      }
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem className="flex  items-center gap-2">
              <FormLabel className="account-form_image-label ">
                {field.value ? (
                  <Image
                    src={field.value}
                    alt="profile-image"
                    height={96}
                    width={96}
                    className="rounded-full object-contain"
                  />
                ) : (
                  <Image
                    src="/assets/profile.svg"
                    alt="profile-image"
                    height={24}
                    width={24}
                  />
                )}
              </FormLabel>
              <FormControl className="flex-1 text-gray-200">
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="Upload a photo"
                  className="account-form_image-input"
                  onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex-col  items-center gap-2">
              <FormLabel>Name</FormLabel>
              <FormControl className="flex-1 text-gray-200">
                <Input
                  type="text"
                  placeholder="Enter Your Name"
                  className="account-form_input"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex-col  items-center gap-2">
              <FormLabel>Username</FormLabel>
              <FormControl className="flex-1 text-gray-200">
                <Input
                  type="text"
                  placeholder="Enter Your UserName"
                  className="account-form_input"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="flex-col  items-center gap-2">
              <FormLabel>Bio</FormLabel>
              <FormControl className="flex-1 text-gray-200">
                <Textarea
                  rows={5}
                  placeholder="Enter Your Bio"
                  className="account-form_input"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default AccountForm;
