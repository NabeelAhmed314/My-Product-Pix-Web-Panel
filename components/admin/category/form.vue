<template>
  <v-container class="d-flex justify-center align-center fill-height">
    <SimpleForm
      :method="isUpdate ? 'patch' : 'post'"
      :data="formData"
      :endpoint="isUpdate ? 'category' : 'category'"
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
        <label>Title</label>
        <v-text-field
          v-model="
            // eslint-disable-next-line vue/no-mutating-props
            category.title
          "
          :rules="[required]"
          single-line
          placeholder="e.g. Electronics"
          dense
        ></v-text-field>
        <v-checkbox
          v-model="
            // eslint-disable-next-line vue/no-mutating-props
            category.active
          "
          dense
          label="Active"
        ></v-checkbox>
      </div>
    </SimpleForm>
  </v-container>
</template>

<script>
import { required } from '@/common/utils/validators'
import { Category } from '@/models/category'
import SimpleForm from '../../../common/ui/widgets/SimpleForm'
export default {
  name: 'CategoryForm',
  components: {
    SimpleForm,
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
    category: {
      type: Category,
      default: () => new Category(),
    },
  },
  methods: {
    required,
    returnBack() {
      this.$router.back()
    },
    formData() {
      console.log(this.category)
      return this.category
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
