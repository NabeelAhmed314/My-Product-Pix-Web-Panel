<template>
  <SignInForm />
</template>

<script>
import SignInForm from '@/components/auth/signinForm'
export default {
  name: 'Login',
  components: { SignInForm },
  layout: 'none',
  computed: {
    formWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return '100%'
        case 'sm':
          return '100%'
      }
      return '70%'
    },
  },
}
</script>

<style scoped></style>
