<template>
  <InstagramForm />
</template>

<script>
import InstagramForm from '@/components/admin/instagram/form'
export default {
  name: 'Index',
  components: { InstagramForm },
  middleware: 'isAdmin',
}
</script>

<style scoped></style>
