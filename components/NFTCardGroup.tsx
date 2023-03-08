import React, { useState } from 'react'
import { NFTListTypes } from './MainSection';

interface NFTCardGroupTypes {
    nftList: NFTListTypes[]
    handleCutDecimal: (value: number) => string
    openModal: (id: string) => void
}

export default function NFTCardGroup({
    nftList,
    handleCutDecimal,
    openModal
}: NFTCardGroupTypes) {
    return (
        <>
            {nftList.map((item: NFTListTypes, index: number) => {
                return (
                    <div key={index} className={`${item.content !== '' ? 'h-max' : 'h-auto'} bg-[#ffffff10] border border-sky-500 rounded-3xl shadow-sm hover:shadow-lg shadow-sky-500/50 hover:shadow-sky-500 flex flex-col items-start justify-between cursor-pointer p-3 transition duration-500`} onClick={() => openModal(item.id)}>
                        <img
                            src={item.content}
                            alt='nft content image'
                            className="rounded-3xl border border-sky-500 w-full"
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null;
                                currentTarget.src = '/image/nft-placeholder.svg'
                            }}
                        />
                        <div className="w-full p-4 pb-2">
                            <div className="font-bold text-sky-500 relative overflow-hidden text-ellipsis">
                                {item.name.startsWith('#') && <span className='mr-2'>{item.contract_name}</span>}
                                <span>{item.name}</span>
                            </div>
                            {item.pay_token && (
                                <div className='w-full flex justify-between items-center mt-2 text-sm text-stone-700'>
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={item.pay_token.logo_url}
                                            alt='pay token logo'
                                            width={20}
                                            height={20}
                                        />
                                        <span>{handleCutDecimal(item.usd_price / item.pay_token.price)}</span>
                                        <span>{item.pay_token.symbol}</span>
                                    </div>
                                    <span>${handleCutDecimal(item.usd_price)}</span>
                                </div>
                            )}
                        </div>
                    </div>
                )
            })}
        </>
    )
}
