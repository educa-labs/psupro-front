<template>
  <div class="hero-wrapper">
    <div class="hero z-depth-1">
      <div class="hero-content">
        <app-navigation-button name="home" class="logo">
          <img src="./../../assets/images/logo.svg">
        </app-navigation-button>

        <app-search-bar></app-search-bar>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from './../SearchBar.vue';

export default {
  components: {
    'app-search-bar': SearchBar,
  },
};
</script>

<style lang="sass" scoped>
@import './../../assets/stylesheets/main'

$hero-offset-height: 144px
$logo-offset-height: 66px

.hero-wrapper
  z-index: 1030

.hero-wrapper, .hero
  box-sizing: border-box
  
  height: $hero-offset-height

  transition: height .4s

  @include media-up(md)
    height: 60vh

.hero-wrapper.closed 
  @include media-up(md)
    height: $logo-offset-height

    & > .hero
      height: $logo-offset-height

.hero-wrapper.sticky > .hero
  @include p-fixed(1030, -$logo-offset-height, 0, null, 0)

.hero-wrapper > .hero
  padding: 1rem

  background-color: $c-main

  @include d-flex(center, unset)

.hero-wrapper > .hero > .hero-content
  flex-direction: column

  width: 100%

  @include media-up(md)
    width: calc(#{$breakpoint-md} - 2 * 1rem)

    margin-right: auto
    margin-left: auto

  @include d-flex(center, center)

.hero-wrapper.closed > .hero > .hero-content
  @include media-up(md)
    flex-direction: row

.hero-wrapper > .hero > .hero-content .logo
  margin-bottom: 1rem

  @include d-flex(center, center)

.hero-wrapper > .hero > .hero-content .logo > img
  width: 150px
  height: 48px

.hero-wrapper.closed .hero > .hero-content .logo
  @include media-up(md)
    display: flex

    margin-right: 1rem
    margin-bottom: 0
</style>
