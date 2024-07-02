"use client";

import { useGameMode } from "@/context/GameModeContext";
import React, { useState, useEffect } from "react";

function TicTacToe({ gameMode }: { gameMode: string | null }) {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [xWins, setXWins] = useState(0);
    const [oWins, setOWins] = useState(0);
    const [ties, setTies] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState<string | null>(null);
    const { setGameMode } = useGameMode();

    const handleClick = (index: number) => {
        if (board[index] || gameOver || !gameMode) return;

        const newBoard = board.slice();
        newBoard[index] = isXNext ? "X" : "O";
        setBoard(newBoard);
        setIsXNext(!isXNext);
    };

    const handleGameModeSelection = (mode: string) => {
        setGameMode(mode);
    };

    const computerMove = () => {
        if (gameMode !== "One Player") return;

        let bestScore = -Infinity;
        let move = -1;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === null) {
                board[i] = "O";
                const score = minimax(board, 0, false);
                board[i] = null;
                if (score > bestScore) {
                    bestScore = score;
                    move = i;
                }
            }
        }
        if (move !== -1) {
            const newBoard = board.slice();
            newBoard[move] = "O";
            setBoard(newBoard);
            setIsXNext(true);
        }
    };

    const minimax = (board: Array<string | null>, depth: number, isMaximizing: boolean): number => {
        const winner = calculateWinner(board);
        if (winner === "X") return -10;
        if (winner === "O") return 10;
        if (isBoardFull(board)) return 0;

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === null) {
                    board[i] = "O";
                    const score = minimax(board, depth + 1, false);
                    board[i] = null;
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === null) {
                    board[i] = "X";
                    const score = minimax(board, depth + 1, true);
                    board[i] = null;
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
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
    };

    const handleGameOver = (winner: string | null) => {
        setGameOver(true);
        setWinner(winner);
        if (winner === "X") {
            setXWins(xWins + 1);
        } else if (winner === "O") {
            setOWins(oWins + 1);
        } else {
            setTies(ties + 1);
        }
    };

    const resetBoard = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
        setGameOver(false);
        setWinner(null);
    };

    useEffect(() => {
        const winner = calculateWinner(board);
        if (winner || isBoardFull(board)) {
            handleGameOver(winner);
        }
        if (!isXNext && gameMode === "One Player" && !gameOver) {
            setTimeout(computerMove, 500);
        }
    }, [board]);

    const renderSquare = (index: number) => {
        return (
            <button
                key={index}
                className={`w-24 h-24 text-4xl font-bold rounded-lg shadow-md transition-all duration-200 
                ${board[index] ? 'bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'} 
                ${board[index] === 'X' ? 'text-red-500' : board[index] === 'O' ? 'text-blue-500' : 'text-transparent'}`}
                onClick={() => handleClick(index)}
                disabled={!!board[index] || gameOver}
            >
                {board[index]}
            </button>
        );
    };

    const isTie = !winner && isBoardFull(board);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-400 to-blue-500 text-white p-4">
            <h1 className="text-6xl font-bold mb-8 text-yellow-300 drop-shadow-lg">TIC-TAC-TOE</h1>
            <div className="flex space-x-8 mb-4">
                <div className="text-2xl">
                    X Wins: <span className="font-bold">{xWins}</span>
                </div>
                <div className="text-2xl">
                    O Wins: <span className="font-bold">{oWins}</span>
                </div>
                <div className="text-2xl">
                    Ties: <span className="font-bold">{ties}</span>
                </div>
            </div>
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

                    {/* Overlay */}
                    {(winner || isTie) && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-filter backdrop-blur-md z-50">
                            <div className="bg-gradient-to-br from-purple-500 to-blue-600 p-10 rounded-2xl text-center shadow-2xl transform transition-all duration-300 scale-100 border-4 border-yellow-300">
                                <div className="bg-white bg-opacity-20 p-8 rounded-xl backdrop-filter backdrop-blur-sm">
                                    {winner && (
                                        <>
                                            <h2 className="text-5xl font-bold mb-4 text-yellow-300 drop-shadow-lg">
                                                Winner!
                                            </h2>
                                            <div className={`text-7xl font-extrabold mb-6 ${winner === 'X' ? 'text-red-500' : 'text-blue-500'}`}>
                                                {winner}
                                            </div>
                                        </>
                                    )}
                                    {isTie && (
                                        <h2 className="text-5xl font-bold mb-6 text-yellow-300 drop-shadow-lg">
                                            It's a Tie!
                                        </h2>
                                    )}
                                    <button
                                        onClick={resetBoard}
                                        className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 text-xl"
                                    >
                                        Play Again
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default TicTacToe;
