<template>
  <div>
    <label>Your name:</label><input :value="name" @input="updateName" />
  </div>
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
    updateName(e) {
      this.$store.commit("updateName", e.target.value);
    }
  }
};
</script>

<style></style>
