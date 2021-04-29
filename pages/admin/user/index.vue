<template>
  <v-container>
    <UserMain />
  </v-container>
</template>

<script>
import UserMain from '@/components/admin/user/main'
export default {
  name: 'Index',
  components: { UserMain },
  middleware: 'isAdmin',
}
</script>

<style scoped></style>
