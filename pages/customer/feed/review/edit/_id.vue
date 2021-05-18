<template>
  <ReviewForm :feed="feed" :review="review" is-update />
</template>

<script>
import ReviewForm from '@/components/customer/feed/review/form'
export default {
  name: 'Id',
  components: { ReviewForm },
  async asyncData({ $axios, route }) {
    return {
      feed: await $axios.$get('submissions/' + route.params.id),
      review: await $axios.$get('reviews/submission/' + route.params.id),
    }
  },
}
</script>

<style scoped></style>
