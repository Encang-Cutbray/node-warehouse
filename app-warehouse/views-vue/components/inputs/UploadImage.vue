<template>
  <div class="margin--bottom-1">
    <template>
      <label v-if="label" for="dropify">{{label}}</label>
      <input
        ref="dropify"
        type="file"
        class="dropify"
        :data-default-file="previewFile"
        :name="nameInput"
        :data-max-file-size="maxFileUpload"
        :disabled="disabled"
        :data-allowed-file-extensions="fileExtensions"
        @change="onChange"
      />
    </template>
  </div>
</template>

<script>
import { log } from "util";
export default {
  data() {
    return {
			drEvent: null,
			sample: 'kopi'
    };
  },
  props: {
    onChange: {
      type: Function,
      default: function() {
        return false;
      }
		},
    nameInput: {
      type: String,
      default: function() {
        return "file";
      }
    },
    fileExtensions: {
      type: String,
      default: function() {
        return "png jpg jpeg";
      }
    },
    label: {
      type: String,
      default: function() {
        return "";
      }
    },
    disabled: {
      type: Boolean,
      default: function() {
        return false;
      }
    },
    previewFile: {
      type: [Object, String, Symbol],
      default: function() {
        return '';
      }
    },
    maxFileSize: {
      type: Number,
      default: function() {
        return 1;
      }
    }
  },
  computed: {
    maxFileUpload() {
      return `${this.maxFileSize}M`;
    },
    preview() {
      return this.previewFile;
    }
  },
  methods: {
    setupDropify() {
      this.drEvent = $(`.dropify`).dropify({
        error: {
          fileSize: "The file size is too big ({{ value }} max).",
          minWidth: "The image width is too small ({{ value }}}px min).",
          maxWidth: "The image width is too big ({{ value }}}px max).",
          minHeight: "The image height is too small ({{ value }}}px min).",
          maxHeight: "The image height is too big ({{ value }}px max).",
          imageFormat: "The image format is not allowed ({{ value }} only)."
        },
        messages: {
          default: "",
          replace: "",
          remove: "Remove",
          error: "Ooops, something wrong happended."
        }
			});
			var that = this
      this.drEvent.on("dropify.beforeClear", function(event, element) {
				that.$emit('onRemove')
      });
    }
  },
  updated() {
    var drDestroy = this.drEvent.data("dropify");
    if (drDestroy.isDropified()) {
      drDestroy.destroy();
    }
    drDestroy.settings.defaultFile = this.previewFile;
    setTimeout(function() {
      drDestroy.init();
    }, 1);
  },
  mounted() {
    this.setupDropify();
  }
};
</script>

<style>
</style>
