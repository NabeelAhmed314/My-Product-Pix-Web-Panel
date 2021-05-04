<template>
  <v-container class="d-flex justify-center align-center fill-height">
    <SimpleForm
      :method="isUpdate ? 'patch' : 'post'"
      :data="formData"
      :endpoint="isUpdate ? 'products' : 'products'"
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
            product.name
          "
          class="my-3"
          :rules="[required]"
          single-line
          placeholder="e.g. Microwave"
          dense
        ></v-text-field>
        <label>SKU</label>
        <v-text-field
          v-model="
            // eslint-disable-next-line vue/no-mutating-props
            product.sku
          "
          class="my-3"
          :rules="[required]"
          single-line
          placeholder="e.g. #mk007"
          dense
        ></v-text-field>
        <label>ASIN</label>
        <v-text-field
          v-model="
            // eslint-disable-next-line vue/no-mutating-props
            product.asin
          "
          class="my-3"
          :rules="[required]"
          single-line
          placeholder="e.g. #mk007"
          dense
        ></v-text-field>
        <label>Description</label>
        <v-textarea
          v-model="
            // eslint-disable-next-line vue/no-mutating-props
            product.description
          "
          class="my-3"
          :rules="[required]"
          single-line
          placeholder="e.g. High power multi-purpose microwave."
          dense
        ></v-textarea>
        <label>Size</label>
        <v-text-field
          v-model="
            // eslint-disable-next-line vue/no-mutating-props
            product.size
          "
          class="my-3"
          :rules="[required]"
          single-line
          placeholder="e.g. Medium 10W"
          dense
        ></v-text-field>
        <label>Brand</label>
        <v-autocomplete
          :items="brands"
          :rules="[required]"
          class="my-3"
          :value="product.brand"
          dense
          :search-input.sync="searchBrand"
          :value-comparator="(a, b) => a && b && a._id === b._id"
          item-text="name"
          item-value="_id"
          single-line
          placeholder="Search Brand"
          return-object
          @change="
            (data) => {
              // eslint-disable-next-line vue/no-mutating-props
              product.brand = data._id
            }
          "
        >
          <template #no-data>
            <span>
              <p
                style="margin: 0 5px 0 0; text-align: right; cursor: pointer"
                @click="openBrandForm()"
              >
                <v-icon>mdi-plus-circle</v-icon>
                Add Brand
              </p>
            </span>
          </template>
        </v-autocomplete>
        <label>Category</label>
        <v-autocomplete
          :items="categories"
          :rules="[required]"
          class="my-3"
          :value="product.category"
          dense
          item-text="title"
          item-value="_id"
          single-line
          placeholder="Search Category"
          return-object
          @change="
            (data) => {
              // eslint-disable-next-line vue/no-mutating-props
              product.category = data._id
            }
          "
        ></v-autocomplete>
        <label>Theme</label>
        <v-combobox
          v-model="product.theme"
          multiple
          append-icon=""
          chips
          deletable-chips
          single-line
          :search-input.sync="search"
          dense
          @paste="updateTags"
        >
        </v-combobox>
        <label>Media</label>
        <div v-if="isUpdate && product.images.length > 0">
          <p>Uploaded Images</p>
          <div class="image-carousal">
            <div
              v-for="(image, i) of product.images"
              :key="i"
              class="d-flex justify-center align-center mb-3 mb-md-0 mx-auto mx-md-1"
              style="width: 180px; height: 180px; cursor: pointer"
            >
              <img
                style="object-fit: cover"
                width="180"
                height="180"
                :src="$axios.defaults.baseURL + 'uploads/' + image.name"
                alt="itemImage"
              />
              <div class="image-overlay">
                <v-btn
                  icon
                  outlined
                  color="white"
                  aria-hidden="true"
                  style="margin-right: 10px"
                  @click="deleteImage(i)"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
                <v-btn
                  icon
                  outlined
                  aria-hidden="true"
                  color="white"
                  @click="openImage(image.name)"
                >
                  <v-icon>mdi-magnify-plus-outline</v-icon>
                </v-btn>
              </div>
            </div>
          </div>
        </div>
        <vue-upload-multiple-image
          class="my-3"
          :data-images="imageData"
          drag-text="Drag images (many)"
          browse-text="(or) Select Upto Five"
          primary-text="Default"
          mark-is-primary-text="Set as default"
          popup-text="This image will be displayed as default"
          drop-text="Drop your file here ..."
          @upload-success="uploadImageSuccess"
          @before-remove="beforeRemove"
          @edit-image="editImage"
        />
      </div>
    </SimpleForm>
    <v-dialog v-model="imagePreview" width="90%" @click:outside="closePreview">
      <img
        :src="$axios.defaults.baseURL + 'uploads/' + src"
        alt="image-preview"
        style="object-fit: cover"
      />
    </v-dialog>
    <v-dialog v-model="addBrand" width="800px">
      <SimpleForm
        :data="brand"
        endpoint="persons"
        method="post"
        title="Add Brand"
        @response="selectBrand"
      >
        <div class="span-2">
          <v-card style="padding: 20px; margin-bottom: 30px; box-shadow: none">
            <v-text-field
              v-model="brand.name"
              :rules="[required]"
              style="align-items: center !important"
              label="Name"
              dense
            ></v-text-field>
            <v-text-field
              v-model="brand.username"
              :rules="[required, emailValidator]"
              style="align-items: center !important"
              label="Email"
              dense
            ></v-text-field>
            <v-text-field
              v-model="brand.phone"
              style="align-items: center !important"
              label="Phone"
              dense
            ></v-text-field>
            <v-text-field
              v-model="brand.password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              :rules="[required]"
              label="Password"
              dense
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-card>
        </div>
      </SimpleForm>
    </v-dialog>
  </v-container>
