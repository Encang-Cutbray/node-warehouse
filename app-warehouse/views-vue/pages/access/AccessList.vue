<template v-if="accessData.length">
  <ul class="collapsible">
    <li v-for="(access, index) in accessData" :key="`accessData-${index}`">
      <div class="collapsible-header collapsible-padding__05">{{access.name}}</div>
      <div class="collapsible-body collapsible-padding__05">
        <!-- Has many sub menu -->
        <template v-if="access.menuSubs.length">
          <div v-for="(menuSubs, index) in access.menuSubs" :key="`menuSubs-${index}`">
            <form action>
              <p>{{menuSubs.name}}</p>
              <div class="row">
                <div
                  class="col s12"
                  v-for="(permissionMenuSubs, index) in chuckPermision(menuSubs.permissionMenuSubs)"
                  :key="`permissionMenuSubs-${index}`"
                >
                  <div
                    class="col"
                    style="width: 20%"
                    v-for="(permissionSub, index) in permissionMenuSubs"
                    :key="`permissionSub-${index}`"
                  >
                    <label class="padding--vertical-1">
                      <input
                        type="checkbox"
                        class="filled-in"
                        checked="checked"
                        :name="permissionSub.name"
                      />
                      <span>{{parsePermissionName(permissionSub.name)}}</span>
                    </label>
                  </div>
                </div>
              </div>

              <!-- Button submit -->
              <div class="row">
                <div class="col s12">
                  <div class="left">
                    <button class="light-teal btn-small waves-effect waves-light">Check all</button>
                  </div>
                  <div class="right">
                    <button class="light-blue btn-small waves-effect waves-light">Save</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </template>

        <!-- Hasn't any sub menu -->
        <template v-else>
          <access-form :permission-checkbox="access.permissionMenus"></access-form>
          <form action>
            <div class="row">
              <div
                class="col s12"
                v-for="(permissions, index) in chuckPermision(access.permissionMenus)"
                :key="`permission-${index}`"
              >
                <div
                  class="col"
                  style="width: 20%"
                  v-for="(permission, index) in permissions"
                  :key="`permission-${index}`"
                >
                  <label class="padding--vertical-1">
                    <input
                      type="checkbox"
                      class="filled-in light-blue"
                      checked="checked"
                      :name="permission.name"
                    />
                    <span>{{parsePermissionName(permission.name)}}</span>
                  </label>
                </div>
              </div>
            </div>

            <!-- Button submit -->
            <div class="row">
              <div class="col s12">
                <div class="left">
                  <button class="light-teal btn-small waves-effect waves-light">Check all</button>
                </div>
                <div class="right">
                  <button class="light-blue btn-small waves-effect waves-light">Save</button>
                </div>
              </div>
            </div>
          </form>
        </template>
      </div>
    </li>
  </ul>
</template>

<script>
import _ from "lodash/array";
import AccessForm from "./AccessForm";

export default {
  data() {
    return {
      permissionCheckbox: {}
    };
  },
  components: {
    AccessForm
  },
  mounted() {
    this.collapsible();
  },
  methods: {
    chuckPermision(permission) {
      return _.chunk(permission, 5);
    },
    parsePermissionName(permissionName) {
      return permissionName.split(".")[1];
    },
    collapsible() {
      document.addEventListener("DOMContentLoaded", function() {
        var elems = document.querySelectorAll(".collapsible");
        var instances = M.Collapsible.init(elems, {});
      });
    }
  },
  props: {
    accessData: {
      type: Array,
      default: function() {
        return null;
      }
    }
  }
};
</script>

<style>
.collapsible-padding__05 {
  padding: 0.5rem;
}
.parent {
  display: flex;
  flex-direction: column;
}
.parent > div {
  background-color: #f1f1f1;
  width: 100px;
  margin: 10px;
}
</style>
