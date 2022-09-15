import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import Gun from "gun/gun"
import "gun/sea"

const gun = Gun(['https://gun-manhattan.herokuapp.com/gun']);

Vue.prototype.$gun = gun

Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
