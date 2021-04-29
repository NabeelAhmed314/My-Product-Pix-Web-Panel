<template>
  <BrandForm title="Add Brand" />
</template>

<script>
import BrandForm from '@/components/admin/brand/form'
export default {
  name: 'Add',
  components: { BrandForm },
  middleware: 'isAdmin',
}
</script>

<style scoped></style>
