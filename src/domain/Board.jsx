import { Cell } from "./Cell";
import { Colors } from "./Colors";
import { Checkers } from "./figures/Checkers";

export class Board {
    constructor() {
        this.cells = [];
    }

    initCells() {
        for (let i = 0; i < 8; i++) {
            const row = [];
            for (let k = 0; k < 8; k++) {
                const color = (i + k) % 2 !== 0 ? Colors.BLACK : Colors.WHITE;
                row.push(new Cell(this, k, i, color, null));
            }
            this.cells.push(row);
        }
    }

    addCheckers() {
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                const cell = this.getCell(x, y);
                if (cell.color === Colors.BLACK) {
                    if (y < 3) {
                        new Checkers(Colors.BLACK, this.getCell(x, y));
                    }
                    if (y > 4) {
                        new Checkers(Colors.WHITE, this.getCell(x, y));
                    }
                }
            }
        }
    }

    //Подсветка ходов

    hightLightCells(selectedCell) {
        for (let i = 0; i < this.cells.length; i++) {
            const row = this.cells[i];
            for (let j = 0; j < row.length; j++) {
                const target = row[j];
                if (selectedCell && selectedCell.figure) {
                    target.available = selectedCell.figure.canMove(target);
                } else {
                    target.available = false;
                }
            }
        }
    }

    getCopyBoard() {
        const newBoard = new Board();
        newBoard.cells = this.cells;
        return newBoard;
    }

    getCell(x, y) {
        return this.cells[y][x];
    }

    addFigure() {
        this.addCheckers();
    }

    // Проверка, есть ли у текущего игрока шашки, которые могут побить

    hasAnyBeat(player) {
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                const cell = this.getCell(x, y);
                if (
                    cell.figure &&
                    cell.figure.color === player.color &&
                    cell.figure.canBeat()
                ) {
                    return true;
                }
            }
        }
        return false;
    }
}
