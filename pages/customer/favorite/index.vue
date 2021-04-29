<template>
  <p>Customer favorites</p>
</template>

<script>
export default {
  name: 'Index',
  middleware: 'isCustomer',
}
</script>

<style scoped></style>
