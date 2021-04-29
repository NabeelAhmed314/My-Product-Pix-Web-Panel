<template>
  <v-container>
    <BrandProductReviews :id="id" />
  </v-container>
</template>

<script>
import BrandProductReviews from '@/components/brand/reviews'
export default {
  name: 'Id',
  components: { BrandProductReviews },
  asyncData({ route }) {
    return {
      id: route.params.id,
    }
  },
}
</script>

<style scoped></style>
