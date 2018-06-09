<template>
  <app-navigation-button :name="'home'"><app-icon>home</app-icon></app-navigation-button>
</template>

<script>
import NavigationButton from './NavigationButton.vue';

export default {
  components: { 'app-navigation-button': NavigationButton },
};
</script>
