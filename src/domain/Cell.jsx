export class Cell {
    constructor(board, x, y, color, figure = null) {
        this.x = x; // координата по X
        this.y = y; // координата по Y
        this.color = color; // цвет клетки (например, 'white' или 'black')
        this.figure = figure; // шашка, которая стоит на клетке (или null)
        this.board = board; // ссылка на доску
        this.available = false; // можно ли на неё походить (подсветка)
        this.id = Math.random(); // уникальный ID для ключей в React
    }

    isEmpty() {
        return this.figure === null;
    }

    isEnemy(target) {
        if (target.figure) {
            return this.figure && this.figure.color !== target.figure.color;
        }
        return false;
    }

    setFigure(figure) {
        this.figure = figure;
        if (figure) {
            figure.cell = this;
        }
    }
}
