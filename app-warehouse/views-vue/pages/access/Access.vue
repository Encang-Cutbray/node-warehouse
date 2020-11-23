<template>
  <vue-wrapper :config="config">
    <vue-page-title>
      <template v-slot:left>
        <div class="left blue-text text-light-blue">Access</div>
      </template>
      <template v-slot:right>
        <a
          @click="redirectPreviousUrl"
          :disabled="disabled"
          class="btn light-blue btn-small waves-effect waves-light"
        >
          <i class="material-icons left">arrow_back</i>back
        </a>
      </template>
    </vue-page-title>

    <vue-card-content :without-card="true" v-slot:content :fit="true">
      <div class="row">
        <div class="col">
          {{userPermission ? userPermission.full_name : null}} /
          {{userPermission ? userPermission.email: null}}
        </div>
      </div>
      <div class="row">
        <div class="col s6" v-for="(accesses, index) in accessList" :key="`accessList-${index}`">
          <ul class="collapsible">
            <li v-for="(access, index) in accesses" :key="`accesses-${index}`">
              <div class="collapsible-header collapsible-padding__05">
                <i class="material-icons">{{access.menuSubs.length ? 'view_list' : 'web_asset'}}</i>
                {{access.name}}
              </div>
              <div class="collapsible-body collapsible-padding__05">
                <!-- Nested menu -->
                <template v-if="access.menuSubs.length">
                  <ul class="collapsible">
                    <li v-for="(menuSubs, index) in access.menuSubs" :key="`menuSubs-${index}`">
                      <div class="collapsible-header collapsible-padding__05">
                        <i class="material-icons">web_asset</i>
                        {{menuSubs.name}}
                      </div>
                      <div class="collapsible-body collapsible-padding__05">
                        <access-form
                          @handleSavePermission="savePermission"
                          :disabled-btn="disabled"
                          :permission-user="permissionUser"
                          :permission-checkbox="menuSubs.permissionMenuSubs"
                        />
                      </div>
                    </li>
                  </ul>
                </template>
                <!-- No nested menu -->
                <template v-else>
                  <access-form
                    @handleSavePermission="savePermission"
                    :disabled-btn="disabled"
                    :permission-user="permissionUser"
                    :permission-checkbox="access.permissionMenus"
                  ></access-form>
                </template>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </vue-card-content>
  </vue-wrapper>
</template>

<script>
import _ from "lodash/array";
import axios from "axios";

import AccessForm from "./AccessForm";
import VueWrapper from "../../components/Wrapper";
import VuePageTitle from "../../components/PageTitle";
import VueCardContent from "../../components/CardContent";
import handleUrlMixing from "../../mixing/previous-url";
import helperMixing from "../../mixing/helper-mixing";

export default {
  data() {
    return {
      disabled: false,
      accessList: [],
      userPermission: null
    };
  },
  mounted() {
    this.accessList = _.chunk(JSON.parse(__INITIAL_STATE__.access || "[]"), 2);
    this.userPermission = __INITIAL_STATE__.user || null;
    this.collapsible();
  },
  mixins: [handleUrlMixing, helperMixing],
  methods: {
    async savePermission(permissionUser) {
      try {
        this.disabled = !this.disabled;
        let userId = this.userPermission.id;
        let result = await axios.post(`/access/${userId}/save`, {
          _csrf: this.getCsrfToken(),
          permissionUser
        });
        this.showNotification(
          `Access for user ${this.userPermission.full_name}, Saved`
        );
        this.disabled = !this.disabled;
      } catch (error) {
        this.showNotification(error, false);
        this.disabled = !this.disabled;
      }
    },
    collapsible() {
      document.addEventListener("DOMContentLoaded", function() {
        var elems = document.querySelectorAll(".collapsible");
        var instances = M.Collapsible.init(elems, {});
      });
    }
  },
  components: {
    AccessForm,
    VueWrapper,
    VuePageTitle,
    VueCardContent
  }
};
</script>
<style>
.collapsible-padding__05 {
  padding: 0.5rem;
}
</style>

