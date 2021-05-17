<template>
  <v-container>
    <FamilyTile :family="family" />
  </v-container>
</template>

<script>
import FamilyTile from '@/components/customer/family/tile'
export default {
  name: 'FamilyMain',
  components: {
    FamilyTile,
  },
  data: () => ({ family: [] }),
  mounted() {
    this.getFamily()
  },
  methods: {
    async getFamily() {
      this.family = await this.$axios.$get('family/from/' + this.$auth.user._id)
      console.log(this.family)
    },
  },
}
</script>

<style scoped></style>
