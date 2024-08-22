"use server";
import React from "react";
import Navbar from "../../../components/navbar";
import { cookies } from "next/headers";
import { getFlashcards } from "@/app/lib/getFlashcards";
import { type RefreshTokenResponse } from "@/types";
import EditCardList from "./EditCardList";

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

  const flashcards = await getFlashcards(
    cookieData.accessToken,
    cookieData.refreshToken,
    params.slug,
  );

  if (flashcards === null || flashcards.visit) {
    return <p>Access denied.</p>
  }

  return (
    <>
      <Navbar />
      <div className="mt-3 text-center text-2xl flex flex-col justify-center items-center gap-3">
        {flashcards?.set?.name}
      </div>
      <EditCardList
        accessToken={cookieData.accessToken}
        refreshToken={cookieData.refreshToken}
        set={flashcards?.set ?? null}
        flashcards={flashcards?.flashcards ?? []}
        visit={false}
      />
    </>
  );
};

export default Page;
