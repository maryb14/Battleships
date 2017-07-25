import {getPlacement} from './placements'
import {SecondStrategy} from './secondStrategy'
import {Position} from './position'
import {BasicStrategy} from './basicStrategy'
import {RandomStrategy} from './randomStrategy'
type PositionDictionary = {[pos: string] : boolean}

export class MyBot {

    public getShipPositions() {
        var randomIndex: number = Math.floor(Math.random() * 4);
        return getPlacement(randomIndex);
    }

    public selectTarget(gamestate) {
        var hitMap : PositionDictionary = {};
        var triedMap : PositionDictionary = {};
        var previousShot = gamestate.MyShots && gamestate.MyShots[gamestate.MyShots.length-1];
        if(previousShot) {
            hitMap = this.getHitMap(gamestate.MyShots);
            triedMap = this.getTriedMap(gamestate.MyShots);
            for(var i = 0; i < gamestate.MyShots.length; ++i) {
                var pos = new Position(gamestate.MyShots[i].Position.Row, gamestate.MyShots[i].Position.Column);
                var posString = pos.getString();
                triedMap = this.tryToMatchMoreAsTried(pos, triedMap, hitMap);
            }
            var strategy = new RandomStrategy();
            var nextPos = strategy.getNextTarget(pos, triedMap, hitMap);
            return {Row: nextPos.row, Column: nextPos.column };
        }
        return { Row: "A", Column: 1 };  
    }

    private getHitMap(shots): PositionDictionary {
        var hitMap : PositionDictionary = {};
        for(var i = 0; i < shots.length; ++i) {
            var pos = new Position(shots[i].Position.Row, shots[i].Position.Column);
            var posString = pos.getString();
            if(shots[i].WasHit) hitMap[posString] = true;
        }
        return hitMap;
    }

    private getTriedMap(shots): PositionDictionary {
        var triedMap : PositionDictionary = {};
        for(var i = 0; i < shots.length; ++i) {
            var pos = new Position(shots[i].Position.Row, shots[i].Position.Column);
            var posString = pos.getString();
            triedMap[posString] = true;
        }
        return triedMap;
    }

    //function which marks as tried (but not hits) the squares around two consecutive squares that we hit
    private tryToMatchMoreAsTried(pos: Position, triedMap: PositionDictionary, hitMap: PositionDictionary) : PositionDictionary {
        var upPos = pos.getUpPosition();
        var upString = Position.getStringWithUndefined(upPos);
        var downPos = pos.getDownPosition();
        var downString = Position.getStringWithUndefined(downPos);
        var leftPos = pos.getLeftPosition();
        var leftString = Position.getStringWithUndefined(leftPos);
        var rightPos = pos.getRightPosition();
        var rightString = Position.getStringWithUndefined(rightPos);
        var thisString = pos.getString();
        if(hitMap[thisString] && hitMap[upString]) {
            triedMap = this.markLeftRightDiagonal(pos, upPos, triedMap);
        }
        if(hitMap[thisString] && hitMap[downString]) {
           triedMap = this.markLeftRightDiagonal(pos, downPos, triedMap);
        }
        if(hitMap[thisString] && hitMap[leftString]) {
            triedMap = this.markUpDownDiagonal(pos, leftPos, triedMap);
        }
        if(hitMap[thisString] && hitMap[rightString]) {
            triedMap = this.markUpDownDiagonal(pos, rightPos, triedMap);
        }
        return triedMap;
    }

    private markLeftRightDiagonal(pos: Position, otherPos: Position, triedMap: PositionDictionary): PositionDictionary {
        triedMap = this.markLeftRight(pos, triedMap);
        triedMap = this.markLeftRight(otherPos, triedMap);
        triedMap = this.markDiagonal(pos, triedMap);
        triedMap = this.markDiagonal(otherPos, triedMap);
        return triedMap;
    }
    private markUpDownDiagonal(pos: Position, otherPos: Position, triedMap: PositionDictionary): PositionDictionary {
        triedMap = this.markUpDown(pos, triedMap);
        triedMap = this.markUpDown(otherPos, triedMap);
        triedMap = this.markDiagonal(pos, triedMap);
        triedMap = this.markDiagonal(otherPos, triedMap);
        return triedMap;
    }

    private markLeftRight(pos: Position, triedMap: PositionDictionary) : PositionDictionary{
        var leftString = Position.getStringWithUndefined(pos.getLeftPosition());
        var rightString = Position.getStringWithUndefined(pos.getRightPosition());
        if(leftString && leftString != "") {
            triedMap[leftString] = true;
        }
        if(rightString && rightString != "") {
            triedMap[rightString] = true;
        }
        return triedMap;
    }

    private markUpDown(pos: Position, triedMap: PositionDictionary): PositionDictionary{
        var upString = Position.getStringWithUndefined(pos.getUpPosition());
        var downString = Position.getStringWithUndefined(pos.getDownPosition());
        if(upString && upString != "") {
            triedMap[upString] = true;
        }
        if(downString && downString != "") {
            triedMap[downString] = true;
        }
        return triedMap;
    }

    private markDiagonal(pos: Position, triedMap: PositionDictionary) : PositionDictionary {
        var diagonalPositions: Position[] = pos.getDiagonalPositions();
        for(var i = 0; i < diagonalPositions.length; ++i){
            if(diagonalPositions[i]) {
                triedMap[diagonalPositions[i].getString()] = true;
            }
        }
        return triedMap;
    }
}

