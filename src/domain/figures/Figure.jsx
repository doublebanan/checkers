export const FigureNames = {
    FIGURE: "Фигура",
    CHECKER: "Шашка",
    KINGCHECKER: "Дамка",
};

export class Figure {
    constructor(color, cell) {
        this.color = color;
        this.cell = cell;
        this.cell.figure = this;
        this.logo = null;
        this.name = FigureNames.FIGURE;
        this.id = Math.random();
    }

    canMove(target) {
        if (target.figure && target.figure.color === this.color) {
            return false;
        }
        return true;
    }

    moveFigure(targetCell) {
        //Получаем шаг
        const dx = Math.abs(this.cell.x - targetCell.x);
        const dy = Math.abs(this.cell.y - targetCell.y);

        //Сравниваем шаг

        if (dx === 2 && dy === 2) {
            const midX = (this.cell.x + targetCell.x) / 2;
            const midY = (this.cell.y + targetCell.y) / 2;
            //Координаты вражеской клетки
            const middleCell = this.cell.board.getCell(midX, midY);
            if (middleCell?.figure && middleCell.figure.color !== this.color) {
                //Удаляем побитую фигуру
                middleCell.figure = null;
            }
        }

        this.cell.figure = null;
        targetCell.setFigure(this);
    }

    canBeat() {
        const directions = [
            { dx: -2, dy: -2 },
            { dx: -2, dy: 2 },
            { dx: 2, dy: -2 },
            { dx: 2, dy: 2 },
        ];

        for (const dir of directions) {
            const targetX = this.cell.x + dir.dx;
            const targetY = this.cell.y + dir.dy;

            if (targetX >= 0 && targetX < 8 && targetY >= 0 && targetY < 8) {
                const targetCell = this.cell.board.getCell(targetX, targetY);
                if (this.canMove(targetCell)) {
                    return true;
                }
            }
        }

        return false;
    }
}
