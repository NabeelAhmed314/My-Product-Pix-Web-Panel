<template>
  <SignupForm />
</template>

<script>
import SignupForm from '@/components/auth/signupForm'
export default {
  name: 'Signup',
  components: { SignupForm },
  layout: 'none',
  auth: false,
  middleware: 'isSignedIn',
}
</script>

<style scoped></style>
