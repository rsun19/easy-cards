"use server";
import React from "react";
import Navbar from "../../components/navbar";
import FlashcardPage from "./flashcardPage";
import { getFlashcards } from "@/app/lib/getFlashcards";
import { type RefreshTokenResponse } from "@/types";
import { cookies } from "next/headers";

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

  return (
    <>
      <Navbar />
      <FlashcardPage
        set={flashcards?.set ?? null}
        flashcards={flashcards?.flashcards ?? []}
      />
    </>
  );
};

export default Page;