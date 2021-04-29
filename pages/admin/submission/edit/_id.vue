<template>
  <SubmissionForm
    title="Edit Assigned Product"
    :submission="submission"
    is-update
  />
</template>

<script>
import SubmissionForm from '@/components/admin/submission/form'
export default {
  name: 'Id',
  components: { SubmissionForm },
  async asyncData({ $axios, route }) {
    return {
      submission: await $axios.$get('submissions/' + route.params.id),
    }
  },
}
</script>

<style scoped></style>
