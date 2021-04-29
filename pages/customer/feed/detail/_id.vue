<template>
  <FeedDetail />
</template>

<script>
import FeedDetail from '@/components/customer/feed/detail'
export default {
  name: 'Id',
  components: { FeedDetail },
  async asyncData({ $axios, route }) {
    return {
      feed: await $axios.$get('submissions/' + route.params.id),
    }
  },
}
</script>

<style scoped></style>
