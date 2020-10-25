<template>
  <Wrapper :config="config">
    <div>{{otherData}}</div>
    <div>{{kopi}}</div>
		<div>{{config.csrfToken}}</div>
  </Wrapper>
</template>

<script>
import Wrapper from "../components/Wrapper";
export default {
  data() {
    return {
      kopi: "Hitemddd"
    };
  },
  components: {
    Wrapper
  }
};
</script>

<style>
</style>
