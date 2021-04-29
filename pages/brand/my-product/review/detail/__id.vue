<template>
  <SubmissionDetail :submission="submission" :review="review" />
</template>

<script>
import SubmissionDetail from '@/components/admin/submission/detail'
export default {
  name: 'Id',
  components: { SubmissionDetail },
  async asyncData({ $axios, route }) {
    const review = await $axios.$get('reviews/' + route.params._id)
    console.log(route.params._id)
    const submission = review.submission
    console.log(submission)
    return {
      review,
      submission,
    }
  },
}
</script>

<style scoped></style>
