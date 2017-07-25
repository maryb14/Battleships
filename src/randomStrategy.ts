import {Position} from './position'
import {Strategy} from './strategy'

type PositionDictionary = {[pos: string] : boolean}
 
export class RandomStrategy extends Strategy {
    public getNextTarget(pos: Position, triedMap: PositionDictionary, hitMap: PositionDictionary): Position  {
        //first shoot at position that have 2 neighbours already hit
        var nextPos: any = this.shootAtPositionsWith2HitNeighbours(triedMap, hitMap);
        if(nextPos) return nextPos;
        //secondly shoot at position which have one neighbour hit
        nextPos = this.shootAtPositionsWith1HitNeighbour(triedMap, hitMap);
        if(nextPos) return nextPos;
        return this.shootAtFirstAvailable(triedMap);
    }

    private shootAtFirstAvailable(triedMap: PositionDictionary){
        //lastly go through all the positions in the table and randomly choose one which is available
        var firstPos: Position = new Position("A", 1);
        if(!triedMap[firstPos.getString()]) {
            availablePos0.push(firstPos);
        }
        var iterPos = firstPos.getNextPosition();
        //array of available position with 0 neighbours tried
        var availablePos0 : Position[] = [];
        //array of available position with 1 neighbour tried
        var availablePos1 : Position[] = [];
        //array of available position with at least 2 neighbours tried
        var availablePos2 : Position[] = [];
        while(iterPos.row != firstPos.row || iterPos.column != firstPos.column) {
            if(!triedMap[iterPos.getString()]) {
                if(!iterPos.hasOneNeighbour(triedMap)) 
                    availablePos0.push(iterPos);
                else if(!iterPos.hasTwoNeighbours(triedMap))
                    availablePos1.push(iterPos);
                else availablePos2.push(iterPos);
            }
            iterPos = iterPos.getNextPosition();
        }
        //this strategy goes through the three arrays in order and randomly picks an available positions
        //from the first one that contains some positions
        if(availablePos0.length > 0) {
           return RandomStrategy.getRandomElementFromArray(availablePos0);
        }
        else if(availablePos1.length > 0) {
            return RandomStrategy.getRandomElementFromArray(availablePos1);
        }
        else {
            return RandomStrategy.getRandomElementFromArray(availablePos2);
        }
    }

    private static getRandomElementFromArray(someArray: any[]){
        var randomIndex = Math.floor(Math.random() * someArray.length);
        return someArray[randomIndex];
    }
}