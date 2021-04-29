<template>
  <EmailVerifyForm />
</template>

<script>
import EmailVerifyForm from '@/components/auth/email-verify'
export default {
  name: 'EmailVerify',
  components: { EmailVerifyForm },
  isVerified: false,
}
</script>

<style scoped></style>
