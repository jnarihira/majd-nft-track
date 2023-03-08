import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import DisclosurePage from './Disclosure';
import { NFTListTypes } from './MainSection';
import { NetworkTypes } from './HomeBody';

interface ModalSectionTypes {
    address: string
    isOpenModal: boolean
    closeModal: () => void
    selectedNFT: NFTListTypes | null
    handleCutDecimal: (value: number) => string
    selectedNetwork: NetworkTypes
}

export default function ModalSection({
    address,
    isOpenModal,
    closeModal,
    selectedNFT,
    handleCutDecimal,
    selectedNetwork
}: ModalSectionTypes) {
    return (
        <Transition appear show={isOpenModal} as={Fragment}>
            <Dialog as="div" className={`relative z-50`} onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="${styles.filter_blur} fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-3 xl:p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            {selectedNFT && (
                                <Dialog.Panel className="max-h-[720px] lg:h-full w-max flex flex-col lg:flex-row items-center lg:items-start gap-6 bg-[#f0f9ffa0] backdrop-blur-2xl transform overflow-auto overflow-x-hidden lg:overflow-hidden rounded-2xl bg-white p-6 font-poppinsRegular text-left align-middle shadow-xl transition-all">
                                    <img
                                        src={selectedNFT.content}
                                        className="w-[360px] h-max xl:w-[500px] border border-white rounded-3xl"
                                        onError={({ currentTarget }) => {
                                            currentTarget.onerror = null;
                                            currentTarget.src = '/image/nft-placeholder.svg'
                                        }}
                                        alt="nft card image"
                                    />
                                    <div className='w-full md:w-[576px] h-max lg:h-[400px] xl:h-[500px] overflow-y-auto overflow-x-hidden pr-2'>
                                        <div className='flex items-center justify-between gap-2'>
                                            <div className="font-bold text-sky-500 text-xl">
                                                {selectedNFT.name.startsWith('#') && <span className='mr-2'>{selectedNFT.contract_name}</span>}
                                                <span>{selectedNFT.name}</span>
                                            </div>
                                        </div>
                                        <div className='w-full flex flex-col xs:flex-row items-start xs:items-center justify-between text-stone-700 text-sm mt-1'>
                                            <p>Last Sale (Contract)</p>
                                            {selectedNFT.pay_token && (
                                                <div className="flex items-center gap-1">
                                                    <img
                                                        src={selectedNFT.pay_token.logo_url}
                                                        alt='pay token logo'
                                                        width={20}
                                                        height={20}
                                                    />
                                                    <span>{handleCutDecimal(selectedNFT.usd_price / selectedNFT.pay_token.price)}</span>
                                                    <span>{selectedNFT.pay_token.symbol}</span>
                                                    <p>(${handleCutDecimal(selectedNFT.usd_price)})</p>
                                                </div> 
                                            )}
                                        </div>
                                        <DisclosurePage
                                            selectedNFT={selectedNFT}
                                            address={address}
                                            selectedNetwork={selectedNetwork}
                                        />
                                    </div>
                                </Dialog.Panel>
                            )}
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
