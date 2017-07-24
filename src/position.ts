export class Position {
    constructor(public row: string, public column: number) {

    }
    public getString(): string {
        return this.row + this.column.toString();
    }
    public hasTwoNeighbours(hitMap): boolean {
        var upPos = this.getUpPosition();
        var upString = (upPos) ? (upPos.getString()) : "";
        var downPos = this.getDownPosition();
        var downString = (downPos) ? (downPos.getString()) : "";
        var leftPos = this.getLeftPosition();
        var leftString = (leftPos) ? (leftPos.getString()) : "";
        var rightPos = this.getRightPosition();
        var rightString = ((rightPos) ? (rightPos.getString()) : "");
        return ((hitMap[leftString] && hitMap[rightString]) || (hitMap[upString] && hitMap[downString]));
    }

    public getUpPosition(): Position {
        if(this.row === "A") {
            return undefined;
        }
        else {
            return (new Position(this.getPreviousRow(), this.column));
        }
    }
    public getDownPosition(): Position {
        if(this.row === "J") {
            return undefined;
        }
        else {
            return (new Position(this.getNextRow(), this.column));
        }
    }
    public getLeftPosition(): Position{
        if(this.column == 1) {
            return undefined;
        }
        else {
            return (new Position(this.row, this.column - 1));
        }
    }
    public getRightPosition(): Position{
        if(this.column == 10) {
            return undefined;
        }
        else {
            return (new Position(this.row, this.column + 1));
        }
    }
    public getNextRow(): string {
        var newRow = this.row.charCodeAt(0) + 1;
        if(newRow > 'J'.charCodeAt(0)) {
            return 'A';
        }
        return String.fromCharCode(newRow);
    }
    public getPreviousRow(): string {
        var newRow = this.row.charCodeAt(0) - 1;
        if(newRow < 'A'.charCodeAt(0)) {
            return "J";
        }
        return String.fromCharCode(newRow);
    }

    public  hasOneNeighbour(hitMap) : boolean {
        var upPos = this.getUpPosition();
        var upString = (upPos) ? (upPos.getString()) : "";
        var downPos = this.getDownPosition();
        var downString = (downPos) ? (downPos.getString()) : "";
        var leftPos = this.getLeftPosition();
        var leftString = (leftPos) ? (leftPos.getString()) : "";
        var rightPos = this.getRightPosition();
        var rightString = ((rightPos) ? (rightPos.getString()) : "");
        return (hitMap[leftString] || hitMap[rightString] || hitMap[upString] || hitMap[downString]);
    }

    public getNextPosition(): Position {
        var nextColumn: number = this.column % 10 + 1;
        var nextRow: string = ((nextColumn === 1) ? (this.getNextRow()) : (this.row));
        return (new Position(nextRow, nextColumn));
    }
    public static convertToChar(row: number) {
        return String.fromCharCode(row + 64);
    }
    public getDiagonalPositions(): Position[] {
        var diagPosArray: Position[] = [];
        var leftPos = this.getLeftPosition();
        var rightPos = this.getRightPosition();
        var upLeftPos = (leftPos) ? (leftPos.getUpPosition()) : undefined;
        var downLeftPos = (leftPos) ? (leftPos.getDownPosition()) : undefined;
        var upRightPos = (rightPos) ? (rightPos.getUpPosition()) : undefined;
        var downRightPos = (rightPos) ? (rightPos.getDownPosition()) : undefined;
        if(upLeftPos) diagPosArray.push(upLeftPos);
        if(downRightPos) diagPosArray.push(downRightPos);
        if(downLeftPos) diagPosArray.push(downLeftPos);
        if(upRightPos) diagPosArray.push(upRightPos);
        return diagPosArray;
    }
}