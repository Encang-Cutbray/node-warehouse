<template>
  <vue-wrapper :config="config">
    <vue-page-title>
      <template v-slot:left>
        <div class="left blue-text text-light-blue">Access</div>
      </template>
      <template v-slot:right>
        <a @click="redirectPreviousUrl" class="btn light-blue btn-small waves-effect waves-light">
          <i class="material-icons left">arrow_back</i>back
        </a>
      </template>
    </vue-page-title>
    <vue-card-content v-slot:content>{{access[0]}}</vue-card-content>
  </vue-wrapper>
</template>

<script>
import handleUrlMixing from "../../mixing/previous-url";

import VueWrapper from "../../components/Wrapper";
import VuePageTitle from "../../components/PageTitle";
import VueCardContent from "../../components/CardContent";
export default {
  mixins: [handleUrlMixing],

  components: {
    VueWrapper,
    VuePageTitle,
    VueCardContent
  }
};
</script>

<style>
</style>
