<template>
  <FamilyMain />
</template>

<script>
import FamilyMain from '@/components/customer/family/main'
export default {
  name: 'Index',
  components: { FamilyMain },
  middleware: 'isCustomer',
}
</script>

<style scoped></style>
