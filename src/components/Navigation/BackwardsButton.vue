<template>
  <div class="navigation-button" @click="goBackwards"><app-icon>arrow_back</app-icon></div>
</template>

<script>
export default {
  methods: {
    goBackwards() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="sass">
.navigation-button
  cursor: pointer
</style>
