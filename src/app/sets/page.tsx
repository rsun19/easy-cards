"use server";
import React from "react";
import Navbar from "../components/navbar";
import { cookies } from "next/headers";
import { type RefreshTokenResponse } from "@/types";
import { requestSet } from "../lib/requestSet";
import SetList from "./setList";
import { redirect } from "next/navigation";

const Page = async (): Promise<React.JSX.Element> => {
  const cookie = cookies().get("session");
  if (typeof cookie === "undefined") {
    return <>access denied.</>;
  }

  const cookieData: RefreshTokenResponse = JSON.parse(cookie.value);
  try {
    const sets = await requestSet(
      cookieData.accessToken,
      cookieData.refreshToken,
    );

    return (
      <>
        <Navbar />
        <br />
        <p className="text-center text-2xl">Sets:</p>
        <br />
        <SetList
          accessToken={cookieData.accessToken}
          refreshToken={cookieData.refreshToken}
          sets={sets}
        />
      </>
    );
  } catch (e) {
    redirect('/api/signout')
  }
};

export default Page;
