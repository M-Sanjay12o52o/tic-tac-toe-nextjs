"use client";

import { useGameMode } from "@/context/GameModeContext";
import React, { useState, useEffect } from "react";

function TicTacToe({ gameMode }: { gameMode: string | null }) {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const { setGameMode } = useGameMode();

    const handleClick = (index: number) => {
        if (board[index] || calculateWinner(board) || !gameMode) return;

        const newBoard = board.slice();
        newBoard[index] = isXNext ? "X" : "O";
        setBoard(newBoard);
        setIsXNext(!isXNext);
    };

    const handleGameModeSelection = (mode: string) => {
        setGameMode(mode);
    }

    const computerMove = () => {
        if (gameMode !== "One Player") return;

        const emptySquares = board
            .map((square, index) => (square === null ? index : null))
            .filter((index) => index !== null);

        if (emptySquares.length === 0 || calculateWinner(board)) return;

        const randomIndex = Math.floor(Math.random() * emptySquares.length);
        const newBoard = board.slice();
        newBoard[emptySquares[randomIndex] as number] = "O";
        setBoard(newBoard);
        setIsXNext(true);
    };

    useEffect(() => {
        if (!isXNext && gameMode === "One Player") {
            setTimeout(computerMove, 500);
        }
    }, [isXNext]);

    const renderSquare = (index: number) => {
        return (
            <button
                key={index}
                className={`w-24 h-24 text-4xl font-bold rounded-lg shadow-md transition-all duration-200 
                ${board[index] ? 'bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'} 
                ${board[index] === 'X' ? 'text-red-500' : board[index] === 'O' ? 'text-blue-500' : 'text-transparent'}`}
                onClick={() => handleClick(index)}
                disabled={!!board[index] || !!calculateWinner(board)}
            >
                {board[index]}
            </button>
        );
    };

    const calculateWinner = (board: Array<string | null>) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return null;
    };

    const isBoardFull = (board: Array<string | null>) => {
        return board.every(square => square !== null);
    }

    const winner = calculateWinner(board);
    const isTie = !winner && isBoardFull(board);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-400 to-blue-500 text-white p-4">
            <h1 className="text-6xl font-bold mb-8 text-yellow-300 drop-shadow-lg">TIC-TAC-TOE</h1>
            {!gameMode ? (
                <div className="flex flex-col items-center justify-center bg-white bg-opacity-20 rounded-xl p-8 backdrop-filter backdrop-blur-lg">
                    <h3 className="text-4xl font-medium mb-6 text-white">
                        Choose a game mode
                    </h3>
                    <div className="flex space-x-4">
                        <button
                            onClick={() => handleGameModeSelection("One Player")}
                            className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
                        >
                            One Player
                        </button>
                        <button
                            onClick={() => handleGameModeSelection("Two Player")}
                            className="bg-green-400 hover:bg-green-500 text-gray-800 font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
                        >
                            Two Player
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <h2 className="text-2xl font-bold mb-4 text-white">Game mode: {gameMode}</h2>
                    <h3 className="text-xl mb-4">Playing as <span className={`font-bold ${isXNext ? 'text-red-500' : 'text-blue-500'}`}>{isXNext ? "X" : "O"}</span></h3>
                    <div className="grid grid-cols-3 gap-2 bg-white bg-opacity-20 p-4 rounded-xl backdrop-filter backdrop-blur-lg">
                        {Array.from({ length: 9 }).map((_, index) => renderSquare(index))}
                    </div>
                    {(winner || isTie) && (
                        <div className="mt-8 text-center bg-white bg-opacity-20 p-4 rounded-xl backdrop-filter backdrop-blur-lg">
                            {winner && (
                                <h2 className="text-4xl font-bold text-yellow-300">
                                    Winner: <span className={`${winner === 'X' ? 'text-red-500' : 'text-blue-500'}`}>{winner}</span>
                                </h2>
                            )}
                            {isTie && (
                                <h2 className="text-4xl font-bold text-yellow-300">
                                    It's a Tie!
                                </h2>
                            )}
                            <button
                                onClick={() => {
                                    setBoard(Array(9).fill(null));
                                    setIsXNext(true);
                                }}
                                className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
                            >
                                Play Again
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default TicTacToe;