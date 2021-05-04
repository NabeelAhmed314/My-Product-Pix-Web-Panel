<template>
  <div>
    <DataViewer
      title="Product Reviews"
      :columns="columns"
      back
      :endpoint="'/reviews/product/' + id"
      detail
      detail-route="/brand/my-product/review/detail/$id"
    />
  </div>
</template>

<script>
import DataViewer from '@/common/ui/widgets/DataViewer'
export default {
  name: 'BrandProduct',
  components: {
    DataViewer,
  },
  props: {
    id: {
      type: String,
      default: '',
    },
  },
  computed: {
    columns() {
      if (this.$vuetify.breakpoint.smAndDown) {
        return [
          {
            text: 'User Name',
            value: 'submission.person.name',
          },
          {
            text: 'Average Rating',
            value: 'rating',
          },
          {
            text: 'Date',
            value: 'createdAt',
          },
        ]
      } else {
        return [
          {
            text: 'Images',
            value: 'images',
          },
          {
            text: 'User Name',
            value: 'submission.person.name',
          },
          {
            text: 'Average Rating',
            value: 'rating',
          },
          {
            text: 'Date',
            value: 'createdAt',
          },
        ]
      }
    },
  },
}
</script>

<style scoped></style>
