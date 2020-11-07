<template>
  <input type="file" class="dropify" data-default-file="url_of_your_file" />
</template>

<script>
import dropify from "dropify";
export default {
  mounted() {
		console.log(dropify);
    // $(".dropify").dropify.dropify();
  }
};
</script>

<style>
</style>
