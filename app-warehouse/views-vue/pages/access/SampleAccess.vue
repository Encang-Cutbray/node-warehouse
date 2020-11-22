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

    <vue-card-content :without-card="true" v-slot:content :fit="true">
      <div class="row">
        <div class="col s6" v-for="(accesses, index) in accessList" :key="`accessList-${index}`">
          <access-list :access-data="accesses"></access-list>
        </div>
      </div>
    </vue-card-content>
  </vue-wrapper>
</template>

<script>
import _ from "lodash/array";

import VueWrapper from "../../components/Wrapper";
import VuePageTitle from "../../components/PageTitle";
import VueCardContent from "../../components/CardContent";
import AccessList from "./AccessList";

import handleUrlMixing from "../../mixing/previous-url";
export default {
  data() {
    return {
      accessList: [],
      permissionLists: [],
      userPermission: null
    };
  },
  mounted() {
    this.accessList = _.chunk(JSON.parse(__INITIAL_STATE__.access || "[]"), 2);
    this.permissionLists = __INITIAL_STATE__.permissions || [];
    this.userPermission = __INITIAL_STATE__.user || null;
  },
  mixins: [handleUrlMixing],
  methods: {},
  components: {
    VueWrapper,
    AccessList,
    VuePageTitle,
    VueCardContent
  }
};
</script>
