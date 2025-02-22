<template>
  <div class="game-wrapper">
    <div :style="{display: isGameInitiated ? 'flex' : 'none'}" class="game-container">
      <div ref="plElement" class="pl">
      </div>
      <div :class="{pulse: shouldFlash, 'top-bot-borders': shouldFlash}" :style="{color: this.gameInfo.color}"
           class="game-info">
        {{ this.gameInfoMsg }}
      </div>
      <div ref="pcElement" class="pc">
      </div>
    </div>
  </div>
</template>

<script>
import { useGameStore } from '@/stores/gameStore';

export default {
  name: 'TheGame',

  setup() {
    const GameStore = useGameStore();

    return {
      GameStore
    };
  },

  mounted() {
    document.addEventListener('updatePlBoard', ({detail}) => {
      this.updatePlBoard(JSON.stringify(detail.cord), detail.response)
    });
    document.addEventListener('passTurn', (e) => {
        this.enablePcBoard();
        this.gameInfo = {
          msg: 'Your Turn!',
          color: 'rgb(43, 197, 87)',
        };
    });
    document.addEventListener('fail', ({detail}) => {
      detail.clearedBorders.forEach((borderCord) => {
        const spotEl = this.pcBoardElement
          .querySelector(`.spot[data-cord=${JSON.stringify(JSON.stringify(borderCord))}]`);

        if (!spotEl.firstChild) {
          spotEl.append('*');
          spotEl.style.pointerEvents = 'none';
          spotEl.classList.toggle('resize');
        }
      });
    });
  },

  computed: {
    gameInfoMsg() {
      return this.GameStore.opponentPlacementDone ? this.gameInfo.msg : 'Waiting for opponent to finish placement';
    },
    shouldFlash() {
      return this.GameStore.opponentPlacementDone && this.gameInfoMsg;
    },
  },


  data: () => ({
    isGameInitiated: false,
    plBoardElement: null,
    pcBoardElement: null,
    plBoardInfoElement: null,
    pcBoardInfoElement: null,
    gameInfo: {
      msg: '',
      color: 'rgb(43, 197, 87)'
    },
    pl: null,
    pc: null,
  }),

  methods: {
    initTheGame(plBoardElement, pcBoardElement, pl, pc) {
      this.plBoardElement = plBoardElement;
      this.pcBoardElement = pcBoardElement;
      this.pl = pl;
      this.pc = pc;

      this.renderTheBoards();
      this.renderTheBoardsInfo();
      this.updateTheBoardsInfo();
      if(this.GameStore.opponentPlacementDone){
        this.disablePcBoard();
        this.gameInfo = {
          msg: 'Opponent Turn!',
          color: 'rgb(226, 54, 54)',
        };
      }else{
        this.enablePcBoard();
        this.gameInfo = {
          msg: 'Your Turn!',
          color: 'rgb(43, 197, 87)',
        };
      }
      this.addPcBoardEvent();

      this.isGameInitiated = true;
    },

    renderTheBoards() {
      this.$refs.plElement.appendChild(this.plBoardElement);
      this.$refs.pcElement.appendChild(this.pcBoardElement);
    },

    resetTheGame() {
      if (this.isGameInitiated) {
        this.gameInfo.msg = '';
        this.gameInfo.color = 'rgb(43, 197, 87)';
        this.plBoardElement.remove();
        this.pcBoardElement.remove();
        this.plBoardInfoElement.remove();
        this.pcBoardInfoElement.remove();
      }
    },

    addPcBoardEvent() {
      this.pcBoardElement.addEventListener('click', (e) => {
        if (e.target.classList.contains('spot')) {
          this.$emit('round', e.target.dataset.cord);
        }
      });
    },

    updatePcBoard(cord, response) {
      if (response === true) {
        const spot = this.pcBoardElement
          .querySelector(`.spot[data-cord=${JSON.stringify(cord)}]`);

        spot.append('x');
        spot.style.backgroundColor = 'rgb(248, 39, 39)';
        spot.style.lineHeight = '1';
        spot.style.pointerEvents = 'none';
        spot.classList.toggle('resize');
      }

      if (response === false) {
        const spot = this.pcBoardElement
          .querySelector(`.spot[data-cord=${JSON.stringify(cord)}]`);

        spot.append('*');
        spot.style.pointerEvents = 'none';
        spot.classList.toggle('resize');
      }

      if (response.damagedShipData) {
        const {
          damagedShipData,
          clearedBorders
        } = response;
        const ship = document.createElement('div');
        ship.classList.add('ship');

        for (let i = 0; i < damagedShipData.ship.getLength(); i += 1) {
          const part = document.createElement('div');
          part.classList.add('part');
          part.append('x');
          ship.appendChild(part);
        }

        ship.classList.toggle('resize');

        const firstSpot = this.pcBoardElement
          .querySelector(
            `.spot[data-cord=${JSON.stringify(JSON.stringify(damagedShipData.cords[0]))}]`);

        ship.style['grid-auto-flow'] = damagedShipData.isVertical ? 'row' : 'column';
        ship.style.position = 'absolute';

        if (firstSpot.firstChild) firstSpot.firstChild.remove();
        firstSpot.appendChild(ship);

        clearedBorders.forEach((borderCord) => {
          const spotEl = this.pcBoardElement
            .querySelector(`.spot[data-cord=${JSON.stringify(JSON.stringify(borderCord))}]`);

          if (!spotEl.firstChild) {
            spotEl.append('*');
            spotEl.style.pointerEvents = 'none';
            spotEl.classList.toggle('resize');
          }
        });
      }
    },

    updatePlBoard(cord, response) {
      if (response === true || response.damagedShipData) {
        const part = this.plBoardElement
          .querySelector(`.part[data-cord=${JSON.stringify(cord)}]`);

        part.append('x');
        part.style.backgroundColor = 'rgb(218, 100, 100)';
        part.classList.toggle('resize');

        if (response.damagedShipData) {
          const { clearedBorders } = response;

          setTimeout(()=>{
            this.GameStore.conn.send({id: 'fail', clearedBorders});
          }, 1000)

          clearedBorders.forEach((borderCord) => {
            const spotEl = this.plBoardElement
              .querySelector(`.spot[data-cord=${JSON.stringify(JSON.stringify(borderCord))}]`);

            if (!spotEl.firstChild) {
              spotEl.append('*');
              spotEl.classList.toggle('resize');
            }
          });
        }
      }

      if (response === false) {
        const spot = this.plBoardElement
          .querySelector(`.spot[data-cord=${JSON.stringify(cord)}]`);

        spot.append('*');
        spot.classList.toggle('resize');
      }
    },

    updateTheBoardsInfo() {
      const updateInfoFor = (player, boardInfoElement) => {
        const nameEl = boardInfoElement.firstElementChild;
        const name = player.getName();

        if (`${nameEl.textContent} Board` !== name) {
          nameEl.textContent = `${name} Board`;
        }
      };

      updateInfoFor(this.pl, this.plBoardInfoElement);
      updateInfoFor(this.pc, this.pcBoardInfoElement);
    },

    renderTheBoardsInfo() {
      const createBoardInfo = () => {
        const infoElement = document.createElement('div');
        const name = document.createElement('h3');
        const aliveShips = document.createElement('h4');

        infoElement.classList.add('board-info');
        name.classList.add('name');
        aliveShips.classList.add('alive-ships');

        infoElement.appendChild(name);
        infoElement.appendChild(aliveShips);

        return infoElement;
      };

      this.plBoardInfoElement = createBoardInfo();
      this.pcBoardInfoElement = createBoardInfo();

      this.$refs.plElement.appendChild(this.plBoardInfoElement);
      this.$refs.pcElement.appendChild(this.pcBoardInfoElement);
    },

    disablePcBoard() {
      this.pcBoardElement.style.pointerEvents = 'none';
    },

    enablePcBoard() {
      this.pcBoardElement.style.pointerEvents = 'auto';
    },
  },
};
</script>

