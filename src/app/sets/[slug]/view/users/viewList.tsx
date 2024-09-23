"use client"

import React, { useState } from 'react';
import { Center, Table } from '@mantine/core';
import { FiTrash } from "react-icons/fi";
import { type AccessTokenResponse } from '@/types';
import { addUserToViewList } from '@/app/lib/addUserToViewList';
import { getAccessToken } from '@/app/lib/getAccessToken';
import { removeUserFromViewList } from '@/app/lib/removeUserFromViewList';

interface ViewListProps {
    accessToken: string;
    refreshToken: string;
    setId: string;
    startingUserList: string[]
}

const ViewList: React.FC<ViewListProps> = ({ accessToken, refreshToken, setId, startingUserList }) => {
    const [userList, setUserList] = useState<string[]>(startingUserList);
    const [input, setInput] = useState('');
    const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;

    const addUser = async (email: string): Promise<void> => {
        try {
            const response = await addUserToViewList(accessToken, email, setId);
            if (response.status === 404) {
                alert('User is already in list.');
            }
            else if (!response.ok) {
              const refreshResponse = await getAccessToken(refreshToken);
              if (refreshResponse.ok) {
                const textResponseJSON: AccessTokenResponse = await refreshResponse.json();
                const secondTry = await addUserToViewList(
                  textResponseJSON.accessToken,
                  email,
                  setId
                );
                if (response.status === 404) {
                    alert('User is already in list.');
                }
                else if (!secondTry.ok) {
                  alert("Failed to add user.");
                } else {
                    setUserList([...userList, email]);
                }
              } else {
                alert("Failed to add user.");
              }
            } else {
                setUserList([...userList, email]);
            }
        } catch (e) {
            alert("Failed to add user.");
        }
    }

    const removeUsers = async (email: string): Promise<void> => {
        try {
            const response = await removeUserFromViewList(accessToken, email, setId);
            if (!response.ok) {
              const refreshResponse = await getAccessToken(refreshToken);
              if (refreshResponse.ok) {
                const textResponseJSON: AccessTokenResponse = await refreshResponse.json();
                const secondTry = await removeUserFromViewList(
                  textResponseJSON.accessToken,
                  email,
                  setId
                );
                if (!secondTry.ok) {
                  alert("Failed to add user.");
                } else {
                    const removeUser = userList.filter((item) => item !== email);
                    setUserList(removeUser);
                }
              } else {
                alert("Failed to add user.");
              }
            } else {
                const removeUser = userList.filter((item) => item !== email);
                setUserList(removeUser);
            }
        } catch (e) {
            alert("Failed to add user.");
        }
    }

    const rows = userList.map((element: string) => (
        <Table.Tr key={element}>
            <Table.Td>{element}</Table.Td>
            <Table.Td>
                <FiTrash
                    size={30}
                    className="cursor-pointer"
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    onClick={async () => {
                        await removeUsers(element);
                    }}
                />
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <div className='flex flex-col gap-3 justify-center items-center'>
            <Center>
                <Table highlightOnHover>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>User</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </Center>
            <div>
                <label htmlFor="user" className="block text-sm font-medium leading-6 text-gray-900">
                    Add user
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                    <input
                    id='userInput'
                    value={input} 
                    onChange={e => { setInput(e.target.value); }}
                    name="user"
                    type="text"
                    placeholder="example@domain.com"
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center">
                        <button
                            className="text-center h-full rounded-md border-0 bg-teal-500 px-5 text-gray-100 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                            // eslint-disable-next-line @typescript-eslint/no-misused-promises
                            onClick={async () => { 
                                if (!regex.test(input)) {
                                    alert('invalid email address');
                                } else {
                                    await addUser(input);
                                    setInput('');
                                }
                            }}
                        >
                            add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewList;
