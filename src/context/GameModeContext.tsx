import React, { createContext, useState, FC, ReactNode, useContext } from 'react';

interface GameModeContextType {
    gameMode: string | null;
    setGameMode: (mode: string) => void;
}

// creating context
const GameModeContext = createContext<GameModeContextType | undefined>(undefined);

// provider component
export const GameModeProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [gameMode, setGameMode] = useState<string | null>(null);

    return (
        <GameModeContext.Provider value={{ gameMode, setGameMode }}>
            {children}
        </GameModeContext.Provider>
    )
}

// custom hook to use the GameModeContext
const useGameMode = () => {
    const context = useContext(GameModeContext)
    if (context === undefined) {
        throw new Error('useGameMode must be used within a GameModeProvider')
    }

    return context;
}

export { GameModeContext, useGameMode }