</template>

<script>
import {
  required,
  lengthValidator,
  emailValidator,
} from '@/common/utils/validators'
import { Product } from '@/models/product'
import VueUploadMultipleImage from 'vue-upload-multiple-image'
import { Person } from '@/models/person'
import { userRole } from '@/common/utils/local-data'
import SimpleForm from '../../../common/ui/widgets/SimpleForm'
export default {
  name: 'ProductForm',
  components: {
    SimpleForm,
    VueUploadMultipleImage,
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
    product: {
      type: Product,
      default: () => new Product(),
    },
    uploadedImages: {
      type: Array,
      default: () => [{}],
    },
  },
  data: () => ({
    images: [],
    imageData: [],
    deletedImages: [],
    imagePreview: false,
    src: '',
    categories: [],
    brands: [],
    search: '',
    searchBrand: '',
    brand: new Person(),
    addBrand: false,
    showPassword: false,
  }),
  mounted() {
    this.getCategories()
    this.getBrands()
  },
  methods: {
    required,
    lengthValidator,
    emailValidator,
    returnBack() {
      this.$router.back()
    },
    updateTags() {
      this.$nextTick(() => {
        this.select.push(...this.search.split(','))
        this.$nextTick(() => {
          this.search = ''
        })
      })
    },
    selectBrand(data) {
      console.log('here')
      this.getBrands()
      console.log(data.data._id)
      this.product.brand = data.data._id
      console.log(this.product)
      this.addBrand = !this.addBrand
      console.log(this.addBrand)
      this.brand = new Person()
      this.brand.password = ''
    },
    async getCategories() {
      this.categories = await this.$axios.$get('/category/active')
    },
    async getBrands() {
      this.brands = await this.$axios.$get('/persons/brands')
    },
    formData() {
      const formData = new FormData()
      for (const key of Object.keys(this.product)) {
        if (key === 'images') continue
        else if (key === '_id' && !this.isUpdate) continue
        else if (key === 'theme') {
          for (const i of this.product[key]) {
            formData.append(key, i)
          }
        } else {
          formData.append(key, this.product[key])
        }
      }
      if (!this.isUpdate) {
        for (const image of this.images) {
          formData.append('images', image)
        }
      } else {
        for (const image of this.images) {
          formData.append('images', image)
        }
        for (const image of this.product.images) {
          formData.append('imageName', image.name)
          formData.append('imagePath', image.path)
        }
        for (const deletedImage of this.deletedImages) {
          formData.append('deletedImages', deletedImage)
        }
      }
      formData.forEach((item) => window.console.log(item))
      return formData
    },
    deleteImage(index) {
      this.deletedImages.push(this.product.images[index].path)
      // eslint-disable-next-line vue/no-mutating-props
      this.product.images.splice(index, 1)
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
    closePreview() {
      this.imagePreview = false
    },
    openImage(i) {
      if (i) {
        this.src = i
        this.imagePreview = true
      }
    },
    openBrandForm() {
      this.brand.role = userRole('Brand')
      this.brand.name = this.searchBrand
      this.addBrand = !this.addBrand
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
