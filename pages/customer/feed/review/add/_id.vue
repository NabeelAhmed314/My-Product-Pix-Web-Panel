<template>
  <ReviewForm :feed="feed" />
</template>

<script>
import ReviewForm from '@/components/customer/feed/review/form'
export default {
  name: 'Add',
  components: { ReviewForm },
  async asyncData({ $axios, route }) {
    return {
      feed: await $axios.$get('submissions/' + route.params.id),
    }
  },
}
</script>

<style scoped></style>
