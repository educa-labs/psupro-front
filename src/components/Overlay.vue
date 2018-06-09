<template>
  <div class="overlay" :style="{ 'z-index': $store.state.overlay.zIndex }"
    @click="hide"
    v-if="$store.state.overlay.show"
  >
    <component :is="$store.state.overlay.component.is"
      v-bind="$store.state.overlay.component.payload"
      :style="{ 'z-index': $store.state.overlay.zIndex }"
      @click.native.stop
    ></component>
  </div>
</template>

<script>
import SelectOptions from './SelectOptions.vue';

export default {
  components: {
    'app-select-options': SelectOptions,
  },
  methods: {
    hide() {
      if (this.$store.state.overlay.previousZIndex)
        this.$store.dispatch('unmountOverlayComponent');
      else this.$store.dispatch('hideOverlay');
    },
  },
};
</script>

<style lang="sass" scoped>
@import './../assets/stylesheets/main'

.overlay
  background-color: rgba(0, 0, 0, .66)

  @include p-fixed(null, 0, 0, 0, 0)
</style>
