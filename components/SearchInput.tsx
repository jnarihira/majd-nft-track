import React from 'react'
import { Icon } from '@iconify/react';
import styles from '../styles/Home.module.css'

interface SearchInputTypes {
    address: string
    handleAddress: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handlePaste: () => void;
    handleGetResult: () => void;
}

export default function SearchInput({
    address,
    handleAddress,
    handlePaste,
    handleGetResult
}: SearchInputTypes) {
    return (
        <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Icon
                    icon="material-symbols:search"
                    className="w-5 h-5 text-sky-500"
                />
            </div>
            <input
                id="search"
                value={address}
                pattern='^0x[a-fA-F0-9]{40}$'
                placeholder="Please enter your address."
                onChange={(event) => handleAddress(event)} autoComplete="off"
                className={`${styles.filter_blur} w-full block p-4 pl-10 pr-[140px] text-sm text-gray-900 outline-none placeholder:text-transparent xs:placeholder:text-sky-500`}
            />
            <div
                className='absolute bottom-3.5 right-[105px] cursor-pointer'
                onClick={() => handlePaste()}
            >
                <Icon
                    icon="mdi-light:content-paste"
                    className='text-sky-500'
                    fontSize={25}
                />
            </div>
            <button
                type="submit"
                className="text-white absolute right-2.5 bottom-2.5 bg-sky-500 hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-3xl text-sm px-5 py-2"
                onClick={() => handleGetResult()}
            >
                Search
            </button>
        </div>
    )
}
