import {Position} from './position'
 
export class BasicStrategy {
    constructor() {}
    public getNextTarget(pos: Position, triedMap, hitMap): Position  {
        return pos.getNextPosition();
    }
}