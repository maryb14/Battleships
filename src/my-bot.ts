import {getPlacement} from './placements'
import {SecondStrategy} from './secondStrategy'
import {Position} from './position'
import {BasicStrategy} from './basicStrategy'

export class MyBot {

    public hitMap : { [ pos: string] : boolean } = {};

    public triedMap : { [ pos: string] : boolean } = {};

    public getShipPositions() {
        var randomIndex = Math.floor(Math.random() * 4);
        return getPlacement(randomIndex);
    }

    public selectTarget(gamestate) {
        var previousShot = gamestate.MyShots && gamestate.MyShots[gamestate.MyShots.length-1];
        if(previousShot) {
            var pos = new Position(previousShot.Position.Row, previousShot.Position.Column);
            var posString = pos.getString();
            this.triedMap[posString] = true;
            if(previousShot.WasHit) {
                this.hitMap[posString] = true;
                this.tryToMatchMoreAsTried(pos);
            }
            var strategy = new SecondStrategy();
            //var strategy = new BasicStrategy();
            var nextPos = strategy.getNextTarget(pos, this.triedMap, this.hitMap);
            return {Row: nextPos.row, Column: nextPos.column };
        }
        return { Row: "A", Column: 1 };  
    }


    //function which marks as tried (but not hits) the squares around two consecutive squares that we hit
    private tryToMatchMoreAsTried(pos: Position) {
        var upPos = pos.getUpPosition();
        var upString = (upPos) ? (upPos.getString()) : "";
        var downPos = pos.getDownPosition();
        var downString = (downPos) ? (downPos.getString()) : "";
        var leftPos = pos.getLeftPosition();
        var leftString = (leftPos) ? (leftPos.getString()) : "";
        var rightPos = pos.getRightPosition();
        var rightString = ((rightPos) ? (rightPos.getString()) : "");
        var thisString = pos.getString();
        if(this.hitMap[thisString] && this.hitMap[upString]) {
            this.markLeftRight(pos);
            this.markLeftRight(upPos);
            this.markDiagonal(pos);
            this.markDiagonal(upPos);
        }
        if(this.hitMap[thisString] && this.hitMap[downString]) {
            this.markLeftRight(pos);
            this.markLeftRight(downPos);
            this.markDiagonal(pos);
            this.markDiagonal(downPos);
        }
        if(this.hitMap[thisString] && this.hitMap[leftString]) {
            this.markUpDown(pos);
            this.markUpDown(leftPos);
            this.markDiagonal(pos);
            this.markDiagonal(leftPos);
        }
        if(this.hitMap[thisString] && this.hitMap[rightString]) {
            this.markUpDown(pos);
            this.markUpDown(rightPos);
            this.markDiagonal(pos);
            this.markDiagonal(rightPos);
        }
    }

    private markLeftRight(pos){
        var leftPos = pos.getLeftPosition();
        var leftString = (leftPos) ? (leftPos.getString()) : "";
        var rightPos = pos.getRightPosition();
        var rightString = ((rightPos) ? (rightPos.getString()) : "");
        if(leftString && leftString != "") {
            this.triedMap[leftString] = true;
        }
        if(rightString && rightString != "") {
            this.triedMap[rightString] = true;
        }
    }

    private markUpDown(pos){
        var upPos = pos.getUpPosition();
        var upString = (upPos) ? (upPos.getString()) : "";
        var downPos = pos.getDownPosition();
        var downString = (downPos) ? (downPos.getString()) : "";
        if(upString && upString != "") {
            this.triedMap[upString] = true;
        }
        if(downString && downString != "") {
            this.triedMap[downString] = true;
        }
    }

    private markDiagonal(pos) {
        var diagonalPositions: Position[] = pos.getDiagonalPositions();
        for(var i = 0; i < diagonalPositions.length; ++i){
            if(diagonalPositions[i]) {
                this.triedMap[diagonalPositions[i].getString()] = true;
            }
        }
    }
}

