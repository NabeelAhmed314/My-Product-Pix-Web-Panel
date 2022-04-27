<template>
  <FormLayoutRight>
    <div class="text-h5 mb-2">Create An Account</div>
    <div v-if="!loading" class="mb-2">
      <CircularImagePicker
        v-model="imageFile"
        :image="sendImage"
        icon="mdi-image-plus"
        icon-color="#C80000"
        @input="sendImage = $event"
      />
    </div>
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
        <v-row>
          <v-col cols="12" sm="12" md="12" lg="12">
            <v-text-field
              v-model="person.name"
              color="primary"
              label="Name"
              placeholder="John Doe"
              :rules="[required]"
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="6" lg="6">
            <v-text-field
              v-model="person.phone"
              color="primary"
              label="Phone"
              placeholder="+92 123 45678590"
              :rules="[phoneValidator]"
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="6" lg="6">
            <v-text-field
              v-model="person.username"
              color="primary"
              label="Email"
              :rules="[required, emailValidator]"
              placeholder="johndoe@gmail.com"
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="6" lg="6">
            <v-text-field
              v-model="person.address"
              color="primary"
              label="Address"
              :rules="[required]"
              placeholder="18 East Fairview Drive Lemont, IL 60439"
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="6" lg="6">
            <v-text-field
              v-model="person.dob"
              color="primary"
              :rules="[required, dateValidator]"
              label="Date of Birth"
              placeholder="11/11/1997"
              type="date"
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="6" lg="6">
            <v-text-field
              v-model="person.password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              :rules="[required, lengthValidator]"
              label="Password"
              dense
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="6" lg="6">
            <v-text-field
              v-model="confirmPassword"
              :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showConfirmPassword ? 'text' : 'password'"
              :rules="[required]"
              label="Confirm Password"
              dense
              @click:append="showConfirmPassword = !showConfirmPassword"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="6" lg="6">
            <v-text-field
              v-model="person.size"
              color="primary"
              label="T-Shirt Size"
              :rules="[required]"
              placeholder="Small"
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="6" lg="6">
            <v-select
              v-model="person.style"
              color="primary"
              label="Style"
              :rules="[required]"
              :items="style"
              dense
            >
            </v-select>
          </v-col>
          <v-col cols="12" sm="12" md="6" lg="6">
            <v-combobox
              v-model="person.films"
              multiple
              append-icon=""
              label="Favorite Films"
              chips
              deletable-chips
              :search-input.sync="searchFilms"
              dense
              @paste="updateTags"
            >
            </v-combobox>
          </v-col>
          <v-col cols="12" sm="12" md="6" lg="6">
            <v-combobox
              v-model="person.characters"
              multiple
              append-icon=""
              label="Favorite Characters"
              chips
              deletable-chips
              :search-input.sync="searchCharacters"
              dense
              @paste="updateTags"
            >
            </v-combobox>
          </v-col>
          <v-col cols="12" sm="12" md="12" lg="12">
            <v-combobox
              v-model="person.interests"
              multiple
              append-icon=""
              label="Interests"
              chips
              deletable-chips
              :search-input.sync="searchInterests"
              dense
              @paste="updateTags"
            >
            </v-combobox>
          </v-col>
        </v-row>
        <v-btn
          x-large
          block
          class="white--text rounded-md"
          color="primary"
          elevation="2"
          @click="signup"
          >Sign Up
        </v-btn>
      </v-container>
      <v-card-text
        >Already a member?
        <nuxt-link
          class="primary--text"
          to="/auth/signin"
          style="text-decoration: none"
          >Sign In!
        </nuxt-link>
      </v-card-text>
    </v-form>
  </FormLayoutRight>
</template>

<script>
import FormLayoutRight from '@/components/auth/formLayoutRight'
import CircularImagePicker from '@/components/helper/circularImagePicker'
import { Person } from '@/models/person'
import {
  required,
  emailValidator,
  dateValidator,
  phoneValidator,
  lengthValidator,
} from '@/common/utils/validators'
import { userRole } from '@/common/utils/local-data'

export default {
  name: 'SignupForm',
  components: { CircularImagePicker, FormLayoutRight },
  data() {
    return {
      loading: false,
      success: false,
      errors: [],
      person: new Person(),
      showPassword: false,
      showConfirmPassword: false,
      confirmPassword: '',
      select: [],
      searchInterests: '',
      searchFilms: '',
      searchCharacters: '',
      imageFile: null,
      sendImage: null,
      style: ["Men's Style", "Women's Style"],
    }
  },
  methods: {
    required,
    emailValidator,
    dateValidator,
    phoneValidator,
    lengthValidator,
    userRole,
    updateTags() {
      this.$nextTick(() => {
        this.select.push(...this.search.split(','))
        this.$nextTick(() => {
          this.search = ''
        })
      })
    },
    async signup() {
      if (this.$refs.form.validate()) {
        try {
          this.loading = true
          this.errors = []
          if (this.person.password !== this.confirmPassword) {
            this.loading = false
            this.errors.push('Could not confirm password.')
            return
          }
          const formData = new FormData()
          for (const key of Object.keys(this.person)) {
            if (this.person[key] !== undefined) {
              if (
                key === 'interests' ||
                key === 'characters' ||
                key === 'films'
              ) {
                for (const i of this.person[key]) {
                  formData.append(key, i)
                }
              } else {
                formData.append(key, this.person[key])
              }
            }
          }
          if (this.sendImage) {
            formData.append('image', this.sendImage)
          }
          formData.append('role', userRole('Customer').toString())
          await this.$axios.post('persons', formData)
          const user = {
            username: this.person.username,
            password: this.person.password,
          }
          await this.$auth.loginWith('local', { data: user })
          location.href = '/'
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
