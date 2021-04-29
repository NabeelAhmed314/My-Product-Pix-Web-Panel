<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" fixed clipped-left app>
      <v-list>
        <DrawerHeader />
        <Menu />
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed app dense>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-spacer />
      <v-icon v-if="this.$auth.user.role !== userRole('Admin')"
        >mdi-bell-outline</v-icon
      >
    </v-app-bar>
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
import DrawerHeader from '@/components/drawer/header'
import { userRole } from '@/common/utils/local-data'
import Menu from '~/components/drawer/menu'
export default {
  components: { DrawerHeader, Menu },
  data() {
    return {
      drawer: !this.$vuetify.breakpoint.smAndDown,
    }
  },
  methods: {
    userRole,
  },
}
</script>
