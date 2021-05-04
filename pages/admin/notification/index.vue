<template>
  <v-container>
    <NotificationMain />
  </v-container>
</template>

<script>
import NotificationMain from '@/components/admin/notification/main'
export default {
  name: 'Index',
  components: { NotificationMain },
  middleware: 'isAdmin',
}
</script>

<style scoped></style>
