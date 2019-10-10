<template>
  <div class="text-center">
    <v-menu
      v-model="menuOpen"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-y
    >
      <template v-slot:activator="{ on }">
        <v-btn text v-on="on">
          <span class="mr-2" v-if="noNameSet">Enter a name</span>
          <span class="mr-2" v-else>Hi, {{ name }}!</span>
        </v-btn>
      </template>

      <v-card>
        <v-form class="mx-2">
          <v-text-field label="Your name" :value="name" @input="updateName" />
        </v-form>

        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn text @click="menuOpen = false">Cancel</v-btn>
          <v-btn color="primary" text @click="save()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import { isEmpty } from "lodash";
import { mapState } from "vuex";
export default {
  name: "PlayerInfoButton",
  data() {
    return {
      menuOpen: false,
      enteredName: ""
    };
  },
  computed: {
    ...mapState(["name"]),
    noNameSet() {
      return isEmpty(this.name);
    }
  },
  methods: {
    updateName(value) {
      this.enteredName = value;
    },
    save() {
      this.$store.commit("updateName", this.enteredName);
      this.menuOpen = false;
    }
  }
};
</script>

<style></style>
