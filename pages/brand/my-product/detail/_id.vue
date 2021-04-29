<template>
  <BrandProductDetail title="Product Detail" :product="product" is-update />
</template>

<script>
import BrandProductDetail from '@/components/brand/detail'
export default {
  name: 'Id',
  components: { BrandProductDetail },
  async asyncData({ $axios, route }) {
    return {
      product: await $axios.$get('products/' + route.params.id),
    }
  },
}
</script>

<style scoped></style>
