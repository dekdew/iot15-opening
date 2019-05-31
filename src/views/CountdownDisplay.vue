<template>
    <div class="home text-center">
        <img class="mt-5 mb-1" :src="getImgUrl('logo.png')" height="150em">
        <h1>{{ countdown.title }}</h1>
        <div class="container">
            <vac v-if="isStart" ref="vac" :end-time="new Date(countdown.startTime).getTime() + countdown.time">
              <time slot="process" slot-scope="{ timeObj }">{{ `${timeObj.h}:${timeObj.m}:${timeObj.s}` }}</time>
              <time slot="finish">{{ countdown.timesUp }}</time>
            </vac>
            <time v-else>{{ countdown.countdownTime }}</time>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'countdownDisplay',
  data() {
    return {
      countdown: null,
      isStart: false,
      startDate: new Date()
    }
  },
  mounted() {
    let self = this
    let data = firebase.database().ref('countdown/')
    data.on('value', function (snapshot) {
      let countdown = snapshot.val()
      self.countdown = countdown
    })

    let dataS = firebase.database().ref('countdown/isStart')
    dataS.on('value', function (snapshot) {
      let isStart = snapshot.val()
      self.isStart = isStart
    })
  },
  methods: {
    getImgUrl(pic) {
      return require('../assets/' + pic)
    }
  }
}
</script>


<style scoped>
.A, .A hr {
  border-color: #2bbbad !important;
  color: #2bbbad;
}
.B, .B hr {
  border-color: #aa66cc !important;
  color: #aa66cc;
}
.C, .C hr {
  border-color: #33b5e5 !important;
  color: #33b5e5;
}
.D, .D hr {
  border-color: #ffbb33 !important;
  color: #ffffbb;
}
.E, .E hr {
  border-color: #ff4444 !important;
  color: #ff4444;
}
.F, .F hr {
  border-color: #00c851 !important;
  color: #00c851;
}

hr {
    width: 5em;
    border: 2px solid;
}
.hr-sm {
    width: 100%;
    border: 1px solid;
}

.home {
  user-select: none;
	color: white;
	height: 100vh;
	width: 100vw;
	overflow: hidden;
	background-image: url('../assets/bg.jpg');
	background-size: cover;
	background-repeat: no-repeat;
	background-position: top;
}
.container {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
h1 {
	font-size: 3em;
}
time {
    font-size: 15em;
}
.btn {
	background:linear-gradient(243deg,#fad961,#f76b1c);
	border: none;
}
.box {
  background-color: #fff2;
  color: #fff;
}
</style>
