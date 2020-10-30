<template>
  <div class="card">
    <div class="row valign-wrapper padding--horizontal-1">
      <div class="col s12 m6">
        <div class="left">
          <slot name="left"></slot>
        </div>
      </div>
      <div class="col s12 m6">
        <div class="right">
          <slot name="right"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>
