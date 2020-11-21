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

    <vue-card-content v-slot:content>
      <form :action="`/access/${userPermission ? userPermission.id: null}/save`" method="post">
        <vue-csrf />
        <table class="table table--bordered table--sm highlight">
          <thead>
            <tr>
              <th>Name</th>
              <template v-for="permission in permissionLists">
                <th :key="permission.id" class="valign center">{{permission.name}}</th>
              </template>
            </tr>
          </thead>
          <tbody>
            <template v-for="(access, index) in accessList">
              <tr :key="'access'+index" class="valign center">
                <td :colspan="access.menuSubs.length ? permissions.length+1: 0">{{access.name}}</td>
                <template v-if="!access.menuSubs.length">
                  <td
                    class="valign center"
                    v-for="permission in permissionLists"
                    :key="'permission'+permission.id"
                  >
                    <label>
                      <input
                        type="checkbox"
                        :name="`${access.code}.${permission.name.toLowerCase()}`"
                        class="filled-in"
                        checked="checked"
                        value="1"
                      />
                      <span class></span>
                    </label>
                  </td>
                </template>
              </tr>
              <template v-if="access.menuSubs.length">
                <tr v-for="sub in access.menuSubs" :key="sub.id" class="valign center">
                  <td colspan="1">{{ sub.name }}</td>
                  <td
                    class="valign center"
                    v-for="permission in permissionLists"
                    :key="'sub'+permission.id"
                  >
                    <label>
                      <input
                        type="checkbox"
                        class="filled-in"
                        value="1"
                        :name="`${sub.code}.${permission.name.toLowerCase()}`"
                        checked="checked"
                      />
                      <span class></span>
                    </label>
                  </td>
                </tr>
              </template>
            </template>
          </tbody>
        </table>
        <div class="row">
          <div class="col s12">
            <div class="valign right">
              <button class="light-blue btn-small waves-effect waves-light">
                <i class="material-icons left">save</i> Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </vue-card-content>
  </vue-wrapper>
</template>

<script>
import handleUrlMixing from "../../mixing/previous-url";

import VueWrapper from "../../components/Wrapper";
import VueCsrf from "../../components/inputs/Csrf";
import VuePageTitle from "../../components/PageTitle";
import VueCardContent from "../../components/CardContent";

export default {
  data() {
    return {
      accessList: [],
      permissionLists: [],
      userPermission: null
    };
  },
  mounted() {
    this.accessList = JSON.parse(__INITIAL_STATE__.access || "[]");
    this.permissionLists = __INITIAL_STATE__.permissions || [];
    this.userPermission = __INITIAL_STATE__.user || null;
  },
  computed: {
  },
  mixins: [handleUrlMixing],
  components: {
    VueCsrf,
    VueWrapper,
    VuePageTitle,
    VueCardContent
  }
};
</script>

<style>
</style>
