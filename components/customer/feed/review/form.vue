<template>
  <v-container>
    <v-form v-if="!loading" ref="form">
      <v-card class="d-block d-md-flex main-card mx-auto">
        <v-container class="sub-card">
          <div><v-icon @click="returnBack">mdi-arrow-left</v-icon></div>
          <div class="d-flex px-3 pt-3">
            <v-avatar size="90" class="elevation-3 rounded-xl">
              <img
                v-if="feed.product.images.length >= 1"
                :src="
                  this.$axios.defaults.baseURL +
                  'uploads/' +
                  feed.product.images[0].name
                "
                width="100%"
              />
              <v-icon v-else color="primary" large>mdi-image-multiple</v-icon>
            </v-avatar>
            <div>
              <v-card-title>{{ feed.product.name }}</v-card-title>
              <v-card-subtitle>{{ feed.product.description }}</v-card-subtitle>
            </div>
          </div>
          <ul v-if="errors.length" style="color: red; margin-bottom: 15px">
            <li v-for="(error, i) of errors" :key="i">
              {{ error }}
            </li>
          </ul>
          <div class="px-3 pt-3">
            <div class="text-h6 pa-2">Add Photos & Videos</div>
            <div
              v-if="!uploadLoader"
              class="elevation-3 rounded-lg pa-4 text-center"
              @click="chooseFiles"
            >
              <p>
                Only High Resolution daylight images with no effect in JPEG
                format.
              </p>
              <v-icon x-large>mdi-upload</v-icon>
              <p class="text-h6 mt-2">Click here to Upload</p>
              <v-file-input
                v-show="hidden"
                id="fileUpload"
                multiple
                accept="image/jpeg,video/*"
                @change="upload"
              ></v-file-input>
            </div>
            <div v-else class="elevation-3 rounded-lg pa-4 text-center">
              <v-progress-linear color="light-blue" indeterminate>
              </v-progress-linear>
            </div>
            <v-container
              v-if="(uploaded === total && total > 0) || isUpdate"
              class="elevation-3 rounded-lg my-3"
            >
              <div class="image-carousal">
                <div
                  v-for="(image, i) of review.images"
                  :key="i"
                  class="d-flex justify-center align-center mb-3 mx-auto mx-md-1"
                  style="width: 120px; height: 120px; cursor: pointer"
                >
                  <img
                    style="object-fit: cover"
                    width="120"
                    height="120"
                    :src="$axios.defaults.baseURL + 'uploads/' + image.name"
                    alt="itemImage"
                  />
                  <div class="image-overlay">
                    <v-btn
                      icon
                      outlined
                      aria-hidden="true"
                      color="white"
                      @click="openImage(image.name)"
                    >
                      <v-icon>mdi-magnify-plus-outline</v-icon>
                    </v-btn>
                    <v-btn
                      icon
                      outlined
                      aria-hidden="true"
                      color="white"
                      @click="deleteMedia(image, true)"
                    >
                      <v-icon>mdi-delete-outline</v-icon>
                    </v-btn>
                  </div>
                </div>
                <div
                  v-for="(video, i) of review.videos"
                  :key="'A' + i"
                  class="d-flex justify-center align-center mb-3 mx-auto mx-md-1"
                  style="width: 120px; height: 120px; cursor: pointer"
                >
                  <video
                    style="object-fit: cover"
                    width="120"
                    height="120"
                    :poster="
                      $axios.defaults.baseURL +
                      'uploads/' +
                      video.thumbnail.name
                    "
                    :src="$axios.defaults.baseURL + 'uploads/' + video.name"
                    alt="itemImage"
                  />
                  <div class="image-overlay">
                    <v-btn
                      icon
                      outlined
                      aria-hidden="true"
                      color="white"
                      @click="openVideo(video.name)"
                    >
                      <v-icon>mdi-magnify-plus-outline</v-icon>
                    </v-btn>
                    <v-btn
                      icon
                      outlined
                      aria-hidden="true"
                      color="white"
                      @click="deleteMedia(video, false)"
                    >
                      <v-icon>mdi-delete-outline</v-icon>
                    </v-btn>
                  </div>
                </div>
              </div>
            </v-container>
            <div class="text-h6 pa-2">Write Your Review</div>
            <v-textarea
              v-model="review.review"
              flat
              placeholder="Review About Product"
              solo
              class="elevation-3 rounded-lg"
              counter="1200"
              :rules="[required]"
              auto-grow
            ></v-textarea>
          </div>
        </v-container>
        <v-container class="sub-card">
          <div class="px-3 pt-3">
            <div class="text-h6 pa-2">Quality</div>
            <div class="d-flex px-2 py-1">
              <v-rating
                v-model="review.quality"
                background-color="gold"
                color="gold"
                length="5"
                :rules="[required]"
                large
                hover
              >
              </v-rating>
            </div>
            <div class="text-h6 pa-2">Fitting</div>
            <div class="d-flex px-2 py-1">
              <v-rating
                v-model="review.fitting"
                background-color="gold"
                color="gold"
                :rules="[required]"
                length="5"
                large
                hover
              >
              </v-rating>
            </div>
            <div class="text-h6 pa-2">Recommendation</div>
            <div class="d-flex px-3 py-2">
              <v-icon
                :color="review.recommended === true ? 'primary' : 'lightBg'"
                class="ml-2"
                large
                @click="() => (review.recommended = true)"
                >mdi-thumb-up</v-icon
              >
              <v-icon
                :color="review.recommended === false ? 'primary' : 'lightBg'"
                class="ml-3"
                large
                @click="() => (review.recommended = false)"
                >mdi-thumb-down</v-icon
              >
            </div>
            <div class="text-h6 pa-2">Comments</div>
            <div class="text-subtitle-2 font-weight-bold pa-2">
              What do you like best about this product?
            </div>
            <v-textarea
              v-model="review.reason"
              flat
              placeholder="Review About Product"
              solo
              :rules="[required]"
              class="elevation-3 rounded-lg"
              auto-grow
            ></v-textarea>

            <div class="text-subtitle-2 font-weight-bold pa-2">
              Any Recommendations to improve this product?
            </div>
            <v-textarea
              v-model="review.recommendation"
              flat
              placeholder="Any Suggestions"
              solo
              :rules="[required]"
              class="elevation-3 rounded-lg"
              auto-grow
            ></v-textarea>
            <div class="text-subtitle-2 font-weight-bold pa-2">
              Tell us what you would like to receive next?
            </div>
            <v-textarea
              v-model="review.request"
              flat
              placeholder="Your next product"
              solo
              :rules="[required]"
              class="elevation-3 rounded-lg"
              auto-grow
            ></v-textarea>
            <v-btn
              :disabled="uploadLoader"
              class="my-3"
              color="primary"
              block
              x-large
              @click="publish"
            >
              {{ isUpdate ? 'UPDATE' : 'PUBLISH' }}
            </v-btn>
          </div>
        </v-container>
      </v-card>
    </v-form>
    <v-dialog v-model="imagePreview" width="90%" @click:outside="closePreview">
      <div style="width: 100%">
        <v-icon large color="white" class="close-icon" @click="closePreview"
          >mdi-close</v-icon
        >
        <img
          width="100%"
          :src="$axios.defaults.baseURL + 'uploads/' + src"
          alt="image-preview"
          style="object-fit: cover"
        />
      </div>
    </v-dialog>
    <v-dialog v-model="videoPreview" width="90%" @click:outside="closePreview">
      <div>
        <v-icon large color="white" class="close-icon" @click="closePreview"
          >mdi-close</v-icon
        >
        <video
          width="100%"
          controls
          class="video-preview"
          style="object-fit: cover"
        >
          <source :src="$axios.defaults.baseURL + 'uploads/' + src" />
        </video>
      </div>
    </v-dialog>
  </v-container>
