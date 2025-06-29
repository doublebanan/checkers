import { Figure, FigureNames } from "./Figure";
import { Colors } from "../Colors";

import blackLogo from "../../shared/assets/checkers/black-checker.png";
import whiteLogo from "../../shared/assets/checkers/white-checker.png";

export class Checkers extends Figure {
    constructor(color, cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.CHECKER;
    }
    canMove(target) {
        //Двтжение
        if (!super.canMove(target)) return false;

        if (!target.isEmpty()) return false;

        const dx = Math.abs(this.cell.x - target.x);
        const dy = target.y - this.cell.y;

        if (this.color === Colors.BLACK && dy === 1 && dx === 1) return true;
        if (this.color === Colors.WHITE && dy === -1 && dx === 1) return true;
        //Прыжок
        if (dx === 2 && Math.abs(dy) === 2) {
            const midX = (this.cell.x + target.x) / 2;
            const midY = (this.cell.y + target.y) / 2;

            const middleCell = this.cell.board.getCell(midX, midY);
            if (middleCell?.figure && middleCell.figure.color !== this.color) {
                return true;
            }
        }
        return false;
    }
}
