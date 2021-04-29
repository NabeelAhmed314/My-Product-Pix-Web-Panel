<template>
  <EmailVerification :verified="verified" :message="message" />
</template>

<script>
import EmailVerification from '@/components/auth/email-verification'
export default {
  name: 'Id',
  components: { EmailVerification },
  layout: 'none',
  auth: false,
  async asyncData({ $auth, $axios, route }) {
    const data = {
      hash: route.params.hash,
      id: route.params.id,
    }
    try {
      await $axios.patch('persons/verify-account', data)
      return {
        verified: true,
        message: 'Account Verified Successfully!',
      }
    } catch (error) {
      return {
        verified: error.response.status === 409,
        message: error.response.data.message,
      }
    }
  },
}
</script>

<style scoped></style>
