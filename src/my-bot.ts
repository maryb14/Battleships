export class MyBot {

    private hitMap : { [ pos: string] : boolean } = {};

    private triedMap : { [ pos: string] : boolean } = {};

    private hitSoFar = 0;

    public getShipPositions() {
        return [
            { StartingSquare: { Row: "A", Column: 1 }, EndingSquare : { Row: "A", Column: 5 } },
            { StartingSquare: { Row: "C", Column: 1 }, EndingSquare : { Row: "C", Column: 4 } },
            { StartingSquare: { Row: "E", Column: 1 }, EndingSquare : { Row: "E", Column: 3 } },
            { StartingSquare: { Row: "G", Column: 1 }, EndingSquare : { Row: "G", Column: 3 } },
            { StartingSquare: { Row: "I", Column: 1 }, EndingSquare : { Row: "I", Column: 2 } },
        ]
    }

    public selectTarget(gamestate) {
        var previousShot = gamestate.MyShots && gamestate.MyShots[gamestate.MyShots.length-1];
        if(previousShot) {
            this.triedMap[this.getStringFromPosition(previousShot.Position)] = true;
            if(previousShot.WasHit == true) {
                this.hitMap[this.getStringFromPosition(previousShot.Position)] = true;
                this.hitSoFar ++;
            }
            var nextPos = this.getNextTargetDiagonal(previousShot.Position);
            return nextPos;
        }
        return { Row: "A", Column: 1 };  
    }

    private getNextTarget(position) {
        //initially
        var column = this.getNextColumn(position.Column);
        var row = column === 1 ? this.getNextRow(position.Row) : position.Row;
        return { Row: row, Column: column }
    }

    private getNextTargetDiagonal(position) {
        var rowIndex = position.Row.charCodeAt(0) - 64;
        var column = position.Column;
        var nextColumn;
        var nextRowIndex;
        //first passing
        if(rowIndex % 2 == column % 2) {
            nextColumn = column + 2;
            nextRowIndex = rowIndex;
            if(nextColumn == 11) {
                nextColumn = 2;
                nextRowIndex = nextRowIndex % 10 + 1;
            }
            else if(nextColumn == 12) {
                if(rowIndex == 10) {
                    nextColumn = 2;
                }
                else {
                    nextColumn = 1;
                }
                nextRowIndex = nextRowIndex % 10 + 1;
            }
            return {Row: this.convertToChar(nextRowIndex), Column: nextColumn }
        }
        //second passing
        else {
            //take first dots with 2 hits as neighbours
            var passed = 1;
            while(passed <= 50) {
                passed ++;
                nextColumn = column + 2;
                nextRowIndex = rowIndex;
                if(nextColumn == 11) {
                    nextColumn = 2;
                    nextRowIndex = nextRowIndex % 10 + 1;
                }
                if(nextColumn == 12) {
                    nextColumn = 1;
                    nextRowIndex = nextRowIndex % 10 + 1;
                }
                column = nextColumn;
                rowIndex = nextRowIndex;
                var newPos = {Row: this.convertToChar(nextRowIndex), Column: nextColumn };
                var positionString = this.getStringFromPosition(newPos);
                if(!this.triedMap[positionString] && this.hasTwoNeighbours(newPos)) {
                    return newPos;
                }
            }
            var newPos = {Row: this.convertToChar(rowIndex), Column: column };
            var positionString = this.getStringFromPosition(newPos);
            while(this.triedMap[positionString]){
                nextColumn = column + 2;
                nextRowIndex = rowIndex;
                if(nextColumn == 11) {
                    nextColumn = 2;
                    nextRowIndex = nextRowIndex % 10 + 1;
                }
                if(nextColumn == 12) {
                    nextColumn = 1;
                    nextRowIndex = nextRowIndex % 10 + 1;
                }
                var newPos = {Row: this.convertToChar(nextRowIndex), Column: nextColumn };
                var positionString = this.getStringFromPosition(newPos);
                column = nextColumn;
                rowIndex = nextRowIndex;
            }
            return newPos;
        }
    }

    private hasTwoNeighbours(pos): boolean{
        var up = pos; up.Row = this.getPreviousRow(pos.Row);
        var upString = this.getStringFromPosition(up);
        var down = pos; down.Row = this.getNextRow(pos.Row);
        var downString = this.getStringFromPosition(down);
        var left = pos; left.Column --;
        var leftString = this.getStringFromPosition(left);
        var right = pos; right.Column ++;
        var rightString = this.getStringFromPosition(right);
        return ((this.hitMap[leftString] && this.hitMap[rightString]) || (this.hitMap[upString] && this.hitMap[downString]));
    }

    private getNextRow(row) {
        var newRow = row.charCodeAt(0) + 1;
        if(newRow > 'J'.charCodeAt(0)) {
            return 'A';
        }
        return String.fromCharCode(newRow);
    }

    private getPreviousRow(row) {
        var newRow = row.charCodeAt(0) - 1;
        if(newRow < 'A'.charCodeAt(0)) {
            return 'J';
        }
        return String.fromCharCode(newRow);
    }

    private getNextColumn(column) {
        return column % 10 + 1;
    }

    private convertToChar(row: number) {
        return String.fromCharCode(row + 64);
    }

    private getPositionFromIndices(row: number, column: number) {
        return {Row: this.convertToChar(row), Column: column};
    }

    private getStringFromPosition(position){
        return position.Row + position.Column;
    }
}

