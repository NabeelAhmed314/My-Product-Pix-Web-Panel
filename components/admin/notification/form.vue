<template>
  <v-container class="d-flex justify-center align-center fill-height">
    <SimpleForm
      :method="isUpdate ? 'patch' : 'post'"
      :data="formData"
      :endpoint="isUpdate ? 'notifications' : 'notifications'"
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
            notification.title
          "
          class="my-3"
          :rules="[required]"
          single-line
          placeholder="e.g. Mega Deal"
          dense
        ></v-text-field>
        <label>Message</label>
        <v-textarea
          v-model="notification.message"
          class="my-3"
          :rules="[required]"
          single-line
          placeholder="e.g. High power multi-purpose microwave."
          dense
        ></v-textarea>
        <label>Recipients</label>
        <v-checkbox v-model="notification.all" label="Send to All"></v-checkbox>
        <EntitySelector
          v-if="!notification.all"
          endpoint="persons/customers"
          :selection="customers"
          multiple
          required
          :columns-selected="columnsSelected"
          :columns-selector="columnsSelected"
          title-selected="Selected Users"
          title-selector="Users"
          @selected="notification.persons = $event"
        />
        <label>Media</label>
        <vue-upload-multiple-image
          class="my-3"
          :max-image="1"
          drag-text="Drag Image (One)"
          browse-text="(Or) Select One"
          :data-images="imageData"
          @upload-success="uploadImageSuccess"
          @before-remove="beforeRemove"
          @edit-image="editImage"
        />
      </div>
    </SimpleForm>
  </v-container>
</template>

<script>
import { required } from '@/common/utils/validators'
import VueUploadMultipleImage from 'vue-upload-multiple-image'
import { Notification } from '@/models/notification'
import EntitySelector from '@/common/ui/widgets/EntitySelector'
import SimpleForm from '../../../common/ui/widgets/SimpleForm'

export default {
  name: 'NotificationForm',
  components: {
    SimpleForm,
    VueUploadMultipleImage,
    EntitySelector,
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
    notification: {
      type: Notification,
      default: () => new Notification(),
    },
  },
  data: () => ({
    images: [],
    imageData: [],
    columnsSelected: [{ text: 'Name', value: 'name' }],
    customers: [],
  }),
  mounted() {
    this.getCustomers()
  },
  methods: {
    required,
    returnBack() {
      this.$router.back()
    },
    async getCustomers() {
      this.customers = await this.$axios.$get('/persons/customers')
    },
    formData() {
      const formData = new FormData()
      for (const key of Object.keys(this.notification)) {
        console.log(key)
        console.log(this.notification[key])
        if (key === 'image') continue
        else if (key === 'persons') {
          if (this.notification.all !== true) {
            for (const person in this.notification[key]) {
              console.log(this.notification[key][person]._id)
              formData.append('persons', this.notification[key][person]._id)
            }
          }
        } else {
          formData.append(key, this.notification[key])
        }
      }
      for (const image of this.images) {
        formData.append('image', image)
      }
      formData.forEach((item) => window.console.log(item))
      return formData
    },
    uploadImageSuccess(formData) {
      formData.forEach((item) => this.images.push(item))
    },
    beforeRemove(index, done) {
      const r = confirm('Remove image?')
      if (r === true) {
        done()
      }
    },
    editImage(formData, index, fileList) {
      window.console.log('edit data', formData, index, fileList)
    },
  },
}
</script>

<style>
.form {
  width: 800px !important;
}
.image-overlay {
  top: 0;
  left: 0;
  z-index: 5;
  opacity: 0;
  width: 100%;
  height: 100%;
  display: flex;
  border-right: 4px;
  position: absolute !important;
  transition: all 0.2s;
  align-items: center;
  margin: 0 !important;
  justify-content: center;
  background: rgba(0, 0, 0, 0.7);
}
.image-carousal {
  margin-bottom: 10px;
  padding: 10px 5px;
  height: 200px;
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.05);
}
.image-carousal::-webkit-scrollbar {
  display: block !important;
}
.image-carousal::-webkit-scrollbar {
  background-color: #fff;
  width: 16px;
}
.image-carousal::-webkit-scrollbar-track {
  background-color: #fff;
}
.image-carousal::-webkit-scrollbar-track:hover {
  background-color: #f4f4f4;
}
.image-carousal::-webkit-scrollbar-thumb {
  background-color: #babac0;
  border-radius: 16px;
  border: 5px solid #fff;
}
.image-carousal::-webkit-scrollbar-thumb:hover {
  background-color: #a0a0a5;
  border: 4px solid #f4f4f4;
}
.image-carousal div {
  margin: 0 5px;
  position: relative;
}
.image-carousal div img {
  top: 0;
  /*position: absolute;*/
}

@media screen and (max-width: 600px) {
  .form {
    width: 100% !important;
  }
  .image-carousal {
    height: 100% !important;
    display: block !important;
  }
}
@media (hover: hover) {
  .image-carousal div:hover .image-overlay {
    transform: scale(1);
    opacity: 1;
  }
}
@media (hover: none) {
  .image-overlay {
    opacity: 0.6;
  }
}
</style>
