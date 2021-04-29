<template>
  <UserDetail :user="$auth.user" :back="false" />
</template>

<script>
import UserDetail from '@/components/admin/user/detail'
export default {
  name: 'Index',
  components: { UserDetail },
  middleware: 'isCustomer',
}
</script>

<style scoped></style>
