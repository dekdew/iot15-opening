<template>
  <div class="home text-center">
    <div class="container">
      <h1>Control Board</h1>
      <div class="row">
          <div v-for="group in userGroup" :key="group.id" class="col-4">
              <div :class="[group.group, 'box', 'border', 'rounded', 'my-3', 'p-2']">
                <h2 class="text-left">{{ group.group }} | {{ group.score }}</h2>
                <hr class="hr-sm">
                <div class="row">
                    <div class="col-4 my-1">
                        <button @click="add(1, group.id)" class="btn btn-outline-success btn-block">ADD 1</button>
                    </div>
                    <div class="col-4 my-1">
                        <button @click="add(10, group.id)" class="btn btn-outline-success btn-block">ADD 10</button>
                    </div>
                    <div class="col-4 my-1">
                        <button @click="add(100, group.id)" class="btn btn-outline-success btn-block">ADD 100</button>
                    </div>

                    <div class="col-4 my-1">
                        <button @click="sub(1, group.id)" class="btn btn-outline-danger btn-block">SUB 1</button>
                    </div>
                    <div class="col-4 my-1">
                        <button @click="sub(10, group.id)" class="btn btn-outline-danger btn-block">SUB 10</button>
                    </div>
                    <div class="col-4 my-1">
                        <button @click="sub(100, group.id)" class="btn btn-outline-danger btn-block">SUB 100</button>
                    </div>

                    <div class="col-12">
                        <input v-model="input[group.id].add" type="number" class="form-control" placeholder="ADD..." aria-label="Search">
                        <button @click="add(input[group.id].add, group.id)" class="btn-i btn btn-outline-success">ADD</button>
                    </div>

                    <div class="col-12">
                        <input v-model="input[group.id].sub" type="number" class="form-control" placeholder="SUB..." aria-label="Search">
                        <button @click="sub(input[group.id].sub, group.id)" class="btn-i btn btn-outline-danger">SUB</button>
                    </div>

                    <div class="col-12">
                        <input v-model="input[group.id].set" type="number" class="form-control" placeholder="SET..." aria-label="Search">
                        <button @click="set(input[group.id].set, group.id)" class="btn-i btn btn-outline-warning">SET</button>
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
			rndArr: [],
			groupScore: {},
			input: [
				{
					gid: 0,
					group: "A",
					add: null,
					sub: null,
					set: null
				},
				{
					gid: 1,
					group: "B",
					add: null,
					sub: null,
					set: null
				},
				{
					gid: 2,
					group: "C",
					add: null,
					sub: null,
					set: null
				},
				{
					gid: 3,
					group: "D",
					add: null,
					sub: null,
					set: null
				},
				{
					gid: 4,
					group: "E",
					add: null,
					sub: null,
					set: null
				},
				{
					gid: 5,
					group: "F",
					add: null,
					sub: null,
					set: null
				}
			]
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
		add(value, gid) {
			this.input[gid].add = null
			gid = gid+1
			for (let i = 1; i <= 6; i++) {
				this.groupScore[i] = this.userGroup[i-1].score
			}

			firebase.database().ref('userGroup/' + gid).update({
				score: this.groupScore[gid] + parseInt(value)
			})

		},
		sub(value, gid) {
			this.input[gid].sub = null
			gid = gid+1
			for (let i = 1; i <= 6; i++) {
				this.groupScore[i] = this.userGroup[i-1].score
			}

			firebase.database().ref('userGroup/' + gid).update({
				score: this.groupScore[gid] - parseInt(value)
			})
		},
		set(value, gid) {
			this.input[gid].set = null
			gid = gid+1
			firebase.database().ref('userGroup/' + gid).update({
				score: parseInt(value)
			})
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

.form-control {
    width: 80%;
    display: inline-block;
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
    color: #fff;
}
.btn-i {
    width: 20%;
}
.box {
  background-color: #000;
  color: #fff;
}
</style>
