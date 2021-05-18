<template>
  <v-container>
    <div v-if="submissions.length > 0" class="d-flex pb-3">
      <v-spacer />
      <v-avatar v-if="$vuetify.breakpoint.mdAndUp" rounded class="elevation-1">
        <v-icon @click="toggle">{{
          isGrid ? 'mdi-format-list-bulleted-square' : 'mdi-view-grid-outline'
        }}</v-icon>
      </v-avatar>
    </div>
    <v-row v-if="submissions.length > 0">
      <v-col
        v-for="(submission, i) of submissions"
        :key="i"
        cols="12"
        :md="md"
        style="cursor: pointer"
      >
        <v-card
          class="rounded-lg"
          :to="'/customer/feed/detail/' + submission._id"
        >
          <div class="d-flex pa-4">
            <v-icon
              v-if="submission.status !== 0 && submission.status !== 1"
              :color="submission.status === 2 ? 'green' : 'primary'"
              style="position: absolute; top: 20px; right: 20px"
              >{{
                submission.status === 2
                  ? 'mdi-check-circle'
                  : 'mdi-close-circle'
              }}</v-icon
            >
            <v-avatar
              size="100"
              color="white"
              class="elevation-2 rounded-xl mx-2"
              rounded
              ><v-icon v-if="submission.product.images.length <= 0"
                >mdi-image</v-icon
              >
              <img
                v-else
                alt="submission"
                :src="
                  $axios.defaults.baseURL +
                  'uploads/' +
                  submission.product.images[0].name
                "
                style="object-fit: cover; object-position: center"
            /></v-avatar>
            <div class="mx-2 my-auto">
              <div class="primary--text text-h6">
                {{ submission.product.name }}
              </div>
              <div class="text-body-2">
                {{ submission.product.description }}
              </div>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <div v-else>No Data Available</div>
  </v-container>
</template>

<script>
export default {
  name: 'FeedTile',
  props: {
    submissions: {
      type: Array,
      default: null,
    },
  },
  data: () => ({ isGrid: true, md: 6 }),
  methods: {
    toggle() {
      if (this.isGrid) this.md = 12
      else this.md = 6

      this.isGrid = !this.isGrid
    },
  },
}
</script>

<style scoped></style>
