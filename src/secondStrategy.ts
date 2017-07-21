import {Position} from './position'
 
export class SecondStrategy {
    constructor() {}
    public getNextTarget(pos: Position, triedMap, hitMap): Position  {
        //var iterPos = pos.getNextPosition();
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
        iterPos = new Position("A", 1);
        var positionString = iterPos.getString();
        var passedTrough : number = 0;
        while(triedMap[positionString] && passedTrough <= 100) {
            passedTrough++;
            var nextColumn = iterPos.column + 1;
            var nextRowIndex = iterPos.row.charCodeAt(0) - 64 + 1;
            if(nextColumn === 11) {
                nextColumn = 1;
                nextRowIndex = (nextRowIndex + 2) % 10;
                if(nextRowIndex === 0) nextRowIndex = 10;
            }
            if(nextRowIndex === 11) {
                nextRowIndex = 1;
            }
            /*if(nextColumn === 12) {
                nextColumn = 1;
                nextRowIndex = (nextRowIndex + 1) % 10;
                if(nextRowIndex === 0) nextRowIndex = 10;
            }
            if(nextColumn === 13) {
                nextColumn = 2;
                nextRowIndex = (nextRowIndex + 1) % 10;
                if(nextRowIndex === 0) nextRowIndex = 10;
            }*/
            iterPos = new Position(Position.convertToChar(nextRowIndex), nextColumn);
            var positionString = iterPos.getString();  
        }
        return iterPos;
    }
}