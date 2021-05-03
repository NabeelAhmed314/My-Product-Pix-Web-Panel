import Vue from 'vue'
import { wrapFunctional } from './utils'

const components = {
  AdminRegister: () => import('../..\\components\\admin\\register.vue' /* webpackChunkName: "components/admin-register" */).then(c => wrapFunctional(c.default || c)),
  AuthChangePassword: () => import('../..\\components\\auth\\changePassword.vue' /* webpackChunkName: "components/auth-change-password" */).then(c => wrapFunctional(c.default || c)),
  AuthEmailVerification: () => import('../..\\components\\auth\\email-verification.vue' /* webpackChunkName: "components/auth-email-verification" */).then(c => wrapFunctional(c.default || c)),
  AuthEmailVerify: () => import('../..\\components\\auth\\email-verify.vue' /* webpackChunkName: "components/auth-email-verify" */).then(c => wrapFunctional(c.default || c)),
  AuthForgotPasswordForm: () => import('../..\\components\\auth\\forgotPasswordForm.vue' /* webpackChunkName: "components/auth-forgot-password-form" */).then(c => wrapFunctional(c.default || c)),
  AuthFormLayoutLeft: () => import('../..\\components\\auth\\formLayoutLeft.vue' /* webpackChunkName: "components/auth-form-layout-left" */).then(c => wrapFunctional(c.default || c)),
  AuthFormLayoutRight: () => import('../..\\components\\auth\\formLayoutRight.vue' /* webpackChunkName: "components/auth-form-layout-right" */).then(c => wrapFunctional(c.default || c)),
  AuthProfileForm: () => import('../..\\components\\auth\\profileForm.vue' /* webpackChunkName: "components/auth-profile-form" */).then(c => wrapFunctional(c.default || c)),
  AuthResetPassword: () => import('../..\\components\\auth\\resetPassword.vue' /* webpackChunkName: "components/auth-reset-password" */).then(c => wrapFunctional(c.default || c)),
  AuthSigninForm: () => import('../..\\components\\auth\\signinForm.vue' /* webpackChunkName: "components/auth-signin-form" */).then(c => wrapFunctional(c.default || c)),
  AuthSignupForm: () => import('../..\\components\\auth\\signupForm.vue' /* webpackChunkName: "components/auth-signup-form" */).then(c => wrapFunctional(c.default || c)),
  BrandDetail: () => import('../..\\components\\brand\\detail.vue' /* webpackChunkName: "components/brand-detail" */).then(c => wrapFunctional(c.default || c)),
  BrandProducts: () => import('../..\\components\\brand\\products.vue' /* webpackChunkName: "components/brand-products" */).then(c => wrapFunctional(c.default || c)),
  BrandReviews: () => import('../..\\components\\brand\\reviews.vue' /* webpackChunkName: "components/brand-reviews" */).then(c => wrapFunctional(c.default || c)),
  DrawerAdminMenu: () => import('../..\\components\\drawer\\admin-menu.vue' /* webpackChunkName: "components/drawer-admin-menu" */).then(c => wrapFunctional(c.default || c)),
  DrawerBrandMenu: () => import('../..\\components\\drawer\\brand-menu.vue' /* webpackChunkName: "components/drawer-brand-menu" */).then(c => wrapFunctional(c.default || c)),
  DrawerCustomerMenu: () => import('../..\\components\\drawer\\customer-menu.vue' /* webpackChunkName: "components/drawer-customer-menu" */).then(c => wrapFunctional(c.default || c)),
  DrawerHeader: () => import('../..\\components\\drawer\\header.vue' /* webpackChunkName: "components/drawer-header" */).then(c => wrapFunctional(c.default || c)),
  DrawerMenu: () => import('../..\\components\\drawer\\menu.vue' /* webpackChunkName: "components/drawer-menu" */).then(c => wrapFunctional(c.default || c)),
  HelperCircularImagePicker: () => import('../..\\components\\helper\\circularImagePicker.vue' /* webpackChunkName: "components/helper-circular-image-picker" */).then(c => wrapFunctional(c.default || c)),
  AdminBrandForm: () => import('../..\\components\\admin\\brand\\form.vue' /* webpackChunkName: "components/admin-brand-form" */).then(c => wrapFunctional(c.default || c)),
  AdminBrandMain: () => import('../..\\components\\admin\\brand\\main.vue' /* webpackChunkName: "components/admin-brand-main" */).then(c => wrapFunctional(c.default || c)),
  AdminCategoryForm: () => import('../..\\components\\admin\\category\\form.vue' /* webpackChunkName: "components/admin-category-form" */).then(c => wrapFunctional(c.default || c)),
  AdminCategoryMain: () => import('../..\\components\\admin\\category\\main.vue' /* webpackChunkName: "components/admin-category-main" */).then(c => wrapFunctional(c.default || c)),
  AdminDashboardChart: () => import('../..\\components\\admin\\dashboard\\chart.js' /* webpackChunkName: "components/admin-dashboard-chart" */).then(c => wrapFunctional(c.default || c)),
  AdminDashboardMain: () => import('../..\\components\\admin\\dashboard\\main.vue' /* webpackChunkName: "components/admin-dashboard-main" */).then(c => wrapFunctional(c.default || c)),
  AdminInstagramForm: () => import('../..\\components\\admin\\instagram\\form.vue' /* webpackChunkName: "components/admin-instagram-form" */).then(c => wrapFunctional(c.default || c)),
  AdminMailForm: () => import('../..\\components\\admin\\mail\\form.vue' /* webpackChunkName: "components/admin-mail-form" */).then(c => wrapFunctional(c.default || c)),
  AdminNotificationForm: () => import('../..\\components\\admin\\notification\\form.vue' /* webpackChunkName: "components/admin-notification-form" */).then(c => wrapFunctional(c.default || c)),
  AdminNotificationMain: () => import('../..\\components\\admin\\notification\\main.vue' /* webpackChunkName: "components/admin-notification-main" */).then(c => wrapFunctional(c.default || c)),
  AdminProductForm: () => import('../..\\components\\admin\\product\\form.vue' /* webpackChunkName: "components/admin-product-form" */).then(c => wrapFunctional(c.default || c)),
  AdminProductMain: () => import('../..\\components\\admin\\product\\main.vue' /* webpackChunkName: "components/admin-product-main" */).then(c => wrapFunctional(c.default || c)),
  AdminSubmissionDetail: () => import('../..\\components\\admin\\submission\\detail.vue' /* webpackChunkName: "components/admin-submission-detail" */).then(c => wrapFunctional(c.default || c)),
  AdminSubmissionForm: () => import('../..\\components\\admin\\submission\\form.vue' /* webpackChunkName: "components/admin-submission-form" */).then(c => wrapFunctional(c.default || c)),
  AdminSubmissionMain: () => import('../..\\components\\admin\\submission\\main.vue' /* webpackChunkName: "components/admin-submission-main" */).then(c => wrapFunctional(c.default || c)),
  AdminUpNextMain: () => import('../..\\components\\admin\\up-next\\main.vue' /* webpackChunkName: "components/admin-up-next-main" */).then(c => wrapFunctional(c.default || c)),
  AdminUserDetail: () => import('../..\\components\\admin\\user\\detail.vue' /* webpackChunkName: "components/admin-user-detail" */).then(c => wrapFunctional(c.default || c)),
  AdminUserMain: () => import('../..\\components\\admin\\user\\main.vue' /* webpackChunkName: "components/admin-user-main" */).then(c => wrapFunctional(c.default || c)),
  CustomerFeedDetail: () => import('../..\\components\\customer\\feed\\detail.vue' /* webpackChunkName: "components/customer-feed-detail" */).then(c => wrapFunctional(c.default || c)),
  CustomerFeed: () => import('../..\\components\\customer\\feed\\feed.vue' /* webpackChunkName: "components/customer-feed" */).then(c => wrapFunctional(c.default || c)),
  CustomerFeedMain: () => import('../..\\components\\customer\\feed\\main.vue' /* webpackChunkName: "components/customer-feed-main" */).then(c => wrapFunctional(c.default || c))
}

for (const name in components) {
  Vue.component(name, components[name])
  Vue.component('Lazy' + name, components[name])
}
