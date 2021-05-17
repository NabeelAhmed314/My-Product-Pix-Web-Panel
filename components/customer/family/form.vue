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
          :image="family.image"
          icon="mdi-image-plus"
          icon-color="#C80000"
          @input="sendImage = $event"
        />
      </div>
      <div class="text-h6 mt-16 my-3">{{ title }}</div>
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
          <label>Name</label>
          <v-text-field
            v-model="family.name"
            color="primary"
            single-line
            placeholder="John Doe"
            :rules="[required]"
            dense
          ></v-text-field>
          <label>T-Shirt Size</label>
          <v-text-field
            v-model="family.size"
            color="primary"
            single-line
            :rules="[required]"
            placeholder="Small"
            dense
          ></v-text-field>
          <label>Relation</label>
          <v-select
            v-model="family.relation"
            color="primary"
            single-line
            :rules="[required]"
            :items="relations"
            dense
          ></v-select>
          <label>Style</label>
          <v-select
            v-model="family.style"
            color="primary"
            single-line
            :rules="[required]"
            :items="family.relation === 'Adult' ? stylesAdult : stylesChild"
            dense
          ></v-select>
          <label>Date of Birth</label>
          <v-text-field
            v-model="family.dob"
            color="primary"
            :rules="[required, dateValidator]"
            single-line
            placeholder="11/11/1997"
            type="date"
            dense
          ></v-text-field>
          <label>Interests</label>
          <v-combobox
            v-model="family.interests"
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
            v-model="family.films"
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
            v-model="family.characters"
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
          <v-btn
            x-large
            block
            class="white--text rounded-md my-md-4 my-3"
            color="primary"
            elevation="2"
            @click="formData"
            >{{ isUpdate ? 'Update' : 'Create' }}
          </v-btn>
        </v-container>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import { required, dateValidator } from '@/common/utils/validators'
import CircularImagePicker from '@/components/helper/circularImagePicker'
import moment from 'moment'
import { Family } from '@/models/family'

export default {
  name: 'FamilyForm',
  components: { CircularImagePicker },
  props: {
    title: {
      type: String,
      default: 'title',
    },
    family: {
      type: Family,
      default: () => new Family(),
    },
    isUpdate: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: false,
      errors: [],
      searchInterests: '',
      searchFilms: '',
      searchCharacters: '',
      imageFile: null,
      sendImage: null,
      stylesChild: ["Boy's Style", "Girl's Style"],
      stylesAdult: ["Men's Style", "Women's Style"],
      relations: ['Adult', 'Child'],
    }
  },
  mounted() {
    this.formatDate()
  },
  methods: {
    required,
    dateValidator,
    formatDate() {
      this.family.dob = moment(this.family.dob).format('YYYY-MM-DD')
    },
    updateTags() {
      this.$nextTick(() => {
        this.select.push(...this.search.split(','))
        this.$nextTick(() => {
          this.search = ''
        })
      })
    },
    async formData() {
      if (this.$refs.form.validate()) {
        try {
          this.loading = true
          this.errors = []
          const formData = new FormData()
          for (const key of Object.keys(this.family)) {
            console.log(key)
            console.log(this.family[key])
            if (
              key === 'interests' ||
              key === 'characters' ||
              key === 'films'
            ) {
              for (const i of this.family[key]) {
                formData.append(key, i)
              }
            } else if (key !== 'image' && key !== 'person')
              formData.append(key, this.family[key])
          }
          if (this.sendImage) {
            formData.append('image', this.sendImage)
          }
          if (!this.isUpdate) formData.append('person', this.$auth.user._id)
          formData.forEach((item) => console.log(item))
          if (this.isUpdate) await this.$axios.patch('family', formData)
          else await this.$axios.post('family', formData)

          this.loading = false
          this.$router.back()
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
