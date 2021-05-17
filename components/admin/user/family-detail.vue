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
        <v-avatar size="120" class="elevation-3" color="white">
          <img
            v-if="family.image"
            width="100%"
            height="100%"
            style="object-fit: cover; object-position: center"
            :src="$axios.defaults.baseURL + 'uploads/' + family.image.name"
            alt="select"
          />
          <v-icon v-else x-large>mdi-account-outline</v-icon>
        </v-avatar>
      </div>
      <div class="text-h6 mt-16 my-3">{{ title }}</div>
      <v-form class="form-div">
        <v-container>
          <label>Name</label>
          <v-text-field
            v-model="family.name"
            readonly
            color="primary"
            single-line
            placeholder="John Doe"
            dense
          ></v-text-field>
          <label>T-Shirt Size</label>
          <v-text-field
            v-model="family.size"
            readonly
            color="primary"
            single-line
            placeholder="Small"
            dense
          ></v-text-field>
          <label>Relation</label>
          <v-select
            v-model="family.relation"
            readonly
            color="primary"
            single-line
            :items="relations"
            dense
          ></v-select>
          <label>Style</label>
          <v-select
            v-model="family.style"
            readonly
            color="primary"
            single-line
            :items="family.relation === 'Adult' ? stylesAdult : stylesChild"
            dense
          ></v-select>
          <label>Date of Birth</label>
          <v-text-field
            v-model="family.dob"
            readonly
            color="primary"
            single-line
            placeholder="11/11/1997"
            type="date"
            dense
          ></v-text-field>
          <label>Interests</label>
          <v-combobox
            v-model="family.interests"
            readonly
            multiple
            append-icon=""
            single-line
            chips
            deletable-chips
            :search-input.sync="searchInterests"
            dense
          >
          </v-combobox>
          <label>Favorite Films</label>
          <v-combobox
            v-model="family.films"
            readonly
            multiple
            append-icon=""
            single-line
            chips
            deletable-chips
            :search-input.sync="searchFilms"
            dense
          >
          </v-combobox>
          <label>Favorite Characters</label>
          <v-combobox
            v-model="family.characters"
            readonly
            multiple
            append-icon=""
            single-line
            chips
            deletable-chips
            :search-input.sync="searchCharacters"
            dense
          >
          </v-combobox>
        </v-container>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import moment from 'moment'
import { Family } from '@/models/family'

export default {
  name: 'FamilyDetail',
  props: {
    title: {
      type: String,
      default: 'title',
    },
    family: {
      type: Family,
      default: () => new Family(),
    },
  },
  data() {
    return {
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
    formatDate() {
      this.family.dob = moment(this.family.dob).format('YYYY-MM-DD')
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
