import {Position} from './position'
import {Strategy} from './strategy'

type PositionDictionary = {[pos: string] : boolean}
 
export class SecondStrategy extends Strategy {
    public getNextTarget(pos: Position, triedMap: PositionDictionary, hitMap: PositionDictionary): Position  {
        //first shoot at position that have 2 neighbours already hit
        var nextPos: any = this.shootAtPositionsWith2HitNeighbours(triedMap, hitMap);
        if(nextPos) return nextPos;
        //secondly shoot at position which have one neighbour hit
        nextPos = this.shootAtPositionsWith1HitNeighbour(triedMap, hitMap);
        if(nextPos) return nextPos;
        //lastly go through all the positions in the table and shoot the first one which is available
        return this.shootAtFirstAvailable(triedMap, hitMap);
    }

    private shootAtFirstAvailable(triedMap: PositionDictionary, hitMap: PositionDictionary){
        var hitSoFar = Object.keys(hitMap).length;
        //if we hit almost all of the boats, jump 1 column at a time,
        //otherwise, jump 2 columns
        if(hitSoFar >= 13) {
            return this.chooseFirstJump2Columns(triedMap);
        }
        else {
            return this.chooseFirstJump3Columns(triedMap);
        }
    }

    private chooseFirstJump2Columns(triedMap: PositionDictionary): Position {
        var iterPos: Position = new Position("A", 1);
        var positionString = iterPos.getString();
        var passedTrough : number = 0;
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

    private chooseFirstJump3Columns(triedMap: PositionDictionary): Position {
        var iterPos: Position = new Position("A", 1);
        var positionString = iterPos.getString();
        var passedTrough : number = 0;
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
    }
}