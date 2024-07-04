"use client";

import { Divider } from "@mantine/core";
import Link from "next/link";
import React from "react";
import { FiTrash } from "react-icons/fi";

export interface SetProps {
  id: number;
  name: string;
  author: string;
  deleteSet: (id: number) => Promise<void>;
}

const SetCard: React.FC<SetProps> = ({
  id,
  name,
  author,
  deleteSet,
}): React.JSX.Element => {
  return (
    <div className="max-w rounded-lg overflow-hidden border mx-5 mb-5">
      <div className="flex flex-row">
        <Link
          href={{
            pathname: `/sets/${id}`,
          }}
          className="cursor-pointer basis-10/12"
        >
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{name}</div>
            <p className="text-gray-700 text-base">{author}</p>
          </div>
        </Link>
        <Divider orientation="vertical" />
        <div
          className="basis-2/12 flex flex-col items-center justify-center cursor-pointer hover:bg-red-600"
          onClick={() => {
            void deleteSet(id);
          }}
        >
          <FiTrash size={30} />
        </div>
      </div>
    </div>
  );
};

export default SetCard;