<style scoped>
.game-container {
  font-family: bfont;
  --spot-size: 4rem;
  padding: 4rem;
  display: flex;
  justify-content: space-around;
}

.pl, .pc {
  display: flex;
  flex-direction: column;
}

.pl >>> .ship,
.pc >>> .ship {
  cursor: initial;
}

.pc >>> .spot,
.pl >>> .spot {
  text-shadow: 0 0 2px black;
  text-align: center;
  font-size: var(--spot-size);
}

.pc >>> .spot {
  cursor: crosshair;
}

.pc >>> .spot:hover {
  background-color: rgb(98, 0, 255);
}

.pc >>> .spot .ship {
  display: grid;
  grid-auto-flow: column;
  background-color: rgb(187, 82, 82);
  grid-gap: 4px;
  z-index: 69;
}

.pc >>> .spot .part {
  width: var(--spot-size);
  height: var(--spot-size);
  background-color: rgb(218, 100, 100);
  border: 4px solid rgb(70, 70, 70);
}

.pc >>> .spot .part,
.pl >>> .spot .part {
  text-shadow: 0 0 2px black;
  text-align: center;
  font-size: var(--spot-size);
  line-height: 0.745;
}

.pc >>> .board-info,
.pl >>> .board-info {
  text-shadow: 0 0 2px black;
  text-align: center;
  padding-left: var(--spot-size);
}

