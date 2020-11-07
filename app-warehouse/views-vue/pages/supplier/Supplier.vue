<template>
  <vue-wrapper :config="config">
    <vue-page-title>
      <template v-slot:left>
        <div class="left blue-text text-light-blue">{{pageTitle}}</div>
      </template>
      <template v-slot:right>
        <a
          href="/supplier"
          class="btn light-blue btn-small waves-effect waves-light"
          :disabled="btnDisabled"
        >Back</a>
      </template>
    </vue-page-title>

    <vue-card-content>
      <template v-slot:content>
        <form
          :action="urlForm"
          method="post"
          enctype="multipart/form-data"
          autocomplete="off"
          ref="form"
          @submit.prevent
        >
          <div class="row">
            <div class="col s6">
              <vue-csrf />

              <input type="file" name="logo" />

              <div>
                <img class="responsive-img" :src="logoSupplier" />
              </div>
              <vue-upload-image />

              <!-- Supplier name -->
              <vue-input
                label="Supplier"
                input-name="supplierName"
                :default-value="form.supplierName"
                :hasError="errorTag == 'supplierName'"
                :readOnly="btnDisabled"
                v-model="form.supplierName"
              />

              <!-- Phone -->
              <vue-input
                label="Phone"
                input-name="phone"
                :hasError="errorTag == 'phone'"
                :readOnly="btnDisabled"
                :default-value="form.phone"
                v-model="form.phone"
              />
            </div>

            <div class="col s6">
              <!-- Email -->
              <vue-input
                label="Email"
                input-type="email"
                input-name="email"
                :hasError="errorTag == 'email'"
                :default-value="form.email"
                :readOnly="btnDisabled"
                v-model="form.email"
              />

              <!-- Address -->
              <vue-textarea
                label="Address"
                input-name="address"
                :hasError="errorTag == 'address'"
                :default-value="form.address"
                :readOnly="btnDisabled"
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
                  :disabled="btnDisabled"
                >{{btnSubmit}}</button>
              </div>
            </div>
          </div>
        </form>
      </template>
    </vue-card-content>
  </vue-wrapper>
</template>

<script>
import VueWrapper from "../../components/Wrapper";
import VuePageTitle from "../../components/PageTitle";
import VueCardContent from "../../components/CardContent";

import VueCsrf from "../../components/inputs/Csrf";
import VueInput from "../../components/inputs/Input";
import VueUploadImage from "../../components/inputs/UploadImage";

import VueTextarea from "../../components/inputs/Textarea";

export default {
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
      this.urlAction = `/supplier/${this.supplier.id}/update`;
      this.pageTitle = "Review Supplier";
      this.btnSubmit = "Update";
    }
    if (this.populate) {
      this.form.phone = this.populate.phone;
      this.form.supplierName = this.populate.supplierName;
      this.form.email = this.populate.email;
      this.form.address = this.populate.address;
    }
  },
  computed: {
    logoSupplier() {
      if (this.form.logo) {
        return this.form.logo.replace("assets", "");
      }
    },
    urlForm() {
      const csrfToken = this.config.csrfToken;
      return `${this.urlAction}?_csrf=${csrfToken}`;
    }
  },
  data() {
    return {
      urlAction: "/supplier/post",
      pageTitle: "Create Supplier",
      btnSubmit: "Save",
      btnDisabled: false,
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
  methods: {
    submitSupplier() {
      this.btnDisabled = !this.btnDisabled;
      this.$refs.form.submit();
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
