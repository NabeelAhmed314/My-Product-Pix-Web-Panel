<template>
  <v-app>
    <v-main>
      <nuxt />
      <div
        style="
          position: absolute;
          bottom: 0;
          left: 0;
          height: 70px;
          z-index: 0;
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
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'None',
}
</script>

<style scoped></style>
