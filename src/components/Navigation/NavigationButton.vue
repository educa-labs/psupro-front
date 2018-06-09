<template>
  <div class="navigation-button" @click="push"><slot></slot></div>
</template>

<script>
export default {
  props: {
    name: { type: String, required: true },
  },
  methods: {
    push() {
      this.$router.push({ name: this.name });
    },
  },
};
</script>

<style lang="sass">
.navigation-button
  cursor: pointer
</style>
