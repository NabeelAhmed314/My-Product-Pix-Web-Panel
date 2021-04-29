<template>
  <v-container class="d-flex justify-center align-center fill-height">
    <SimpleForm
      :method="isUpdate ? 'patch' : 'post'"
      :data="formData"
      :endpoint="isUpdate ? 'submissions' : 'submissions'"
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
        <label>User</label>
        <v-select
          v-model="
            // eslint-disable-next-line vue/no-mutating-props
            submission.person
          "
          :rules="[required]"
          :readonly="isUpdate"
          single-line
          :items="users"
          item-value="_id"
          item-text="name"
          placeholder="e.g. Assigned User"
          dense
        ></v-select>
        <label>Product</label>
        <v-select
          v-model="
            // eslint-disable-next-line vue/no-mutating-props
            submission.product
          "
          :rules="[required]"
          :readonly="isUpdate"
          :items="products"
          item-text="name"
          item-value="_id"
          single-line
          placeholder="e.g. Assigned Product"
          dense
        ></v-select>
        <label>Service Name</label>
        <v-text-field
          v-model="
            // eslint-disable-next-line vue/no-mutating-props
            submission.service
          "
          :rules="[required]"
          single-line
          placeholder="e.g. FedX"
          dense
        ></v-text-field>
        <label>Tracking ID</label>
        <v-text-field
          v-model="
            // eslint-disable-next-line vue/no-mutating-props
            submission.trackingId
          "
          :rules="[required]"
          single-line
          placeholder="e.g. UD417638005YP"
          dense
        ></v-text-field>
        <label>Tracking URL</label>
        <v-text-field
          v-model="
            // eslint-disable-next-line vue/no-mutating-props
            submission.trackingUrl
          "
          :rules="[required]"
          single-line
          placeholder="e.g. https://tools.usps.com/go/TrackConfirmAction_input?strOrigTrackNum=UD417638005YP"
          dense
        ></v-text-field>
      </div>
    </SimpleForm>
  </v-container>
</template>

<script>
import { required } from '@/common/utils/validators'
import { Submission } from '@/models/submission'
import SimpleForm from '../../../common/ui/widgets/SimpleForm'
export default {
  name: 'SubmissionForm',
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
    submission: {
      type: Submission,
      default: () => new Submission(),
    },
  },
  data() {
    return {
      users: [],
      products: [],
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    required,
    returnBack() {
      this.$router.back()
    },
    async getData() {
      this.users = await this.$axios.$get('/persons/customers')
      this.products = await this.$axios.$get('/products')
    },
    formData() {
      console.log(this.submission)
      return this.submission
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
