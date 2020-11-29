<template>
  <vue-wrapper :config="config">
    <vue-page-title>
      <template v-slot:left>
        <div class="left blue-text text-light-blue">{{pageTitle}}</div>
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

    <vue-card-content>
      <template v-slot:content>
        <form
          :action="urlForm"
          method="POST"
          enctype="multipart/form-data"
          autocomplete="off"
          ref="form"
          @submit.prevent
        >
          <div class="row">
            <div class="col s12 m6">
              <!-- Supplier Logo -->
              <vue-upload-image
                label="Supplier Logo"
                name-input="logo"
                :disabled="btnDisabled || !createPermission || (!updatePermission && isEdit)"
                :preview-file="logoSupplier"
              />
            </div>

            <div class="col s12 m6">
              <!-- Supplier name -->
              <vue-input
                label="Supplier"
                input-name="supplierName"
                :default-value="form.supplierName"
                :has-error="errorTag == 'supplierName'"
                :read-only="btnDisabled || !createPermission || (!updatePermission && isEdit)"
                v-model="form.supplierName"
              />

              <!-- Phone -->
              <vue-input
                label="Phone"
                input-name="phone"
                :hasError="errorTag == 'phone'"
                :readOnly="btnDisabled || !createPermission || (!updatePermission && isEdit)"
                :default-value="form.phone"
                v-model="form.phone"
              />

              <!-- Email -->
              <vue-input
                label="Email"
                input-type="email"
                input-name="email"
                :hasError="errorTag == 'email'"
                :default-value="form.email"
                :readOnly="btnDisabled || !createPermission || (!updatePermission && isEdit)"
                v-model="form.email"
              />

              <!-- Address -->
              <vue-textarea
                label="Address"
                input-name="address"
                :hasError="errorTag == 'address'"
                :default-value="form.address"
                :readOnly="btnDisabled || !createPermission || (!updatePermission && isEdit)"
                v-model="form.address"
              />
            </div>
          </div>

          <div class="row">
            <div class="col s12">
              <div class="right">
                <button
                  class="light-blue btn-small waves-effect waves-light"
                  @click="submitSupplier"
                  :disabled="btnDisabled || !createPermission || (!updatePermission && isEdit)"
                >
                  <i class="material-icons left">save</i>
                  {{btnName}}
                </button>
              </div>
            </div>
          </div>
        </form>
      </template>
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
import VueTextarea from "../../components/inputs/Textarea";
import VueUploadImage from "../../components/inputs/UploadImage";

export default {
  data() {
    return {
      urlAction: "/supplier/post",
      pageTitle: "Create Supplier",
      btnName: "Save",
      btnDisabled: false,
      isEdit: false,
      errorTag: "",
      form: {
        phone: "",
        supplierName: "",
        logo: "",
        email: "",
        address: ""
      }
    };
  },
  components: {
    VueWrapper,
    VuePageTitle,
    VueCardContent,
    VueInput,
    VueCsrf,
    VueTextarea,
    VueUploadImage
  },
  mixins: [handleUrlMixing, permissionMixing],
  methods: {
    submitSupplier() {
      this.btnDisabled = !this.btnDisabled;
      this.$refs.form.submit();
    }
  },
  mounted() {
    if (this.errorMessage) {
      this.errorTag = this.errorMessage[0].param;
      M.toast({
        html: `Error, ${this.errorMessage[0].msg}!!`,
        classes: "light-red"
      });
    }

    if (this.successMessage) {
      M.toast({ html: this.successMessage[0], classes: "light-blue" });
    }

    if (this.supplier) {
      this.form.phone = this.supplier.phone;
      this.form.supplierName = this.supplier.name;
      this.form.email = this.supplier.email;
      this.form.address = this.supplier.address;
      this.form.logo = this.supplier.logo;
      this.isEdit = true;
      this.urlAction = `/supplier/${this.supplier.id}/update`;
      this.pageTitle = "Review Supplier";
      this.btnName = "Update";
    }
    if (this.populate) {
      this.form.phone = this.populate.phone;
      this.form.supplierName = this.populate.supplierName;
      this.form.email = this.populate.email;
      this.form.address = this.populate.address;
    }
  },
  computed: {
    logoSupplier: function() {
      if (this.form.logo) {
        return `http://localhost:3500${this.form.logo.replace("assets", "")}`;
      }
      return null;
    },
    urlForm: function() {
      const csrfToken = this.config.csrfToken;
      return `${this.urlAction}/?_csrf=${csrfToken}`;
    }
  }
};
</script>

<style>
.card--custome {
  padding: 10px !important;
}

.content {
  height: 8px;
}
</style>
