<template>
  <UserDetail :user="user" />
</template>

<script>
import UserDetail from '@/components/admin/user/detail'
export default {
  name: 'Id',
  components: { UserDetail },
  async asyncData({ $axios, route }) {
    return {
      user: await $axios.$get('persons/' + route.params.id),
    }
  },
}
</script>

<style scoped></style>
