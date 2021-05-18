<template>
  <div>
    <div style="position: absolute; top: 30px; left: 30px">
      <v-icon @click="() => $router.back()">mdi-arrow-left</v-icon>
    </div>
    <FamilyForm title="Create Family Profile" />
  </div>
</template>

<script>
import FamilyForm from '@/components/customer/family/form'
export default {
  name: 'Add',
  components: { FamilyForm },
}
</script>

<style scoped></style>
