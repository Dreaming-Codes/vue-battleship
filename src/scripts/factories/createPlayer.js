import { getRandomCord, isCordsValid } from './createGameBoard';
import { useGameStore } from '@/stores/gameStore';

const getValidName = (name, isPc) => {
  if (!name && !isPc) {
    return 'Your';
  }

  if (!name && isPc) {
    return 'Opponent';
  }

  return name;
};

const createPlayer = ({ name = '', board, isPc = false } = {}) => {
  const GameStore = useGameStore();

  if (!board) throw new Error('Player must have a board');
  if (!board.isReady()) throw new Error('Player must have a board with ships');

  const playerName = getValidName(name, isPc);
  const receiveAttack = board.receiveAttack.bind(board);
  if(!isPc) {
    GameStore.conn.on('data', (data) => {
      if (data.id === 'attack') {
        let test = receiveAttack({x: data.x, y: data.y});
        const event = new CustomEvent('updatePlBoard', { detail: {cord: {x: data.x, y: data.y}, response: test }});
        document.dispatchEvent(event);
        GameStore.conn.send({id: "attackReply", success: test})
      }
    });
  }
  const attack = async ({ player, x, y })=>{
    GameStore.conn.send({id: "attack", x, y});
    return await new Promise((resolve) => {
      GameStore.conn.once("data", (data)=>{
        console.log("Something happened", data);
        if (data.id === "attackReply") {
          resolve(data.success);
          return data.success
        }
      })
    })
  };

  return {
    getName: () => playerName,
    getBoard: () => ({ ...board }),
    attack,
    receiveAttack,
  };
};

export default createPlayer;
