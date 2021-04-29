<template>
  <DashboardMain />
</template>

<script>
import DashboardMain from '@/components/admin/dashboard/main'
export default {
  name: 'Index',
  components: { DashboardMain },
  middleware: ['isAdmin'],
}
</script>

<style scoped></style>
