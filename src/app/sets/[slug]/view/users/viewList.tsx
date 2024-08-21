"use client"

import React, { useState } from 'react';
import { Center, Table } from '@mantine/core';
import { FiTrash } from "react-icons/fi";

interface ViewListProps {
    accessToken: string;
    refreshToken: string;
    setId: string;
}

const ViewList: React.FC<ViewListProps> = ({ accessToken, refreshToken }) => {
    const [userList, setUserList] = useState<string[]>(["robertssun1234@gmail.com", "dum2zm@virginia.edu"]);
    const [input, setInput] = useState('');
    const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;

    const addUser = (email: string): void => {
        setUserList([...userList, email]);
    }

    const removeUsers = (email: string): void => {
        const removeUser = userList.filter((item) => item !== email);
        setUserList(removeUser);
    }

    const rows = userList.map((element: string) => (
        <Table.Tr key={element}>
            <Table.Td>{element}</Table.Td>
            <Table.Td>
                <FiTrash
                    size={30}
                    className="cursor-pointer"
                    onClick={() => {
                        removeUsers(element);
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
                            onClick={() => { 
                                if (!regex.test(input)) {
                                    alert('invalid email address');
                                } else {
                                    addUser(input);
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
