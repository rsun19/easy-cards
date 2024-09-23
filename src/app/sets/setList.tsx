"use client";

import { type AccessTokenResponse, type SetType } from "@/types";
import React, { useState } from "react";
import SetCard from "./setCard";
import { deleteSetAPI } from "../lib/deleteSet";
import { getAccessToken } from "../lib/getAccessToken";

interface SetListProps {
  sets: SetType[];
  accessToken: string;
  refreshToken: string;
}

const SetList: React.FC<SetListProps> = ({
  accessToken,
  refreshToken,
  sets,
}) => {
  const [setsList, setSetsList] = useState<SetType[]>(sets);

  const deleteSet = async (id: number): Promise<void> => {
    try {
      const response = await deleteSetAPI(accessToken, id);
      if (!response.ok) {
        const refreshResponse = await getAccessToken(refreshToken);
        if (refreshResponse.ok) {
          const textResponseJSON: AccessTokenResponse = await refreshResponse.json();
          const secondTry = await deleteSetAPI(
            textResponseJSON.accessToken,
            id,
          );
          if (!secondTry.ok) {
            alert("Set failed to delete.");
          } else {
            setSetsList(setsList.filter((set) => set.id !== id));
          }
        } else {
          alert("Set failed to delete.");
        }
      } else {
        setSetsList(setsList.filter((set) => set.id !== id));
      }
    } catch (e) {
      alert("Set failed to delete.");
    }
  };

  return (
    <>
      {setsList.map((set) => {
        return (
          <SetCard
            key={set.key}
            id={set.id}
            name={set.name}
            author={set.author}
            deleteSet={deleteSet}
          />
        );
      })}
    </>
  );
};

export default SetList;
