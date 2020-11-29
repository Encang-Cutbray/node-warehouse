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
        method="POST"
        autocomplete="off"
        :action="urlForm"
        enctype="multipart/form-data"
        ref="form"
        @submit.prevent
      >
        <div class="row">
          <!-- Warehouse logo -->
          <div class="col m5 s12">
            <vue-upload-image
              label="Warehouse Logo"
              name-input="warehouseLogo"
              :disabled="btnDisabled || !createPermission || (!updatePermission && isEdit)"
              :preview-file="null"
            />
          </div>
          <div class="col m7 s12">
            <!-- Csrf Token -->
            <vue-csrf />

            <!-- Code -->
            <vue-input
              label="Code"
              input-name="code"
              :default-value="form.code"
              :has-error="errorTag == 'code'"
              :read-only="btnDisabled || !createPermission || (!updatePermission && isEdit)"
              v-model="form.code"
            />
            {{form.code}}
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
              :default-value="null"
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
      return `${this.urlAction}/?_csrf=${csrfToken}`;
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
  mounted() {},
  mixins: [handleUrlMixing, permissionMixing],
  methods: {
    onTagsChange(e) {
      this.form.users = e.target.value ? JSON.parse(e.target.value) : [];
    },
    submitWarehouse(e) {
      this.form;
      this.btnDisabled = !this.btnDisabled;
      // this.$refs.form.submit();
      console.log(this.form);
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
