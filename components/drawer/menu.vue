<template>
  <div>
    <AdminMenuItems v-if="this.$auth.user.role === 0" />
    <CustomerMenuItems v-else-if="this.$auth.user.role === 2" />
    <BrandMenuItems v-else />
    <v-list-item ripple dense @click="logout">
      <v-list-item-action>
        <v-icon dense>mdi-logout</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>Logout</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>

<script>
import CustomerMenuItems from '@/components/drawer/customer-menu'
import BrandMenuItems from '@/components/drawer/brand-menu'
import AdminMenuItems from '~/components/drawer/admin-menu'

export default {
  name: 'Menu',
  components: { BrandMenuItems, CustomerMenuItems, AdminMenuItems },
  methods: {
    async logout() {
      try {
        await this.$auth.logout()
        location.reload()
      } catch (err) {}
    },
  },
}
</script>

<style scoped></style>
