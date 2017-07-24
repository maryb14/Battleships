import {Position} from './position'
 
export class SecondStrategy {
    constructor() {}
    public getNextTarget(pos: Position, triedMap: { [ pos: string] : boolean }, hitMap: { [ pos: string] : boolean }): Position  {
        //first shoot at position that have 2 neighbours already hit
        var iterPos = new Position("A", 1);
        while(iterPos.row != "J" || iterPos.column != 10) {
            var positionString = iterPos.getString();
            if(!triedMap[positionString] && iterPos.hasTwoNeighbours(hitMap)){
                return iterPos;
            }
            iterPos = iterPos.getNextPosition();
        }
        //secondly shoot at position which have one neighbour hit
        var iterPos = new Position("A", 1);
        while(iterPos.row != "J" || iterPos.column != 10) {
            var positionString = iterPos.getString();
            if(!triedMap[positionString] && iterPos.hasOneNeighbour(hitMap)){
                return iterPos;
            }
            iterPos = iterPos.getNextPosition();
        }
        //lastly go through all the positions in the table and shoot the first one which is available
        var firstPos: Position = new Position("A", 1);
        if(!triedMap[firstPos.getString()]) {
            availablePos.push(firstPos);
        }
        iterPos = firstPos.getNextPosition();
        var availablePos : Position[] = [];
        while(iterPos.row != firstPos.row || iterPos.column != firstPos.column) {
            if(!triedMap[iterPos.getString()]) {
                availablePos.push(iterPos);
            }
            iterPos = iterPos.getNextPosition();
        }
        var randomIndex = Math.floor(Math.random() * availablePos.length);
        return availablePos[randomIndex];
        /* var positionString = iterPos.getString();
        var passedTrough : number = 0;
        var hitSoFar = Object.keys(hitMap).length;
        if(hitSoFar >= 13) {
            while(triedMap[positionString] && passedTrough <= 100) {
                passedTrough++;
                var nextColumn = iterPos.column + 2;
                var nextRowIndex = iterPos.row.charCodeAt(0) - 64;
                if(nextColumn === 11) {
                    nextColumn = 2;
                    nextRowIndex = nextRowIndex % 10 + 1;
                }
                if(nextColumn === 12) {
                    nextColumn = 1;
                    nextRowIndex = nextRowIndex % 10 + 1;
                    if(nextRowIndex == 1) nextColumn = 2;
                }
                iterPos = new Position(Position.convertToChar(nextRowIndex), nextColumn);
                var positionString = iterPos.getString();  
            }
            return iterPos;
        }
        else {
            while(triedMap[positionString] && passedTrough <= 100) {
                passedTrough++;
                var nextColumn = iterPos.column + 3;
                var nextRowIndex = iterPos.row.charCodeAt(0) - 64;
                if(nextColumn === 11) {
                    nextColumn = 3;
                    nextRowIndex = nextRowIndex % 10 + 1;
                }
                if(nextColumn === 12) {
                    nextColumn = 1;
                    nextRowIndex = nextRowIndex % 10 + 1;
                }
                if(nextColumn === 13) {
                    nextColumn = 2;
                    nextRowIndex = nextRowIndex % 10 + 1;
                }
                iterPos = new Position(Position.convertToChar(nextRowIndex), nextColumn);
                var positionString = iterPos.getString();  
            }
            return iterPos;
        } */
    }
}