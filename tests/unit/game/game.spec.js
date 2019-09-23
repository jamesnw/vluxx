import { newGame, startGame } from "@/objects/game";
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
    it("should add cards", () => {
      let { deck } = startGame({ players: [] });
      expect(deck).toEqual(expect.any(Array));
    });
    it("should set initial static values", () => {
      let game = startGame({ players: [] });
      game = _.pick(game, ["state", "constantRules", "turn", "activePlayer"]);
      expect(game).toMatchSnapshot();
    });
  });
});
