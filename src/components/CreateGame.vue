<template>
  <div>
    <h2>Create Game</h2>
    <label>Name:</label>
    <input v-model="name" />
    <button @click="create" :disabled="!name">Create</button>
  </div>
</template>

<script>
import { db } from "../db";
import { newGame } from "@/objects/game";
export default {
  name: "CreateGame",
  data() {
    return {
      name: ""
    };
  },
  methods: {
    create() {
      let game = newGame(this.name);
      db.collection("games").add(game);
    }
  }
};
</script>

<style></style>
