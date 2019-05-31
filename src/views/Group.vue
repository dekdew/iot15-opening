<template>
  <div class="home text-center">
    <div class="container">
      <img class="mb-1" :src="getImgUrl('logo.png')" height="150em">
      <h1>สมุดบันทึกความดี</h1>
      <div class="row">
          <div v-for="group in userGroup" :key="group.id" class="col-4">
              <div :class="[group.group, 'box', 'border', 'rounded', 'my-3', 'p-2']">
                <h2>{{ group.name }}</h2>
                <hr>
                <p class="display-1 m-0 p-0">{{ group.score }}</p>
                <hr class="hr-sm">
                <div class="row">
                    <div class="col" v-for="user in group.member.filter(Boolean)" :key="user">
                        <h5>{{ user.name }}</h5>
                    </div>
                </div>
              </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'group',
  data() {
    return {
      userGroup: null,
      rndArr: []
    }
  },
  mounted() {
    let self = this
    let data = firebase.database().ref('userGroup/')
    data.on('value', function (snapshot) {
      let userGroup = snapshot.val()
      self.userGroup = userGroup.filter(Boolean)
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
.btn {
	background:linear-gradient(243deg,#fad961,#f76b1c);
	border: none;
}
.box {
  background-color: #fff2;
  color: #fff;
}
</style>
