import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import * as VueGoogleMaps from 'vue2-google-maps'


//** Install the VueGoogleMaps as a plugin and insert the api key */
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyD6F5Q0wPmoO4I35YmkOW9I4YSyg_1-mfU',
    libraries: 'places',
  }
});


Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
