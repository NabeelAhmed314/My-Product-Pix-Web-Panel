<template>
  <v-container class="fill-height">
    <v-row v-if="images.length > 0">
      <v-col
        v-for="(image, i) in images"
        :key="i"
        cols="12"
        md="3"
        sm="6"
        class="rounded-lg overflow-hidden"
        style="height: 200px; position: relative"
      >
        <img
          alt="person"
          width="100%"
          height="100%"
          style="object-fit: cover"
          class="rounded-lg"
          :src="$axios.defaults.baseURL + 'uploads/' + image.name"
        />
        <div class="image-overlay rounded-lg">
          <v-btn
            icon
            outlined
            color="white"
            aria-hidden="true"
            style="margin-right: 10px"
            @click="shareImage(image.name)"
          >
            <v-icon>mdi-share</v-icon>
          </v-btn>
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
        <p v-if="!loader">No Images Yet!</p>
        <v-progress-circular v-else indeterminate></v-progress-circular>
      </v-col>
    </v-row>
    <v-dialog v-model="imagePreview" width="90%" @click:outside="closePreview">
      <img
        :src="$axios.defaults.baseURL + 'uploads/' + src"
        alt="image-preview"
        style="object-fit: cover"
      />
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: 'MediaImage',
  data() {
    return {
      images: [],
      loader: false,
      page: 1,
      trigger: false,
      imagePreview: false,
      src: '',
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
    await this.getReviewImages()
    this.loader = false
  },
  methods: {
    closePreview() {
      this.imagePreview = false
    },
    async getReviewImages() {
      this.images = await this.$axios.$get('/reviews/media-all/' + this.page)
    },
    async handleScroll() {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 25 &&
        !this.trigger
      ) {
        this.trigger = true
        this.page++
        const images = await this.$axios.$get('/reviews/media-all/' + this.page)
        if (images.length > 0) {
          this.images.push(...images)
          this.trigger = false
        } else {
          this.trigger = false
          window.removeEventListener('scroll', this.handleScroll)
        }
      }
    },
    openImage(i) {
      if (i) {
        this.src = i
        this.imagePreview = true
      }
    },
    shareImage(i) {
      if (i) {
        window.localStorage.setItem('shareSrc', i)
        this.$router.push(
          window.localStorage.getItem('code') !== null
            ? '/admin/instagram?code=' + window.localStorage.getItem('code')
            : '/admin/instagram'
        )
      }
    },
  },
}
</script>

<style scoped>
.image-overlay {
  top: 0;
  left: 0;
  z-index: 5;
  opacity: 0;
  width: calc(100% - 25px);
  height: calc(100% - 25px);
  display: flex;
  position: absolute !important;
  transition: all 0.2s;
  align-items: center;
  margin: 12px !important;
  justify-content: center;
  background: rgba(0, 0, 0, 0.7);
}
@media (hover: hover) {
  .image-overlay:hover {
    transform: scale(1);
    opacity: 1;
  }
}
@media (hover: none) {
  .image-overlay {
    opacity: 0.6;
  }
}
</style>
