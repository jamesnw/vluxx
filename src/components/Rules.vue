<template>
  <div>
    <h2>Rules</h2>
    <div>Draw: {{ draw }}</div>
    <div>Play: {{ play }}</div>
    <div>Goal: {{ goal.title }}: {{ goal.goal }}</div>
  </div>
</template>

<script>
export default {
  props: ["game"],
  computed: {
    draw() {
      return this.game.constantRules.draw;
    },
    play() {
      return this.game.constantRules.play;
    },
    goal() {
      return this.game.goal || {};
    }
  }
};
</script>

<style></style>
