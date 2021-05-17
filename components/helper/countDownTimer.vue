<template>
  <div v-if="timer[1] > 0" class="d-flex justify-center align-center">
    <div class="text-center">
      <div class="d-flex mb-1 align-center">
        <div class="elevation-3 rounded-lg pa-2 pa-md-5 mx-1">
          <div class="digit">
            {{ timer[0] }}
          </div>
        </div>
        <div class="elevation-3 rounded-lg pa-2 pa-md-5 mx-1">
          <div class="digit">
            {{ timer[1] }}
          </div>
        </div>
        <div class="text-h3">:</div>
      </div>
      <div>Days</div>
    </div>
    <div class="text-center">
      <div class="d-flex mb-1 align-center">
        <div class="elevation-3 rounded-lg pa-2 pa-md-5 mx-1">
          <div class="digit">
            {{ timer[2] }}
          </div>
        </div>
        <div class="elevation-3 rounded-lg pa-2 pa-md-5 mx-1">
          <div class="digit">
            {{ timer[3] }}
          </div>
        </div>
        <div class="text-h3">:</div>
      </div>
      <div>Hours</div>
    </div>
    <div class="text-center">
      <div class="d-flex mb-1">
        <div class="elevation-3 rounded-lg pa-2 pa-md-5 mx-1">
          <div class="digit">
            {{ timer[4] }}
          </div>
        </div>
        <div class="elevation-3 rounded-lg pa-2 pa-md-5 mx-1">
          <div class="digit">
            {{ timer[5] }}
          </div>
        </div>
      </div>
      <div>Minutes</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CountDownTimer',
  props: {
    date: {
      type: String,
    },
  },
  data() {
    return {
      now: Math.trunc(new Date().getTime() / 1000),
      timer: [],
      interval: null,
    }
  },
  mounted() {
    const milli = Math.trunc(Date.parse(this.date) / 1000)
    let minutes = Math.trunc((milli - this.now) / 60) % 60
    let hours = Math.trunc((milli - this.now) / 60 / 60) % 24
    let days = Math.trunc((milli - this.now) / 60 / 60 / 24)
    if (days <= 9) days = '0' + days
    if (hours <= 9) hours = '0' + hours
    if (minutes <= 9) minutes = '0' + minutes
    const endResult = days + hours + minutes
    this.timer = endResult.toString().split('')
    console.log(endResult.toString().split(''))
    this.interval = setInterval(() => {
      const now = Math.trunc(new Date().getTime() / 1000)
      const milli = Math.trunc(Date.parse(this.date) / 1000)
      let minutes = Math.trunc((milli - now) / 60) % 60
      let hours = Math.trunc((milli - now) / 60 / 60) % 24
      let days = Math.trunc((milli - now) / 60 / 60 / 24)
      if (days <= 9) days = '0' + days
      if (hours <= 9) hours = '0' + hours
      if (minutes <= 9) minutes = '0' + minutes
      const endResult = days + hours + minutes
      this.timer = endResult.toString().split('')
      console.log(endResult.toString().split(''))
    }, 60000)
  },
  destroyed() {
    clearInterval(this.interval)
  },
}
</script>

<style scoped>
.digit {
  color: #c80000;
  font-size: 35px;
  font-weight: bold;
  font-family: 'Roboto', serif;
  text-align: center;
}
</style>
