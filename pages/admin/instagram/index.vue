<template>
  <InstagramForm :env="env" />
</template>

<script>
import InstagramForm from '@/components/admin/instagram/form'
// import { getAccessToken, loginWithFacebook } from '@/common/utils/instagram'
// import { loginInstagram } from '@/common/utils/instagram'
export default {
  name: 'Index',
  components: { InstagramForm },
  middleware: 'isAdmin',
  asyncData({ env }) {
    return {
      env,
    }
  },
}
</script>

<style scoped></style>
