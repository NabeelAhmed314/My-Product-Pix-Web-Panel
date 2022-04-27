<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      clipped-left
      app
      style="
        z-index: 100;
        background-image: url('/images/drawer-bg.jpg');
        background-color: #c80000;
      "
    >
      <v-list>
        <DrawerHeader />
        <Menu />
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed app dense style="z-index: 99">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-spacer />
      <v-menu
        v-if="$auth.user.role !== userRole('Admin')"
        offset-y
        bottom
        transition="slide-y-transition"
      >
        <template #activator="{ on, attrs }">
          <v-badge :value="badge === 'true'" overlap color="primary" dot>
            <v-icon aria-hidden="true" v-bind="attrs" color="primary" v-on="on"
              >mdi-bell
            </v-icon>
          </v-badge>
        </template>
        <div style="max-height: 500px; overflow: auto" class="scrollbar">
          <v-list>
            <v-list-item
              v-for="(notification, i) of notifications"
              :key="i"
              two-line
            >
              <v-list-item-avatar class="elevation-1" rounded size="48">
                <v-icon v-if="!notification.image">mdi-image</v-icon>
                <img
                  v-else
                  alt="person"
                  style="object-fit: cover"
                  :src="
                    $axios.defaults.baseURL +
                    'uploads/' +
                    notification.image.name
                  "
                />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  {{ notification.title }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ notification.message }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action-text>
                {{ calcAgo(notification.createdAt) }}
              </v-list-item-action-text>
            </v-list-item>
            <v-list-item v-if="!notifications || notifications.length <= 0">
              <p>No Notifications Yet!!</p>
            </v-list-item>
          </v-list>
        </div>
      </v-menu>
    </v-app-bar>
    <v-main>
      <div
        style="
          position: absolute;
          bottom: 0;
          left: 0;
          height: 70px;
          width: 100%;
        "
      >
        <img
          height="100%"
          width="100%"
          src="~/assets/images/bottom-wave.png"
          alt="wave"
        />
      </div>
      <nuxt style="z-index: 2" />
    </v-main>
  </v-app>
</template>

<script>
import moment from 'moment'
import DrawerHeader from '@/components/drawer/header'
import { userRole } from '@/common/utils/local-data'
import Menu from '~/components/drawer/menu'

export default {
  components: { DrawerHeader, Menu },
  data() {
    return {
      drawer: !this.$vuetify.breakpoint.smAndDown,
      badge: null,
      notifications: null,
    }
  },
  async mounted() {
    await this.getNotifications()
  },
  methods: {
    userRole,
    async getNotifications() {
      this.notifications = await this.$axios.$get(
        'notifications/person/' + this.$auth.user._id
      )
    },
    calcAgo(time) {
      if (moment().diff(time, 'days') !== 0) {
        return moment().diff(time, 'days') + ' Days Ago'
      } else if (moment().diff(time, 'hour') !== 0) {
        return moment().diff(time, 'hour') + ' Hrs Ago '
      } else if (moment().diff(time, 'minute') !== 0) {
        return moment().diff(time, 'minute') + ' Mins Ago'
      } else if (moment().diff(time, 'second') !== 0) {
        return moment().diff(time, 'second') + ' Secs Ago'
      } else {
        return 'Just Now'
      }
    },
  },
}
</script>
