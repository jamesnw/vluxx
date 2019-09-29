import { gameIsValid, checkForWinner } from "./game";
const TYPES = {
  GOAL: "goal",
  RULE: "rule",
  KEEPER: "keeper"
};
export const cards = [
  {
    title: "Chocolate Chip Cookie",
    type: TYPES.GOAL,
    goal: ["Chocolate", "Cookie"]
  },
  { title: "Bedtime snack", type: TYPES.GOAL, goal: ["Milk", "Cookie"] },
  { title: "Chocolate Stout", type: TYPES.GOAL, goal: ["Chocolate", "Beer"] },
  {
    title: "Chocolate covered pretzel",
    type: TYPES.GOAL,
    goal: ["Chocoloate", "Pretzel"]
  },
  { title: "Orange Julius", type: TYPES.GOAL, goal: ["Milk", "Orange"] },
  {
    title: "Just Missing Vodka",
    type: TYPES.GOAL,
    goal: ["Screwdriver", "Orange"]
  },
  { title: "Tools", type: TYPES.GOAL, goal: ["Hammer", "Screwdriver"] },

  { title: "Chocolate", type: TYPES.KEEPER },
  { title: "Cookie", type: TYPES.KEEPER },
  { title: "Milk", type: TYPES.KEEPER },
  { title: "Beer", type: TYPES.KEEPER },
  { title: "Orange", type: TYPES.KEEPER },
  { title: "Book", type: TYPES.KEEPER },
  { title: "Pretzel", type: TYPES.KEEPER },
  { title: "Hammer", type: TYPES.KEEPER },
  { title: "Screwdriver", type: TYPES.KEEPER },
  { title: "Milk7", type: TYPES.KEEPER },
  { title: "Milk8", type: TYPES.KEEPER },
  { title: "Milk9", type: TYPES.KEEPER },
  { title: "Milk0", type: TYPES.KEEPER },
  { title: "Milk12", type: TYPES.KEEPER },
  { title: "Milk23", type: TYPES.KEEPER },
  { title: "Milk24", type: TYPES.KEEPER },
  { title: "Milk35", type: TYPES.KEEPER },

  { title: "Draw 2", type: TYPES.RULE, rule: { category: "Draw", amount: 2 } },
  { title: "Draw 3", type: TYPES.RULE, rule: { category: "Draw", amount: 3 } },
  { title: "Draw 4", type: TYPES.RULE, rule: { category: "Draw", amount: 4 } },
  { title: "Draw 5", type: TYPES.RULE, rule: { category: "Draw", amount: 5 } },
  { title: "Play 2", type: TYPES.RULE, rule: { category: "Play", amount: 2 } },
  { title: "Play 3", type: TYPES.RULE, rule: { category: "Play", amount: 3 } },
  { title: "Play 4", type: TYPES.RULE, rule: { category: "Play", amount: 4 } },
  { title: "Play 5", type: TYPES.RULE, rule: { category: "Play", amount: 5 } }
];

export function applyCard(game, card) {
  switch (card.type) {
    case TYPES.GOAL:
      game.goal = card;
      break;
    case TYPES.KEEPER:
      var player = game.players[game.activePlayer];
      player.keepers = player.keepers || [];
      player.keepers.push(card);
      game.players[game.activePlayer] = player;
      break;
    case TYPES.RULE:
      var rule = card.rule;
      if (rule.category === "Draw") game.constantRules.draw = rule.amount;
      else if (rule.category === "Play") game.constantRules.play = rule.amount;
      break;

    default:
      break;
  }
  game = checkForWinner(game);
  gameIsValid(game);
  return game;
}
