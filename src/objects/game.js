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
  game.activePlayer = 0;
  game.discard = [];
  game.players.forEach((player, index) => {
    game.players[index].hand = [];
  });
  // deal
  for (let index = 0; index < 3; index++) {
    game.players.forEach((player, index) => {
      dealCard(game, index);
    });
  }
  gameIsValid(game);
  return game;
}

// Validation
var ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}
export const gameValidator = ajv.compile(schema);

export function gameIsValid(game) {
  var valid = gameValidator(game);
  if (!valid) {
    // eslint-disable-next-line
    console.log(gameValidator.errors);
    throw new Error("Invalid game");
  }
}
export function playerHasKeepers(player, cards) {
  let { hand } = player;
  let keepers = hand
    .filter(card => card.type === "keeper")
    .map(card => card.title);
  let diff = _.difference(cards, keepers);
  return diff.length === 0;
}

export function checkForWinner(game) {
  let { goal } = game;
  if (!goal) return game;
  // Simple array of keepers needed
  if (_.isArray(goal.goal)) {
    game.players.forEach(player => {
      if (playerHasKeepers(player, goal.goal)) {
        game.state = "won";
        game.winner = player.name;
      }
    });
  }
  return game;
}
