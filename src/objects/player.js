import _ from "lodash";
import { applyCard } from "./cards";
import { gameIsValid } from "./game";

export function dealCard(game, index) {
  index = index === undefined ? game.activePlayer : index;
  const card = game.deck.shift();
  game.players[index].hand = game.players[index].hand || [];
  game.players[index].hand.push(card);
  gameIsValid(game);
  return game;
}

export function playCard(game, card) {
  game.discard = game.discard || [];
  game.discard.push(card);
  let hand = game.players[game.activePlayer].hand;
  _.remove(hand, { title: card.title });
  game.players[game.activePlayer].hand = hand;
  game.turn.playsRemaining = game.turn.playsRemaining - 1;
  game = applyCard(game, card);
  gameIsValid(game);
  return game;
}

export function startTurn(game) {
  const cardsToDraw = game.constantRules.draw;
  for (let index = 0; index < cardsToDraw; index++) {
    game = dealCard(game);
  }
  game.turn = {
    playsRemaining: game.constantRules.play
  };
  gameIsValid(game);
  return game;
}

export function endTurn(game) {
  game.turn = { playsRemaining: null };
  game.activePlayer = (game.activePlayer + 1) % game.players.length;
  gameIsValid(game);
  return game;
}
