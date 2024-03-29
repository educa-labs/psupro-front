<template>
  <div>
    <div class="career-container" v-if="fetched">
      <div class="card career z-depth-1">
        <div class="image" :style="{ backgroundImage: `url(${career.cover})` }">
          <div class="overlay"></div>

          <app-backwards-button></app-backwards-button>
        </div>

        <div class="card-title">
          <div>{{ career.title }} {{ career.university.initials }}</div>
        </div>

        <app-tabs :routes="routes" :transition="transition"></app-tabs>
      </div>
    </div> 

    <app-fetching v-else></app-fetching>
  </div>
</template>

<script>
import Fetching from './Fetching.vue';
import Tabs from './../Tabs/main.vue';

export default {
  components: {
    'app-fetching': Fetching,
    'app-tabs': Tabs,
  },
  props: {
    id: { type: Number, required: true },
  },
  data() {
    return {
      career: null,
      routes: [
        { tab: this.$l.cCareer.information, name: 'career' },
        { tab: this.$l.cCareer.similarCareers, name: 'similar-careers' },
      ],

      fetched: false,

      transition: '',
    };
  },
  methods: {
    reset() {
      this.fetched = false;

      this.transition = '';
    },
    fetch() {
      this.reset();

      let params = { image: true };

      this.$API.careers(this.id, { params }).then(response => {
        this.career = response;

        this.fetched = true;
      });
    },
  },
  beforeRouteUpdate(to, from, next) {
    if (to.name === 'career' && from.name === 'similar-careers')
      this.transition = 'slide-right';
    else if (to.name === 'similar-careers' && from.name === 'career')
      this.transition = 'slide-left';

    next();
  },
  created() {
    this.fetch();
  },
};
</script>

<style lang="sass">
@import './../../assets/stylesheets/main'

.career-container
  $padding: 1rem

  @include media-up(md)
    padding: 0 $padding

  & > .career
    @include media-up(md)
      width: calc(#{$breakpoint-md} - 2 * #{$padding})
      margin: $padding auto

.career-container > .career
  @include media-down(sm)
    border-radius: 0
    box-shadow: none

.career-container > .career > .image
  height: 175px

  @include media-up(sm)
    height: 300px

  @include background-image
  @include p-relative

  & > .overlay
    background: linear-gradient(to top, transparent, rgba(0, 0, 0, .3))

    @include p-absolute(0, 0, 0, 0 ,0)

  & > .navigation-button
    @include p-absolute(null, 1rem, null, null, 1rem)

    & > .icon
      color: $c-white

      @include icon(28px)

.career-container > .career > .card-title
  z-index: 1

  min-height: 75px

  background-color: $c-main

  & > div
    width: 66%
    padding: 1rem

    font-size: $f-x-large
    font-weight: 500
</style>
