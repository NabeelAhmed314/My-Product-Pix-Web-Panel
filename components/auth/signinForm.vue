<template>
  <FormLayoutLeft>
    <div class="text-h3 mb-3">Welcome</div>
    <div class="text-h5 mb-3">Sign in to continue</div>
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
          v-model="signin.username"
          color="primary"
          label="Email"
          placeholder="johndoe@gmail.com"
        ></v-text-field>
        <v-text-field
          v-model="signin.password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          @click:append="showPassword = !showPassword"
        ></v-text-field>
        <div class="mb-5">
          <nuxt-link
            to="/auth/forgotPassword"
            style="color: black; text-decoration: none"
            >Forgot Password?</nuxt-link
          >
        </div>
        <v-btn
          x-large
          block
          class="white--text rounded-md"
          color="primary"
          elevation="2"
          @click="signIn"
          >Sign In</v-btn
        >
      </v-container>
      <v-card-text
        >Not a member yet?
        <nuxt-link
          class="primary--text"
          to="/auth/signup"
          style="text-decoration: none"
          >Sign Up!</nuxt-link
        ></v-card-text
      >
    </v-form>
  </FormLayoutLeft>
</template>

<script>
import FormLayoutLeft from '@/components/auth/formLayoutLeft'
export default {
  name: 'SignInForm',
  components: { FormLayoutLeft },
  data() {
    return {
      loading: false,
      success: false,
      errors: [],
      showPassword: false,
      signin: {
        username: '',
        password: '',
      },
    }
  },
  methods: {
    async signIn() {
      if (this.$refs.form.validate()) {
        try {
          this.loading = true
          this.errors = []
          const dataSend = {
            username: this.signin.username,
            password: this.signin.password,
          }
          console.log(dataSend)
          const result = await this.$auth.loginWith('local', {
            data: dataSend,
          })
          this.loading = false
          console.log(result)
        } catch (err) {
          this.loading = false
          window.console.log(err)
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
