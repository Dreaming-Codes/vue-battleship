<template>
  <v-dialog v-model="isOpen" overlay-opacity="0.8" persistent>
    <div class="menu-container">
      <div v-if="!user" id="loginLogic">
        <v-text-field
          v-model="alias"
          label="Alias"
        ></v-text-field>
        <v-text-field
          v-model="psw"
          label="Password"
        ></v-text-field>
        <button class="btn" @click="login">
          Auth
        </button>
        <button class="btn" @click="create">
          Create
        </button>
      </div>
      <div v-else-if="options.resume.isDisabled">
        <v-text-field
          v-model="opponent"
          label="Opponent alias"
        ></v-text-field>
        <button class="btn" :class="{disable: !opponent}" @click="startGame">
          New Game
        </button>
      </div>
      <button
        class="btn"
        v-else
        @click="$emit('resume-game')"
      >
        Resume
      </button>
    </div>
    <v-alert
      v-if="errorMsg"
      dense
      outlined
      type="error"
    >
      {{ errorMsg }}
    </v-alert>
  </v-dialog>
</template>

<script>
export default {
  name: 'TheGameMenu',
  data() {
    return {
      alias: '',
      psw: '',
      errorMsg: '',
      opponent: '',
      user: null
    };
  },
  methods: {
    showErrorMsg(text, time) {
      this.errorMsg = text;
      setTimeout(() => {
        this.errorMsg = '';
      }, time);
    },
    startGame(){
      this.$gun.get('~@'+this.opponent).once((data) => {
        if(data) {
          this.$emit('start-new-game');
        } else {
          this.showErrorMsg('Opponent not found', 3000);
        }
      });
    },
    login() {
      this.$gun.user()
        .auth(this.alias, this.psw, (userReference) => {
          console.log(userReference);
          if (userReference.err) {
            this.showErrorMsg(userReference.err, 3000);
          } else {
            this.user = userReference;
          }
        });
    },
    create() {
      this.$gun.user()
        .create(this.alias, this.psw, (userReference) => {
          console.log(userReference);
          if (userReference.err) {
            this.showErrorMsg(userReference.err, 3000);
          } else {
            this.$gun.user()
              .auth(this.alias, this.psw, (userReference) => {
                console.log(userReference);
                if (userReference.err) {
                  this.showErrorMsg(userReference.err, 3000);
                } else {
                  this.user = userReference;
                }
              });
          }
        });
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
