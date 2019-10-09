<template>
  <div>
    <h2>Create Game</h2>
    <v-text-field label="Game name" v-model="name" />
    <v-btn rounded color="primary" dark @click="create" :disabled="!name"
      >Create</v-btn
    >
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
