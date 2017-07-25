import {Position} from './position'

type PositionDictionary = { [pos: string]: boolean }

export class BasicStrategy {
    public getNextTarget(pos: Position, triedMap: PositionDictionary, hitMap: PositionDictionary): Position  {
        return pos.getNextPosition();
    }
}