<template>
  <div>
    <data-viewer
      title="Next Requests"
      :columns="columns"
      endpoint="reviews"
      :action="false"
    />
  </div>
</template>

<script>
import DataViewer from '@/common/ui/widgets/DataViewer'
export default {
  name: 'UpNextMain',
  components: {
    DataViewer,
  },
  data: () => ({
    columns: [
      { text: 'User', value: 'submission.person.name' },
      {
        text: 'Next Request',
        value: 'request',
      },
      { text: 'Date', value: 'createdAt' },
    ],
  }),
}
</script>

<style scoped></style>
