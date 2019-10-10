<template>
  <div class="home">
    <CreateGame />
    <ListGames />
  </div>
</template>

<script>
// @ is an alias to /src
import CreateGame from "@/components/CreateGame";
import ListGames from "@/components/ListGames";

export default {
  name: "home",
  components: {
    CreateGame,
    ListGames
  }
};
</script>
