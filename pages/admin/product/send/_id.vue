<template>
  <SubmissionForm title="Send Product" single-product :product-id="productId" />
</template>

<script>
import SubmissionForm from '@/components/admin/submission/form'
export default {
  name: 'Id',
  components: { SubmissionForm },
  asyncData({ route }) {
    return {
      productId: route.params.id,
    }
  },
}
</script>

<style scoped></style>
