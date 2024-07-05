"use server";
import React from "react";
import Navbar from "../components/navbar";
import Create from "./createPage";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page(): Promise<React.JSX.Element> {
  const cookie = cookies().get("session")?.value;
  if (typeof cookie !== "undefined") {
    const cookieData = JSON.parse(cookie);
    return (
      <>
        <Navbar />
        <Create
          accessToken={cookieData.accessToken}
          refreshToken={cookieData.refreshToken}
        />
      </>
    );
  }
  redirect('/api/signout')
}
