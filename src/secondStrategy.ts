import {Position} from './position'
 
export class SecondStrategy {
    constructor() {}
    public getNextTarget(pos: Position, triedMap, hitMap): Position  {
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
        //lastly go through all the positions in the table and should at the first one which is available
        iterPos = new Position("A", 1);
        var positionString = iterPos.getString();
        var passedTrough : number = 0;
        while(triedMap[positionString] && passedTrough <= 100) {
            passedTrough++;
            var nextColumn = iterPos.column + 3;
            var nextRowIndex = iterPos.row.charCodeAt(0) - 64;
            if(nextColumn === 11) {
                nextColumn = 3;
                nextRowIndex = (nextRowIndex + 3) % 10;
                if(nextRowIndex === 0) nextRowIndex = 10;
            }
            if(nextColumn === 12) {
                nextColumn = 1;
                nextRowIndex = (nextRowIndex + 3) % 10;
                if(nextRowIndex === 0) nextRowIndex = 10;
            }
            if(nextColumn === 13) {
                nextColumn = 2;
                nextRowIndex = (nextRowIndex + 3) % 10;
                if(nextRowIndex === 0) nextRowIndex = 10;
            }
            iterPos = new Position(Position.convertToChar(nextRowIndex), nextColumn);
            var positionString = iterPos.getString();  
        }
        return iterPos;
    }
}