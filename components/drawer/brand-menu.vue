<template>
  <div>
    <div v-for="item in items" :key="item.title">
      <v-list-item ripple :to="item.to" dense>
        <v-list-item-action>
          <v-icon dense color="white">{{ item.action }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title style="color: white">{{
            item.title
          }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-icon>
          <v-icon small color="white">mdi-chevron-right</v-icon>
        </v-list-item-icon>
      </v-list-item>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BrandMenuItems',
  data() {
    return {
      items: [
        {
          action: 'mdi-grid',
          title: 'My Products',
          to: '/brand/my-product',
        },
        {
          action: 'mdi-lock-outline',
          title: 'Security',
          to: '/auth/change-password',
        },
      ],
    }
  },
}
</script>

<style></style>
