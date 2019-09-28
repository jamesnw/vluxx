import { dealCard, playCard, startTurn, endTurn } from "@/objects/player";
import * as gameObject from "@/objects/game";
describe("player", () => {
  let game;
  beforeEach(() => {
    game = {
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
  });
  describe("dealCard", () => {
    let active;
    beforeEach(() => {
      active = 1;
      game.activePlayer = active;
      game.deck = [
        { title: "Foo", type: "draw" },
        { title: "Bar", type: "draw" }
      ];
    });
    it("should deal to activePlayer by default", () => {
      game = dealCard(game);
      expect(game.players[active].hand[0].title).toBe("Foo");
    });
    it("should deal to player at index if set", () => {
      game = dealCard(game, 0);
      expect(game.players[0].hand[0].title).toBe("Foo");
    });
    it("should remove the card from the deck", () => {
      expect(game.deck).toHaveLength(2);
      game = dealCard(game);
      expect(game.deck).toHaveLength(1);
    });
    it("should check game validity", () => {
      let gameIsValid = jest.spyOn(gameObject, "gameIsValid");
      dealCard(game);
      expect(gameIsValid).toHaveBeenCalled();
    });
    it.skip("should reshuffle if none left", () => {});
  });
  describe("playCard", () => {
    let active;
    let card;
    beforeEach(() => {
      active = 1;
      game.activePlayer = active;
      card = { title: "Foo", type: "draw" };
      game.players[active].hand = [card];
    });
    it("should add card to discard", () => {
      game = playCard(game, card);
      expect(game.discard).toHaveLength(1);
      expect(game.discard[0]).toBe(card);
    });
    it("should remove card from player's hand", () => {
      game = playCard(game, card);
      expect(game.players[active].hand).toHaveLength(0);
    });
    it.skip("should decrement plays remaining", () => {});
    it.skip("should apply card", () => {});
    it("should check game validity", () => {
      let gameIsValid = jest.spyOn(gameObject, "gameIsValid");
      dealCard(game);
      expect(gameIsValid).toHaveBeenCalled();
    });
  });
  describe("startTurn", () => {
    let active;
    beforeEach(() => {
      active = 1;
      game.activePlayer = active;
      game.deck = [
        { title: "Foo", type: "draw" },
        { title: "Bar", type: "draw" }
      ];
    });
    it("should deal 1 card if draw is 1", () => {
      game = startTurn(game);
      expect(game.players[active].hand).toHaveLength(1);
    });
    it("should deal 2 card if draw is 2", () => {
      game.constantRules.draw = 2;
      game = startTurn(game);
      expect(game.players[active].hand).toHaveLength(2);
    });
    it("should set plays remaining to number in rules", () => {
      game.constantRules.play = 12;
      game = startTurn(game);
      expect(game.turn.playsRemaining).toBe(12);
    });
    it("should check game validity", () => {
      let gameIsValid = jest.spyOn(gameObject, "gameIsValid");
      dealCard(game);
      expect(gameIsValid).toHaveBeenCalled();
    });
  });
  describe("endTurn", () => {
    let active;
    beforeEach(() => {
      active = 1;
      game.activePlayer = active;
      game.deck = [
        { title: "Foo", type: "draw" },
        { title: "Bar", type: "draw" }
      ];
      game = startTurn(game);
    });
    it("should reset the turn", () => {
      game = endTurn(game);
      expect(game.turn.playsRemaining).toBe(null);
    });
    it("should move to the next activePlayer", () => {
      game = endTurn(game);
      expect(game.activePlayer).toBe(0);
      game = endTurn(game);
      expect(game.activePlayer).toBe(1);
    });
    it("should check game validity", () => {
      let gameIsValid = jest.spyOn(gameObject, "gameIsValid");
      dealCard(game);
      expect(gameIsValid).toHaveBeenCalled();
    });
  });
});
