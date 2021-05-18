<template>
  <div class="pa-5" style="max-width: 100%">
    <v-row>
      <v-col cols="12" md="5">
        <div style="width: 100%; max-width: 100%">
          <div
            style="width: 95%; overflow: hidden; height: 400px"
            class="rounded-lg elevation-2 mx-auto"
          >
            <img
              width="100%"
              height="100%"
              :src="selectedUrl"
              style="object-fit: cover"
              alt="feed"
            />
          </div>
          <div
            v-if="feed.product.images.length > 0"
            class="d-flex mx-auto my-4 align-center"
            style="max-width: 1200px; width: 90%"
          >
            <div
              id="scroll-container"
              class="d-flex"
              style="
                overflow-x: scroll;
                scroll-snap-type: x mandatory;
                scroll-padding: 30%;
              "
            >
              <div
                v-for="(slide, i) of feed.product.images"
                :key="i"
                class="opacity mr-4 rounded-lg"
                style="
                  width: 30%;
                  min-width: 30%;
                  scroll-snap-align: center;
                  height: 100px;
                  overflow: hidden;
                "
              >
                <img
                  :src="$axios.defaults.baseURL + 'uploads/' + slide.name"
                  style="
                    width: 100%;
                    height: 100%;
                    cursor: pointer;
                    object-fit: cover;
                  "
                  alt="slide"
                  @click="changeSelected(slide)"
                />
              </div>
            </div>
          </div>
          <div
            v-if="feed.product.images.length > 3"
            style="width: 90%"
            class="mx-4"
          >
            <v-icon @click="scroll(false)">mdi-arrow-left</v-icon>
            <v-icon @click="scroll(true)">mdi-arrow-right</v-icon>
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="7" class="pa-md-7">
        <div class="d-flex">
          <h2>{{ feed.product.name }}</h2>
          <v-spacer />
          <p style="margin: 0; line-height: 2">{{ feed.product.sku }}</p>
        </div>
        <h4>
          {{
            feed.product.category ? feed.product.category.title : 'No Category'
          }}
        </h4>
        <p>{{ feed.product.description }}</p>
        <div v-if="feed.status === 0" class="my-9">
          <CountDownTimer :date="getLimit(feed.createdAt)" />
        </div>
        <v-btn
          v-if="feed.status === 0"
          block
          x-large
          color="primary"
          :to="'/customer/feed/review/add/' + feed._id"
          >ADD MY PIX</v-btn
        >
        <v-btn
          v-if="feed.status === 1 || feed.status === 2"
          block
          x-large
          color="primary"
          :to="'/customer/feed/review/detail/' + feed._id"
          >VIEW MY PIX</v-btn
        >
        <v-btn
          v-if="feed.status === 3"
          block
          x-large
          color="primary"
          :to="'/customer/feed/review/edit/' + feed._id"
          >EDIT MY PIX</v-btn
        >
      </v-col>
    </v-row>
  </div>
</template>

<script>
import moment from 'moment'
import { Submission } from '@/models/submission'
import CountDownTimer from '@/components/helper/countDownTimer'

export default {
  name: 'FeedDetail',
  components: { CountDownTimer },
  props: {
    feed: {
      type: Submission,
      default: () => new Submission(),
    },
  },
  data() {
    return {
      selectedUrl: null,
    }
  },
  mounted() {
    if (this.feed.product.images.length > 0) {
      this.selectedUrl =
        this.$axios.defaults.baseURL +
        'uploads/' +
        this.feed.product.images[0].name
    } else {
      this.selectedUrl = '/images/black-logo.png'
    }
  },
  methods: {
    changeSelected(url) {
      this.selectedUrl = this.$axios.defaults.baseURL + 'uploads/' + url.name
    },
    scroll(next) {
      if (next) document.getElementById('scroll-container').scrollBy(140, 0)
      else document.getElementById('scroll-container').scrollBy(-20, 0)
    },
    getLimit(date) {
      return moment(date).add(3, 'days')
    },
  },
}
</script>

<style scoped>
.opacity {
  opacity: 0.6;
}
.opacity:hover {
  opacity: 1;
}
</style>
