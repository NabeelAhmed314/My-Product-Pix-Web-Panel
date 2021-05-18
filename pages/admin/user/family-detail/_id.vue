<template>
  <div>
    <div style="position: absolute; top: 30px; left: 30px">
      <v-icon @click="() => $router.back()">mdi-arrow-left</v-icon>
    </div>
    <FamilyDetail title="Family Profile" :family="family" />
  </div>
</template>

<script>
import FamilyDetail from '@/components/admin/user/family-detail'
export default {
  name: 'Id',
  components: { FamilyDetail },
  async asyncData({ $axios, route }) {
    return {
      family: await $axios.$get('family/' + route.params.id),
    }
  },
}
</script>

<style scoped></style>
