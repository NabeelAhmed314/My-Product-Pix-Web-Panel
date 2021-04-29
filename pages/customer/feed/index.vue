<template>
  <FeedMain />
</template>

<script>
import FeedMain from '@/components/customer/feed/main'
export default {
  name: 'Index',
  components: { FeedMain },
  middleware: 'isCustomer',
}
</script>

<style scoped></style>
