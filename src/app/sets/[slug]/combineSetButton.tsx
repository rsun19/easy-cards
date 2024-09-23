/* eslint-disable no-void */
"use client"

import React, { useState } from 'react'
import { Popover, MultiSelect, Flex, Button } from "@mantine/core";
import { type AccessTokenResponse, type SetType } from '@/types';
import { MdMerge } from "react-icons/md";
import { combineSets } from '@/app/lib/combineSets';
import { getAccessToken } from '@/app/lib/getAccessToken';
import { useRouter } from "next/navigation";

interface CombineSetButtonProps {
    accessToken: string;
    refreshToken: string;
    sets: SetType[];
    setId: number;
}

const CombineSetButton: React.FC<CombineSetButtonProps> = ({ accessToken, refreshToken, sets, setId }): React.JSX.Element => {
    const setList = sets.map((x) => x.name);
    const setMap = new Map<string, SetType>();
    sets.forEach((set) => setMap.set(set.name, set));
    const [combinedSets, setCombinedSets] = useState<string[]>([]);
    const router = useRouter();

    const saveCards = async (): Promise<void> => {
        const setName = (document.getElementById("setName") as HTMLInputElement);
        if (setName !== null && setName.value === '') {
            alert('Enter a set name')
        } else if (setName !== null){
            const response = await combineSets(accessToken, setId, combinedSets, setName.value);
            if (response.ok) {
                router.push("/");
            } else if (response.status === 403) {
                const responseText = await response.text();
                alert(responseText);
            } else {
                try {
                    const response = await getAccessToken(refreshToken);
                    if (response.ok) {
                    const textResponseJSON: AccessTokenResponse = await response.json();
                    const secondTry = await combineSets(textResponseJSON.accessToken, setId, combinedSets, setName.value);
                    if (secondTry.ok) {
                        router.push("/");
                    } else if (response.status === 403) {
                        const responseText = await response.text();
                        alert(responseText);
                    } else {
                        alert("Set failed to save");
                    }
                    } else {
                        router.push("/api/signout");
                    }
                } catch (e) {
                    router.push("/api/signout");
                }
            }
        }
    };
    
    return (
        <>
            <Popover width={300} position="bottom" withArrow shadow="md">
            <Popover.Target>
                <Button
                    variant="gradient"
                    gradient={{ from: "blue", to: "cyan", deg: 90 }}
                    >
                    Combine Sets
                </Button>
            </Popover.Target>
            <Popover.Dropdown>
            <div className="m-3">
                <input
                    type="text"
                    id="setName"
                    placeholder="Enter a set name"
                    className="w-full block rounded-lg py-2 px-3 border border-gray-300 bg-gray-50"
                />
            </div>
            <Flex
                direction={{ base: 'row' }}
                gap={{ base: 'sm', sm: 'lg' }}
                justify={{ base: 'center' }}
                align={{ base: 'end' }}
                >
                <MultiSelect
                onChange={(value) => {setCombinedSets(value)}}
                label="Combine Sets"
                placeholder="Pick value"
                data={setList}
                searchable
                comboboxProps={{ withinPortal: false }}
                />
                <div className='bg-blue-400 rounded-lg' onClick={() => void saveCards()}>
                    <MdMerge size={35} style={{ cursor: 'pointer' }} color='white' />
                </div>
            </Flex>
            </Popover.Dropdown>
            </Popover>
        </>
    );
}

export default CombineSetButton;