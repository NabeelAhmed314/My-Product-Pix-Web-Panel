<template>
  <v-container>
    <BrandMain />
  </v-container>
</template>

<script>
import BrandMain from '@/components/admin/brand/main'
export default {
  name: 'Index',
  components: { BrandMain },
  middleware: 'isAdmin',
}
</script>

<style scoped></style>
