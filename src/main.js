import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { Peer } from 'peerjs';

let urlId = new URL(location.href).searchParams.get('id')

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
      conn.once("open", resolve)
    })
    console.log("Opened inviter peer connection")
    Vue.prototype.$conn = peer.connect(urlId);
  }


  Vue.config.productionTip = false;

  new Vue({
    vuetify,
    render: (h) => h(App),
  }).$mount('#app');

})();
