<template>
  <div class="register text-center">
  	<div v-show="isBlack" class="black"></div>

		<transition name="fade">
			<div v-if="!isBlack">
				<img class="mb-1" :src="getImgUrl('logo.png')" height="200em">
				<div id="form" class="container">
					<h1 class="mb-4">สวัสดีจอมเวทย์ฝึกหัด</h1>
					<form class="form">
						<div class="form-group mx-auto" style="max-width:40rem;">
							<input v-model="name" class="form-control form-control-lg" placeholder="กรอกชื่อเล่นของเจ้า" required maxlength="10">
						</div>
						<button type="submit" class="btn btn-lg mt-4 px-3 py-2" @click="setName(userId, name); checkForm();">
							เข้าสู่โลกแห่งเวทมนตร์
						</button>
					</form>
				</div>
			</div>
		</transition>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'register',
  data() {
    return {
			userId: this.$route.params.id,
			name: null,
			isBlack: true,
    }
	},
	mounted() {
		let data = firebase.database().ref('isBlack')
		let self = this
		data.on('value', function(snapshot) {
        self.isBlack = snapshot.val()
    })
	},
	methods: {
		setName: function (userId, name) {
			firebase.database().ref('users/' + userId).set({
				id: userId,
				name: name,
				group: null
			})
		},
		getImgUrl(pic) {
    	return require('../assets/'+pic)
		},
		checkForm: function () {
      if (this.name) {
        this.$router.push('/wait/' + this.userId)
      }
    }
	}
}
</script>


<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.register {
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
.black {
	cursor: none;
	background-color: black;
	width: 100%;
	height: 100%;
	z-index: 999;
}
.container {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
.btn {
	background:linear-gradient(243deg,#fad961,#f76b1c);
	border: none;
}
h1 {
	font-size: 4em;
}
img {
	position: relative;
	top: 5em;
	left: 0;
}
</style>
