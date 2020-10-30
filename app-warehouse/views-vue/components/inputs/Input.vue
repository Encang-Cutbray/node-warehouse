<template>
  <div class="row margin--bottom-1">
    <label for class="col s12 m3 form--label">{{label}}</label>
    <div class="col s12 m9">
      <input
        class="browser-default form--control"
        :class="{'border--error': hasError }"
        :readonly="readOnly"
        :disabled="disabled"
        :type="inputType"
        :name="inputName"
        :value="defaultValue"
        @input="$emit('input', $event.target.value)"
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
    disabled: {
      type: Boolean,
      default: function() {
        return false;
      }
    },
    inputType: {
      type: String,
      default: function() {
        return "text";
      }
    },
    inputName: {
      type: String,
      default: function() {
        return "";
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
    }
  }
};
</script>

<style>
.border--error {
  border: 1px solid red !important;
}
</style>
