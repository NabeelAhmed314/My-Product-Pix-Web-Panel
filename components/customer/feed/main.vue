<template>
  <div>
    <v-container>
      <v-tabs
        v-model="tab"
        class="elevation-1"
        background-color="white"
        color="primary"
      >
        <v-tab> Assigned </v-tab>
        <v-tab> Reviewed </v-tab>
      </v-tabs>
    </v-container>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <div class="px-3">
          <FeedTile title="Assigned" :submissions="assigned" />
        </div>
      </v-tab-item>
      <v-tab-item>
        <div class="px-3">
          <FeedTile title="Reviewed" :submissions="reviewed" />
        </div>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import FeedTile from '@/components/customer/feed/feed'
export default {
  name: 'FeedMain',
  components: {
    FeedTile,
  },
  data: () => ({ tab: null, assigned: [], reviewed: [] }),
  mounted() {
    this.getSubmissions()
  },
  methods: {
    async getSubmissions() {
      this.assigned = await this.$axios.$get(
        'submissions/status/0/' + this.$auth.user._id
      )
      this.reviewed = await this.$axios.$get(
        'submissions/status/5/' + this.$auth.user._id
      )
    },
  },
}
</script>

<style scoped></style>
