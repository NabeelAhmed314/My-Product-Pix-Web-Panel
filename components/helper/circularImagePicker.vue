<template>
  <v-avatar
    class="elevation-3 cursor-pointer"
    color="white"
    size="120"
    @click="chooseImage"
  >
    <v-icon v-if="!imageData && !image_" :color="iconColor" x-large>{{
      icon
    }}</v-icon>
    <input
      ref="fileInput"
      class="file-input"
      type="file"
      @input="onSelectFile"
    />
    <img
      v-if="imageData"
      :src="imageData"
      style="object-fit: cover; object-position: center"
      alt="picker"
    />
    <img
      v-if="!imageData && image_"
      width="100%"
      height="100%"
      style="object-fit: cover; object-position: center"
      :src="$axios.defaults.baseURL + 'uploads/' + image_.name"
      alt="select"
      @input="onSelectFile"
    />
  </v-avatar>
</template>

<script>
export default {
  name: 'CircularImagePicker',
  props: {
    image: {
      type: Object,
      default: null,
    },
    icon: {
      type: String,
      default: 'mdi-image',
    },
    iconColor: {
      type: String,
      default: '#000',
    },
  },
  data() {
    return {
      image_: null,
      imageData: null,
      sendImage: null,
    }
  },
  watch: {
    image() {
      this.image_ = this.image
    },
  },
  beforeMount() {
    this.image_ = this.image
  },
  methods: {
    chooseImage() {
      this.$refs.fileInput.click()
    },
    onSelectFile() {
      const input = this.$refs.fileInput
      const files = input.files
      if (files && files[0]) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.imageData = e.target.result
        }
        reader.readAsDataURL(files[0])
        this.$emit('input', files[0])
      }
    },
  },
}
</script>

<style>
.base-image-input {
  display: block;
  width: 200px;
  height: 200px;
  cursor: pointer;
  background-size: cover;
  background-position: center center;
}
.placeholder {
  background: #f0f0f0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  font-size: 18px;
  font-family: Helvetica;
}
.placeholder:hover {
  background: #e0e0e0;
}
.file-input {
  display: none;
}
.v-badge__badge > .v-icon {
  color: inherit !important;
  font-size: 12px !important;
  margin: 0 -2px;
}
</style>
