<template>
  <Wrapper :userLogin='userLogin'>
    <!-- {{kopi}} -->
    <div>{{userLogin}}</div>
    <div>{{otherData}}</div>
  </Wrapper>
</template>

<script>
import Wrapper from "../components/Wrapper";
export default {
  // data() {
  //   return {
  //     kopi: "Hitemddd",
  //     // isLogin: isAuth
  //   };
  // },
  components: {
    Wrapper
  }
};
</script>

<style>
</style>
