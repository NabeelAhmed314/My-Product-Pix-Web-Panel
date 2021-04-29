<template>
  <v-container class="d-flex justify-center align-center fill-height">
    <SimpleForm
      :method="isUpdate ? 'patch' : 'post'"
      :data="formData"
      :endpoint="isUpdate ? 'persons' : 'persons'"
      return
    >
      <template #header>
        <v-row>
          <v-col
            style="display: flex; align-items: center; justify-content: center"
            cols="1"
          >
            <v-btn icon @click="returnBack">
              <v-icon>mdi-keyboard-backspace</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="10">
            <v-card-title>{{ title }}</v-card-title>
          </v-col>
        </v-row>
      </template>
      <div class="span-2 my-8 px-md-16">
        <div style="width: 100%" class="d-flex justify-center">
          <CircularImagePicker
            v-model="imageFile"
            :image="person.image"
            icon="mdi-image-plus"
            icon-color="#C80000"
            @input="sendImage = $event"
          />
        </div>
        <v-container>
          <v-row>
            <v-col cols="12" sm="12" md="12" lg="12">
              <label>Name</label>
              <v-text-field
                v-model="person.name"
                color="primary"
                single-line
                placeholder="John Doe"
                :rules="[required]"
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="6" lg="6">
              <label>Phone</label>
              <v-text-field
                v-model="person.phone"
                color="primary"
                single-line
                placeholder="+92 123 45678590"
                :rules="[phoneValidator]"
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="6" lg="6">
              <label>Email</label>
              <v-text-field
                v-model="person.username"
                color="primary"
                single-line
                :rules="[required, emailValidator]"
                placeholder="johndoe@gmail.com"
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="6" lg="6">
              <label>Password</label>
              <v-text-field
                v-model="person.password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                :rules="[isUpdate || required, isUpdate || lengthValidator]"
                single-line
                dense
                @click:append="showPassword = !showPassword"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </SimpleForm>
  </v-container>
</template>

<script>
import {
  required,
  phoneValidator,
  emailValidator,
  lengthValidator,
} from '@/common/utils/validators'
import { Person } from '@/models/person'
import CircularImagePicker from '@/components/helper/circularImagePicker'
import { userRole } from '@/common/utils/local-data'
import SimpleForm from '../../../common/ui/widgets/SimpleForm'

export default {
  name: 'BrandForm',
  components: {
    SimpleForm,
    CircularImagePicker,
  },
  props: {
    title: {
      type: String,
      default: 'Title',
    },
    isUpdate: {
      type: Boolean,
      default: false,
    },
    person: {
      type: Person,
      default: () => new Person(),
    },
  },
  data: () => ({
    showPassword: false,
    imageFile: null,
    sendImage: null,
  }),
  methods: {
    required,
    phoneValidator,
    emailValidator,
    lengthValidator,
    returnBack() {
      this.$router.back()
    },
    formData() {
      const formData = new FormData()
      for (const key of Object.keys(this.person)) {
        if (this.person[key] !== undefined && this.person[key] !== '') {
          if (key === 'image') continue
          formData.append(key, this.person[key])
        }
      }
      if (!this.isUpdate) {
        formData.append('role', userRole('Brand').toString())
      }
      if (this.sendImage) {
        formData.append('image', this.sendImage)
      }
      formData.forEach((item) => console.log(item))
      return formData
    },
  },
}
</script>

<style>
.form {
  width: 800px !important;
}
@media screen and (max-width: 600px) {
  .form {
    width: 100% !important;
  }
}
</style>
