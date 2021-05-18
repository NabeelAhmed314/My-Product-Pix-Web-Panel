<template>
  <div class="py-6">
    <v-card
      width="40%"
      min-height="300px"
      class="d-flex justify-center flex-column mx-auto my-16 align-center"
    >
      <v-card-title>Email Verification</v-card-title>
      <v-avatar
        v-if="verified"
        style="
          position: absolute;
          top: -50px;
          left: 50%;
          transform: translateX(-50%);
        "
        size="100"
        color="primary"
        class="elevation-1"
      >
        <v-icon color="white" x-large>mdi-check</v-icon>
      </v-avatar>
      <v-avatar
        v-if="!verified"
        size="100"
        style="
          position: absolute;
          top: -50px;
          left: 50%;
          transform: translateX(-50%);
        "
        color="primary"
        class="elevation-1"
      >
        <v-icon color="white" x-large>mdi-close</v-icon>
      </v-avatar>
      <div class="text-subtitle-2 font-weight-bold text-center">
        {{ message }}
      </div>
      <v-btn
        x-large
        class="white--text rounded-md my-md-5 my-3"
        color="primary"
        elevation="2"
        @click="gotoSignIn"
        >Sign In
      </v-btn>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'EmailVerification',
  props: {
    verified: {
      type: Boolean,
    },
    message: {
      type: String,
      default: '',
    },
  },
  methods: {
    gotoSignIn() {
      if (this.$auth.user) {
        this.$auth.fetchUser()
      }
      this.$router.push('/')
    },
  },
}
</script>

<style scoped></style>
