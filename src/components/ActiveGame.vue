<template>
  <div v-if="gameState === 'won'">Game over! {{ game.winner }} won!</div>
  <div v-else>
    <div>Player's turn: {{ activePlayer }}</div>
    <div v-if="userIsActive">
      <button @click="start">Start turn</button>
      Remaining: {{ playsRemaining }}
      <button @click="end">End turn</button>
    </div>
    <div v-else>Waiting...</div>
    <UserHand :game="game" :canPlay="canPlay" />
    <Rules :game="game" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { db } from "@/db";
import { startTurn, endTurn } from "@/objects/player";
import UserHand from "./UserHand";
import Rules from "./Rules";
export default {
  props: ["game"],
  components: { UserHand, Rules },
  computed: {
    ...mapState({ user: "name" }),
    activePlayer() {
      let active = this.game.activePlayer;
      let name = this.game.players[active].name;
      return name;
    },
    userIsActive() {
      return this.user === this.activePlayer;
    },
    playsRemaining() {
      return this.game.turn ? this.game.turn.playsRemaining : 0;
    },
    canPlay() {
      return this.userIsActive && this.playsRemaining > 0;
    },
    gameState() {
      return this.game.state;
    }
  },
  methods: {
    start() {
      const game = startTurn(this.game);
      db.collection("games")
        .doc(this.game.id)
        .set(game);
    },
    end() {
      const game = endTurn(this.game);
      db.collection("games")
        .doc(this.game.id)
        .set(game);
    }
  }
};
</script>

<style></style>
