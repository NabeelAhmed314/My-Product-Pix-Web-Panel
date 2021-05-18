<template>
  <FormLayoutLeft>
    <div class="my-3 my-md-5">
      <v-avatar class="elevation-1" size="100">
        <v-icon x-large color="#C80000">{{
          submitted ? 'mdi-check' : 'mdi-lock-question'
        }}</v-icon>
      </v-avatar>
    </div>
    <div class="text-h5 my-md-5 my-3">Reset Password</div>
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
          v-model="password"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show ? 'text' : 'password'"
          :rules="[required, lengthValidator]"
          label="New Password"
          placeholder="********"
          dense
          @click:append="show = !show"
        ></v-text-field>
        <v-card-text v-else class="text-center">
          Your password was successfully changed<br />
          You can now signin to your account with new password.
        </v-card-text>
        <v-btn
          x-large
          block
          class="white--text rounded-md my-md-5 my-3"
          color="primary"
          elevation="2"
          @click="submitted ? gotoSignIn() : resetPassword()"
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
import { required, lengthValidator } from '@/common/utils/validators'
export default {
  name: 'ResetPasswordForm',
  components: { FormLayoutLeft },
  props: {
    hash: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      submitted: false,
      password: '',
      show: false,
      loading: false,
      errors: [],
    }
  },
  methods: {
    required,
    lengthValidator,
    gotoSignIn() {
      this.$router.push('/')
    },
    async resetPassword() {
      if (this.$refs.form.validate()) {
        try {
          this.loading = true
          this.errors = []
          const data = {
            hash: this.hash,
            password: this.password,
          }
          await this.$axios.patch('persons/reset-password', data)
          this.loading = false
          this.submitted = true
          this.password = ''
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
