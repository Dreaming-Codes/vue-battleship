# Battleship (Sea Battle) (Vue) multiplayer

This project doesn't use correct vue syntax since the repo from which it was forked was already wrong. I may fix it in the future.

This currently have no cheating protection:
One possible way to prevent cheating is to encode all the ships position with different key pairs and send those at the beginning of the game. Then for each shot the other client send the key to
decode the position and check if it's a hit or not. This way the client can't cheat by modifying the attack result.

## Getting Started
### Installing and running
```bash
git clone https://github.com/Dreaming-Codes/vue-battleship
cd vue-battleship
npm install
npm run serve
```
## Built With
* The power of three (html, css, js)
* [Vue](https://vuejs.org/) (for components, states and scoped styles)
* [Vue CLI](https://cli.vuejs.org/) (for build tools)
* [Vuetify](https://vuetifyjs.com/en/) (for global dark styles)
* [Pinia](https://pinia.esm.dev/) (for global state management)
* [PeerJS](https://peerjs.com/) (for multiplayer)
## License
This project is licensed under the MIT License
