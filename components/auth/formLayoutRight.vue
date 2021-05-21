<template>
  <div class="align-center justify-center main-div">
    <div
      style="
        position: absolute;
        top: 0;
        left: 0;
        height: 250px;
        border-bottom-left-radius: 100px;
        border-bottom-right-radius: 100px;
        overflow: hidden;
      "
    >
      <img
        height="100%"
        width="100%"
        src="~/assets/images/bg-1.png"
        alt="wave"
        style="object-fit: fill"
      />
    </div>
    <v-card class="d-flex form-card">
      <div class="main-form">
        <v-container
          class="d-flex flex-column justify-center align-center py-5 fill-height"
        >
          <slot />
        </v-container>
      </div>
      <div
        class="div-image d-none d-md-flex justify-center align-center white--text"
      >
        <div class="overlay"></div>
        <div class="logo">
          <img alt="logo" src="../../assets/images/logo.png" width="115" />
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  name: `FormLayoutRight`,
}
</script>

<style scoped lang="scss">
.main-div {
  width: 100%;
  min-width: 320px;
  padding: 50px 0;
}
.main-form {
  width: 50%;
  min-width: 50%;
}
@media screen and (max-width: 992px) {
  .main-form {
    min-width: 100%;
  }
}
.form-card {
  min-height: 500px;
  width: 70%;
  min-width: 320px;
  border-radius: 16px;
  overflow: hidden;
  margin: 0 auto;
}
.div-image {
  min-width: 50%;
  background-image: url('/images/sign-in.jpg');
  background-size: cover;
  background-position: center;
  position: relative;
  border-radius: 0 !important;
}
.overlay {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #c80000;
  opacity: 0.3;
}
.logo {
  z-index: 1;
}
</style>
