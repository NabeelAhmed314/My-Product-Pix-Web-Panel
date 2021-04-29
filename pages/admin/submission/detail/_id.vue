<template>
  <SubmissionDetail :submission="submission" :review="review" />
</template>

<script>
import SubmissionDetail from '@/components/admin/submission/detail'
export default {
  name: 'Id',
  components: { SubmissionDetail },
  async asyncData({ $axios, route }) {
    return {
      submission: await $axios.$get('submissions/' + route.params.id),
      review: await $axios.$get('reviews/submission/' + route.params.id),
    }
  },
}
</script>

<style scoped></style>
