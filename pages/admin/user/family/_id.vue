<template>
  <FamilyAdminMain :user="user" />
</template>

<script>
import FamilyAdminMain from '@/components/admin/user/family-main'
export default {
  name: 'Id',
  components: { FamilyAdminMain },
  asyncData({ route }) {
    return {
      user: route.params.id,
    }
  },
}
</script>

<style scoped></style>
