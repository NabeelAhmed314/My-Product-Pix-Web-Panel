<template>
  <MailForm />
</template>

<script>
import MailForm from '@/components/admin/mail/form'
export default {
  name: 'Index',
  components: { MailForm },
  middleware: 'isAdmin',
}
</script>

<style scoped></style>
