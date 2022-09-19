import Vue from 'vue';
import { createPinia, PiniaVuePlugin } from 'pinia'
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { Peer } from 'peerjs';

let urlId = new URL(location.href).searchParams.get('id')

Vue.use(PiniaVuePlugin)
const pinia = createPinia()

const peer = new Peer();
(async ()=>{

  let id = await new Promise((resolve)=>{
    peer.once('open', id => {
      resolve(id)
    })
  })
  console.log('My peer ID is: ' + id);
  Vue.prototype.$peer = peer;
  if(urlId){
    let conn =  peer.connect(urlId);
    await new Promise((resolve)=>{
      let id = setTimeout(()=>{
        location.replace(location.origin)
      }, 5000)
      conn.once("open", ()=>{
        clearTimeout(id)
        resolve()
      })
    })

    console.log("Opened inviter peer connection")

    Vue.prototype.$conn = conn;
  }


  Vue.config.productionTip = false;
  new Vue({
    vuetify,
    pinia,
    render: (h) => h(App),
  }).$mount('#app');

})();
