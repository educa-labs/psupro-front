<template>
  <div class="navigator">
    <app-home-button v-if="type === 'home'"></app-home-button>
    <app-backwards-button v-else-if="type === 'backwards'"></app-backwards-button>
    
    {{ name }}
  </div>
</template>

<script>
import HomeButton from './HomeButton.vue';
import BackwardsButton from './BackwardsButton.vue';

export default {
  components: {
    'app-home-button': HomeButton,
    'app-backwards-button': BackwardsButton,
  },
  props: {
    type: { type: String, default: 'backwards' },
  },
  data() {
    return {
      name: '',
    };
  },
  created() {
    this.name = this.$l.cNavigator[this.$route.name];
  },
};
</script>

<style lang="sass">
@import './../../assets/stylesheets/main'

.navigator
  $padding: 1rem

  padding: $padding

  color: $c-white
  background-color: $c-main

  font-size: 20px
  font-weight: 500

  @include d-flex(center)

  & > .navigation-button
    $height: 24px

    height: $height

    margin-right: $padding

    & > .icon
      @include icon($height)
</style>
