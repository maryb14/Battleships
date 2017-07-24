import {Position} from './position'
 
export class RandomStrategy {
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
        //lastly go through all the positions in the table and randomly choose one which is available
        var firstPos: Position = new Position("A", 1);
        if(!triedMap[firstPos.getString()]) {
            availablePos0.push(firstPos);
        }
        iterPos = firstPos.getNextPosition();
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
            var randomIndex = Math.floor(Math.random() * availablePos0.length);
            return availablePos0[randomIndex];
        }
        else if(availablePos1.length > 0) {
            var randomIndex = Math.floor(Math.random() * availablePos1.length);
            return availablePos1[randomIndex];
        }
        else {
            var randomIndex = Math.floor(Math.random() * availablePos2.length);
            return availablePos2[randomIndex];
        }
    }
}