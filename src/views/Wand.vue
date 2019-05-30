<template>
  <div class="random text-center">
    <div class="container">
			<h2>ไม้กายสิทธิ์จะเป็นผู้เลือกเจ้า</h2>
			<h1>{{ user.name }}</h1>
			<button @click="randomWand()" type="submit" class="btn btn-lg mt-4 px-3 py-2">
				<h4>โบกนิดสะบัดหน่อย</h4>
			</button>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'wand',
  data() {
    return {
			userId: this.$route.params.id,
			user: null,
			group: null,
			wand: null,
			stop: false
    }
	},
	mounted() {
		let self = this
		let userData = firebase.database().ref('users/' + self.userId)
		userData.on('value', function(snapshot) {
			self.user = snapshot.val()
		})
		
		let groupData = firebase.database().ref('group/')
		groupData.on('value', function(snapshot) {
			self.group = snapshot.val()
		})
		
		if (self.group == null) {
			firebase.database().ref('group/').set([
				{
					'id': 0,
					'name': 'A',
					'count': 0
				}, {
					'id': 1,
					'name': 'B',
					'count': 0
				}, {
					'id': 2,
					'name': 'C',
					'count': 0
				}, {
					'id': 3,
					'name': 'D',
					'count': 0
				}, {
					'id': 4,
					'name': 'E',
					'count': 0
				}, {
					'id': 5,
					'name': 'F',
					'count': 0
				}
			])
		}
	},
	methods: {
		getImgUrl(pic) {
    	return require('../assets/'+pic)
		},
		randomWand() {
			let min = 0
			let max = 6
			let rnd = null
			while (!this.stop) {
				rnd = Math.floor(Math.random() * (+max - +min) + +min)
				if (this.group[rnd].count < 4) {
					this.stop = true
				}
			}


			this.user['group'] = this.group[rnd]

			firebase.database().ref('users/' + this.userId).set(this.user)

			firebase.database().ref('group/' + this.user.group.id).update({
				count: this.group[this.user.id].count + 1
			})

			setTimeout(() => this.$router.push('/random/'), 4000)
		}
	}
}
</script>


<style scoped>
.random {
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
h2 {
	font-size: 2.5em;
}
.btn {
	background:linear-gradient(243deg,#fad961,#f76b1c);
	border: none;
}

</style>
