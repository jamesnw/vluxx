<template>
  <v-app>
    <app-bar />
    <v-content>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-content>
    <a class="github" href="https://github.com/jamesnw/vluxx">Github</a>
  </v-app>
</template>
<script>
import AppBar from "@/components/AppBar";
export default {
  name: "App",
  components: { AppBar }
};
</script>

<style lang="scss">
.github {
  position: absolute;
  bottom: 0;
}
</style>
