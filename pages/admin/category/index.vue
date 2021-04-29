<template>
  <v-container>
    <CategoryMain />
  </v-container>
</template>

<script>
import CategoryMain from '@/components/admin/category/main'
export default {
  name: 'Index',
  components: { CategoryMain },
  middleware: 'isAdmin',
}
</script>

<style scoped></style>
