import { cards } from "./cards";
import { dealCard } from "./player";
import schema from "./gameSchema.json";
import _ from "lodash";
import Ajv from "ajv";

export function newGame(name) {
  return {
    name: name,
    players: [],
    rules: []
  };
}

export function startGame(game) {
  game.deck = _.shuffle(cards);
  game.state = "started";
  game.constantRules = {
    draw: 1,
    play: 1
  };
  game.turn = { playsRemaining: 0 };
  // deal
  for (let index = 0; index < 3; index++) {
    game.players.forEach((player, index) => {
      dealCard(game, index);
    });
  }
  game.activePlayer = 0;
  gameIsValid(game);
  return game;
}
var ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}
export const gameValidator = ajv.compile(schema);

export function gameIsValid(game) {
  var valid = gameValidator(game);
  if (!valid) {
    throw new Error("Invalid game", gameValidator.errors);
  }
}
