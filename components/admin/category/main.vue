<template>
  <div>
    <DataViewer
      title="Categories"
      :columns="columns"
      dense
      endpoint="/category"
      create
      create-route="/admin/category/add"
      change
      change-route="/admin/category/edit/$id"
      remove
      remove-route="/category/$id"
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
  name: 'CategoryMain',
  components: {
    DataViewer,
  },
  data: () => ({
    snackbarText: 'Success!',
    snackbarColor: 'green',
    snackbar: false,
    columns: [
      {
        text: 'Title',
        value: 'title',
      },
      { text: 'Status', value: 'active' },
    ],
  }),
  methods: {
    onDelete() {
      window.console.log(this.snackbarText)
      window.console.log(this.snackbar)
      this.snackbarColor = 'red'
      this.snackbarText = 'Successfully Deleted Category!'
      this.snackbar = true
    },
  },
}
</script>

<style scoped></style>
