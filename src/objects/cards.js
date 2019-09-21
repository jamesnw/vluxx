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
  { title: "Bedtime snack 1", type: TYPES.GOAL, goal: ["Milk", "Cookie"] },
  { title: "Bedtime snack 2", type: TYPES.GOAL, goal: ["Milk", "Cookie"] },
  { title: "Bedtime snack 3", type: TYPES.GOAL, goal: ["Milk", "Cookie"] },
  { title: "Bedtime snack 4", type: TYPES.GOAL, goal: ["Milk", "Cookie"] },
  { title: "Bedtime snack 5", type: TYPES.GOAL, goal: ["Milk", "Cookie"] },

  { title: "Chocolate", type: TYPES.KEEPER },
  { title: "Cookie", type: TYPES.KEEPER },
  { title: "Milk", type: TYPES.KEEPER },
  { title: "Milk 1", type: TYPES.KEEPER },
  { title: "Milk2", type: TYPES.KEEPER },
  { title: "Milk3", type: TYPES.KEEPER },
  { title: "Milk4", type: TYPES.KEEPER },
  { title: "Milk5", type: TYPES.KEEPER },
  { title: "Milk6", type: TYPES.KEEPER },
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
  return game;
}
