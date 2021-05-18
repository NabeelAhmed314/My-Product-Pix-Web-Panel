<template>
  <v-container>
    <FamilyAdminTile :family="family" />
  </v-container>
</template>

<script>
import FamilyAdminTile from '@/components/admin/user/tile'
export default {
  name: 'FamilyAdminMain',
  components: {
    FamilyAdminTile,
  },
  props: {
    user: {
      type: String,
      default: null,
    },
  },
  data: () => ({ family: [] }),
  mounted() {
    this.getFamily()
  },
  methods: {
    async getFamily() {
      this.family = await this.$axios.$get('family/from/' + this.user)
    },
  },
}
</script>

<style scoped></style>
