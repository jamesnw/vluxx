<template>
  <div>
    {{ name }}: {{ playerCount }}
    <v-btn color="primary" dark @click="join" :disabled="disableJoin"
      >Join</v-btn
    >
    <v-btn color="primary" dark @click="deleteGame">Delete</v-btn>
    <div v-if="game.state === 'started'">
      <ActiveGame :game="game" />
    </div>
    <v-btn color="primary" dark @click="start" v-else>Start</v-btn>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { db } from "../db";
import { startGame } from "../objects/game";
import ActiveGame from "./ActiveGame";
export default {
  props: ["game"],
  computed: {
    ...mapState({ user: "name" }),
    name() {
      return this.game.name || "Undefined";
    },
    playerCount() {
      return this.game.players ? this.game.players.length : 0;
    },
    playerNames() {
      if (!this.game.players) return [];
      return this.game.players.map(player => player.name);
    },
    disableJoin() {
      if (!this.user) return true;
      return this.playerNames.includes(this.user);
    }
  },
  components: { ActiveGame },
  methods: {
    join() {
      let players = this.game.players || [];
      players.push({ name: this.user });
      db.collection("games")
        .doc(this.game.id)
        .update({ players });
    },
    start() {
      let game = startGame(this.game);
      db.collection("games")
        .doc(this.game.id)
        .set(game);
    },
    deleteGame() {
      db.collection("games")
        .doc(this.game.id)
        .delete();
    }
  }
};
</script>

<style></style>
