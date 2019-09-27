import {
  newGame,
  startGame,
  checkForWinner,
  playerHasKeepers
} from "@/objects/game";
import _ from "lodash";
describe("game", () => {
  describe("newGame", () => {
    it("should create basic structure", () => {
      expect(newGame("foo")).toMatchSnapshot();
    });
    it("should add game name", () => {
      const nameToUse = "Foo";
      let { name } = newGame(nameToUse);
      expect(name).toEqual(nameToUse);
    });
  });
  describe("startGame", () => {
    let initialGame;
    beforeEach(() => {
      initialGame = {
        name: "Foo",
        players: [],
        rules: [],
        discard: []
      };
    });
    it("should add cards", () => {
      let { deck } = startGame(initialGame);
      expect(deck).toEqual(expect.any(Array));
    });
    it("should set initial static values", () => {
      let game = startGame(initialGame);
      game = _.pick(game, ["state", "constantRules", "turn", "activePlayer"]);
      expect(game).toMatchSnapshot();
    });
  });
  describe("checkForWinner", () => {
    let initialGame;
    beforeEach(() => {
      initialGame = {
        name: "Foo",
        players: [],
        rules: [],
        discard: [],
        state: "started"
      };
    });
    it("should return game with no changes if no goal", () => {
      let game = checkForWinner(initialGame);
      expect(game).toBe(initialGame);
    });
    it("should return game with no changes if goal not met", () => {
      initialGame.goal = {
        title: "Bedtime snack",
        type: "goal",
        goal: ["Milk", "Cookie"]
      };
      let game = checkForWinner(initialGame);
      expect(game.state).toEqual("started");
      expect(game).toBe(initialGame);
    });
    it("should return game with winner if won", () => {
      initialGame.goal = {
        title: "Bedtime snack",
        type: "goal",
        goal: ["Milk", "Cookie"]
      };
      initialGame.players = [
        {
          name: "Sage",
          hand: [
            { title: "Milk", type: "keeper" },
            { title: "Cookie", type: "keeper" }
          ]
        },
        {
          name: "Jasper",
          hand: [
            { title: "Chocolate", type: "keeper" },
            { title: "Cookie", type: "keeper" }
          ]
        }
      ];
      let game = checkForWinner(initialGame);
      expect(game.state).toEqual("won");
      expect(game.winner).toEqual("Sage");
      expect(game).toBe(initialGame);
    });
  });
  describe("playerHasCards", () => {
    let player;
    beforeEach(() => {
      player = {
        name: "Sage",
        hand: [
          { title: "Milk", type: "keeper" },
          { title: "Cookie", type: "keeper" }
        ]
      };
    });
    it("should be true if player has 1 card", () => {
      expect(playerHasKeepers(player, ["Milk"])).toBe(true);
    });
    it("should be true if player has multiple cards", () => {
      expect(playerHasKeepers(player, ["Milk", "Cookie"])).toBe(true);
    });
    it("should be true if player has multiple cards in different order", () => {
      expect(playerHasKeepers(player, ["Cookie", "Milk"])).toBe(true);
    });
    it("should be false if player has no specified cards", () => {
      expect(playerHasKeepers(player, ["Fridge", "Spaceship"])).toBe(false);
    });
    it("should be false if player has 1 of multiple specified cards", () => {
      expect(playerHasKeepers(player, ["Milk", "Spaceship"])).toBe(false);
    });
  });
});
