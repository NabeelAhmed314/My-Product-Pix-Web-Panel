<template>
  <div
    class="fill-height py-16 d-flex justify-center align-center py-8 py-md-10"
  >
    <v-card color="main-form d-flex justify-center flex-column align-center">
      <div
        style="
          position: absolute;
          top: -40px;
          left: 50%;
          transform: translateX(-50%);
        "
      >
        <v-avatar color="white" class="elevation-3" size="80">
          <v-icon large color="primary">mdi-lock-question</v-icon>
        </v-avatar>
      </div>
      <div class="text-h6 mt-md-14 mt-12 my-3">Change Password</div>
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
        <ul v-if="success" style="color: green; margin-bottom: 15px">
          <li>Password Successfully Changed!</li>
        </ul>
        <v-container>
          <label>Old Password</label>
          <v-text-field
            v-model="password.oldPassword"
            :append-icon="showOldPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showOldPassword ? 'text' : 'password'"
            :rules="[required]"
            placeholder="********"
            dense
            @click:append="showOldPassword = !showOldPassword"
          ></v-text-field>
          <label>New Password</label>
          <v-text-field
            v-model="password.newPassword"
            :append-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showNewPassword ? 'text' : 'password'"
            :rules="[required, lengthValidator]"
            placeholder="********"
            dense
            @click:append="showNewPassword = !showNewPassword"
          ></v-text-field>
          <label>Confirm New Password</label>
          <v-text-field
            v-model="password.confirmPassword"
            :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showConfirmPassword ? 'text' : 'password'"
            :rules="[required]"
            placeholder="********"
            dense
            @click:append="showConfirmPassword = !showConfirmPassword"
          ></v-text-field>
          <v-btn
            x-large
            block
            class="white--text rounded-md my-md-4 my-3"
            color="primary"
            elevation="2"
            @click="changePassword"
            >Change Password
          </v-btn>
        </v-container>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import { required, lengthValidator } from '@/common/utils/validators'
import { Password } from '@/models/password'

export default {
  name: 'ChangePassword',
  data() {
    return {
      showOldPassword: false,
      showNewPassword: false,
      showConfirmPassword: false,
      password: new Password(),
      loading: false,
      errors: [],
      success: false,
    }
  },
  methods: {
    required,
    lengthValidator,
    async changePassword() {
      if (this.$refs.form.validate()) {
        try {
          this.loading = true
          this.errors = []
          if (this.password.newPassword !== this.password.confirmPassword) {
            this.loading = false
            this.errors.push('Could not confirm password.')
            return
          }
          this.password.person = this.$auth.user._id
          await this.$axios.patch('persons/change-password', this.password)
          this.loading = false
          this.success = true
          this.password = new Password()
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
.main-form {
  width: 35%;
  min-width: 35%;
}
.form-div {
  width: 90%;
}
@media screen and (max-width: 992px) {
  .main-form {
    min-width: 100%;
  }
}
</style>
