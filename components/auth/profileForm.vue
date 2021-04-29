<template>
  <div
    class="fill-height py-16 d-flex justify-center align-center py-8 py-md-16 px-4 px-md-0"
  >
    <v-card
      color="main-form d-flex justify-center flex-column align-center mt-4"
    >
      <div
        style="
          position: absolute;
          top: -60px;
          left: 50%;
          transform: translateX(-50%);
        "
      >
        <CircularImagePicker
          v-model="imageFile"
          :image="person.image"
          icon="mdi-image-plus"
          icon-color="#C80000"
          @input="sendImage = $event"
        />
      </div>
      <div class="text-h6 mt-16 my-3">Update Profile</div>
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
          <li>Profile Successfully Updated!</li>
        </ul>
        <v-container>
          <label>Name</label>
          <v-text-field
            v-model="person.name"
            color="primary"
            single-line
            placeholder="John Doe"
            :rules="[required]"
            dense
          ></v-text-field>
          <label>Phone</label>
          <v-text-field
            v-model="person.phone"
            color="primary"
            single-line
            placeholder="+92 123 45678590"
            :rules="[phoneValidator]"
            dense
          ></v-text-field>
          <label>Email</label>
          <v-text-field
            v-model="person.username"
            color="primary"
            single-line
            :rules="[required, emailValidator]"
            placeholder="johndoe@gmail.com"
            dense
          ></v-text-field>
          <div v-if="this.$auth.user.role === this.userRole('Customer')">
            <label>Address</label>
            <v-text-field
              v-model="person.address"
              color="primary"
              single-line
              :rules="[required]"
              placeholder="18 East Fairview Drive Lemont, IL 60439"
              dense
            ></v-text-field>
            <label>T-Shirt Size</label>
            <v-text-field
              v-model="person.size"
              color="primary"
              single-line
              :rules="[required]"
              placeholder="Small"
              dense
            ></v-text-field>
            <label>Style</label>
            <v-select
              v-model="person.style"
              color="primary"
              single-line
              :rules="[required]"
              :items="style"
              dense
            ></v-select>
            <label>Date of Birth</label>
            <v-text-field
              v-model="person.dob"
              color="primary"
              :rules="[required, dateValidator]"
              single-line
              placeholder="11/11/1997"
              type="date"
              dense
            ></v-text-field>
            <label>Interests</label>
            <v-combobox
              v-model="person.interests"
              multiple
              append-icon=""
              single-line
              chips
              deletable-chips
              :search-input.sync="searchInterests"
              dense
              @paste="updateTags"
            >
            </v-combobox>
            <label>Favorite Films</label>
            <v-combobox
              v-model="person.films"
              multiple
              append-icon=""
              single-line
              chips
              deletable-chips
              :search-input.sync="searchFilms"
              dense
              @paste="updateTags"
            >
            </v-combobox>
            <label>Favorite Characters</label>
            <v-combobox
              v-model="person.characters"
              multiple
              append-icon=""
              single-line
              chips
              deletable-chips
              :search-input.sync="searchCharacters"
              dense
              @paste="updateTags"
            >
            </v-combobox>
          </div>
          <v-btn
            x-large
            block
            class="white--text rounded-md my-md-4 my-3"
            color="primary"
            elevation="2"
            @click="changePassword"
            >Update
          </v-btn>
        </v-container>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import {
  required,
  lengthValidator,
  emailValidator,
  phoneValidator,
  dateValidator,
} from '@/common/utils/validators'
import { Password } from '@/models/password'
import CircularImagePicker from '@/components/helper/circularImagePicker'
import moment from 'moment'
import { userRole } from '@/common/utils/local-data'

export default {
  name: 'ProfileForm',
  components: { CircularImagePicker },
  data() {
    return {
      person: this.$auth.user,
      showOldPassword: false,
      showNewPassword: false,
      showConfirmPassword: false,
      password: new Password(),
      loading: false,
      errors: [],
      success: false,
      searchInterests: '',
      searchFilms: '',
      searchCharacters: '',
      imageFile: null,
      sendImage: null,
      style: ["Men's Style", "Women's Style"],
    }
  },
  mounted() {
    this.person = { ...this.$auth.user }
    this.formatDate()
  },
  methods: {
    required,
    lengthValidator,
    dateValidator,
    phoneValidator,
    emailValidator,
    userRole,
    formatDate() {
      this.person.dob = moment(this.person.dob).format('YYYY-MM-DD')
    },
    updateTags() {
      this.$nextTick(() => {
        this.select.push(...this.search.split(','))
        this.$nextTick(() => {
          this.search = ''
        })
      })
    },
    async changePassword() {
      if (this.$refs.form.validate()) {
        try {
          this.loading = true
          this.errors = []
          const formData = new FormData()
          for (const key of Object.keys(this.person)) {
            if (
              key === 'interests' ||
              key === 'characters' ||
              key === 'films'
            ) {
              for (const i of this.person[key]) {
                formData.append(key, i)
              }
            } else if (key !== 'image') formData.append(key, this.person[key])
          }
          if (this.sendImage) {
            formData.append('image', this.sendImage)
          }
          formData.forEach((item) => console.log(item))
          await this.$axios.patch('persons', formData)
          await this.$auth.fetchUser()
          this.person = { ...this.$auth.user }
          this.person.dob = moment(this.person.dob).format('YYYY-MM-DD')
          this.loading = false
          this.success = true
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
  min-height: 400px;
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