</template>

<script>
import { required } from '@/common/utils/validators'
import { Submission } from '@/models/submission'
import { Review } from '@/models/review'
import UploadFilesService from '@/common/utils/UploadFilesService'
export default {
  name: 'ReviewForm',
  props: {
    feed: {
      type: Submission,
      default: null,
    },
    review: {
      type: Review,
      default: () => new Review(),
    },
    isUpdate: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      imagePreview: false,
      videoPreview: false,
      src: '',
      hidden: false,
      uploadLoader: false,
      uploaded: 0,
      total: 0,
      errors: [],
      loading: false,
    }
  },
  methods: {
    required,
    returnBack() {
      this.$router.back()
    },
    getSource(item) {
      return this.$axios.defaults.baseURL + 'uploads/' + item.name
    },
    async publish() {
      if (this.$refs.form.validate()) {
        try {
          this.loading = true
          if (this.review.images.length < 3) {
            this.loading = false
            this.errors.push('Kindly add a minimum of three pictures')
          } else {
            console.log(this.review)
            this.review.submission = this.feed._id
            if (!this.isUpdate) {
              await this.$axios.post('reviews', this.review)
            } else {
              await this.$axios.patch('reviews', this.review)
            }
            this.loading = false
            this.returnBack()
          }
        } catch (err) {
          this.loading = false
          window.console.log(err)
          if (err.response) {
            this.errors.push(err.response.data.message)
          } else {
            this.errors.push('Unable to process, Try again later')
          }
        }
      }
    },
    chooseFiles() {
      document.getElementById('fileUpload').click()
    },
    upload(files) {
      console.log('upload selected files')
      this.total += files.length
      files.forEach((item) => {
        this.uploadLoader = true
        if (item.type.includes('image')) {
          UploadFilesService.upload(item, this.$axios)
            .then((response) => {
              this.uploaded += 1
              if (this.total === this.uploaded) this.uploadLoader = false
              this.review.images.push(response.data)
            })
            .catch((err) => {
              this.uploadLoader = false
              console.log(err)
            })
        } else if (item.type.includes('video')) {
          const canvas = document.createElement('canvas')
          const context = canvas.getContext('2d')
          const video = document.createElement('video')
          video.setAttribute('src', URL.createObjectURL(item))
          video.load()
          video.onloadedmetadata = async () => {
            canvas.width = video.videoWidth
            canvas.height = video.videoHeight
            video.currentTime = 15
            await video.play()
            context.drawImage(video, 0, 0)
            video.pause()
            const blob = await new Promise((resolve, reject) => {
              return canvas.toBlob(function (blob) {
                resolve(blob)
              })
            })
            // const blob = canvas.toBlob(function (blob) {
            //   return new Promise((resolve, reject) => {
            //     resolve(blob)
            //   })
            // })
            console.log(blob)
            UploadFilesService.upload(blob, this.$axios)
              .then((response) => {
                const obj = {
                  thumbnail: response.data,
                }
                UploadFilesService.upload(item, this.$axios)
                  .then((response) => {
                    this.uploaded += 1
                    if (this.total === this.uploaded) this.uploadLoader = false
                    obj.name = response.data.name
                    obj.path = response.data.path
                    this.review.videos.push(obj)
                  })
                  .catch((err) => {
                    this.uploadLoader = false
                    console.log(err)
                  })
              })
              .catch((err) => {
                this.uploadLoader = false
                console.log(err)
              })
          }
        }
      })
    },
    async deleteMedia(item, isImage) {
      if (isImage) {
        const index = this.review.images.indexOf(item)
        this.review.images.splice(index, 1)
      } else {
        const index = this.review.videos.indexOf(item)
        this.review.videos.splice(index, 1)
      }
      if (!this.isUpdate) {
        await this.$axios.post('persons/delete-image/' + item.name)
      } else {
        if (this.review.deletedImages === undefined)
          this.review.deletedImages = []
        this.review.deletedImages.push(item)
      }
    },
    closePreview() {
      this.imagePreview = false
      this.videoPreview = false
    },
    openImage(i) {
      if (i) {
        this.src = i
        this.imagePreview = true
      }
    },
    openVideo(i) {
      if (i) {
        this.src = i
        this.videoPreview = true
      }
    },
  },
}
</script>

