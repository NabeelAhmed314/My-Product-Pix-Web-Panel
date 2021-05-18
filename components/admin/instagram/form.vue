<template>
  <v-card width="50%" min-height="350px" class="mx-auto my-10 py-7">
    <div>
      <div class="text-h5 mb-2 text-center">Post To instagram</div>
      <ul v-if="!loading" class="mx-7 my-3">
        <li
          v-if="error != null"
          style="color: red; margin-bottom: 15px; text-align: left"
        >
          {{ error }}
        </li>
        <li
          v-if="success"
          style="color: green; margin-bottom: 15px; text-align: left"
        >
          {{ success }}
        </li>
      </ul>
      <div v-if="logged">
        <v-form v-if="!loading" ref="form" class="form-div mx-auto">
          <ul v-if="errors.length" style="color: red; margin-bottom: 15px">
            <li v-for="(error1, i) of errors" :key="i">
              {{ error1 }}
            </li>
          </ul>
          <v-container>
            <v-row>
              <v-col cols="12">
                <label>Caption</label>
                <v-text-field
                  v-model="caption"
                  color="primary"
                  single-line
                  placeholder="Your Caption Here"
                  :rules="[required]"
                  dense
                ></v-text-field>
              </v-col>
              <v-col>
                <label
                  >Media
                  <v-icon
                    v-if="getSrc() !== null"
                    color="primary"
                    @click="removeSrc"
                    >mdi-delete</v-icon
                  ></label
                >
                <vue-upload-multiple-image
                  v-if="!ext"
                  :data-images="imageData"
                  class="my-3"
                  :max-image="1"
                  drag-text="Drag image (one)"
                  browse-text="(or) Select"
                  primary-text="Default"
                  mark-is-primary-text="Set as default"
                  popup-text="This image will be displayed as default"
                  drop-text="Drop your file here ..."
                  @upload-success="uploadImageSuccess"
                  @before-remove="beforeRemove"
                  @edit-image="editImage"
                />
                <img
                  v-else
                  alt="person"
                  class="rounded-lg"
                  width="100%"
                  height="85%"
                  style="object-fit: cover"
                  :src="$axios.defaults.baseURL + 'uploads/' + getSrc()"
                />
              </v-col>
            </v-row>
            <v-btn
              x-large
              block
              class="white--text rounded-md my-2"
              color="primary"
              elevation="2"
              @click="postInsta"
              >Post ({{ limit }})
            </v-btn>
          </v-container>
        </v-form>
        <div v-else class="d-flex justify-center align-center">
          <v-progress-circular
            indeterminate
            color="#313F53"
            class="mt-12"
          ></v-progress-circular>
        </div>
      </div>
      <div v-else class="text-center">
        <p v-if="!error">
          You are not logged in to facebook. Kindly Click the button below to
          log in with facebook.
        </p>
        <v-btn x-large color="primary" @click="login">
          <v-icon large left>mdi-facebook</v-icon>
          <span class="ml-2">Login With Facebook</span></v-btn
        >
      </div>
    </div>
  </v-card>
</template>

<script>
import {
  getLoginStatus,
  loginWithFacebook,
  createInstagramPost,
  instagramLimit,
} from '@/common/utils/instagram'
import VueUploadMultipleImage from 'vue-upload-multiple-image'
import { required } from '@/common/utils/validators'

export default {
  name: 'InstagramForm',
  components: { VueUploadMultipleImage },
  props: {
    env: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      loading: false,
      success: null,
      error: null,
      media: null,
      image: [],
      imageData: [],
      errors: [],
      logged: null,
      caption: null,
      limit: null,
      ext: false,
    }
  },
  async mounted() {
    await this.getLoginStatus()
    if (this.logged) {
      await this.getLimit()
    }
  },
  methods: {
    required,
    uploadImageSuccess(formData) {
      this.image = []
      formData.forEach((item) => this.image.push(item))
    },
    beforeRemove(index, done) {
      const r = confirm('Remove image?')
      if (r === true) {
        done()
      }
    },
    editImage(formData, index, fileList) {
      window.console.log('edit data', formData, index, fileList)
    },
    getSrc() {
      const data = window.localStorage.getItem('shareSrc')
      if (data !== null) {
        this.ext = true
      }
      return data
    },
    async login() {
      this.loading = true
      const response = await loginWithFacebook(this.env)
      this.logged = response.status
      if (response.status) {
        await this.getLimit()
        this.loading = false
        this.error = null
        this.success = response.message
      } else {
        this.loading = false
        this.message = null
        this.error = response.message
      }
    },
    async getLoginStatus() {
      const response = await getLoginStatus()
      this.logged = response.status
      if (response.status) {
        this.error = null
        this.success = response.message
      } else {
        this.success = null
        this.error = response.message
      }
    },
    async postInsta() {
      const formData = new FormData()
      this.errors = []
      if (this.$refs.form.validate()) {
        this.loading = true
        try {
          let url
          let response
          if (this.image.length > 0) {
            for (const image of this.image) {
              formData.append('image', image)
            }

            response = await this.$axios.post('persons/save-image', formData)
            url =
              this.$axios.defaults.baseURL + '/uploads/' + response.data.name
          } else {
            url = this.$axios.defaults.baseURL + '/uploads/' + this.getSrc()
          }
          const responsePost = await createInstagramPost(url, this.caption)
          if (responsePost.status) {
            this.error = null
            this.success = responsePost.message
          } else {
            this.success = null
            this.error = responsePost.message
          }
          if (response) {
            await this.$axios.post('persons/delete-image/' + response.data.name)
          }
          window.localStorage.removeItem('shareSrc')
          this.caption = null
          this.imageData = []
          this.image = []
          this.loading = false
        } catch (err) {
          this.caption = null
          this.imageData = []
          this.image = []
          this.loading = false
          if (err.response) {
            this.errors.push(err.response.data.message)
          } else {
            this.errors.push('Unable to process, Try again later')
          }
        }
      }
    },
    removeSrc() {
      window.localStorage.removeItem('shareSrc')
      this.ext = false
    },
    async getLimit() {
      const response = await instagramLimit()
      this.limit = response.remaining + '/' + response.total
    },
  },
}
</script>

<style scoped>
.form-div {
  width: 90%;
}
</style>
