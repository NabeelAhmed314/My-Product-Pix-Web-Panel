<template>
  <BrandForm title="Edit Person" :person="person" is-update />
</template>

<script>
import BrandForm from '@/components/admin/brand/form'
export default {
  name: 'Id',
  components: { BrandForm },
  middleware: 'isAdmin',
  async asyncData({ $axios, route }) {
    return {
      person: await $axios.$get('persons/' + route.params.id),
    }
  },
}
</script>

<style scoped></style>
