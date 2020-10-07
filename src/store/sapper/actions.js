import { createCell, getRanCoord } from "../../helperFunctions/helperFuntions";
import { INIT_GAME, START_GAME, CREATE_BOARD, CELL_CLICK } from "./actionTypes";

export const initGame = (gameSize = 10) => {
  return {
    type: INIT_GAME,
    payload: gameSize,
  };
};

export const createBoard = () => (dispatch, getState) => {
  const gameSize = getState().sapper.gameSize;
  const board = [];
  for (let x = 0; x < gameSize; x++) {
    for (let y = 0; y < gameSize; y++) {
      // на случай рефактора под Object.keys
      // board[`${x}-${y}`] = createCell(x, y, false, false, false, null, []);
      const cell = createCell(x, y, false, false, false, null, []);
      board.push(cell);
    }
  }
  dispatch({ type: CREATE_BOARD, payload: board });
};

export const cellClick = (id) => (dispatch, getState) => {
  const { isStarted, board, gameSize } = getState().sapper;
  if (!isStarted) {
    const boardWithMines = board;
    for (let i = 0; i < gameSize; i++) {
      boardWithMines[getRanCoord(0, board.length - 1)].isMined = true;
    }
    boardWithMines.map((item) => {
      const neighbors = [];
      neighbors.push(`${item.x - 1}-${item.y - 1}`);
      neighbors.push(`${item.x - 1}-${item.y}`);
      neighbors.push(`${item.x - 1}-${item.y + 1}`);
      neighbors.push(`${item.x}-${item.y - 1}`);
      neighbors.push(`${item.x}-${item.y + 1}`);
      neighbors.push(`${item.x + 1}-${item.y - 1}`);
      neighbors.push(`${item.x + 1}-${item.y}`);
      neighbors.push(`${item.x + 1}-${item.y + 1}`);
      const nn = neighbors.filter((coordId) => {
        const index = board.findIndex((item) => item.id === coordId);
        if (index !== -1) {
          console.log(index);
          return coordId;
        } else {
          return;
        }
      });
      console.log(neighbors);
      item.neighbors = nn;
    });
    console.log(boardWithMines);
    dispatch({ type: START_GAME, payload: boardWithMines });
  } else {
    const updatedBoard = board;
    const clickedIndex = board.findIndex((item) => item.id === id);
    updatedBoard[clickedIndex].isOpen = true;

    dispatch({ type: CELL_CLICK, payload: updatedBoard });
  }
};
