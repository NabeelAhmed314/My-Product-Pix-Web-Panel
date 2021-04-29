<template>
  <div>
    <DataViewer
      title="Notifications"
      :columns="columns"
      dense
      endpoint="/notifications"
      create
      create-route="/admin/notification/add"
      remove
      remove-route="/notifications/$id"
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
  name: 'NotificationMain',
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
      {
        text: 'Message',
        value: 'message',
      },
      {
        text: 'Recipient',
        value: 'persons',
      },
      {
        text: 'Image',
        value: 'image',
      },
    ],
  }),
  methods: {
    onDelete() {
      window.console.log(this.snackbarText)
      window.console.log(this.snackbar)
      this.snackbarColor = 'red'
      this.snackbarText = 'Successfully Deleted Notification!'
      this.snackbar = true
    },
  },
}
</script>

<style scoped></style>
