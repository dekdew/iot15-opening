import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase'
import bootstrap from 'bootstrap/scss/bootstrap.scss'
import Carousel3d from 'vue-carousel-3d'

Vue.use(Carousel3d)

Vue.config.productionTip = false

let config = {
  apiKey: 'AIzaSyDCH3v8SimCCaWfxTnuyKJoD2ZOXiyeDBs',
  authDomain: 'itcamp15-openceremony.firebaseapp.com',
  databaseURL: 'https://itcamp15-openceremony.firebaseio.com',
  projectId: 'itcamp15-openceremony',
  storageBucket: 'itcamp15-openceremony.appspot.com',
  messagingSenderId: '958940610771',
  appId: '1:958940610771:web:44ee042ac3ecc1fe'
}

firebase.initializeApp(config)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
