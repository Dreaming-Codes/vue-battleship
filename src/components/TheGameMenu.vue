<template>
  <v-dialog v-model="isOpen" persistent overlay-opacity="0.8">
    <div class="menu-container">
      <div v-if="playerFound">
        <button class="btn" @click="newGame">
          New Game
        </button>
        <button
          class="btn"
          :class="{ disable: options.resume.isDisabled }"
          @click="$emit('resume-game')"
        >
          Resume
        </button>
      </div>
      <div v-else>
        <v-text-field
          label="Share this link"
          readonly
          v-model="peerLink"
        ></v-text-field>
      </div>

    </div>
  </v-dialog>
</template>

<script>
export default {
  name: 'TheGameMenu',

  async mounted() {
    if(!this.$conn){
      this.peerLink = `${window.location.origin}/?id=${this.$peer.id}`;
      await new Promise((resolve)=>{
        this.$peer.once("connection", (conn)=>{
          console.log("Connected to other peer")
          this.$conn = conn;
          resolve()
        })
      })
    }
    this.playerFound = true;
    this.$conn.on("data", (data)=>{
      console.log("test", data)
    })
  },

  methods: {
    newGame(){
      console.log("sending data")
      this.$conn.send("startGame")
    }
  },

  data() {
    return {
      playerFound: false,
      peerLink: ""
    }
  },

  props: {
    isOpen: Boolean,
    options: Object,
  },
};
</script>

<style scoped>
.btn {
  margin: 2rem;
  font-size: 3rem;
  font-family: bfont;
  outline: none;
  text-shadow: 0 2px 2px black;
  text-align: center;
}

.btn:hover,
.btn:focus {
  color: rgb(128, 255, 0);
}

.menu-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(34, 34, 34, 0.8);
  box-shadow: inset 0 0 2px 2px rgb(56, 56, 56);
}

.disable {
  pointer-events: none;
  color: rgb(117, 117, 117);
}
</style>
