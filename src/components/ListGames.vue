<template>
  <div>
    <single-game v-for="game in games" :key="game.name" :game="game" />
  </div>
</template>

<script>
import { db } from "../db";
import SingleGame from "./ListGameSingle";
export default {
  data() {
    return {
      games: []
    };
  },
  firestore: {
    games: db.collection("games")
  },
  components: {
    SingleGame
  }
};
</script>

<style></style>
