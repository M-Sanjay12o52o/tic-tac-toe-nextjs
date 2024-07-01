"use client";

import { useGameMode } from '@/context/GameModeContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC, use } from 'react';

interface PageProps { }

const Page: FC<PageProps> = () => {
  const { setGameMode } = useGameMode();
  const router = useRouter();

  const handleGameModeSelection = (mode: string) => {
    setGameMode(mode);
    router.push('/game');
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold mb-8 text-gray-800">TIC-TAC-TOE</h1>

      {/* <Link href={"/game"} className='text-black'>Game</Link> */}

      <h2 className="text-2xl font-bold mb-4 text-gray-700">Choose a game mode</h2>

      <div className="flex space-x-4">
        <button
          className="bg-red-500 hover:bg-red-700 text-white
           font-bold py-2 px-4 rounded shadow-lg transform hover:scale-105
            transition-transform"
          onClick={() => handleGameModeSelection('onePlayer')}
        >
          One Player
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white 
          font-bold py-2 px-4 rounded shadow-lg transform hover:scale-105
           transition-transform"
          onClick={() => handleGameModeSelection('twoPlayer')}
        >
          Two Player
        </button>
      </div>
    </div>
  );
}

export default Page;
