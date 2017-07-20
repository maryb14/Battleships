import * as express from 'express';
import * as bodyParser from 'body-parser';
import {MyBot} from './src/my-bot';

export class Router {
    public static route(): void {
        let app = express();
        let myBot = new MyBot();

        app.set('port', (process.env.PORT || 5000));
        app.use(express.static(__dirname + '/public'));
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());

        app.get('/GetShipPositions', (req, res) => {
            let positions = myBot.getShipPositions();
            res.send(positions);
        });

        app.post('/SelectTarget', (req, res) => {
            let target = myBot.selectTarget(req.body);
            res.send(target);
        });

        app.listen(app.get('port'), () => {
            console.log("Node app is running at localhost:" + app.get('port'));
        });

        var gameState = {
               "GameCount": 1,
               "ShipPositions":[
                  {
                     "StartingSquare":{
                        "Row":"A",
                        "Column":1
                     },
                     "EndingSquare":{
                        "Row":"A",
                        "Column":5
                     }
                  },
                  {
                     "StartingSquare":{
                        "Row":"C",
                        "Column":1
                     },
                     "EndingSquare":{
                        "Row":"C",
                        "Column":4
                     }
                  },
                  {
                     "StartingSquare":{
                        "Row":"E",
                        "Column":1
                     },
                     "EndingSquare":{
                        "Row":"E",
                        "Column":3
                     }
                  },
                  {
                     "StartingSquare":{
                        "Row":"G",
                        "Column":1
                     },
                     "EndingSquare":{
                        "Row":"G",
                        "Column":3
                     }
                  },
                  {
                     "StartingSquare":{
                        "Row":"I",
                        "Column":1
                     },
                     "EndingSquare":{
                        "Row":"I",
                        "Column":2
                     }
                  }
               ],
               "MyShots":[
                  {
                     "Position":{
                        "Row":"A",
                        "Column":1
                     },
                     "WasHit":true
                  }
               ],
               "OpponentsShots":[
                  {
                     "Position":{
                        "Row":"A",
                        "Column":1
                     },
                     "WasHit":null
                  }
               ]
            }
        myBot.selectTarget(gameState);
    }
}

Router.route();