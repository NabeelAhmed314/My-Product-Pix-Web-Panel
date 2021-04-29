<template>
  <v-container>
    <v-icon v-if="back" class="my-2" @click="returnBack">mdi-arrow-left</v-icon>
    <v-card>
      <v-container
        class="d-block d-sm-flex align-center text-center text-sm-left"
      >
        <div>
          <v-avatar size="120" class="mx-auto mx-sm-3">
            <img
              alt="person"
              style="object-fit: cover"
              :src="$axios.defaults.baseURL + 'uploads/' + user.image.name"
            />
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
    <div class="my-3 text-h6">Photos</div>
    <v-container>
      <v-row>
        <v-col
          v-for="image in reviewImages"
          :key="image"
          cols="12"
          md="3"
          sm="6"
        >
          <img
            alt="person"
            width="100%"
            height="200px"
            style="object-fit: cover"
            :src="$axios.defaults.baseURL + 'uploads/' + image.name"
          />
        </v-col>
      </v-row>
    </v-container>
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
    }
  },
  mounted() {
    this.getReviewImages()
  },
  methods: {
    returnBack() {
      this.$router.back()
    },
    async getReviewImages() {
      this.reviewImages = await this.$axios.$get(
        '/reviews/images/' + this.user._id
      )
    },
  },
}
</script>

<style scoped></style>
