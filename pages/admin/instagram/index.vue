<template>
  <InstagramForm
    :login-btn="loginBtn"
    :code="code"
    :facebook-app-id="facebookAppId"
  />
</template>

<script>
import InstagramForm from '@/components/admin/instagram/form'
import { getAccessToken, loginWithFacebook } from '@/common/utils/instagram'
// import { loginInstagram } from '@/common/utils/instagram'
export default {
  name: 'Index',
  components: { InstagramForm },
  middleware: 'isAdmin',
  async asyncData({ env, route }) {
    // loginInstagram(env)
    console.log(route.query.code)
    let btn
    let access
    if (!route.query.code) {
      btn = await loginWithFacebook(env)
    } else {
      window.localStorage.setItem('code', route.query.code)
      if (window.localStorage.getItem('accessToken')) {
        console.log('We already have access token')
      } else {
        access = await getAccessToken(env)
        window.localStorage.setItem('accessToken', access.data.access_token)
        console.log(access)
      }
    }
    return {
      facebookAppId: env.facebookAppId,
      code: route.query.code,
      loginBtn: btn,
    }
  },
}
</script>

<style scoped></style>
