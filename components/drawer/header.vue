<template>
  <div style="text-align: center">
    <v-avatar rounded size="80" class="elevation-3">
      <v-icon v-if="!this.$auth.user.image">mdi-account-outline</v-icon>
      <img
        v-else
        :src="$axios.defaults.baseURL + 'uploads/' + this.$auth.user.image.name"
        style="object-fit: cover; object-position: center"
      />
    </v-avatar>
    <v-card-title style="justify-content: center">{{
      this.$auth.user.name
    }}</v-card-title>
    <v-card-subtitle class="pb-0">{{
      this.$auth.user.username
    }}</v-card-subtitle>
    <v-btn class="mx-0 my-1" color="primary" x-small to="/auth/profile"
      >EDIT</v-btn
    >
  </div>
</template>

<script>
export default {
  name: 'DrawerHeader',
}
</script>

<style scoped></style>
