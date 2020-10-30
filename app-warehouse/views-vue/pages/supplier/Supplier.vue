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
        <form :action="urlAction" method="post" autocomplete="off" ref="form" @submit.prevent>
          <div class="row">
            <div class="col s6">
              <vue-csrf />
              <vue-input
                label="Supplier name"
                input-name="supplierName"
                :default-value="supplierName"
								:readOnly="btnDisabled"
                v-model="supplierName"
              />
              <vue-input
                label="Phone"
                input-name="phone"
                :readOnly="btnDisabled"
                :default-value="phone"
                v-model="phone"
              />
            </div>
            <div class="col s6">
              <vue-input
                label="Email"
                input-type="email"
                input-name="email"
                :default-value="email"
                :readOnly="btnDisabled"
                v-model="email"
              />
              <vue-textarea
                label="Address"
                input-name="address"
                :default-value="address"
                :readOnly="btnDisabled"
                v-model="address"
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

import VueInput from "../../components/inputs/Input";
import VueCsrf from "../../components/inputs/Csrf";
import VueTextarea from "../../components/inputs/Textarea";

export default {
  mounted() {
    if (this.errorMessage) {
      M.toast({
        html: `Error, ${this.errorMessage[0].msg}!!`,
        classes: "light-red"
      });
    }

    if (this.successMessage) {
      M.toast({ html: this.successMessage[0], classes: "light-blue" });
    }

    if (this.supplier) {
      this.phone = this.supplier.phone;
      this.supplierName = this.supplier.name;
      this.email = this.supplier.email;
      this.address = this.supplier.address;
      this.urlAction = `/supplier/${this.supplier.id}/update`;
      this.pageTitle = "Review Supplier";
      this.btnSubmit = "Update";
    }
    if (this.populate) {
      this.phone = this.populate.phone;
      this.supplierName = this.populate.supplierName;
      this.email = this.populate.email;
      this.address = this.populate.address;
    }
  },
  data() {
    return {
      urlAction: "/supplier/post",
      pageTitle: "Create Supplier",
      btnSubmit: "Save",
      btnDisabled: false,
      phone: "",
      supplierName: "",
      email: "",
      address: ""
    };
  },
  components: {
    VueWrapper,
    VuePageTitle,
    VueCardContent,
    VueInput,
    VueCsrf,
    VueTextarea
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
