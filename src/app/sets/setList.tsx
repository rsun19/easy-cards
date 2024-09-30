"use client";

import { type AccessTokenResponse, type SetType } from "@/types";
import React, { useState } from "react";
import SetCard from "./setCard";
import { deleteSetAPI } from "../lib/deleteSet";
import { getAccessToken } from "../lib/getAccessToken";
import { Button, Flex, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

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
  const [opened, { open, close }] = useDisclosure(false);
  const [setId, setSetId] = useState<number | null>(null);

  const warnDeleteSet = (id: number): void => {
    open();
    setSetId(id);
  }

  const deleteSet = async (id: number | null): Promise<void> => {
    if (id === null) {
      alert("Set failed to delete.");
      return;
    }
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
      <Modal opened={opened} onClose={close} title="Really delete set?" centered>
        <Flex
          direction={{ base: 'column', sm: 'row' }}
          gap={{ base: 'sm', sm: 'lg' }}
          justify={{ sm: 'center' }}
        >
          <Button onClick={() => { 
            void deleteSet(setId); 
            close();
          }} className="bg-green-600 text-white">Yes</Button>
          <Button onClick={close} className="bg-red-700 text-white">No</Button>
        </Flex>
      </Modal>
      {setsList.map((set) => {
        return (
          <SetCard
            key={set.key}
            id={set.id}
            name={set.name}
            author={set.author}
            deleteSet={warnDeleteSet}
          />
        );
      })}
    </>
  );
};

export default SetList;
