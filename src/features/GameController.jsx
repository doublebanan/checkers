import { Colors } from "./Colors";

export class GameController {
    constructor(board, whitePlayer, blackPlayer) {
        this.board = board;
        this.whitePlayer = whitePlayer;
        this.blackPlayer = blackPlayer;
        this.currentPlayer = whitePlayer;
        this.selectedCell = null;
    }

    setBoard(newBoard) {
        this.board = newBoard;
    }

    getCurrentPlayer() {
        return this.currentPlayer;
    }

    getSelectedCell() {
        return this.selectedCell;
    }

    setSelectedCell(cell) {
        this.selectedCell = cell;
    }

    swapPlayer() {
        this.currentPlayer =
            this.currentPlayer.color === Colors.WHITE
                ? this.blackPlayer
                : this.whitePlayer;
    }

    click(cell) {
        const beatExists = this.board.hasAnyBeat(this.currentPlayer);

        const selected = this.selectedCell;

        if (selected && selected !== cell && selected.figure?.canMove(cell)) {
            const dx = Math.abs(selected.x - cell.x);
            const dy = Math.abs(selected.y - cell.y);

            // Если есть обязательное взятие, но это не взятие — игнорируем
            if (beatExists && !(dx === 2 && dy === 2)) {
                return;
            }

            selected.figure.moveFigure(cell);

            if (dx === 2 && dy === 2) {
                // Проверка, можно ли бить дальше
                if (cell.figure.canBeat()) {
                    this.setSelectedCell(cell);
                    return;
                } else {
                    this.swapPlayer();
                }
            } else {
                this.swapPlayer();
            }

            this.setSelectedCell(null);
        } else {
            // Нельзя выбрать другие шашки, если есть удары
            if (beatExists && !(cell.figure && cell.figure.canBeat())) {
                return;
            }

            // Выбор своей фигуры
            if (cell.figure && cell.figure.color === this.currentPlayer.color) {
                this.setSelectedCell(cell);
            }
        }
    }
}
