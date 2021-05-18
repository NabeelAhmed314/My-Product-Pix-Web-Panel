<template>
  <div>
    <div style="position: absolute; top: 30px; left: 30px">
      <v-icon @click="() => $router.back()">mdi-arrow-left</v-icon>
    </div>
    <FamilyForm title="Edit Family Profile" is-update :family="family" />
  </div>
</template>

<script>
import FamilyForm from '@/components/customer/family/form'
export default {
  name: 'Id',
  components: { FamilyForm },
  async asyncData({ $axios, route }) {
    return {
      family: await $axios.$get('family/' + route.params.id),
    }
  },
}
</script>

<style scoped></style>
