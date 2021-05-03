<template>
  <v-card width="50%" min-height="350px" class="mx-auto my-10 py-7 text-center">
    <div class="text-h5 mb-2">Post To instagram</div>
    <div v-if="code && accessToken()">
      <p>You Are Logged In and can post to instagram</p>
      <v-form v-if="!loading" ref="form" class="form-div mx-auto">
        <ul
          v-if="errors.length"
          style="color: red; margin-bottom: 15px; text-align: left"
        >
          <li v-for="(error, i) of errors" :key="i">
            {{ error }}
          </li>
        </ul>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                color="primary"
                label="Caption"
                :rules="[required]"
                dense
              ></v-text-field>
            </v-col>
            <v-col>
              <vue-upload-multiple-image
                :data-images="imageData"
                class="my-3"
                drag-text="Drag images (many)"
                browse-text="(or) Select Upto Five"
                primary-text="Default"
                mark-is-primary-text="Set as default"
                popup-text="This image will be displayed as default"
                drop-text="Drop your file here ..."
                @upload-success="uploadImageSuccess"
                @before-remove="beforeRemove"
                @edit-image="editImage"
              />
            </v-col>
          </v-row>
          <v-btn
            x-large
            block
            class="white--text rounded-md my-2"
            color="primary"
            elevation="2"
            @click="post"
            >Post
          </v-btn>
        </v-container>
      </v-form>
    </div>
    <div v-else>
      <p>
        You are not logged in to facebook. Kindly Click the button below to log
        in with facebook.
      </p>
      <a v-if="loginBtn" :href="loginBtn.request.responseURL">
        <v-btn color="primary">Login With Facebook</v-btn>
      </a>
    </div>
  </v-card>
</template>

<script>
import {
  getAccount,
  getAccountMedia,
  getUserAccount,
} from '@/common/utils/instagram'
import VueUploadMultipleImage from 'vue-upload-multiple-image'
import {
  required,
  emailValidator,
  phoneValidator,
  lengthValidator,
} from '@/common/utils/validators'

export default {
  name: 'InstagramForm',
  components: { VueUploadMultipleImage },
  props: {
    facebookAppId: {
      type: String,
      default: 'null',
    },
    code: {
      type: String,
      default: null,
    },
    loginBtn: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      loading: false,
      success: false,
      errors: [],
      user: null,
      businessAccount: null,
      media: null,
      imageData: [],
    }
  },
  mounted() {
    this.getUser()
  },
  methods: {
    required,
    emailValidator,
    phoneValidator,
    lengthValidator,
    getAccount,
    accessToken() {
      return window.localStorage.getItem('accessToken')
    },
    post() {
      if (this.$refs.form.validate()) {
        try {
          this.loading = true
          this.errors = []
          this.errors.push(
            'You need Advance Permissions in order to post to Instagram Business Account.'
          )
          this.loading = false
        } catch (err) {
          this.loading = false
          if (err.response) {
            this.errors.push(err.response.data.message)
          } else {
            this.errors.push('Unable to process, Try again later')
          }
        }
      }
    },
    uploadImageSuccess(formData) {},
    beforeRemove(index, done) {
      const r = confirm('Remove image?')
      if (r === true) {
        done()
      }
    },
    editImage(formData, index, fileList) {
      window.console.log('edit data', formData, index, fileList)
    },
    async getUser() {
      const user = await getAccount()
      this.user = user.data.data[0]
      const business = await getUserAccount(this.user.id)
      this.businessAccount = business.data
      const media = await getAccountMedia(
        this.businessAccount.instagram_business_account.id
      )
      this.media = media.data.data
    },
  },
}
</script>

<style scoped>
.form-div {
  width: 90%;
}
</style>
