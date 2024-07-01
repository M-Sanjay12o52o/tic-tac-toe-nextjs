"use client"

import TicTacToe from '@/components/TicTacToe'
import { useGameMode } from '@/context/GameModeContext';
import { FC, useEffect } from 'react'

interface pageProps {

}

const page: FC<pageProps> = ({ }) => {
    const { gameMode } = useGameMode();

    useEffect(() => {
        if (gameMode) {
            console.log('Game mode selected: ', gameMode);
        }
    }, [gameMode])

    return <div>
        <TicTacToe gameMode={gameMode} />
    </div>
}

export default page