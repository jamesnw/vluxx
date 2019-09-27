# Contributing

Please contribute by making a pull request. Your pull request will run tests and a preview will be deployed.

## Changing play/rules

All game actions are functions that receive the game object, mutate the game object, and return the new game object. All functions have access to the entire game, so they can mutate all parts, from the rules to hands, in whatever way they choose.

Before returning, all game actions _must_ call `gameIsValid(game)`. This asserts that any changes within the game action did not break the game object.

## Source of truth

Firebase is considered the "source of truth" for the game. After changing the game, simply save it to firestore using the following, and all players will immediately be updated. Magic. ✨

```
import { db } from "@/db";
db.collection("games")
	.doc(this.game.id)
	.set(game);
```

# Todo

- Move to Vuex/Vuexfire
- Add real cards
- Ensure game is played on same build to prevent conflicting rules
- Only show active game
- Split game selector into separate view
- Add authentication
