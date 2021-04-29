<template>
  <CategoryForm title="Edit Category" :category="category" is-update />
</template>

<script>
import CategoryForm from '@/components/admin/category/form'
export default {
  name: 'Id',
  components: { CategoryForm },
  async asyncData({ $axios, route }) {
    return {
      category: await $axios.$get('category/' + route.params.id),
    }
  },
}
</script>

<style scoped></style>
