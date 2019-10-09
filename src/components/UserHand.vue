<template>
  <div>
    <h3>Hand</h3>
    <div v-for="card in hand" :key="card.title">
      <v-btn color="primary" dark :disabled="!canPlay" @click="playCard(card)">
        {{ card.title }}
      </v-btn>
    </div>
    <h3>Keepers</h3>
    <div v-for="card in keepers" :key="card.title">
      {{ card.title }}
    </div>
  </div>
</template>

<script>
import { db } from "@/db";
import { playCard } from "@/objects/player";
import _ from "lodash";
import { mapState } from "vuex";
export default {
  props: ["game", "canPlay"],
  computed: {
    ...mapState({ user: "name" }),
    player() {
      return _.find(this.game.players, { name: this.user });
    },
    hand() {
      return this.player ? this.player.hand : [];
    },
    keepers() {
      return this.player ? this.player.keepers : [];
    }
  },
  methods: {
    playCard(card) {
      const game = playCard(this.game, card);
      db.collection("games")
        .doc(this.game.id)
        .set(game);
    }
  }
};
</script>

<style></style>
