<template>
  <v-app-bar app>
    <v-toolbar-title class="headline text-uppercase">
      <span>Vluxx</span>
      <span class="font-weight-light ml-2">it's a card game</span>
    </v-toolbar-title>
    <v-spacer />
    <player-info-button />
  </v-app-bar>
</template>

<script>
import PlayerInfoButton from "./PlayerInfoButton";
export default {
  name: "AppBar",
  components: { PlayerInfoButton }
};
</script>

<style></style>
