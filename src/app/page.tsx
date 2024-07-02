"use client";

import { useGameMode } from '@/context/GameModeContext';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

interface PageProps { }

const Page: FC<PageProps> = () => {
  const { setGameMode } = useGameMode();
  const router = useRouter();

  const handleGameModeSelection = (mode: string) => {
    setGameMode(mode);
    router.push('/game');
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-400 to-blue-500 text-white p-4">
      <h1 className="text-6xl font-bold mb-8 text-yellow-300 drop-shadow-lg">TIC-TAC-TOE</h1>
      <div className="bg-white bg-opacity-20 rounded-xl p-8 backdrop-filter backdrop-blur-lg">
        <h2 className="text-4xl font-medium mb-6 text-white text-center">
          Choose a game mode
        </h2>
        <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <button
            className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
            onClick={() => handleGameModeSelection('One Player')}
          >
            One Player
          </button>
          <button
            className="w-full sm:w-auto bg-green-400 hover:bg-green-500 text-gray-800 font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
            onClick={() => handleGameModeSelection('Two Player')}
          >
            Two Player
          </button>
        </div>One Player
      </div>
    </div>
  );
}

export default Page;