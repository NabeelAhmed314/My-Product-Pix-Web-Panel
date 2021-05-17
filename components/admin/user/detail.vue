<template>
  <v-container>
    <v-icon v-if="back" class="my-2" @click="returnBack">mdi-arrow-left</v-icon>
    <v-card>
      <v-container
        class="d-block d-sm-flex align-center text-center text-sm-left"
      >
        <div>
          <v-avatar size="120" class="mx-auto mx-sm-3 elevation-1">
            <img
              v-if="user.image"
              alt="person"
              style="object-fit: cover"
              :src="$axios.defaults.baseURL + 'uploads/' + user.image.name"
            />
            <v-icon v-else>mdi-account</v-icon>
          </v-avatar>
        </div>
        <div>
          <div class="d-block d-sm-flex">
            <div class="mx-3 my-4 my-sm-0">
              <div class="text-h6">{{ user.name }}</div>
              <div class="text-subtitle-1">{{ user.username }}</div>
            </div>
            <div class="mx-3 my-4 my-sm-0">
              <div class="text-subtitle-1">{{ user.phone }}</div>
              <div class="text-subtitle-2">{{ user.address }}</div>
            </div>
            <div class="mx-3 my-4 my-sm-0">
              <div class="text-subtitle-1">
                <span class="font-weight-bold">T-Shirt Size:</span>
                {{ user.size }}
              </div>
              <div class="text-subtitle-2">
                <span class="font-weight-bold">Style: </span>{{ user.style }}
              </div>
            </div>
          </div>
          <div class="d-block d-sm-flex">
            <div v-if="user.interests.length > 0" class="mx-3 my-4 my-sm-0">
              <div class="text-h6 mb-2">Interests</div>
              <v-chip
                v-for="index in user.interests"
                :key="'A' + index"
                class="ma-1"
                >{{ index }}</v-chip
              >
            </div>
            <div v-if="user.films.length > 0" class="mx-3 my-4 my-sm-0">
              <div class="text-h6 mb-2">Favorite Films</div>
              <v-chip
                v-for="index in user.films"
                :key="'B' + index"
                class="ma-1"
                >{{ index }}</v-chip
              >
            </div>
            <div v-if="user.characters.length > 0" class="mx-3 my-4 my-sm-0">
              <div class="text-h6 mb-2">Favorite Characters</div>
              <v-chip
                v-for="index in user.characters"
                :key="'C' + index"
                class="ma-1"
                >{{ index }}</v-chip
              >
            </div>
          </div>
        </div>
      </v-container>
    </v-card>
    <v-tabs
      v-model="tab"
      class="elevation-1 my-3"
      background-color="white"
      color="primary"
    >
      <v-tab> Photos </v-tab>
      <v-tab> Videos </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-container>
          <v-row v-if="images.length > 0">
            <v-col v-for="image in images" :key="image" cols="12" md="3" sm="6">
              <img
                alt="person"
                width="100%"
                height="200px"
                style="object-fit: cover; min-height: 200px"
                :src="$axios.defaults.baseURL + 'uploads/' + image.name"
              />
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col>
              <p v-if="!loader">No Images Yet!</p>
              <v-progress-circular v-else indeterminate></v-progress-circular>
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>
      <v-tab-item>
        <v-container>
          <v-row v-if="videos.length > 0">
            <v-col v-for="video in videos" :key="video" cols="12" md="3" sm="6">
              <video
                width="100%"
                height="200px"
                controls
                style="object-fit: cover"
                :poster="
                  $axios.defaults.baseURL + 'uploads/' + video.thumbnail.name
                "
              >
                <source
                  :src="$axios.defaults.baseURL + 'uploads/' + video.name"
                />
              </video>
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col>
              <p v-if="!loader">No Videos Yet!</p>
              <v-progress-circular v-else indeterminate></v-progress-circular>
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import { Person } from '@/models/person'

export default {
  name: 'UserDetail',
  props: {
    user: {
      type: Person,
      default: null,
    },
    back: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      reviewImages: [],
      images: [],
      videos: [],
      tab: null,
      loader: false,
    }
  },
  async mounted() {
    console.log(this.user)
    this.loader = true
    await this.getReviewImages()
    this.loader = false
  },
  methods: {
    returnBack() {
      this.$router.back()
    },
    async getReviewImages() {
      this.reviewImages = await this.$axios.$get(
        '/reviews/media/' + this.user._id
      )
      console.log(this.reviewImages)
      this.images = this.reviewImages.media.slice(0, this.reviewImages.count)
      // for (let i = 0; i < this.reviewImages.count; i++) {
      console.log(this.images)
      this.videos = this.reviewImages.media.slice(
        this.reviewImages.count,
        this.reviewImages.media.length
      )
      console.log(this.videos)
    },
  },
}
</script>

<style scoped></style>
