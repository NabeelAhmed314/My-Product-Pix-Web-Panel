<template>
  <v-container>
    <div class="d-flex pb-3">
      <v-btn color="primary" large to="/customer/family/add">Add New</v-btn>
      <v-spacer />
      <v-avatar
        v-if="$vuetify.breakpoint.mdAndUp && family.length > 0"
        rounded
        class="elevation-1"
      >
        <v-icon @click="toggle">{{
          isGrid ? 'mdi-format-list-bulleted-square' : 'mdi-view-grid-outline'
        }}</v-icon>
      </v-avatar>
    </div>
    <v-row v-if="family.length > 0">
      <v-col
        v-for="(person, i) of family"
        :key="i"
        cols="12"
        :md="md"
        style="cursor: pointer"
      >
        <v-card class="rounded-lg" :to="'/customer/family/edit/' + person._id">
          <div class="d-flex pa-4">
            <v-avatar
              size="100"
              color="white"
              class="elevation-2 rounded-xl mx-2"
              rounded
              ><v-icon v-if="!person.image">mdi-image</v-icon>
              <img
                v-else
                :src="$axios.defaults.baseURL + 'uploads/' + person.image.name"
                style="object-fit: cover; object-position: center"
            /></v-avatar>
            <div class="mx-2 my-auto">
              <div class="primary--text text-h6">{{ person.name }}</div>
              <div class="text-body-2">{{ person.relation }}</div>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <div v-else>No Data Available</div>
  </v-container>
</template>

<script>
export default {
  name: 'FamilyTile',
  props: {
    family: {
      type: Array,
      default: null,
    },
  },
  data: () => ({ isGrid: true, md: 6 }),
  methods: {
    toggle() {
      if (this.isGrid) this.md = 12
      else this.md = 6

      this.isGrid = !this.isGrid
    },
  },
}
</script>

<style scoped></style>
