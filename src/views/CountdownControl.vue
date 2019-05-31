<template>
	<div class="home text-center">
		<div class="container">
			<h1 class="mt-5">Countdown Control</h1>
			<div class="box p-4 border rounded">

				<time>{{ countdownTime }}</time><i @click="resetTime" class="fa fa-refresh pl-3 text-dark"></i>

				<div class="row">
					<div class="col-12 text-left">
						<h3>Control</h3>
					</div>
					<div class="col">
						<button @click="setTime" class="btn btn-lg btn-warning btn-block">SET</button>
					</div>
					<div class="col">
						<button @click="start" class="btn btn-success btn-lg btn-block">START</button>
					</div>
				</div>

				<hr class="hr-sm">

				<div class="row">
					<div class="col-12 text-left">
						<h3>Title</h3>
					</div>
					<div class="col-10">
						<div class="form-group">
							<input v-model="countdown.title" type="text" class="form-control" placeholder="Title">
						</div>
					</div>
					<div class="col-2">
						<button @click="setTitle(countdown.title)" class="btn btn-warning btn-block">SET</button>
					</div>
				</div>

				<hr class="hr-sm">

				<div class="row">
					<div class="col-12 text-left">
						<h3>Set Time</h3>
					</div>
					<div class="col-4">
						<button @click="addTime(10)" class="btn my-2 btn-primary btn-lg btn-block">+10 MINS</button>
					</div>
					<div class="col-4">
						<button @click="addTime(30)" class="btn my-2 btn-primary btn-lg btn-block">+30 MINS</button>
					</div>
					<div class="col-4">
						<button @click="addTime(60)" class="btn my-2 btn-primary btn-lg btn-block">+60 MINS</button>
					</div>
					<div class="col-4">
						<button @click="subTime(10)" class="btn my-2 btn-danger btn-lg btn-block">-10 MINS</button>
					</div>
					<div class="col-4">
						<button @click="subTime(30)" class="btn my-2 btn-danger btn-lg btn-block">-30 MINS</button>
					</div>
					<div class="col-4">
						<button @click="subTime(60)" class="btn my-2 btn-danger btn-lg btn-block">-60 MINS</button>
					</div>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'countdownControl',
  data() {
    return {
			countdown: null,
			time: 0
    }
  },
  mounted() {
    let self = this
    let data = firebase.database().ref('countdown/')
    data.on('value', function (snapshot) {
      let countdown = snapshot.val()
      self.countdown = countdown
    })
  },
  methods: {
    getImgUrl(pic) {
      return require('../assets/' + pic)
		},
		setTitle(value) {
			firebase.database().ref('countdown/').update({
				title: value
			})
		},
		addTime(value) {
			this.time += value*60
		},
		subTime(value) {
			this.time -= value*60
		},
		resetTime() {
			this.time = 0
			firebase.database().ref('countdown/').update({
				countdownTime: this.countdownTime
			})
		},
		start() {
			firebase.database().ref('countdown/').update({
				isStart: true,
				startTime: new Date(),
			})
		},
		setTime() {
			firebase.database().ref('countdown/').update({
				time: this.time * 1000,
				isStart: false,
				countdownTime: this.countdownTime
			})
		}
	},
	computed: {
		countdownTime: function () {
			let min =  Math.floor(this.time/60)%60
			let hour = Math.floor(this.time/3600)
			return `${hour}:${min}:00`
		}
	}
}
</script>


<style scoped>
.w-20 {
  width: 10%;
}
.w-80 {
  width: 70%;
}
i {
	font-size: 2em !important;
}
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
  font-size: 6em;
}
.box {
  background-color: #000;
  color: #fff;
}
</style>
