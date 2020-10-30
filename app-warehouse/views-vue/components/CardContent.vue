<template>
  <div class="padding--vertical-1">
    <div class="card">
      <div :class="!fit ? 'card-content': null">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    fit: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style>
</style>
