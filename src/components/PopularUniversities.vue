<template>
  <section class="popular-universities" v-if="fetched">
    <template v-for="{ university, lines, delay } in universityCards">
      <transition name="fade-in" appear :key="`university-${university.id}`">
        <router-link 
          :to="{ name: 'university', params: { id: university.id } }"
          :style="{ 'transition-delay': `${delay}s` }"
        >
          <app-university-card :university="university" :lines="lines"></app-university-card>
        </router-link>
      </transition>
    </template>
  </section>

  <app-spinner v-else></app-spinner>
</template>

<script>
import CareerCard from './CareerCard.vue';
import hUniversityCard from './hUniversityCard.vue';

export default {
  components: {
    'app-career-card': CareerCard,
    'app-university-card': hUniversityCard,
  },
  data() {
    return {
      popular: {
        careers: null,
        universities: null,
      },

      fetched: false,
    };
  },
  computed: {
    universityCards() {
      let universityCards = this.popular.universities
        .slice(0, 4)
        .map((university, index) => {
          return { university, delay: index / 2 };
        });

      universityCards[0].lines = 3;
      universityCards[1].lines = 2;
      universityCards[2].lines = 0;
      universityCards[3].lines = 0;

      return universityCards;
    },
  },
  methods: {
    fetch() {
      this.fetched = false;

      this.$API.popular.universities().then(response => {
        let params = { image: true };

        Promise.all(
          response.map(university => {
            return new Promise(resolve => {
              this.$API.universities
                .universities(university.id, { params })
                .then(_university => {
                  university.image = _university.cover;

                  resolve();
                });
            });
          })
        ).then(() => {
          this.popular.universities = response;

          this.fetched = true;
        });
      });
    },
  },
  created() {
    this.fetch();
  },
};
</script>

<style lang="sass" scoped>
.popular-universities
  display: grid

  min-height: 40vh
  padding: 1rem

  grid-gap: 1rem
  grid-template-rows: 2fr repeat(2, 1fr)
  grid-template-columns: repeat(2, 1fr)
  grid-template-areas: "nth-1 nth-1" "nth-2 nth-2" "nth-3 nth-4"

  a:nth-child(1)
    grid-area: nth-1

  a:nth-child(2)
    grid-area: nth-2

  a:nth-child(3)
    grid-area: nth-3

  a:nth-child(4)
    grid-area: nth-4

  @media (min-width: 576px)
    padding: 1rem

  @media (min-width: 768px)
    padding: 1rem 10%

  @media (min-width: 992px)
    padding: 5% 10%

    grid-template-rows: repeat(2, 1fr)
    grid-template-columns: repeat(4, 1fr)
    grid-template-areas: "nth-1 nth-1 nth-1 nth-2" "nth-3 nth-3 nth-4 nth-4"

  @media (min-width: 1200px)
    grid-template-columns: 2fr repeat(2, 1fr)
    grid-template-areas: "nth-1 nth-2 nth-2" "nth-1 nth-3 nth-4"

  .university-card
    height: 100%

    transition: transform .5s

    &:focus, &:hover
      transform: scale3d(1.012, 1.012, 1)

  .fade-in-enter
    opacity: 0

  .fade-in-enter-active
    transition: opacity 1s
</style>
