<template>
  <v-container>
    <v-card class="d-block d-md-flex main-card mx-auto">
      <v-container class="sub-card">
        <div><v-icon @click="returnBack">mdi-arrow-left</v-icon></div>
        <div class="d-flex px-3 pt-3">
          <v-avatar size="90" class="elevation-3 rounded-xl">
            <img
              v-if="submission.product.images.length >= 1"
              alt="product"
              :src="
                $axios.defaults.baseURL +
                'uploads/' +
                submission.product.images[0].name
              "
              width="100%"
            />
            <v-icon v-else color="primary" large>mdi-image-multiple</v-icon>
          </v-avatar>
          <div>
            <v-card-title>{{ submission.product.name }}</v-card-title>
            <v-card-subtitle>{{
              submission.product.description
            }}</v-card-subtitle>
          </div>
        </div>
        <div v-if="isAdmin" class="d-flex px-3 pt-3">
          <v-avatar size="90" class="elevation-3 rounded-xl">
            <img
              v-if="submission.person.image"
              alt="isAdmin"
              :src="
                $axios.defaults.baseURL +
                'uploads/' +
                submission.person.image.name
              "
              width="100%"
            />
            <v-icon v-else color="primary" large>mdi-image</v-icon>
          </v-avatar>
          <div>
            <v-card-title>{{ submission.person.name }}</v-card-title>
            <v-card-subtitle>{{ submission.person.username }}</v-card-subtitle>
          </div>
        </div>
        <div class="px-3 pt-3">
          <div class="text-h6 pa-2">Photos & Videos</div>
          <v-container
            v-if="
              (review.images || review.videos) &&
              (review.images.length > 0 || review.videos.length > 0)
            "
            class="elevation-3"
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
                    $axios.defaults.baseURL + 'uploads/' + video.thumbnail.name
                  "
                  :src="$axios.defaults.baseURL + 'uploads/' + video.name"
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
                </div>
              </div>
            </div>
          </v-container>
          <div class="text-h6 pa-2">Review</div>
          <div v-if="review" class="elevation-3">
            <v-card-text>{{ review.review }}</v-card-text>
          </div>
          <div v-else class="px-3">Not Yet Reviewed</div>
        </div>
      </v-container>
      <v-container class="sub-card">
        <div class="px-3 pt-3">
          <div class="text-h6 pa-2">Quality</div>
          <div v-if="review" class="d-flex px-2 py-1">
            <v-icon
              v-for="index in review.quality"
              :key="'B' + index"
              color="gold"
              class="ml-1"
              large
              >mdi-star</v-icon
            >
            <v-icon
              v-for="index in 5 - review.quality"
              :key="'C' + index"
              color="lightBg"
              class="ml-1"
              large
              >mdi-star</v-icon
            >
          </div>
          <div v-else class="px-3">Not Yet Reviewed</div>
          <div class="text-h6 pa-2">Fitting</div>
          <div v-if="review" class="d-flex px-3 py-2">
            <v-icon
              v-for="index in review.fitting"
              :key="'D' + index"
              color="gold"
              class="ml-1"
              large
              >mdi-star</v-icon
            >
            <v-icon
              v-for="index in 5 - review.fitting"
              :key="'E' + index"
              color="lightBg"
              class="ml-1"
              large
              >mdi-star</v-icon
            >
          </div>
          <div v-else class="px-3">Not Yet Reviewed</div>
          <div class="text-h6 pa-2">Recommendation</div>
          <div v-if="review" class="d-flex px-3 py-2">
            <v-icon
              :color="review.recommended ? 'primary' : 'lightBg'"
              class="ml-2"
              large
              >mdi-thumb-up</v-icon
            >
            <v-icon
              :color="!review.recommended ? 'primary' : 'lightBg'"
              class="ml-3"
              large
              >mdi-thumb-down</v-icon
            >
          </div>
          <div v-else class="px-3">Not Yet Reviewed</div>
          <div class="text-h6 pa-2">Comments</div>
          <div class="text-subtitle-2 font-weight-bold pa-2">About Product</div>
          <div v-if="review" class="elevation-3">
            <v-card-text>{{ review.reason }}</v-card-text>
          </div>
          <div v-else class="px-3">Not Yet Reviewed</div>

          <div class="text-subtitle-2 font-weight-bold pa-2">
            Recommendations
          </div>
          <div v-if="review" class="elevation-3">
            <v-card-text>{{ review.recommendation }}</v-card-text>
          </div>
          <div v-else class="px-3">Not Yet Reviewed</div>
          <div class="text-subtitle-2 font-weight-bold pa-2">Next</div>
          <div v-if="review" class="elevation-3">
            <v-card-text>{{ review.request }}</v-card-text>
          </div>
          <div v-else class="px-3">Not Yet Reviewed</div>
        </div>
        <div
          v-if="review && submission.status === 1 && isAdmin"
          class="px-3 pt-3"
        >
          <v-row>
            <v-col cols="12" md="6">
              <v-btn block color="primary" x-large @click="rejectItem"
                >Reject</v-btn
              >
            </v-col>
            <v-col cols="12" md="6">
              <v-btn
                block
                color="green white--text"
                x-large
                @click="approveItem"
                >Approve</v-btn
              ></v-col
            >
          </v-row>
        </div>
      </v-container>
    </v-card>
    <v-snackbar
      v-model="snackbar"
      bottom
      :color="snackbarColor"
      :timeout="1500"
    >
      {{ snackbarText }}
    </v-snackbar>
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
import { Submission } from '@/models/submission'
import { Review } from '@/models/review'
export default {
  name: 'SubmissionDetail',
  props: {
    submission: {
      type: Submission,
      default: null,
    },
    review: {
      type: Review,
      default: null,
    },
    isAdmin: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      snackbarText: 'Success!',
      snackbarColor: 'green',
      snackbar: false,
      imagePreview: false,
      videoPreview: false,
      src: '',
    }
  },
  methods: {
    returnBack() {
      this.$router.back()
    },
    getSource(item) {
      return this.$axios.defaults.baseURL + 'uploads/' + item.name
    },
    async approveItem() {
      if (confirm('Are you sure?')) {
        const data = {
          status: '2',
          submission: this.submission._id,
        }
        await this.$axios.$patch('/submissions/update-status', data)
        this.onAccepted()
        const delay = setInterval(() => {
          clearInterval(delay)
          this.$router.back()
        }, 1600)
      }
    },
    async rejectItem() {
      if (confirm('Are you sure?')) {
        const data = {
          status: '3',
          submission: this.submission._id,
        }
        await this.$axios.$patch('/submissions/update-status', data)
        this.onRejected()
        const delay = setInterval(() => {
          clearInterval(delay)
          this.$router.back()
        }, 1600)
      }
    },
    onRejected() {
      window.console.log(this.snackbarText)
      window.console.log(this.snackbar)
      this.snackbarColor = 'red'
      this.snackbarText = 'Successfully Rejected Review!'
      this.snackbar = true
    },
    onAccepted() {
      window.console.log(this.snackbarText)
      window.console.log(this.snackbar)
      this.snackbarColor = 'green'
      this.snackbarText = 'Successfully Approved Review!'
      this.snackbar = true
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
