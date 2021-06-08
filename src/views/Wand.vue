<template>
  <div class="random text-center">
  	<div class="container">
  		<h2>ไม้กายสิทธิ์จะเป็นผู้เลือกเจ้า</h2>
  		<h1>{{ user.name }} {{ user_group }}</h1>

  		<carousel-3d height="500em" ref="mycarousel" :space="250" :display="6" :count="6" :autoplay="false"
  			:clickable="false">
  			<slide v-for="(slide, i) in slides" :key="i" :index="i">
  				<img :src="getImgUrl(i+'.svg')" height="500em">
  			</slide>
  		</carousel-3d>

  		<div v-if="user.group.name !== "">
  			<router-link to="/random" class="btn btn-lg px-3 py-2">
  				<h4>กลับ</h4>
  			</router-link>
  		</div>
  		<div v-else>
  			<button @click="randomWand()" type="submit" class="btn btn-lg px-3 py-2">
  				<h4>โบกนิดสะบัดหน่อย</h4>
  			</button>
  		</div>
		</div>
	</div>
</template>


<script>
import firebase from 'firebase'
import {
	Carousel3d,
	Slide
} from 'vue-carousel-3d'

export default {
	name: 'wand',
	data() {
		return {
			userId: this.$route.params.id,
			user: null,
			group: null,
			wand: null,
			stop: false,
			slides: 6,
			user_group: null,
		}
	},
	components: {
		Carousel3d,
		Slide
	},
	mounted() {
		let self = this
		let userData = firebase.database().ref('users/' + self.userId)
		userData.on('value', function (snapshot) {
			self.user = snapshot.val()
		})

		let groupData = firebase.database().ref('group/')
		groupData.on('value', function (snapshot) {
			self.group = snapshot.val()
		})

		if (self.group == null) {
			firebase.database().ref('group/').set([{
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
			}])
		}
	},
	methods: {
		getImgUrl(pic) {
			return require('../assets/wand/' + pic)
		},
		setAnimation(i, last) {
			let min = 0
			let max = 6
			let rnd = Math.floor(Math.random() * (+max - +min) + +min)
			if (rnd == last) {
				this.setAnimation(i, last)
			} else {
				setTimeout(() => {
					this.$refs.mycarousel.goSlide(rnd)
					if (--i) {
						this.setAnimation(i, rnd)
					}
					
				}, 500)
			}
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

			let randomTime = Math.floor(Math.random() * (+10 - +5) + +5)
			this.setAnimation(randomTime, 1)

			setTimeout(() => {
				this.$refs.mycarousel.goSlide(rnd)
				this.user_group = this.user.group.name
			}, randomTime*500+500)

			this.user['group'] = this.group[rnd]
			
			firebase.database().ref('users/' + this.userId).set(this.user)

			firebase.database().ref('group/' + this.user.group.id).update({
				count: this.group[this.user.group.id].count + 1
			})
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


/* figure */
.carousel-3d-slide {
	background-color: unset;
	border: unset;
}
</style>
