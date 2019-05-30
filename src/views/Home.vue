<template>
  <div class="home text-center">
    <div class="container">
      <img class="mb-1" :src="getImgUrl('logo.png')" height="150em">
      <h1>ทำเนียบจอมเวทย์ฝึกหัด</h1>
      <div class="row my-4">
        <div v-for="user in user_list" :key="user.id" class="col-2 p-4 name-box">
          <div v-if="user.group" :class="[user.group.name, 'box', 'border', 'rounded', 'px-3', 'py-2']">
            <h4>{{ user.name }} | {{ user.group.name }}</h4>
          </div>
          <div v-else :class="['box', 'border', 'rounded', 'px-3', 'py-2']">
            <h4>{{ user.name }}</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'home',
  data() {
    return {
      user_list: null,
      rndArr: []
    }
  },
  mounted() {
    let self = this
    let data = firebase.database().ref('users/')
    data.on('value', function (snapshot) {
      let user_list = snapshot.val()
      self.user_list = user_list.filter(Boolean)
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
.btn {
	background:linear-gradient(243deg,#fad961,#f76b1c);
	border: none;
}
.box {
  background-color: #fff1;
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
