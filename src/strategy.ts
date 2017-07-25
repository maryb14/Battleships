import {Position} from './position'

type PositionDictionary = { [pos: string]: boolean }

export class Strategy {
    public shootAtPositionsWith2HitNeighbours(triedMap: PositionDictionary, hitMap: PositionDictionary): any{
        var iterPos = new Position("A", 1);
        while(iterPos.row != "J" || iterPos.column != 10) {
            var positionString = iterPos.getString();
            if(!triedMap[positionString] && iterPos.hasTwoNeighbours(hitMap)){
                return iterPos;
            }
            iterPos = iterPos.getNextPosition();
        }
        return undefined;
    }
    
    public shootAtPositionsWith1HitNeighbour(triedMap: PositionDictionary, hitMap: PositionDictionary): any {
        var iterPos = new Position("A", 1);
        while(iterPos.row != "J" || iterPos.column != 10) {
            var positionString = iterPos.getString();
            if(!triedMap[positionString] && iterPos.hasOneNeighbour(hitMap)){
                return iterPos;
            }
            iterPos = iterPos.getNextPosition();
        }
        return undefined;
    }
}