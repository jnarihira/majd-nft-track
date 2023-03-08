import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify';
import DropDown from './NetworkDropDown';
import MainSection from './MainSection';
import TitleLogo from './TitleLogo';

export interface NetworkTypes {
    value: string
    name: string
    explorer: string
}

const network = [
    { name: 'Ethereum', value: 'eth', explorer: 'https://etherscan.io/' },
    { name: 'Binance', value: 'bsc', explorer: 'https://bscscan.com/' },
    { name: 'Polygon', value: 'matic', explorer: 'https://polygonscan.com/' },
]

const HomeComponents = () => {
    const [selectedNetwork, setSelectedNetwork] = useState<NetworkTypes>(network[0])

    return (
        <div className={`w-screen min-h-screen flex flex-col items-center justify-center gap-2 bg-gradient-to-b from-cyan-50 via-cyan-200 to-white font-poppinsRegular`}>
            <div className='w-full flex flex-col md:flex-row items-start md:items-center justify-between px-2 xs:px-4 lg:px-10 py-4'>
                <TitleLogo />
                <DropDown
                    selected={selectedNetwork}
                    setSelected={setSelectedNetwork}
                    network={network}
                />
            </div>
            <div className="relative w-full md:max-w-5xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-screen-2xl flex items-center justify-center p-2 px-0 xs:p-4">
                <MainSection
                    selectedNetwork={selectedNetwork}
                />
            </div>
            <ToastContainer
                theme='colored'
                autoClose={3000}
            />
        </div>
    )
}

export default HomeComponents