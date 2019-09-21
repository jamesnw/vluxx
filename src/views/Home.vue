<template>
  <div class="home">
    <PlayerInfo />
    <CreateGame />
    <ListGames />
  </div>
</template>

<script>
// @ is an alias to /src
import CreateGame from "@/components/CreateGame";
import ListGames from "@/components/ListGames";
import PlayerInfo from "@/components/PlayerInfo";

export default {
  name: "home",
  components: {
    CreateGame,
    ListGames,
    PlayerInfo
  }
};
</script>
