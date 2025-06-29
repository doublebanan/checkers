import { useState, useEffect } from "react";

import BoardComponents from "./components/BoardComponents";
import { GameController } from "./features/GameController";
import { Board } from "./domain/Board";
import { Player } from "./domain/Player";
import { Colors } from "./domain/Colors";

import "./App.css";

function App() {
    const [board, setBoard] = useState(new Board());
    const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
    const [blackPlayer, setblackPlayer] = useState(new Player(Colors.BLACK));
    const [currentPlayer, setCurrentPlayer] = useState(null);

    useEffect(() => {
        start();
        setCurrentPlayer(whitePlayer);
    }, []);

    function start() {
        // Создание новой доски
        const newBoard = new Board();

        newBoard.initCells();

        // Добавление шашек на доску
        newBoard.addFigure();

        setBoard(newBoard);
    }

    function swapPlayer() {
        setCurrentPlayer(
            currentPlayer.color === Colors.WHITE ? blackPlayer : whitePlayer
        );
    }

    return (
        <div className="app">
            <BoardComponents
                board={board}
                setBoard={setBoard}
                currentPlayer={currentPlayer}
                swapPlayer={swapPlayer}
                // gameController={gameController}
            />
        </div>
    );
}

export default App;
