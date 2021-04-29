<template>
  <v-container>
    <BrandProduct />
  </v-container>
</template>

<script>
import BrandProduct from '@/components/brand/products'
export default {
  name: 'Index',
  components: { BrandProduct },
  middleware: 'isBrand',
}
</script>

<style scoped></style>
