import { Disclosure } from '@headlessui/react'
import { Icon } from '@iconify/react';
import { NetworkTypes } from './HomeBody';
import { NFTListTypes } from './MainSection';

interface DisclosurePageProps {
    selectedNFT: NFTListTypes
    address: string
    selectedNetwork: NetworkTypes
}

interface MarketplaceTypes {
    name: string
    url: string
}

const MarketPlaces: MarketplaceTypes[] = [
    {
        name: 'Opensea',
        url: 'https://opensea.io/assets/'
    },
    {
        name: 'LooksRare',
        url: 'https://looksrare.org/collections/'
    },
    {
        name: 'Rarible',
        url: 'https://rarible.com/token/'
    }
]

export default function DisclosurePage({
    selectedNFT,
    address,
    selectedNetwork
}: DisclosurePageProps) {
    const handleGoExplorer = (address: string) => {
        window.open(`${selectedNetwork.explorer}address/${address}`, '_blank')
    }

    const handleCopy = (address: string) => {
        navigator.clipboard.writeText(address);
    }

    const handleGoMarketplace = (name: string, address: string) => {
        const prefexURL = MarketPlaces.find(item => item.name === name)?.url
        window.open(`${prefexURL}${address}`, '_blank')
    }
    return (
        <div className="w-full mt-4">
            <div className="w-full rounded-2xl bg-white p-2">
                <Disclosure defaultOpen>
                    {({ open }) => (
                        <>
                            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-sky-100 px-4 py-2 text-left text-sm font-medium text-sky-900 hover:bg-sky-200 focus:outline-none focus-visible:ring focus-visible:ring-sky-500 focus-visible:ring-opacity-75">
                                <div className='flex items-center gap-2'>
                                    <Icon icon="fluent:apps-list-detail-24-regular" fontSize={18} />
                                    <span>Detail</span>
                                </div>
                                <Icon icon="material-symbols:arrow-drop-up-rounded"
                                    className={`${open ? 'rotate-180 transform' : ''
                                        } h-5 w-5 text-sky-500`}
                                />
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                <div className='w-full flex justify-between items-center gap-2'>
                                    <span className='text-left min-w-[100px]'>Owner:</span>
                                    <div className='flex items-center gap-1 overflow-hidden text-ellipsis'>
                                        <span className='text-sky-500 cursor-pointer overflow-hidden text-ellipsis' onClick={() => handleGoExplorer(address)}>{address}</span>
                                        <Icon icon="ph:copy" fontSize={18} className="text-stone-700 hover:text-sky-500 cursor-pointer transition-all min-w-[20px]" onClick={() => handleCopy(address)} />
                                    </div>
                                </div>
                                <div className='w-full flex justify-between items-center gap-2 mt-2'>
                                    <span className='text-left min-w-[100px]'>Contract Address:</span>
                                    <div className='flex items-center gap-1 overflow-hidden text-ellipsis'>
                                        <span className='text-sky-500 cursor-pointer overflow-hidden text-ellipsis' onClick={() => handleGoExplorer(selectedNFT.contract_id)}>{selectedNFT.contract_id}</span>
                                        <Icon icon="ph:copy" fontSize={18} className="text-stone-700 hover:text-sky-500 cursor-pointer transition-all min-w-[20px]" onClick={() => handleCopy(selectedNFT.contract_id)} />
                                    </div>
                                </div>
                                <div className='w-full flex justify-between items-center gap-2 mt-2'>
                                    <span className='text-left min-w-[100px]'>Contract Name:</span>
                                    <span className='text-stone-700 overflow-hidden text-ellipsis'>{selectedNFT.contract_name}</span>
                                </div>
                                <div className='w-full flex justify-between items-center gap-2 mt-2'>
                                    <span className='text-left min-w-[100px]'>Token ID:</span>
                                    <div className='flex items-center gap-1 overflow-hidden text-ellipsis'>
                                        <span className='text-stone-700 overflow-hidden text-ellipsis'>{selectedNFT.inner_id}</span>
                                        <Icon icon="ph:copy" fontSize={18} className="text-stone-700 hover:text-sky-500 cursor-pointer transition-all min-w-[20px] min-w-[20px]" onClick={() => handleCopy(selectedNFT.inner_id)} />
                                    </div>
                                </div>
                                <div className='w-full flex justify-between items-center gap-2 mt-2'>
                                    <span className='text-left min-w-[100px]'>Token Standard:</span>
                                    <div className='flex items-center gap-1 overflow-hidden text-ellipsis'>
                                        <span className='text-stone-700 overflow-hidden text-ellipsis'>{selectedNFT.is_erc721 ? 'ERC-721' : ''}</span>
                                    </div>
                                </div>
                                <div className='w-full flex justify-between items-center gap-2 mt-2'>
                                    <span className='text-left min-w-[100px]'>Marketplaces:</span>
                                    <div className='flex items-center gap-2'>
                                        {MarketPlaces.map((item) => {
                                            return (
                                                <div key={item.name}>
                                                    <img
                                                        src={`/image/marketplaces/${item.name.toLocaleLowerCase()}.svg`}
                                                        onError={({ currentTarget }) => {
                                                            currentTarget.onerror = null;
                                                            currentTarget.src = `/image/marketplaces/${item.name.toLocaleLowerCase()}.png`
                                                        }}
                                                        className="w-5 h-5 cursor-pointer"
                                                        onClick={() => handleGoMarketplace(item.name, selectedNFT.contract_id)}
                                                        alt="marketplace logo"
                                                    />
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
                <Disclosure as="div" className="mt-2">
                    {({ open }) => (
                        <>
                            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-sky-100 px-4 py-2 text-left text-sm font-medium text-sky-900 hover:bg-sky-200 focus:outline-none focus-visible:ring focus-visible:ring-sky-500 focus-visible:ring-opacity-75">
                                <div className='flex items-center gap-2'>
                                    <Icon icon="clarity:blocks-group-solid" fontSize={18} />
                                    <span>Properties {selectedNFT.attributes.length !== 0 ? `(${selectedNFT.attributes.length})` : ''}</span>
                                </div>
                                <Icon icon="material-symbols:arrow-drop-up-rounded"
                                    className={`${open ? 'rotate-180 transform' : ''
                                        } h-5 w-5 text-sky-500`}
                                />
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                <div className='flex flex-wrap gap-2'>
                                    {selectedNFT.attributes.length !== 0 ? (
                                        selectedNFT.attributes.map((item) => {
                                            return (
                                                <div className='flex flex-col items-center border border-sky-500 p-2 px-4 rounded-xl' key={item.trait_type}>
                                                    <p className='text-sky-500 font-bold'>{item.trait_type}</p>
                                                    <p>{item.value}</p>
                                                </div>
                                            )
                                        })) : (
                                        <div>There is no properties.</div>
                                    )}
                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
                <Disclosure as="div" className="mt-2">
                    {({ open }) => (
                        <>
                            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-sky-100 px-4 py-2 text-left text-sm font-medium text-sky-900 hover:bg-sky-200 focus:outline-none focus-visible:ring focus-visible:ring-sky-500 focus-visible:ring-opacity-75">
                                <div className='flex items-center gap-2'>
                                    <Icon icon="mdi:clipboard-text" fontSize={18} />
                                    <span>Description</span>
                                </div>
                                <Icon icon="material-symbols:arrow-drop-up-rounded"
                                    className={`${open ? 'rotate-180 transform' : ''
                                        } h-5 w-5 text-sky-500`}
                                />
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                {selectedNFT.description !== '' ? selectedNFT.description : 'There is no description.'}
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
            </div>
        </div>
    )
}
