<template>
  <ForgotPasswordForm />
</template>

<script>
import ForgotPasswordForm from '@/components/auth/forgotPasswordForm'
export default {
  name: 'ForgotPassword',
  components: { ForgotPasswordForm },
  layout: 'none',
  auth: false,
  middleware: 'isSignedIn',
}
</script>

<style scoped></style>
