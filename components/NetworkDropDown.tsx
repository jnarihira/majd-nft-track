import { Fragment, Dispatch, SetStateAction } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { Icon } from '@iconify/react';
import styles from '@/styles/Home.module.css'
import { NetworkTypes } from './HomeBody';

interface DropDownTypes {
    selected: NetworkTypes;
    setSelected: Dispatch<SetStateAction<NetworkTypes>>;
    network: NetworkTypes[];
}

export default function DropDown({
    selected,
    setSelected,
    network
}: DropDownTypes) {
    return (
        <div className="w-full md:w-72 z-40">
            <Listbox value={selected} onChange={setSelected}>
                <div className="relative mt-1">
                    <Listbox.Button className={`${styles.filter_blur} relative w-full cursor-default rounded-lg bg-sky-50 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm`}>
                        <div className='flex items-center gap-2'>
                            <img src={`./image/network/${selected.value}.png`} alt='network icon' width={30} height={30} />
                            <span className="block truncate">{selected.name}</span>
                        </div>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <Icon icon="mdi:chevron-up-down"
                                className="h-5 w-5 text-sky-500"
                                aria-hidden="true"
                            />
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-[24px] bg-sky-50 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {network.map((network, personIdx) => (
                                <Listbox.Option
                                    key={personIdx}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-4 pr-4 ${active ? 'bg-sky-100 text-sky-900' : 'text-gray-900'
                                        }`
                                    }
                                    value={network}
                                >
                                    {({ selected }) => (
                                        <>
                                            <div className='flex items-center gap-2'>
                                                <img src={`./image/network/${network.value}.png`} alt='network icon' width={30} height={30} />
                                                <span
                                                    className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                        }`}
                                                >
                                                    {network.name}
                                                </span>
                                            </div>
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    )
}
