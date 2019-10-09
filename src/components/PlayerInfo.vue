<template>
  <v-form>
    <v-text-field label="Your name" :value="name" @input="updateName" />
  </v-form>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      name: state => state.name
    })
  },
  methods: {
    updateName(value) {
      this.$store.commit("updateName", value);
    }
  }
};
</script>

<style></style>
