export class MyBot {

    public hitMap : { [ pos: string] : boolean } = {};

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
            if(previousShot.WasHit) {
                this.hitMap[this.getStringFromPosition(previousShot.Position)] = true;
                this.hitSoFar ++;
            }
            var nextPos = this.getNextTarget2(previousShot.Position);
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

    private getNextTarget2(position) {
        var iterPos = {Row: "A", Column: 1};
        while(iterPos.Row != "J" || iterPos.Column != 10) {
            var positionString = this.getStringFromPosition(iterPos);
            if(!this.triedMap[positionString] && this.hasTwoNeighbours(iterPos)){
                return iterPos;
            }
            iterPos = this.getNextTarget(iterPos)
        }
        iterPos = {Row: "A", Column: 1};
        while(iterPos.Row != "J" || iterPos.Column != 10) {
            var positionString = this.getStringFromPosition(iterPos);
            if(!this.triedMap[positionString] && this.hasOneNeighbour(iterPos)){
                return iterPos;
            }
            iterPos = this.getNextTarget(iterPos)
        }
        iterPos = {Row: position.Row, Column: position.Column };
        var positionString = this.getStringFromPosition(iterPos);
        while(!this.triedMap[positionString]) {
            var nextColumn = iterPos.Column + 2;
            var nextRowIndex = iterPos.Row.charCodeAt(0) - 64;
            if(nextColumn === 11) {
                nextColumn = 2;
                nextRowIndex = nextRowIndex % 10 + 1;
            }
            if(nextColumn === 12) {
                nextColumn = 1;
                nextRowIndex = nextRowIndex % 10 + 1;
            }
            iterPos = {Row: this.convertToChar(nextRowIndex), Column: nextColumn };
            var positionString = this.getStringFromPosition(iterPos);   
        }
        return iterPos;
    }

    private hasTwoNeighbours(pos){
        var upString = this.getPreviousRow(pos.Row) + pos.Column;
        var downString = this.getNextRow(pos.Row) + pos.Column;
        var leftString = pos.Row + (pos.Column - 1).toString();
        var rightString = pos.Row + (pos.Column + 1).toString();
        return ((this.hitMap[leftString] && this.hitMap[rightString]) || (this.hitMap[upString] && this.hitMap[downString]));
    }

    private hasOneNeighbour(pos){
        var upString = this.getPreviousRow(pos.Row) + pos.Column;
        var downString = this.getNextRow(pos.Row) + pos.Column;
        var leftString = pos.Row + (pos.Column - 1).toString();
        var rightString = pos.Row + (pos.Column + 1).toString();
        return (this.hitMap[leftString] || this.hitMap[rightString] || this.hitMap[upString] || this.hitMap[downString]);
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

