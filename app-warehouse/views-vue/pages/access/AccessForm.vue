<template>
  <div>
    <div class="row">
      <div class="col s12" v-for="(permissions, i) in permissionBoxs" :key="`permissions-${i}`">
        <div
          class="col"
          style="width: 20%"
          v-for="(permission, index) in permissions"
          :ref="index"
          :key="`permission-${index}`"
        >
          <label class="padding--vertical-1">
            <input
              type="checkbox"
              :disabled="disabledBtn"
              class="filled-in"
              :checked="permission.checked"
              :value="true"
              v-model="form.checkBoxForm[i][index].checked"
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
          <button
            @click="handleCheckAll"
            :disabled="disabledBtn"
            type="button"
            class="light-teal btn-small waves-effect waves-light"
          >{{checkAll.text}}</button>
        </div>
        <div class="right">
          <button
            @click="savePermission"
            :disabled="disabledBtn"
            class="light-blue btn-small waves-effect waves-light"
          >Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash/array";

export default {
  data() {
    return {
      btnCheckAll: {
        text: "Check All",
        checkAll: true
      },
      form: {
        checkBoxForm: []
      }
    };
  },
  created() {
    this.form.checkBoxForm = this.permissionBoxs;
  },
  methods: {
    handleCheckAll(e) {
      this.btnCheckAll.checkAll = !this.btnCheckAll.checkAll;
      this.btnCheckAll.text = this.btnCheckAll.checkAll
        ? "Check All"
        : "Uncheck All";
      let checkboxTrue = _.flattenDeep(this.form.checkBoxForm).map(checkbox => {
        return { ...checkbox, checked: !this.btnCheckAll.checkAll };
      });
      this.form.checkBoxForm = _.chunk(checkboxTrue, 5);
    },
    savePermission(e) {
      e.preventDefault();
      this.$emit("handleSavePermission", _.flattenDeep(this.form.checkBoxForm));
    },
    parsePermissionName(permissionName) {
      return permissionName.split(".")[1];
    }
  },
  computed: {
    checkAll: function() {
			const permissionUser = _.flattenDeep(this.form.checkBoxForm);
			const isBtnCheckAll = permissionUser.every(permission => permission.checked == true)
			if(!isBtnCheckAll) {
				return { "text": "Check All", "checkAll": !isBtnCheckAll }
			}
			return { "text": "Uncheck All", "checkAll": isBtnCheckAll }
    },

    permissionBoxs: function() {
      let userPermissions = [...this.permissionUser];
      let permissions = this.permissionCheckbox.map(permission => {
        let permissionTrue = userPermissions.find(
          isCheck => isCheck.menu_permissions_id === permission.id
        );
        return { ...permission, checked: permissionTrue ? true : false };
      });
      return _.chunk(permissions, 5);
    },
    userPermissions: function() {
      return this.permissionUser;
    }
  },
  props: {
    permissionCheckbox: {
      type: Array,
      default: function() {
        return [];
      }
    },
    permissionUser: {
      type: Array,
      default: function() {
        return [];
      }
    },
    disabledBtn: {
      type: Boolean,
      default: function() {
        return false;
      }
    }
  }
};
</script>

<style>
</style>
