<template>
  <v-container class="fill-height">
    <v-row v-if="videos.length > 0">
      <v-col
        v-for="(video, i) in videos"
        :key="i"
        cols="12"
        md="3"
        sm="6"
        class="rounded-lg overflow-hidden"
        style="height: 200px"
      >
        <video
          width="100%"
          height="100%"
          controls
          class="rounded-lg"
          style="object-fit: cover"
          :poster="$axios.defaults.baseURL + 'uploads/' + video.thumbnail.name"
        >
          <source :src="$axios.defaults.baseURL + 'uploads/' + video.name" />
        </video>
      </v-col>
      <v-col
        v-if="trigger"
        cols="12"
        md="3"
        sm="6"
        class="d-flex justify-center align-center"
      >
        <v-progress-circular
          class="mx-auto my-0"
          indeterminate
        ></v-progress-circular>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col class="d-flex justify-center align-center">
        <p v-if="!loader">No Videos Yet!</p>
        <v-progress-circular v-else indeterminate></v-progress-circular>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'MediaVideo',
  data() {
    return {
      videos: [],
      loader: false,
      page: 1,
      trigger: false,
    }
  },
  beforeMount() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  async mounted() {
    this.loader = true
    await this.getReviewVideos()
    this.loader = false
  },
  methods: {
    async getReviewVideos() {
      this.videos = await this.$axios.$get('/reviews/videos/' + this.page)
    },
    async handleScroll() {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 25 &&
        !this.trigger
      ) {
        this.trigger = true
        this.page++
        const videos = await this.$axios.$get('/reviews/media-all/' + this.page)
        if (videos.length > 0) {
          this.videos.push(...videos)
          this.trigger = false
        } else {
          this.trigger = false
          window.removeEventListener('scroll', this.handleScroll)
        }
      }
    },
  },
}
</script>

<style scoped></style>
