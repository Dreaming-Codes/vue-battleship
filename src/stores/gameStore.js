import { defineStore } from 'pinia';

export const useGameStore = defineStore('main', {
  state: () => ({
    conn: null,
    opponentPlacementDone: false,
  }),
  actions: {
    handleDataFromPeer(data) {
      console.log(data);
      switch (data.id) {
        case 'placementDone':
          this.opponentPlacementDone = true;
          break;
        case 'passTurn':
          document.dispatchEvent(new Event('passTurn'));
          break;
      }
    },
    setConnection(conn) {
      this.conn = conn;
      conn.on('data', this.handleDataFromPeer);
    }
  }
});
