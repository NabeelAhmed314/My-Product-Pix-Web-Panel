<template>
  <div>
    <DataViewer
      title="Users"
      :columns="columns"
      endpoint="/persons/customers"
      detail
      detail-route="/admin/user/detail/$id"
    />
  </div>
</template>

<script>
import DataViewer from '@/common/ui/widgets/DataViewer'
export default {
  name: 'UserMain',
  components: {
    DataViewer,
  },
  data: () => ({
    columns: [
      {
        text: 'Image',
        value: 'image',
      },
      {
        text: 'Name',
        value: 'name',
      },
      {
        text: 'Phone',
        value: 'phone',
      },
      {
        text: 'Email',
        value: 'username',
      },
      {
        text: 'Address',
        value: 'address',
      },
      {
        text: 'DOB',
        value: 'dob',
      },
      {
        text: 'Interests',
        value: 'interests',
      },
    ],
  }),
}
</script>

<style scoped></style>
