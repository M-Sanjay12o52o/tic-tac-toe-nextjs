"use client"

import React, { useState } from "react";

function TicTacToe() {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);

    const handleClick = (index: number) => {
        if (board[index]) return;

        console.log("board[index]", board[index]);

        const newBoard = board.slice();
        newBoard[index] = isXNext ? "X" : "O";
        setBoard(newBoard);
        setIsXNext(!isXNext);
    };

    const renderSquare = (index: number) => {
        console.log("renderSquare", board[index]);

        return (
            <div
                key={index}
                className="rounded-md w-24 h-24 flex items-center
         justify-center border-2 border-black text-4xl bg-slate-500"
                onClick={() => handleClick(index)}
            >
                {board[index]}
            </div>
        );
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-6xl font-bold mb-8">TIC-TAC-TOE</h1>
            <div className="grid grid-cols-3 gap-0">
                {Array.from({ length: 9 }).map((_, index) => renderSquare(index))}
            </div>
        </div>
    );
}

export default TicTacToe;
