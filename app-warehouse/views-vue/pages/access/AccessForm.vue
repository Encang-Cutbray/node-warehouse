<template>
  <form action>
    {{formCheckbox}}
    <div class="row">
      <div
        class="col s12"
        v-for="(permissions, index) in permissionBox"
        :key="`permissions-${index}`"
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
              class="filled-in"
              :value="formCheckbox[parsePermissionName(permission.name)]"
              :checked="formCheckbox[parsePermissionName(permission.name)]"
              v-model="formCheckbox[parsePermissionName(permission.name)]"
              :name="parsePermissionName(permission.name)"
            />
            <span>{{parsePermissionName(permission.name)}}</span>
          </label>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col s12">
        <div class="left">
          <button type="button" class="light-teal btn-small waves-effect waves-light">Check all</button>
        </div>
        <div class="right">
          <button @click="savePermission" class="light-blue btn-small waves-effect waves-light">Save</button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import _ from "lodash/array";

export default {
  data() {
    return {
      formCheckbox: {},
      permissionBoxs: []
    };
	},
	updated() {
		console.log('updated');
	},
  mounted() {
    this.permissionBoxs = this.permissionBox;
    for (let index = 0; index < this.permissionCheckbox.length; index++) {
      let form = this.parsePermissionName(this.permissionCheckbox[index].name);
      this.formCheckbox[form] = false;
    }
  },
  methods: {
    savePermission(e) {
      e.preventDefault();
      console.log(this.formCheckbox);
    },
    chechAllPermission() {},
    parsePermissionName(permissionName) {
      return permissionName.split(".")[1];
    }
  },
  computed: {
    permissionBox: function() {
      return _.chunk(this.permissionCheckbox, 5);
    }
  },
  props: {
    permissionCheckbox: {
      type: Array,
      default: function() {
        return [];
      }
    }
  }
};
</script>

<style>
</style>
