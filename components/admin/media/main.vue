<template>
  <v-container>
    <v-tabs
      v-model="tab"
      class="elevation-1 my-1"
      background-color="white"
      color="primary"
    >
      <v-tab>Photos</v-tab>
      <v-tab>Videos</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <MediaImage />
      </v-tab-item>
      <v-tab-item>
        <MediaVideo />
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import MediaImage from '@/components/admin/media/image'
import MediaVideo from '@/components/admin/media/video'
export default {
  name: 'MediaMain',
  components: { MediaVideo, MediaImage },
  data() {
    return {
      tab: null,
    }
  },
  methods: {},
}
</script>

<style scoped></style>
