// ** React Imports
import React, { useState } from 'react'

// ** npm module Imports
import { Player } from '@lottiefiles/react-lottie-player';
import { toast } from 'react-toastify';

// ** Components Imports
import { NetworkTypes } from './HomeBody';
import SearchInput from './SearchInput';
import ModalSection from './ModalSection';
import NFTCardGroup from './NFTCardGroup';

// ** Style Imports
import styles from '../styles/Home.module.css'
import 'react-toastify/dist/ReactToastify.css';

// ** Define Types
interface TraitTypes {
    trait_type: string
    value: string
}

interface PayTokenTypes {
    amount: number
    chain: string
    date_at: string
    decimals: number
    display_symbol: string
    id: string
    is_core: boolean
    is_verified: boolean
    is_wallet: boolean
    logo_url?: string
    name: string
    optimized_symbol: string
    price: number
    protocol_id: string
    symbol: string
    time_at: number
}

export interface NFTListTypes {
    amount: number
    attributes: TraitTypes[]
    chain: string
    collection_id: string
    content: string
    content_type: string
    contract_id: string
    contract_name: string
    description: string
    detail_url: string
    id: string
    inner_id: string
    is_erc721: boolean
    name: string
    pay_token: PayTokenTypes
    symbol: string
    thumbnail_url: string
    total_supply: number
    usd_price: number
}

interface MainSectionTypes {
    selectedNetwork: NetworkTypes
}

export default function MainSection({
    selectedNetwork
}: MainSectionTypes) {
    // ** State
    const [address, setAddress] = useState<string>('');
    const [isSearching, setIsSearching] = useState<string>('start');
    const [nftList, setNFTList] = useState<NFTListTypes[]>([]);
    const [selectedNFT, setSelectedNFT] = useState<NFTListTypes | null>(null);
    const [isOpenModal, setIsOpenModal] = useState(false);

    const emptyAddressWarning = () => toast.info('Please enter your address!')
    const validAddressWarning = () => toast.warn('Please enter valid address!')

    // ** Functions
    const handleGetResult = async () => {
        if (!address.match('^0x[a-fA-F0-9]{40}$')) {
            if (address === '') {
                emptyAddressWarning()
            } else {
                validAddressWarning()
            }
        } else {
            setIsSearching('searching')
            await fetch('/api/fetch-nft-data', {
                method: 'POST',
                body: JSON.stringify({
                    address: address,
                    chain: selectedNetwork.value
                })
            })
                .then(response => response.json())
                .then(response => {
                    setNFTList(response)
                })
            setIsSearching('end')
        }
    }

    const handleAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(event.target.value)
    }

    const handlePaste = () => {
        navigator.clipboard.readText().then((clipText) => {
            setAddress(clipText)
        })
    }

    const handleCutDecimal = (value: number) => {
        if (value) {
            return value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 4, });
        }
        return '0';
    }

    const closeModal = () => {
        setIsOpenModal(false)
    }

    const openModal = (id: string) => {
        const selectedNFT = nftList.find(item => item.id === id)
        if (selectedNFT) {
            setSelectedNFT(selectedNFT)
            setIsOpenModal(true)
        }
    }

    return (
        <div className={`border-0 xs:border border-sky-500 xs:shadow-lg bg-transparent xs:bg-[#FFFFFF10] shadow-none shadow-sky-500/50 w-full h-[760px] md:h-[800px] rounded-3xl flex flex-col justify-between p-2 xs:p-4 md:p-6`}>
            <SearchInput
                address={address}
                handleAddress={handleAddress}
                handlePaste={handlePaste}
                handleGetResult={handleGetResult}
            />
            <div className={`${styles.filter_blur} w-full h-[680px] xs:h-[660px] md:h-[680px] flex justify-center rounded-2xl p-4`}>
                {isSearching === 'start' &&
                    <div className='h-full flex items-center'>
                        <Player
                            autoplay
                            loop
                            src="https://assets5.lottiefiles.com/private_files/lf30_1TcivY.json"
                            style={{ height: '500px', width: '100%' }}
                        />
                    </div>
                }
                {isSearching === 'searching' &&
                    <div className='h-full flex items-center'>
                        <Player
                            autoplay
                            loop
                            src="https://assets5.lottiefiles.com/packages/lf20_picwsjt3.json"
                            style={{ height: '400px', width: '100%' }}
                        />
                    </div>
                }
                {isSearching === 'end' &&
                    (nftList.length === 0 ? (
                        <div className='h-full flex items-center'>
                            <Player
                                autoplay
                                loop
                                src="https://assets6.lottiefiles.com/datafiles/vhvOcuUkH41HdrL/data.json"
                                style={{ height: '400px', width: '100%' }}
                            />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pr-4 overflow-auto overflow-x-hidden">
                            <NFTCardGroup
                                nftList={nftList}
                                handleCutDecimal={handleCutDecimal}
                                openModal={openModal}
                            />
                        </div>
                    ))
                }
                <ModalSection
                    address={address}
                    isOpenModal={isOpenModal}
                    closeModal={closeModal}
                    selectedNFT={selectedNFT}
                    handleCutDecimal={handleCutDecimal}
                    selectedNetwork={selectedNetwork}
                />
            </div>
        </div >
    )
}
