import { applyCard } from "@/objects/cards";
import { startedGame } from "../fixtures/game";
import * as gameObject from "@/objects/game";

describe("cards", () => {
  let game;
  beforeEach(() => {
    game = startedGame();
  });
  describe("applyCard", () => {
    it("should set goal", () => {
      let card = {
        title: "Tools",
        type: "goal",
        goal: ["Hammer", "Screwdriver"]
      };
      game = applyCard(game, card);
      expect(game.goal).toEqual(card);
      expect(game).toMatchSnapshot();
    });
    it("should add keeper to player's keeper pile", () => {
      let card = { title: "Chocolate", type: "keeper" };
      game = applyCard(game, card);
      expect(game.players[1].keepers[0]).toEqual(card);
      expect(game).toMatchSnapshot();
    });
    describe("rules", () => {
      it("should apply new draw rule", () => {
        let card = {
          title: "Draw 2",
          type: "rule",
          rule: { category: "Draw", amount: 2 }
        };
        game = applyCard(game, card);
        expect(game.constantRules.draw).toEqual(2);
        expect(game).toMatchSnapshot();
      });
      it("should apply new play rule", () => {
        let card = {
          title: "Play 2",
          type: "rule",
          rule: { category: "Play", amount: 2 }
        };
        game = applyCard(game, card);
        expect(game.constantRules.play).toEqual(2);
        expect(game).toMatchSnapshot();
      });
    });
    it("should check game validity", () => {
      let gameIsValid = jest.spyOn(gameObject, "gameIsValid");
      applyCard(game, { type: "foo" });
      expect(gameIsValid).toHaveBeenCalled();
    });
    it("should check for winner", () => {
      let checkForWinner = jest.spyOn(gameObject, "checkForWinner");
      applyCard(game, { type: "foo" });
      expect(checkForWinner).toHaveBeenCalled();
    });
  });
});
