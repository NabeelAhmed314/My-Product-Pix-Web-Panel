<template>
  <div>
    <DataViewer
      title="My Products"
      :columns="columns"
      :endpoint="'/products/brand/' + this.$auth.user._id"
      detail
      detail-route="/brand/my-product/detail/$id"
      review
      review-route="/brand/my-product/review/$id"
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
        ]
      }
    },
  },
}
</script>

<style scoped></style>
