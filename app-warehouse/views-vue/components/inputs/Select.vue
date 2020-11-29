<template>
  <div class="row margin--bottom-1">
    <label class="col s12 m3 form--label">{{label}}</label>
    <div class="col s12 m9">
      <input
        ref="tagify"
        type="text"
        class="browser-default border__dark"
        :readonly="readOnly"
        :name="inputName"
        :value="defaultValue"
        @change="onChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    hasError: {
      type: Boolean,
      default: function() {
        return false;
      }
    },
    readOnly: {
      type: Boolean,
      default: function() {
        return false;
      }
    },
    onChange: {
      type: Function,
      default: function() {
        return;
      }
    },
    inputName: {
      type: String,
      default: function() {
        return "tags";
      }
    },
    defaultValue: {
      type: String,
      default: function() {
        return "";
      }
    },
    label: {
      type: String,
      default: function() {
        return "Label";
      }
    },
    settings: {
      type: Object,
      default: function() {
        return {
          enforceWhitelist: true,
          maxTags: 10,
          whitelist: [
            { value: "Sample 1", id: 1 },
            { value: "Sample 2", id: 2 }
          ],
          dropdown: {
            enabled: 0
          }
        };
      }
    }
  },
  methods: {
    buildTagify() {
      let tagifyEl = this.$refs.tagify;
      const Tagify = require("@yaireo/tagify/dist/tagify.min.js");
      this.tagify = new Tagify(tagifyEl, this.settings);
    }
  },
  mounted() {
    this.buildTagify();
  },
  updated() {
    if (this.defaultValue) {
			this.tagify.removeAllTags();
      this.tagify.addTags(this.defaultValue);
    }
    if (this.readOnly) {
      $("tags.tagify").attr("readonly", this.readOnly);
    }
  }
};
</script>

<style>
.border__dark {
  border: 1px solid black !important;
  border-radius: 2px !important;
}
</style>
