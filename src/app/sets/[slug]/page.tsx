/* eslint-disable @typescript-eslint/strict-boolean-expressions */
"use server";
import React from "react";
import Navbar from "../../components/navbar";
import { cookies } from "next/headers";
import { getFlashcards } from "@/app/lib/getFlashcards";
import { type SetListType, type RefreshTokenResponse } from "@/types";
import SetCard from "./setCards";
import { Button, Flex } from "@mantine/core";
import Link from "next/link";
import { getUserSets } from "@/app/lib/getUserSets";
import CombineSetButton from "./combineSetButton";

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

  const sets = await getUserSets(cookieData.accessToken);
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  let setObj: SetListType = {} as SetListType;
  if (sets) {
    setObj = JSON.parse(sets);
  }
  const setList = setObj.sets.filter((x) => x.id !== Number(params.slug))

  if (flashcards === null) {
    return <p>Access denied.</p>
  }

  return (
    <>
      <Navbar />
      <div className="mt-3 text-center text-2xl flex flex-col justify-center items-center gap-3">
        {flashcards?.set?.name}
        <Flex
          direction={{ base: 'column', sm: 'row' }}
          gap={{ base: 'sm', sm: 'lg' }}
          justify={{ sm: 'center' }}
        >
        <Button
          component={Link}
          href={`/flashcard/${flashcards?.set?.id}`}
          variant="gradient"
          gradient={{ from: "blue", to: "cyan", deg: 90 }}
        >
          Study
        </Button>
        {(!(flashcards?.visit ?? true)) && <Button
          component={Link}
          href={`/sets/${flashcards?.set?.id}/edit`}
          variant="gradient"
          gradient={{ from: "blue", to: "cyan", deg: 90 }}
        >
          Edit
        </Button>}
        {(!(flashcards?.visit ?? true)) && <Button
          component={Link}
          href={`/sets/${flashcards?.set?.id}/view/users`}
          variant="gradient"
          gradient={{ from: "blue", to: "cyan", deg: 90 }}
        >
          Change viewer access
        </Button>}
        {setList && setList.length > 0 && <CombineSetButton accessToken={cookieData.accessToken} refreshToken={cookieData.refreshToken} sets={setList} /> }
        </Flex>
      </div>
      {flashcards?.flashcards.map((flashcard, index) => {
        return (
          <SetCard
            key={index}
            question={flashcard.question}
            answers={flashcard.answers}
          />
        );
      })}
    </>
  );
};

export default Page;