.pl >>> .board-info {
  color: rgb(43, 197, 87);
}

.pc >>> .board-info {
  color: rgb(226, 54, 54);
}

.pc >>> .board-info .name,
.pl >>> .board-info .name {
  border-bottom: 1px solid;
  font-size: 2.6rem;
}

.pc >>> .board-info .alive-ships,
.pl >>> .board-info .alive-ships {
  font-size: 2.4rem;
}

.game-info {
  font-size: 3.0rem;
  align-self: center;
  text-align: center;
  text-shadow: 0 0 6px black;
  width: 100%;
}

.top-bot-borders {
  padding: 1rem;
  margin: 1rem;
  border-top: 1px solid;
  border-bottom: 1px solid;
}

.pulse {
  animation: pulse 500ms alternate infinite;
}

.pc >>> .resize,
.pl >>> .resize {
  animation: resize 200ms 1 reverse;
}

@keyframes pulse {
  100% {
    box-shadow: inset 0 0 2px 1px rgb(82, 82, 82),
    0 0 2px 1px rgb(255, 255, 255);
    color: rgb(255, 255, 255);
  }
}

@keyframes resize {
  100% {
    transform: scale(1.16);
    background-color: rgb(226, 54, 54);;
  }
}

@media screen and (max-width: 1400px) {
  .pc >>> .board-info .alive-ships,
  .pl >>> .board-info .alive-ships {
    font-size: 1.8rem;
  }

  .game-info {
    font-size: 2.2rem;
    padding: 0.4rem;
  }

  .pc >>> .board-info .name,
  .pl >>> .board-info .name {
    font-size: 2rem;
  }
}

@media screen and (max-width: 1280px) {
  .game-container {
    padding: 1rem;
    display: grid;
    grid-auto-columns: auto auto;
    grid-auto-rows: auto auto;
  }

  .game-info {
    grid-column: 1 / 3;
    order: -1;
  }

}

@media screen and (max-width: 1000px) {
  .pc >>> .spot .ship {
    grid-gap: 2px;
  }

  .pc >>> .spot .part,
  .pl >>> .spot .part {
    line-height: 0.7;
  }

  .game-info {
    order: 0;
  }

  .game-container {
    justify-content: center;
  }
}

@media screen and (max-width: 820px) {
  .game-container {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

@media screen and (max-width: 359px) {
  .pc >>> .spot .ship {
    grid-gap: 1px;
  }

  .pc >>> .spot .part {
    border-width: 1px;
  }

  .pc >>> .spot .part,
  .pl >>> .spot .part {
    line-height: 0.9;
  }
}
</style>
