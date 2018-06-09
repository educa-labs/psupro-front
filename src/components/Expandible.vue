<template>
  <div class="expandible" :class="{ open }"
    :style="{ 'max-height': _maxHeightStyle }"
    @click="toggleOpen"
    v-if="visibleByHeight"
  >
    <slot></slot>

    <app-icon class="chevron" v-if="expandible">chevron_right</app-icon>
  </div>
</template>

<script>
const LINE_HEIGHT = 16; // 16px

export default {
  props: {
    expandible: { type: Boolean, default: true },
    lines: { type: Number, default: Infinity },
    maxHeight: { type: Number, default: 75 },
  },
  data() {
    return {
      overflowed: this.expandible,
      open: true,
    };
  },
  computed: {
    _maxHeight() {
      return Math.min(LINE_HEIGHT * this.lines, this.maxHeight);
    },
    _maxHeightStyle() {
      return this.open ? 'unset' : `${this._maxHeight}px`;
    },
    visibleByHeight() {
      return this._maxHeight > 0;
    },
  },
  methods: {
    updateOverflow() {
      const slot = this.$slots.default[0].elm;

      if (slot) this.overflowed = slot.offsetHeight > this._maxHeight;
    },
    toggleOpen() {
      if (this.expandible && this.overflowed) this.open = !this.open;
    },
  },
  mounted() {
    this.updateOverflow();

    if (this.overflowed) this.open = false;
  },
};
</script>

<style lang="sass" scoped>
@import './../assets/stylesheets/main'

.expandible
  overflow: hidden

  cursor: pointer

  @include d-flex
  @include p-relative

.expandible > .chevron
  margin-top: auto
  margin-bottom: auto

  transition: transform .2s

  color: c-gray(600)

  @include icon(32px)

.expandible::after
  width: 100%
  height: 50%

  content: ''

  background: linear-gradient(transparent, $c-white)

  @include p-absolute(null, null, null, 0)

.expandible.open
  cursor: default

.expandible.open > .chevron
  display: none

.expandible.open::after
  display: none
</style>
