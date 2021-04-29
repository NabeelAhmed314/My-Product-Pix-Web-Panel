<template>
  <div>
    <div class="px-3">
      <v-tabs
        v-model="tab"
        class="elevation-1"
        background-color="white"
        color="primary"
      >
        <v-tab v-for="item in tabs" :key="item.tab">
          {{ item.tab }}
        </v-tab>
      </v-tabs>
    </div>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in tabs" :key="item.tab">
        <div class="px-3">
          <data-viewer
            :title="item.title"
            :columns="columns"
            :endpoint="'submissions' + item.endpoint"
            :create="item.create"
            create-route="/admin/submission/add"
            :approve="item.approve"
            approve-route="/submissions/update-status"
            :reject="item.reject"
            reject-route="/submissions/update-status"
            :detail="item.detail"
            detail-route="/admin/submission/detail/$id"
            :change="item.change"
            change-route="/admin/submission/edit/$id"
            :remove="item.remove"
            remove-route="/submissions/$id"
            :on-accepted="onAccepted"
            :on-rejected="onRejected"
            :on-delete="onDelete"
          />
        </div>
      </v-tab-item>
    </v-tabs-items>
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
  name: 'SubmissionMain',
  components: {
    DataViewer,
  },
  data: () => ({
    snackbarText: 'Success!',
    snackbarColor: 'green',
    snackbar: false,
    tabs: [
      {
        tab: 'Assigned',
        endpoint: '/status/0',
        create: true,
        detail: true,
        change: true,
        remove: true,
        title: 'Assigned Products',
      },
      {
        tab: 'Reviewed',
        endpoint: '/status/1',
        approve: true,
        reject: true,
        detail: true,
        title: 'Reviewed Products',
      },
      {
        tab: 'Approved',
        endpoint: '/status/2',
        reject: true,
        detail: true,
        title: 'Approved Product Reviews',
      },
      {
        tab: 'Rejected',
        endpoint: '/status/3',
        approve: true,
        reject: false,
        detail: true,
        title: 'Rejected Product Reviews',
      },
    ],
    tab: null,
    columns: [
      {
        text: 'Product',
        value: 'product.name',
      },
      { text: 'User', value: 'person.name' },
      { text: 'Expires', value: 'countdown' },
      { text: 'Service', value: 'service' },
    ],
  }),
  methods: {
    onDelete() {
      window.console.log(this.snackbarText)
      window.console.log(this.snackbar)
      this.snackbarColor = 'red'
      this.snackbarText = 'Successfully Deleted Submission!'
      this.snackbar = true
    },
    onRejected() {
      window.console.log(this.snackbarText)
      window.console.log(this.snackbar)
      this.snackbarColor = 'red'
      this.snackbarText = 'Successfully Rejected Review!'
      this.snackbar = true
    },
    onAccepted() {
      window.console.log(this.snackbarText)
      window.console.log(this.snackbar)
      this.snackbarColor = 'green'
      this.snackbarText = 'Successfully Approved Review!'
      this.snackbar = true
    },
  },
}
</script>

<style scoped></style>
