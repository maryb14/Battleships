import {Position} from './position'
 
export class SecondStrategy {
    constructor() {}
    public getNextTarget(pos: Position, triedMap, hitMap): Position  {
        var iterPos = new Position("A", 1);
        while(iterPos.row != "J" || iterPos.column != 10) {
            var positionString = iterPos.getString();
            if(!triedMap[positionString] && iterPos.hasTwoNeighbours(hitMap)){
                return iterPos;
            }
            iterPos = iterPos.getNextPosition();
        }
        var iterPos = new Position("A", 1);
        while(iterPos.row != "J" || iterPos.column != 10) {
            var positionString = iterPos.getString();
            if(!triedMap[positionString] && iterPos.hasOneNeighbour(hitMap)){
                return iterPos;
            }
            iterPos = iterPos.getNextPosition();
        }
        iterPos = pos;
        var positionString = iterPos.getString();
        while(triedMap[positionString]) {
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
    }
}