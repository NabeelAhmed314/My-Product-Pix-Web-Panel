<template>
  <ProductForm title="Edit Product" :product="product" is-update />
</template>

<script>
import ProductForm from '@/components/admin/product/form'
export default {
  name: 'Id',
  components: { ProductForm },
  async asyncData({ $axios, route }) {
    return {
      product: await $axios.$get('products/' + route.params.id),
    }
  },
}
</script>

<style scoped></style>
