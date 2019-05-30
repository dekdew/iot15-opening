<template>
  <div class="random text-center">
    <div v-if="isBlack">
      <img class="mt-5" :src="getImgUrl('logo.png')" height="200em">
      <h1 class="mt-2">Dobby of Things - ITCamp15</h1>
      <div class="container mt-5">
        <h1 class="title">{{ message }}</h1>
      </div>
      <div class="wallpaper"></div>
    </div>

    <div v-else>
      <div class="container">
        <img class="mt-4" :src="getImgUrl('logo.png')" height="150em">
        <h1>ทำเนียบจอมเวทย์ฝึกหัด</h1>
        <div class="row my-4">
          <div v-for="user in userList" :key="user.id" class="col-2 p-4 name-box">
            <div v-if="user.group" :class="[user.group.name, 'box', 'border', 'rounded', 'px-3', 'py-2']">
              <h4>{{ user.name }} | {{ user.group.name }}</h4>
            </div>
            <div v-else :class="['box', 'border', 'rounded', 'px-3', 'py-2']">
              <h4>{{ user.name }}</h4>
            </div>
          </div>
        </div>
        <button type="submit" class="btn btn-lg mt-4 px-3 py-2" @click="randomName">
          <h4>เรียกสัมภาษณ์</h4>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'random',
  data() {
    return {
      userList: null,
      rndArr: [],
      isBlack: true,
      message: null,
      userListGroup: null
    }
  },
  mounted() {
    let self = this

    let bData = firebase.database().ref('isBlack')
		bData.on('value', function(snapshot) {
        self.isBlack = snapshot.val()
    })

    let mData = firebase.database().ref('message')
		mData.on('value', function(snapshot) {
        self.message = snapshot.val()
    })
  
    let data = firebase.database().ref('users/')
    data.on('value', function (snapshot) {
      let userList = snapshot.val()
      self.userList = userList.filter(Boolean)
    })
  },
  methods: {
    getImgUrl(pic) {
      return require('../assets/' + pic)
    },
    shuffle(array) {
      if (array.length > 1) {
        array.sort(() => Math.random() - 0.5)
      }
    },
    randomName() {
      let box = document.getElementsByClassName('box')
      for (let i = 0; i < box.length; i++) {
        if (!this.userList[i].group) {
          box[i].classList.remove('flash')
          void box[i].offsetWidth
          box[i].classList.add('flash')
        }
      }

      for (let i = 0; i < this.userList.length; i++) {
        if (!this.userList[i].group) {
          this.rndArr.push(this.userList[i].id)
        }
      }

      this.shuffle(this.rndArr)
      let rnd = this.rndArr[0]
      setTimeout(() => box[rnd-1].classList.add('select'), 500)
      setTimeout(() => this.$router.push('/wand/' + rnd), 4000)
    },
  }
}
</script>


<style scoped>
.A {
  border-color: #2bbbad !important;
}
.B {
  border-color: #aa66cc !important;
}
.C {
  border-color: #33b5e5 !important;
}
.D {
  border-color: #ffbb33 !important;
}
.E {
  border-color: #ff4444 !important;
}
.F {
  border-color: #00c851 !important;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.title {
  font-size: 10em;
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
.btn {
	background:linear-gradient(243deg,#fad961,#f76b1c);
	border: none;
}
.box {
  background-color: #0000;
  color: #fff;
}
.select {
  background-color: #ffff;
  color: #000;
}

.name-box:nth-child(1) .flash,
.name-box:nth-child(9) .flash,
.name-box:nth-child(12) .flash,
.name-box:nth-child(20) .flash,
.name-box:nth-child(22) .flash {
  animation-delay: .1s;
}

.name-box:nth-child(2) .flash,
.name-box:nth-child(11) .flash,
.name-box:nth-child(13) .flash,
.name-box:nth-child(15) .flash,
.name-box:nth-child(24) .flash  {
  animation-delay: .2s;
}

.name-box:nth-child(4) .flash,
.name-box:nth-child(7) .flash,
.name-box:nth-child(17) .flash,
.name-box:nth-child(21) .flash {
  animation-delay: .3s;
}

.name-box:nth-child(6) .flash,
.name-box:nth-child(8) .flash,
.name-box:nth-child(10) .flash,
.name-box:nth-child(19) .flash,
.name-box:nth-child(23) .flash {
  animation-delay: .4s;
}

.flash {
	animation: flash ease-in .9s 3;
  transition: all .3s;
}
@keyframes flash {
    0% {  
        background-color: #fff0;
    }

    25% {  
        background-color: #ffff;
        color: #000;
    }

    50% {  
        background-color: #fffa;
    }
    
   75% {
        background-color: #fff2;
    }

    100% {  
        background-color: #fff0;
    }
}
</style>
