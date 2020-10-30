<template>
  <vue-wrapper :config="config">
    <div class="card">
      <div class="row valign-wrapper padding--horizontal-1">
        <div class="col s12 m6">
          <div class="left blue-text text-light-blue">SUPPLIER</div>
        </div>
        <div class="col s12 m6">
          <div class="right">
            <a href="/supplier" class="btn light-blue btn-small waves-effect waves-light">Back</a>
          </div>
        </div>
      </div>
    </div>

    <div class="padding--vertical-1 padding--horizontal-1">
      <div class="card">
        <div class="card-content black-text">
          <span class="card-title">Card Title</span>
          <form action="/supplier/post" method="post">
            <div class="row">
              <div class="col s6">
                <vue-csrf />
                <vue-input label="Code" input-name="code" :default-value="code" v-model="code" />
                <vue-input label="Name" input-name="name" :defaul-value="name" v-model="name" />
              </div>
              <div class="col s6">
                <vue-input label="Email" input-name="email" :default-value="email" v-model="email" />
                <vue-textarea
                  label="Address"
                  input-name="address"
                  :default-value="address"
                  v-model="address"
                />
              </div>
            </div>

            <div class="row">
              <div class="col s12">
                <div class="right">
                  <button class="light-blue btn-small waves-effect waves-light">Save</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </vue-wrapper>
</template>

<script>
import VueWrapper from "../../components/Wrapper";
import VueInput from "../../components/Input";
import VueCsrf from "../../components/Csrf";
import VueTextarea from "../../components/Textarea";

export default {
  data() {
    return {
      code: "",
      name: "",
      email: "",
      address: ""
    };
  },
  components: {
    VueWrapper,
    VueInput,
    VueCsrf,
    VueTextarea
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
