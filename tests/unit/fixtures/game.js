import { merge } from "lodash";
export function startedGame(overrides = {}) {
  let defaultGame = {
    name: "Foo",
    players: [
      {
        name: "Jasper",
        hand: []
      },
      {
        name: "Forde",
        hand: []
      }
    ],
    rules: [],
    deck: [],
    discard: [],
    state: "started",
    activePlayer: 1,
    constantRules: { draw: 1, play: 1 },
    turn: { playsRemaining: 1 }
  };
  return merge(defaultGame, overrides);
}
