import { Fragment, useState, useEffect } from "react";

import CellComponets from "./CellComponents";

const BoardComponents = ({ board, setBoard, currentPlayer, swapPlayer }) => {
    const [selectedCell, setSelectedCell] = useState(null);

    function click(cell) {
        const beatExists = board.hasAnyBeat(currentPlayer);

        if (
            selectedCell &&
            selectedCell !== cell &&
            selectedCell.figure?.canMove(cell)
        ) {
            const dx = Math.abs(selectedCell.x - cell.x);
            const dy = Math.abs(selectedCell.y - cell.y);

            // Если есть обязательное взятие
            if (beatExists && !(dx === 2 && dy === 2)) {
                return;
            }

            selectedCell.figure.moveFigure(cell);

            // Если былo взятие

            if (dx === 2 && dy === 2) {
                if (cell.figure.canBeat()) {
                    // Можно продолжать бить, оставляем выбор на той же шашке
                    setSelectedCell(cell);
                    updateBoard();
                    return;
                } else {
                    // Заканчиваем ход, меняем игрока
                    swapPlayer();
                }
            } else {
                // Обычный ход — меняем игрока
                swapPlayer();
            }

            setSelectedCell(null);
        } else {
            // Запрет выбора шашек
            if (beatExists && !(cell.figure && cell.figure.canBeat())) {
                return;
            }

            if (cell.figure && cell.figure.color === currentPlayer.color) {
                setSelectedCell(cell);
            }
        }

        updateBoard();
    }

    function hightLightCells() {
        board.hightLightCells(selectedCell);
        updateBoard();
    }

    useEffect(() => {
        hightLightCells();
    }, [selectedCell]);

    function updateBoard() {
        const newBoard = board.getCopyBoard();
        setBoard(newBoard);
    }

    return (
        <div>
            {currentPlayer && <h2>Текущий игрок: {currentPlayer.color}</h2>}
            <div className="board">
                {board.cells.map((row, index) => (
                    <Fragment key={index}>
                        {row.map((cell) => (
                            <CellComponets
                                click={click}
                                cell={cell}
                                key={cell.id}
                                selected={
                                    cell.x === selectedCell?.x &&
                                    cell.y === selectedCell?.y
                                }
                            />
                        ))}
                    </Fragment>
                ))}
            </div>
        </div>
    );
};

export default BoardComponents;
