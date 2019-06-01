<template>
    <div class="random text-center">
        <div class="container">
            <h1 v-if="isRandomed">Team {{wand.name}}</h1>
						<h1 v-else>Random Team</h1>

            <carousel-3d class="mt-5" height="550em" ref="mycarousel" :space="250" :display="6" :count="6" :autoplay="false"
                :clickable="false">
                <slide v-for="(slide, i) in slides" :key="i" :index="i">
                    <img :src="getImgUrl(i+'.svg')" height="550em">
                </slide>
            </carousel-3d>

						<input v-if="out.length < 6" @keyup.enter="randomWand" onblur="this.focus()" autofocus>

            <!-- <button v-if="out.length < 6" @click="randomWand()" type="submit" class="btn btn-lg mt-5 px-3 py-2">
                <h4>โบกนิดสะบัดหน่อย</h4>
            </button> -->
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
	name: 'randomGroup',
	data() {
		return {
			out: [],
			group: [{
				'id': 0,
				'name': 'A',
				'isOut': false
			}, {
				'id': 1,
				'name': 'B',
				'isOut': false
			}, {
				'id': 2,
				'name': 'C',
				'isOut': false
			}, {
				'id': 3,
				'name': 'D',
				'isOut': false
			}, {
				'id': 4,
				'name': 'E',
				'isOut': false
			}, {
				'id': 5,
				'name': 'F',
				'isOut': false
			}],
			isRandomed: false,
			slides: 6,
			wand: null
		}
	},
	components: {
		Carousel3d,
		Slide
	},
	mounted() {},
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
			this.isRandomed = false
			let min = 0
			let max = this.group.length
			let rnd = Math.floor(Math.random() * (+max - +min) + +min)
			while (this.group[rnd].isOut) {
				rnd = Math.floor(Math.random() * (+max - +min) + +min)
			}

			let randomTime = Math.floor(Math.random() * (+10 - +5) + +5)
			this.setAnimation(randomTime, 1)

			setTimeout(() => {
				this.$refs.mycarousel.goSlide(rnd)
				this.group[rnd].isOut = true
				this.wand = this.group[rnd]
				this.out.push(this.wand.name)
				this.isRandomed = true
			}, randomTime * 500 + 500)
		}
	}
}
</script>


<style scoped>
input {
	opacity: 0;
}
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
