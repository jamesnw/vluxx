# vluxx

## Changing play/rules

All game actions are functions that receive the game object, mutate the game object, and return the new game object. All functions have access to the entire game, so they can mutate all parts, from the rules to hands, in whatever way they choose.

Before returning, all game actions _must_ call `gameIsValid(game)`. This asserts that any changes within the game action did not break the game object.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
