"use server";
import React from "react";
import { cookies } from "next/headers";
import { type RefreshTokenResponse } from "@/types";
import Navbar from "@/app/components/navbar";
import ViewList from "./viewList";

interface PageParams {
  params: {
    slug: string;
  };
}

const Page = async ({ params }: PageParams): Promise<React.JSX.Element> => {
  const cookie = cookies().get("session");
  if (typeof cookie === "undefined") {
    return <>access denied.</>;
  }
  const cookieData: RefreshTokenResponse = JSON.parse(cookie.value);

  return (
    <>
      <Navbar />
      <div className="mt-3 text-center text-2xl flex flex-col justify-center items-center gap-3">
        Add or remove users who have access to your set.
      </div>
      <ViewList
        accessToken={cookieData.accessToken}
        refreshToken={cookieData.refreshToken}
        setId={params.slug}
      />
    </>
  );
};

export default Page;
