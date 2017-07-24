import {getPlacement} from './placements'
import {SecondStrategy} from './secondStrategy'
import {Position} from './position'
import {BasicStrategy} from './basicStrategy'

export class MyBot {

    public getShipPositions() {
        var randomIndex = Math.floor(Math.random() * 4);
        return getPlacement(randomIndex);
    }

    public selectTarget(gamestate) {
        var hitMap : { [ pos: string] : boolean } = {};
        var triedMap : { [ pos: string] : boolean } = {};
        var previousShot = gamestate.MyShots && gamestate.MyShots[gamestate.MyShots.length-1];
        if(previousShot) {
            hitMap = this.getHitMap(gamestate.MyShots);
            triedMap = this.getTriedMap(gamestate.MyShots);
            for(var i = 0; i < gamestate.MyShots.length; ++i) {
                var pos = new Position(gamestate.MyShots[i].Position.Row, gamestate.MyShots[i].Position.Column);
                var posString = pos.getString();
                triedMap = this.tryToMatchMoreAsTried(pos, triedMap, hitMap);
            }
            var strategy = new SecondStrategy();
            //var strategy = new BasicStrategy();
            var nextPos = strategy.getNextTarget(pos, triedMap, hitMap);
            return {Row: nextPos.row, Column: nextPos.column };
        }
        return { Row: "A", Column: 1 };  
    }

    private getHitMap(shots): { [ pos: string] : boolean } {
        var hitMap : { [ pos: string] : boolean } = {};
        for(var i = 0; i < shots.length; ++i) {
            var pos = new Position(shots[i].Position.Row, shots[i].Position.Column);
            var posString = pos.getString();
            if(shots[i].Washit) hitMap[posString] = true;
        }
        return hitMap;
    }

    private getTriedMap(shots): { [ pos: string] : boolean } {
        var triedMap : { [ pos: string] : boolean } = {};
        for(var i = 0; i < shots.length; ++i) {
            var pos = new Position(shots[i].Position.Row, shots[i].Position.Column);
            var posString = pos.getString();
            triedMap[posString] = true;
        }
        return triedMap;
    }


    //function which marks as tried (but not hits) the squares around two consecutive squares that we hit
    private tryToMatchMoreAsTried(pos: Position, triedMap: { [ pos: string] : boolean }, hitMap: { [ pos: string] : boolean }) : { [ pos: string] : boolean } {
        var upPos = pos.getUpPosition();
        var upString = (upPos) ? (upPos.getString()) : "";
        var downPos = pos.getDownPosition();
        var downString = (downPos) ? (downPos.getString()) : "";
        var leftPos = pos.getLeftPosition();
        var leftString = (leftPos) ? (leftPos.getString()) : "";
        var rightPos = pos.getRightPosition();
        var rightString = ((rightPos) ? (rightPos.getString()) : "");
        var thisString = pos.getString();
        if(hitMap[thisString] && hitMap[upString]) {
            triedMap = this.markLeftRight(pos, triedMap);
            triedMap = this.markLeftRight(upPos, triedMap);
            triedMap = this.markDiagonal(pos, triedMap);
            triedMap = this.markDiagonal(upPos, triedMap);
        }
        if(hitMap[thisString] && hitMap[downString]) {
            triedMap = this.markLeftRight(pos, triedMap);
            triedMap = this.markLeftRight(downPos, triedMap);
            triedMap = this.markDiagonal(pos, triedMap);
            triedMap = this.markDiagonal(downPos, triedMap);
        }
        if(hitMap[thisString] && hitMap[leftString]) {
            triedMap = this.markUpDown(pos, triedMap);
            triedMap = this.markUpDown(leftPos, triedMap);
            triedMap = this.markDiagonal(pos, triedMap);
            triedMap = this.markDiagonal(leftPos, triedMap);
        }
        if(hitMap[thisString] && hitMap[rightString]) {
            triedMap = this.markUpDown(pos, triedMap);
            triedMap = this.markUpDown(rightPos, triedMap);
            triedMap = this.markDiagonal(pos, triedMap);
            triedMap = this.markDiagonal(rightPos, triedMap);
        }
        return triedMap;
    }

    private markLeftRight(pos, triedMap: { [ pos: string] : boolean }) : { [ pos: string] : boolean }{
        var leftPos = pos.getLeftPosition();
        var leftString = (leftPos) ? (leftPos.getString()) : "";
        var rightPos = pos.getRightPosition();
        var rightString = ((rightPos) ? (rightPos.getString()) : "");
        if(leftString && leftString != "") {
            triedMap[leftString] = true;
        }
        if(rightString && rightString != "") {
            triedMap[rightString] = true;
        }
        return triedMap;
    }

    private markUpDown(pos, triedMap: { [ pos: string] : boolean }): { [ pos: string] : boolean }{
        var upPos = pos.getUpPosition();
        var upString = (upPos) ? (upPos.getString()) : "";
        var downPos = pos.getDownPosition();
        var downString = (downPos) ? (downPos.getString()) : "";
        if(upString && upString != "") {
            triedMap[upString] = true;
        }
        if(downString && downString != "") {
            triedMap[downString] = true;
        }
        return triedMap;
    }

    private markDiagonal(pos, triedMap: { [ pos: string] : boolean }) : { [ pos: string] : boolean } {
        var diagonalPositions: Position[] = pos.getDiagonalPositions();
        for(var i = 0; i < diagonalPositions.length; ++i){
            if(diagonalPositions[i]) {
                triedMap[diagonalPositions[i].getString()] = true;
            }
        }
        return triedMap;
    }
}

