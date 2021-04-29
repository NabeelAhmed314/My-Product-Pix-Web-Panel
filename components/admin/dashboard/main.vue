<template>
  <v-container>
    <div v-if="!loading">
      <v-row>
        <v-col cols="12" sm="6" md="3">
          <v-card class="d-flex justify-center align-center" min-height="150px">
            <div
              class="font-weight-bold"
              style="position: absolute; top: 10px; left: 10px"
            >
              Total Reviews
            </div>
            <div class="text-body-1 font-weight-bold primary--text">
              {{ data.reviews }}
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-card class="d-flex justify-center align-center" min-height="150px">
            <div
              class="font-weight-bold"
              style="position: absolute; top: 10px; left: 10px"
            >
              Customers
            </div>
            <div class="text-body-1 font-weight-bold primary--text">
              {{ data.customers }}
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-card class="d-flex justify-center align-center" min-height="150px">
            <div
              class="font-weight-bold"
              style="position: absolute; top: 10px; left: 10px"
            >
              Brands
            </div>
            <div class="text-center text-body-1 font-weight-bold primary--text">
              {{ data.brands }}
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-card class="d-flex justify-center align-center" min-height="150px">
            <div
              class="font-weight-bold"
              style="position: absolute; top: 10px; left: 10px"
            >
              Total Products
            </div>
            <div class="text-body-1 font-weight-bold primary--text">
              {{ data.products }}
            </div>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <chart
            :data="submissionData"
            :options="submissionOptions"
            :height="250"
          />
        </v-col>
        <v-col cols="12" md="6">
          <chart :data="reviewData" :options="reviewOptions" :height="250" />
        </v-col>
      </v-row>
    </div>
    <div
      v-else
      style="
        position: absolute;
        top: 50%;
        right: 50%;
        transform: translate(-50%);
      "
    >
      <VProgressCircular color="primary" indeterminate />
    </div>
  </v-container>
</template>

<script>
import chart from './chart'
export default {
  name: 'DashboardMain',
  components: { chart },
  data() {
    return {
      loading: false,
      data: {},
      submissionData: {
        labels: ['Assigned', 'Reviewed'],
        datasets: [
          {
            backgroundColor: ['lightBlue', '#8C9EFF'],
            data: [],
          },
        ],
      },
      reviewData: {
        labels: ['Positive', 'Neutral', 'Negative'],
        datasets: [
          {
            backgroundColor: ['lightGreen', 'grey', '#EF9A9A'],
            data: [],
          },
        ],
      },
      submissionOptions: {
        responsive: true,
        title: {
          display: true,
          text: 'Submission Analytics',
          fontSize: 24,
          fontColor: '#6b7280',
        },
      },
      reviewOptions: {
        responsive: true,
        title: {
          display: true,
          text: 'Reviews Analytics',
          fontSize: 24,
          fontColor: '#6b7280',
        },
      },
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      this.loading = true
      const data = await this.$axios.$get('dashboard')
      this.submissionData.datasets[0].data.push(data.submissions)
      this.submissionData.datasets[0].data.push(data.reviews)
      this.reviewData.datasets[0].data.push(data.positive)
      this.reviewData.datasets[0].data.push(data.neutral)
      this.reviewData.datasets[0].data.push(data.negative)
      this.data = data
      this.loading = false
    },
  },
}
</script>

<style scoped></style>
