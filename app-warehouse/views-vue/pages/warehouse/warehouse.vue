<template>
  <vue-wrapper :config="config">
    <vue-page-title>
      <template v-slot:left>
        <div class="left blue-text text-light-blue">Warehouse</div>
      </template>
      <template v-slot:right>
        <a
          @click="redirectPreviousUrl"
          class="btn light-blue btn-small waves-effect waves-light"
          :disabled="btnDisabled"
        >
          <i class="material-icons left">arrow_back</i>back
        </a>
      </template>
    </vue-page-title>

    <vue-card-content v-slot:content>
      <form
        :action="urlForm"
        method="POST"
        enctype="multipart/form-data"
        autocomplete="off"
        ref="form"
        @submit.prevent
      >
        <div class="row">
          <!-- Warehouse logo -->
          <div class="col m5 s12">
            <vue-upload-image
              label="Warehouse Logo"
              name-input="logo"
              :disabled="btnDisabled || !createPermission || (!updatePermission && isEdit)"
              :preview-file="changeLogo ? null: form.logo"
              :onChange="onFileChange"
              @onRemove="onFileRemove"
            />
          </div>
          <div class="col m7 s12">
            <!-- Csrf Token -->
            <!-- <vue-csrf /> -->

            <!-- Code -->
            <vue-input
              label="Code"
              input-name="code"
              :default-value="form.code"
              :has-error="errorTag == 'code'"
              :read-only="btnDisabled || !createPermission || (!updatePermission && isEdit)"
              v-model="form.code"
            />
            <!-- Name -->
            <vue-input
              label="Name"
              input-name="name"
              :default-value="form.name"
              :has-error="errorTag == 'name'"
              :read-only="btnDisabled || !createPermission || (!updatePermission && isEdit)"
              v-model="form.name"
            />
            <!-- User -->
            <vue-select
              label="User warehouse"
              input-name="users"
              :default-value="form.users.map(user => user.value).join(',')"
              :read-only="btnDisabled || !createPermission || (!updatePermission && isEdit)"
              :settings="settingSelect"
              :onChange="onTagsChange"
            />

            <!-- Description -->
            <vue-textarea
              label="Description"
              input-name="description"
              :hasError="errorTag == 'description'"
              :default-value="form.description"
              :read-only="btnDisabled || !createPermission || (!updatePermission && isEdit)"
              v-model="form.description"
            />
          </div>
        </div>
        <!-- Button save or update -->
        <div class="row">
          <div class="col s12">
            <div class="right">
              <button
                type="submit"
                class="light-blue btn-small waves-effect waves-light"
                @click="submitWarehouse"
                :disabled="btnDisabled || !createPermission || (!updatePermission && isEdit)"
              >
                <i class="material-icons left">save</i>
                {{btnName}}
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
import permissionMixing from "../../mixing/permission-mixing";

import VueWrapper from "../../components/Wrapper";
import VuePageTitle from "../../components/PageTitle";
import VueCardContent from "../../components/CardContent";

import VueCsrf from "../../components/inputs/Csrf";
import VueInput from "../../components/inputs/Input";
import VueSelect from "../../components/inputs/Select";
import VueTextarea from "../../components/inputs/Textarea";
import VueUploadImage from "../../components/inputs/UploadImage";

export default {
  data() {
    return {
      btnDisabled: false,
      btnName: "Save",
      isEdit: false,
      urlAction: "/warehouse/post",
      errorTag: null,
      changeLogo: false,
      form: {
        logo: "",
        code: "",
        name: "",
        description: "",
        users: []
      }
    };
  },
  computed: {
    urlForm: function() {
      const csrfToken = this.config.csrfToken;
      return `${this.urlAction}?_csrf=${csrfToken}`;
    },
    settingSelect: function() {
      let userWarehouse = this.userWarehouse.map(user => ({
        id: user.dataValues.id,
        value: user.dataValues.value
      }));
      return {
        whitelist: userWarehouse,
        dropdown: {
          enabled: 0
        },
        enforceWhitelist: true
      };
    }
  },
  mounted() {
    if (this.warehouse) {
      let warehouse = JSON.parse(this.warehouse);
      let users = warehouse.WarehouseUsers.map(item => item.User).map(user => ({
        id: user.id,
        value: user.full_name
      }));
      this.isEdit = true;
      this.btnName = "Update";
      this.urlAction = `/warehouse/${warehouse.id}/update`;
      this.form = {
        logo: this.parseUrlLogo(warehouse.logo),
        code: warehouse.code,
        name: warehouse.name,
        description: warehouse.description,
        users: users
      };
    }
  },
  mixins: [handleUrlMixing, permissionMixing],
  methods: {
    parseUrlLogo(pathLogo) {
      if (pathLogo) {
        console.log(window.location.hostname);
        console.log(window.location.port);
        let parseLogo = pathLogo.replace("assets", "");
        let protocol = `${window.location.protocol}//`;
        let hostName = window.location.hostname;
        let port = window.location.port ? `:${window.location.port}` : null;
        let fullLogo = `${protocol}${hostName}${port}${parseLogo}`;
        return fullLogo;
      }
      return null;
    },
    onFileChange(e) {
      this.form.logo = e.target.files[0];
      this.changeLogo = true;
    },
    onFileRemove() {
      this.form.logo = null;
      this.changeLogo = true;
    },
    onTagsChange(e) {
      this.form.users = e.target.value ? JSON.parse(e.target.value) : [];
    },
    submitWarehouse(e) {
      this.btnDisabled = !this.btnDisabled;
      console.log(this.form);
      this.$refs.form.submit();
    }
  },
  components: {
    VueWrapper,
    VuePageTitle,
    VueCardContent,
    VueInput,
    VueSelect,
    VueCsrf,
    VueTextarea,
    VueUploadImage
  }
};
</script>
