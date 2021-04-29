<template>
  <v-container>
    <SubmissionMain />
  </v-container>
</template>

<script>
import SubmissionMain from '@/components/admin/submission/main'
export default {
  name: 'Index',
  components: { SubmissionMain },
  middleware: 'isAdmin',
}
</script>

<style scoped></style>
