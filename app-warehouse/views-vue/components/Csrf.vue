<template>
  <input type="hidden" name="_csrf" :value="csrfToken" />
</template>

<script>
export default {
  data() {
    return {
      csrfToken: ""
    };
  },
  mounted() {
    this.csrfToken =
      __INITIAL_STATE__ && __INITIAL_STATE__.config
        ? __INITIAL_STATE__.config.csrfToken
        : "";
  }
};
</script>
