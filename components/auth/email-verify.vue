<template>
  <div class="d-flex justify-center my-6">
    <v-card width="70%">
      <v-card-title>Email Verification</v-card-title>
      <v-card-text v-if="$auth.user.isVerified"
        >Your Email is verified!</v-card-text
      >
      <div v-else>
        <ul v-if="errors.length" style="color: red; margin-bottom: 15px">
          <li v-for="(error, i) of errors" :key="i">
            {{ error }}
          </li>
        </ul>
        <v-card-text v-if="submitted"
          >Email Verification Link Sent!</v-card-text
        >
        <v-progress-circular
          v-if="loading"
          indeterminate
          color="#313F53"
          class="my-auto mx-0"
        ></v-progress-circular>
        <v-card-text v-if="!loading"
          >Your Account is not verified. <br />
          Use the link sent to your email to verify your account. <br />
          If you have not received an email then click resend.</v-card-text
        >
        <v-btn v-if="!loading" color="primary" class="ma-3" @click="resendEmail"
          >Resend</v-btn
        >
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'EmailVerifyForm',
  data() {
    return {
      submitted: false,
      loading: false,
      errors: [],
    }
  },
  methods: {
    async resendEmail() {
      try {
        this.loading = true
        this.errors = []
        const data = {
          name: this.$auth.user.name,
          email: this.$auth.user.username,
          id: this.$auth.user._id,
        }
        await this.$axios.patch('persons/verification-email', data)
        this.loading = false
        this.submitted = true
      } catch (err) {
        this.loading = false
        if (err.response) {
          this.errors.push(err.response.data.message)
        } else {
          this.errors.push('Unable to process, Try again later')
        }
      }
    },
  },
}
</script>

<style scoped></style>
