import { cards } from "./cards";
import { dealCard } from "./player";
import _ from "lodash";

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
  game.turn = {};
  // deal
  for (let index = 0; index < 3; index++) {
    game.players.forEach((player, index) => {
      dealCard(game, index);
    });
  }
  game.activePlayer = 0;
  return game;
}
