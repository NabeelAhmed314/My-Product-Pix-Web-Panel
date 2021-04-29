<template>
  <div>
    <DataViewer
      title="Brands"
      :columns="columns"
      dense
      endpoint="/persons/brands"
      create
      create-route="/admin/brand/add"
      change
      change-route="/admin/brand/edit/$id"
      remove
      remove-route="/persons/$id"
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
  name: 'BrandMain',
  components: {
    DataViewer,
  },
  data: () => ({
    snackbarText: 'Success!',
    snackbarColor: 'green',
    snackbar: false,
    columns: [
      {
        text: 'Name',
        value: 'name',
      },
      {
        text: 'Email',
        value: 'username',
      },
      {
        text: 'Phone',
        value: 'phone',
      },
    ],
  }),
  methods: {
    onDelete() {
      window.console.log(this.snackbarText)
      window.console.log(this.snackbar)
      this.snackbarColor = 'red'
      this.snackbarText = 'Successfully Deleted Brand!'
      this.snackbar = true
    },
  },
}
</script>

<style scoped></style>
