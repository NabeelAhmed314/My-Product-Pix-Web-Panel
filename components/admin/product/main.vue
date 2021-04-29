<template>
  <div>
    <DataViewer
      title="Products"
      :columns="columns"
      dense
      endpoint="/products"
      create
      create-route="/admin/product/add"
      change
      change-route="/admin/product/edit/$id"
      remove
      remove-route="/products/$id"
      :on-delete="onDelete"
    />
    <v-snackbar
      v-model="snackbar"
      bottom
      :color="snackbarColor"
      :timeout="1500"
    >
      {{ snackbarText }}
    </v-snackbar>
  </div>
</template>

<script>
import DataViewer from '@/common/ui/widgets/DataViewer'
export default {
  name: 'ProductMain',
  components: {
    DataViewer,
  },
  data: () => ({
    snackbarText: 'Success!',
    snackbarColor: 'green',
    snackbar: false,
  }),
  computed: {
    columns() {
      if (this.$vuetify.breakpoint.smAndDown) {
        return [
          {
            text: 'Name',
            value: 'name',
          },
          {
            text: 'SKU',
            value: 'sku',
          },
          {
            text: 'Size',
            value: 'size',
          },
          {
            text: 'Description',
            value: 'description',
          },
          {
            text: 'Category',
            value: 'category.title',
          },
          {
            text: 'Brand',
            value: 'brand.name',
          },
        ]
      } else {
        return [
          {
            text: 'Images',
            value: 'images',
          },
          {
            text: 'Name',
            value: 'name',
          },
          {
            text: 'SKU',
            value: 'sku',
          },
          {
            text: 'Size',
            value: 'size',
          },
          {
            text: 'Description',
            value: 'description',
          },
          {
            text: 'Category',
            value: 'category.title',
          },
          {
            text: 'Brand',
            value: 'brand.name',
          },
        ]
      }
    },
  },
  methods: {
    onDelete() {
      window.console.log(this.snackbarText)
      window.console.log(this.snackbar)
      this.snackbarColor = 'red'
      this.snackbarText = 'Successfully Deleted Product!'
      this.snackbar = true
    },
  },
}
</script>

<style scoped></style>
