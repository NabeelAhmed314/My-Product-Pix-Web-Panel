<template>
  <FormLayoutLeft>
    <div class="my-3 my-md-5">
      <v-avatar class="elevation-1" size="100">
        <v-icon x-large color="#C80000">{{
          submitted ? 'mdi-check' : 'mdi-lock-question'
        }}</v-icon>
      </v-avatar>
    </div>
    <div class="text-h5 my-md-5 my-3">Forgot Password</div>
    <v-progress-circular
      v-if="loading"
      indeterminate
      color="#313F53"
      class="my-auto mx-0"
    ></v-progress-circular>

    <v-form v-if="!loading" ref="form" class="form-div">
      <ul v-if="errors.length" style="color: red; margin-bottom: 15px">
        <li v-for="(error, i) of errors" :key="i">
          {{ error }}
        </li>
      </ul>
      <v-container>
        <v-text-field
          v-if="!submitted"
          v-model="email"
          class="my-md-5"
          color="primary"
          label="Email"
          :rules="[required, emailValidator]"
          placeholder="johndoe@gmail.com"
          dense
        ></v-text-field>
        <v-card-text v-else class="text-center">
          Password reset link successfully sent to your email.<br />
          Click link in email to reset password.
        </v-card-text>
        <v-btn
          x-large
          block
          class="white--text rounded-md my-md-5 my-3"
          color="primary"
          elevation="2"
          @click="submitted ? gotoSignIn() : forgotPassword()"
          >{{ submitted ? 'Sign In' : 'Submit' }}
        </v-btn>
      </v-container>
      <v-card-text v-if="!submitted"
        >Already a member?
        <nuxt-link
          to="/auth/signin"
          class="primary--text"
          style="text-decoration: none"
          >Sign In!
        </nuxt-link>
      </v-card-text>
    </v-form>
  </FormLayoutLeft>
</template>

<script>
import FormLayoutLeft from '@/components/auth/formLayoutLeft'
import { required, emailValidator } from '@/common/utils/validators'
export default {
  name: 'ForgotPasswordForm',
  components: { FormLayoutLeft },
  data() {
    return {
      submitted: false,
      email: null,
      loading: false,
      errors: [],
    }
  },
  methods: {
    required,
    emailValidator,
    gotoSignIn() {
      this.$router.push('/')
    },
    async forgotPassword() {
      if (this.$refs.form.validate()) {
        try {
          this.loading = true
          this.errors = []
          await this.$axios.post('persons/forgot-password/' + this.email)
          this.loading = false
          this.submitted = true
          this.email = null
        } catch (err) {
          this.loading = false
          if (err.response) {
            this.errors.push(err.response.data.message)
          } else {
            this.errors.push('Unable to process, Try again later')
          }
        }
      }
    },
  },
}
</script>

<style scoped>
.form-div {
  width: 90%;
}
</style>
