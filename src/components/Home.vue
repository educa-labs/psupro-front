<template>
  <div id="home">
    <app-hero :class="{ closed, sticky }" v-if="['xs', 'sm'].includes($mq)"></app-hero>

    <app-popular-universities></app-popular-universities>

    <div id="image" :style="{ backgroundImage: `url(${'src/assets/images/image.jpg'})` }">
      <div class="overlay"></div>

      <h1>Busca más de 3000 carreras y encuentra tu estudio ideal</h1>
    </div>

    <app-news></app-news>
  </div>
</template>

<script>
import News from './News.vue';
import PopularUniversities from './PopularUniversities.vue';

export default {
  name: 'home',
  components: {
    'app-news': News,
    'app-popular-universities': PopularUniversities,
  },
  data() {
    return {
      closed: false,
      sticky: false,
    };
  },
  mounted() {
    let breakpoints = ['xs', 'sm'];
    let threshold = 64; // height: 48px, margin-bottom: 1rem (16px)

    window.addEventListener('scroll', () => {
      requestAnimationFrame(() => {
        if (breakpoints.includes(this.$mq)) {
          if (window.pageYOffset > threshold && !this.closed) {
            this.closed = true;
            this.sticky = true;
          } else if (window.pageYOffset <= threshold && this.closed) {
            this.closed = false;
            this.sticky = false;
          }
        }
      });
    });
  },
};
</script>

<style lang="sass" scoped>
@import './../assets/stylesheets/main'

#home
  display: grid

  grid-template-rows: auto 1fr

#image
  height: 40vh
  width: 100%
  overflow: hidden
  position: relative
  @include d-flex(center, center)
  @include background-image

  h1
    color: $c-white
    text-align: center
    max-width: 500px
    z-index: 1

  .overlay
    background-color: rgba(0, 0, 0, .66)

    @include p-absolute(null, 0, 0, 0, 0)
</style>
