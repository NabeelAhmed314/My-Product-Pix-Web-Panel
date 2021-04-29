<template>
  <v-container>
    <ProductMain />
  </v-container>
</template>

<script>
import ProductMain from '@/components/admin/product/main'
export default {
  name: 'Index',
  components: { ProductMain },
  middleware: 'isAdmin',
}
</script>

<style scoped></style>
