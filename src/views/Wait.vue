<template>
  <div class="wait text-center">
		<img class="mb-1" :src="getImgUrl('logo.png')" height="200em">
		<div class="container">
			<h1>ยินดีต้อนรับ</h1>
			<h2>จอมเวทย์ฝึกหัด <b class="name">{{ name }}</b> เข้าสู่ค่าย Dobby of Things</h2>
			<h2>ความสนุกกำลังรอเจ้าอยู่!</h2>
		</div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'wait',
  data() {
    return {
			userId: this.$route.params.id,
			name: null,
    }
	},
	mounted() {
		let self = this
		let data = firebase.database().ref('users/' + self.userId + '/name')
		data.on('value', function(snapshot) {
			self.name = snapshot.val()
    })
	},
	methods: {
		getImgUrl(pic) {
    	return require('../assets/'+pic)
		}
	}
}
</script>


<style scoped>
.wait {
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
.name {
	font-size: 1.5em;
}
img {
	position: relative;
	top: 5em;
	left: 0;
}
h1 {
	font-size: 4em;
}
h2 {
	font-size: 2.5em;
}
</style>
