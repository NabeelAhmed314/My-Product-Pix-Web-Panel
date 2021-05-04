import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _71144127 = () => interopDefault(import('..\\pages\\admin\\brand\\index.vue' /* webpackChunkName: "pages/admin/brand/index" */))
const _1d29e6f0 = () => interopDefault(import('..\\pages\\admin\\category\\index.vue' /* webpackChunkName: "pages/admin/category/index" */))
const _11c2f5fa = () => interopDefault(import('..\\pages\\admin\\dashboard\\index.vue' /* webpackChunkName: "pages/admin/dashboard/index" */))
const _e13bcbc8 = () => interopDefault(import('..\\pages\\admin\\instagram\\index.vue' /* webpackChunkName: "pages/admin/instagram/index" */))
const _05a3542f = () => interopDefault(import('..\\pages\\admin\\mail\\index.vue' /* webpackChunkName: "pages/admin/mail/index" */))
const _ec43270a = () => interopDefault(import('..\\pages\\admin\\notification\\index.vue' /* webpackChunkName: "pages/admin/notification/index" */))
const _59b5d5bf = () => interopDefault(import('..\\pages\\admin\\product\\index.vue' /* webpackChunkName: "pages/admin/product/index" */))
const _691edc7a = () => interopDefault(import('..\\pages\\admin\\register\\index.vue' /* webpackChunkName: "pages/admin/register/index" */))
const _fe716b0c = () => interopDefault(import('..\\pages\\admin\\submission\\index.vue' /* webpackChunkName: "pages/admin/submission/index" */))
const _5d156609 = () => interopDefault(import('..\\pages\\admin\\up-next\\index.vue' /* webpackChunkName: "pages/admin/up-next/index" */))
const _2a34999b = () => interopDefault(import('..\\pages\\admin\\user\\index.vue' /* webpackChunkName: "pages/admin/user/index" */))
const _1b117c5d = () => interopDefault(import('..\\pages\\auth\\change-password.vue' /* webpackChunkName: "pages/auth/change-password" */))
const _519abed5 = () => interopDefault(import('..\\pages\\auth\\email-verify.vue' /* webpackChunkName: "pages/auth/email-verify" */))
const _5d9b1329 = () => interopDefault(import('..\\pages\\auth\\forgotPassword.vue' /* webpackChunkName: "pages/auth/forgotPassword" */))
const _1e06fb24 = () => interopDefault(import('..\\pages\\auth\\profile.vue' /* webpackChunkName: "pages/auth/profile" */))
const _5877b4ed = () => interopDefault(import('..\\pages\\auth\\signin.vue' /* webpackChunkName: "pages/auth/signin" */))
const _6d0e0b63 = () => interopDefault(import('..\\pages\\auth\\signup.vue' /* webpackChunkName: "pages/auth/signup" */))
const _2d493100 = () => interopDefault(import('..\\pages\\brand\\my-product\\index.vue' /* webpackChunkName: "pages/brand/my-product/index" */))
const _1bb6f57d = () => interopDefault(import('..\\pages\\customer\\family\\index.vue' /* webpackChunkName: "pages/customer/family/index" */))
const _59529af6 = () => interopDefault(import('..\\pages\\customer\\favorite\\index.vue' /* webpackChunkName: "pages/customer/favorite/index" */))
const _20ec54c3 = () => interopDefault(import('..\\pages\\customer\\feed\\index.vue' /* webpackChunkName: "pages/customer/feed/index" */))
const _0d0c880a = () => interopDefault(import('..\\pages\\customer\\profile\\index.vue' /* webpackChunkName: "pages/customer/profile/index" */))
const _78829cb6 = () => interopDefault(import('..\\pages\\admin\\brand\\add.vue' /* webpackChunkName: "pages/admin/brand/add" */))
const _ddb26752 = () => interopDefault(import('..\\pages\\admin\\category\\add.vue' /* webpackChunkName: "pages/admin/category/add" */))
const _0ec78d0a = () => interopDefault(import('..\\pages\\admin\\notification\\add.vue' /* webpackChunkName: "pages/admin/notification/add" */))
const _559f1164 = () => interopDefault(import('..\\pages\\admin\\product\\add.vue' /* webpackChunkName: "pages/admin/product/add" */))
const _0c04426e = () => interopDefault(import('..\\pages\\admin\\submission\\add.vue' /* webpackChunkName: "pages/admin/submission/add" */))
const _0ffb99a6 = () => interopDefault(import('..\\pages\\brand\\my-product\\review\\detail\\__id.vue' /* webpackChunkName: "pages/brand/my-product/review/detail/__id" */))
const _2cd2f145 = () => interopDefault(import('..\\pages\\admin\\brand\\edit\\_id.vue' /* webpackChunkName: "pages/admin/brand/edit/_id" */))
const _77b9b7b4 = () => interopDefault(import('..\\pages\\admin\\category\\edit\\_id.vue' /* webpackChunkName: "pages/admin/category/edit/_id" */))
const _0ae879dd = () => interopDefault(import('..\\pages\\admin\\product\\edit\\_id.vue' /* webpackChunkName: "pages/admin/product/edit/_id" */))
const _7cb633c2 = () => interopDefault(import('..\\pages\\admin\\product\\send\\_id.vue' /* webpackChunkName: "pages/admin/product/send/_id" */))
const _21864ab1 = () => interopDefault(import('..\\pages\\admin\\submission\\detail\\_id.vue' /* webpackChunkName: "pages/admin/submission/detail/_id" */))
const _a329cdd0 = () => interopDefault(import('..\\pages\\admin\\submission\\edit\\_id.vue' /* webpackChunkName: "pages/admin/submission/edit/_id" */))
const _2329fd12 = () => interopDefault(import('..\\pages\\admin\\user\\detail\\_id.vue' /* webpackChunkName: "pages/admin/user/detail/_id" */))
const _1d360b37 = () => interopDefault(import('..\\pages\\brand\\my-product\\detail\\_id.vue' /* webpackChunkName: "pages/brand/my-product/detail/_id" */))
const _4d5e2410 = () => interopDefault(import('..\\pages\\brand\\my-product\\review\\_id.vue' /* webpackChunkName: "pages/brand/my-product/review/_id" */))
const _65e2ba3a = () => interopDefault(import('..\\pages\\customer\\feed\\detail\\_id.vue' /* webpackChunkName: "pages/customer/feed/detail/_id" */))
const _40e82dc6 = () => interopDefault(import('..\\pages\\auth\\reset-password\\_id.vue' /* webpackChunkName: "pages/auth/reset-password/_id" */))
const _5b5801de = () => interopDefault(import('..\\pages\\auth\\verify-account\\_hash\\_id.vue' /* webpackChunkName: "pages/auth/verify-account/_hash/_id" */))
const _c8529b82 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/admin/brand",
    component: _71144127,
    name: "admin-brand"
  }, {
    path: "/admin/category",
    component: _1d29e6f0,
    name: "admin-category"
  }, {
    path: "/admin/dashboard",
    component: _11c2f5fa,
    name: "admin-dashboard"
  }, {
    path: "/admin/instagram",
    component: _e13bcbc8,
    name: "admin-instagram"
  }, {
    path: "/admin/mail",
    component: _05a3542f,
    name: "admin-mail"
  }, {
    path: "/admin/notification",
    component: _ec43270a,
    name: "admin-notification"
  }, {
    path: "/admin/product",
    component: _59b5d5bf,
    name: "admin-product"
  }, {
    path: "/admin/register",
    component: _691edc7a,
    name: "admin-register"
  }, {
    path: "/admin/submission",
    component: _fe716b0c,
    name: "admin-submission"
  }, {
    path: "/admin/up-next",
    component: _5d156609,
    name: "admin-up-next"
  }, {
    path: "/admin/user",
    component: _2a34999b,
    name: "admin-user"
  }, {
    path: "/auth/change-password",
    component: _1b117c5d,
    name: "auth-change-password"
  }, {
    path: "/auth/email-verify",
    component: _519abed5,
    name: "auth-email-verify"
  }, {
    path: "/auth/forgotPassword",
    component: _5d9b1329,
    name: "auth-forgotPassword"
  }, {
    path: "/auth/profile",
    component: _1e06fb24,
    name: "auth-profile"
  }, {
    path: "/auth/signin",
    component: _5877b4ed,
    name: "auth-signin"
  }, {
    path: "/auth/signup",
    component: _6d0e0b63,
    name: "auth-signup"
  }, {
    path: "/brand/my-product",
    component: _2d493100,
    name: "brand-my-product"
  }, {
    path: "/customer/family",
    component: _1bb6f57d,
    name: "customer-family"
  }, {
    path: "/customer/favorite",
    component: _59529af6,
    name: "customer-favorite"
  }, {
    path: "/customer/feed",
    component: _20ec54c3,
    name: "customer-feed"
  }, {
    path: "/customer/profile",
    component: _0d0c880a,
    name: "customer-profile"
  }, {
    path: "/admin/brand/add",
    component: _78829cb6,
    name: "admin-brand-add"
  }, {
    path: "/admin/category/add",
    component: _ddb26752,
    name: "admin-category-add"
  }, {
    path: "/admin/notification/add",
    component: _0ec78d0a,
    name: "admin-notification-add"
  }, {
    path: "/admin/product/add",
    component: _559f1164,
    name: "admin-product-add"
  }, {
    path: "/admin/submission/add",
    component: _0c04426e,
    name: "admin-submission-add"
  }, {
    path: "/brand/my-product/review/detail/:_id?",
    component: _0ffb99a6,
    name: "brand-my-product-review-detail-_id"
  }, {
    path: "/admin/brand/edit/:id?",
    component: _2cd2f145,
    name: "admin-brand-edit-id"
  }, {
    path: "/admin/category/edit/:id?",
    component: _77b9b7b4,
    name: "admin-category-edit-id"
  }, {
    path: "/admin/product/edit/:id?",
    component: _0ae879dd,
    name: "admin-product-edit-id"
  }, {
    path: "/admin/product/send/:id?",
    component: _7cb633c2,
    name: "admin-product-send-id"
  }, {
    path: "/admin/submission/detail/:id?",
    component: _21864ab1,
    name: "admin-submission-detail-id"
  }, {
    path: "/admin/submission/edit/:id?",
    component: _a329cdd0,
    name: "admin-submission-edit-id"
  }, {
    path: "/admin/user/detail/:id?",
    component: _2329fd12,
    name: "admin-user-detail-id"
  }, {
    path: "/brand/my-product/detail/:id",
    component: _1d360b37,
    name: "brand-my-product-detail-id"
  }, {
    path: "/brand/my-product/review/:id",
    component: _4d5e2410,
    name: "brand-my-product-review-id"
  }, {
    path: "/customer/feed/detail/:id?",
    component: _65e2ba3a,
    name: "customer-feed-detail-id"
  }, {
    path: "/auth/reset-password/:id?",
    component: _40e82dc6,
    name: "auth-reset-password-id"
  }, {
    path: "/auth/verify-account/:hash?/:id?",
    component: _5b5801de,
    name: "auth-verify-account-hash-id"
  }, {
    path: "/",
    component: _c8529b82,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
