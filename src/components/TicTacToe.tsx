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
            <div
                key={index}
                className="rounded-md w-24 h-24 flex items-center justify-center border-2 border-black text-4xl bg-slate-500"
                onClick={() => handleClick(index)}
            >
                {board[index]}
            </div>
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
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-6xl font-bold mb-8">TIC-TAC-TOE</h1>
            {!gameMode ? (
                <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
                    <h3 className="text-4xl font-medium mt-4 mb-6 text-gray-100">
                        Choose a game mode
                    </h3>
                    <div className="flex space-x-4">
                        <button
                            onClick={handleGameModeSelection.bind(null, "One Player")}
                            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform"
                        >
                            One Player
                        </button>
                        <button
                            onClick={handleGameModeSelection.bind(null, "Two Player")}
                            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform"
                        >
                            Two Player
                        </button>
                    </div>
                </div>

            ) : (
                <h2 className="text-2xl font-bold mb-4 text-gray-700">Game mode: {gameMode}</h2>
            )}
            <br />
            <h3>Playing as {isXNext ? "X" : "O"}</h3>
            <br />
            <div className="grid grid-cols-3 gap-0">
                {Array.from({ length: 9 }).map((_, index) => renderSquare(index))}
            </div>
            {winner && (
                <h2 className="text-4xl font-bold mt-4">
                    Winner: {winner}
                </h2>
            )}
            {
                <h2 className="text-4xl font-bold mt-4">
                    {isTie ? "It's a Tie" : ""}
                </h2>
            }
        </div>
    );
}

export default TicTacToe;
