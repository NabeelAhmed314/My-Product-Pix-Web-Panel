<template>
  <div>
    <div v-for="item in items" :key="item.title">
      <v-list-item ripple :to="item.to" dense>
        <v-list-item-action>
          <v-icon dense>{{ item.action }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-icon>
          <v-icon small>mdi-chevron-right</v-icon>
        </v-list-item-icon>
      </v-list-item>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminMenuItems',
  data() {
    return {
      items: [
        {
          action: 'mdi-home-outline',
          title: 'Home',
          to: '/admin/dashboard',
        },
        {
          action: 'mdi-tag-outline',
          title: 'Brands',
          to: '/admin/brand',
        },
        {
          action: 'mdi-shape-outline',
          title: 'Categories',
          to: '/admin/category',
        },
        {
          action: 'mdi-view-grid-outline',
          title: 'Products',
          to: '/admin/product',
        },
        {
          action: 'mdi-account-multiple-outline',
          title: 'Users',
          to: '/admin/user',
        },
        {
          action: 'mdi-star-outline',
          title: 'Submissions',
          to: '/admin/submission',
        },
        {
          action: 'mdi-star-outline',
          title: 'Up Next',
          to: '/admin/up-next',
        },
        {
          action: 'mdi-instagram',
          title: 'Instagram',
          to:
            window.localStorage.getItem('code') !== null
              ? '/admin/instagram?code=' + window.localStorage.getItem('code')
              : '/admin/instagram',
        },
        {
          action: 'mdi-image-outline',
          title: 'Media',
          to: '/admin/media',
        },
        {
          action: 'mdi-bell-outline',
          title: 'Notifications',
          to: '/admin/notification',
        },
        {
          action: 'mdi-email-outline',
          title: 'Mail',
          to: '/admin/mail',
        },
        {
          action: 'mdi-lock-outline',
          title: 'Security',
          to: '/auth/change-password',
        },
        {
          action: 'mdi-account-plus-outline',
          title: 'Register Admin',
          to: '/admin/register',
        },
      ],
    }
  },
}
</script>

<style></style>