<style scoped>
.main-card {
  width: 90%;
}
.sub-card {
  width: 50%;
}
.image-overlay {
  top: 0;
  left: 0;
  z-index: 1;
  opacity: 0;
  width: 100%;
  height: 100%;
  display: flex;
  border-right: 4px;
  position: absolute !important;
  transition: all 0.2s;
  align-items: center;
  margin: 0 !important;
  justify-content: center;
  background: rgba(0, 0, 0, 0.7);
}
.image-carousal {
  padding: 10px 5px;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.05);
  justify-content: center;
}
.image-carousal div {
  margin: 0 5px;
  position: relative;
}
.image-carousal div img {
  top: 0;
  /*position: absolute;*/
}
.close-icon {
  position: absolute;
  top: 40px;
  right: 80px;
  z-index: 1;
}
@media screen and (min-width: 992px) {
  .video-preview {
    height: 550px;
  }
}

@media (hover: hover) {
  .image-carousal div:hover .image-overlay {
    transform: scale(1);
    opacity: 1;
  }
}
@media (hover: none) {
  .image-overlay {
    opacity: 0.6;
  }
}
@media screen and (max-width: 600px) {
  .form {
    width: 100% !important;
  }
  .main-card {
    width: 100%;
  }
  .sub-card {
    width: 100%;
  }
  .image-carousal {
    height: 100% !important;
    display: block !important;
  }
  .close-icon {
    top: 50px;
    right: 30px;
  }
}
</style>
