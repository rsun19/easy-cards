"use client"

import React from 'react'
import { Button, Popover, MultiSelect, Flex } from "@mantine/core";
import { type SetType } from '@/types';
import { MdMerge } from "react-icons/md";

interface CombineSetButtonProps {
    accessToken: string;
    refreshToken: string;
    sets: SetType[];
}

const CombineSetButton: React.FC<CombineSetButtonProps> = ({ accessToken, refreshToken, sets }): React.JSX.Element => {
    const setList = sets.map((x) => x.name);
    const setMap = new Map<string, SetType>();
    sets.forEach((set) => setMap.set(set.name, set));
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
            <Flex
                direction={{ base: 'row' }}
                gap={{ base: 'sm', sm: 'lg' }}
                justify={{ base: 'center' }}
                align={{ base: 'end' }}
                >
                <MultiSelect
                onChange={(value) => {console.log(value)}}
                label="Combine Sets"
                placeholder="Pick value"
                data={setList}
                searchable
                comboboxProps={{ withinPortal: false }}
                />
                <div className='bg-blue-400 rounded-lg'>
                    <MdMerge size={35} style={{ cursor: 'pointer' }} color='white' />
                </div>
            </Flex>
            </Popover.Dropdown>
            </Popover>
        </>
    );
}

export default CombineSetButton;