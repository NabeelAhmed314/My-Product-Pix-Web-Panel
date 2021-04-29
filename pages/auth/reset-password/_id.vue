<template>
  <ResetPasswordForm :hash="hash" />
</template>

<script>
import ResetPasswordForm from '@/components/auth/resetPassword'
export default {
  name: 'Id',
  components: { ResetPasswordForm },
  layout: 'none',
  auth: false,
  middleware: 'isSignedIn',
  asyncData({ route }) {
    return {
      hash: route.params.id,
    }
  },
}
</script>

<style scoped></style>
