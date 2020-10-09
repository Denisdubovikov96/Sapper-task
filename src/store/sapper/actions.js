import {
  createCell,
  getRanCoord,
  recursionOpen,
} from "../../helperFunctions/helperFuntions";
import {
  INIT_GAME,
  START_GAME,
  CREATE_BOARD,
  CELL_LEFT_CLICK,
  GAME_OVER,
  CELL_RIGHT_CLICK,
  FLAGS_DECREMENT,
  FLAGS_INCREMENT,
} from "./actionTypes";

export const initGame = (gameSize = 10) => {
  return {
    type: INIT_GAME,
    payload: gameSize,
  };
};

export const createBoard = () => (dispatch, getState) => {
  const gameSize = getState().sapper.gameSize;
  const board = {};
  for (let x = 0; x < gameSize; x++) {
    for (let y = 0; y < gameSize; y++) {
      board[`${x}-${y}`] = createCell(x, y, false, false, false, null, []);
    }
  }
  dispatch({ type: CREATE_BOARD, payload: board });
};

export const cellLeftClick = (id) => (dispatch, getState) => {
  const { isStarted, board, gameSize, boardMinesCount } = getState().sapper;
  if (!isStarted) {
    const boardWithMines = board;
    boardWithMines[id].isOpen = true;

    const findCount = () => {
      const count = Object.keys(boardWithMines).filter((key) => {
        return boardWithMines[key].isMined;
      });
      return count.length;
    };
    let i = 0;
    do {
      const randomId = `${getRanCoord(0, gameSize - 1)}-${getRanCoord(
        0,
        gameSize - 1
      )}`;
      if (randomId === id) {
      } else if (!boardWithMines[randomId].isMined) {
        boardWithMines[randomId].isMined = true;
        i++;
      }
    } while (i < boardMinesCount);
    Object.keys(boardWithMines).map((item) => {
      const { x, y } = boardWithMines[item];
      const neighbors = [];
      neighbors.push(`${x - 1}-${y - 1}`);
      neighbors.push(`${x - 1}-${y}`);
      neighbors.push(`${x - 1}-${y + 1}`);
      neighbors.push(`${x}-${y - 1}`);
      neighbors.push(`${x}-${y + 1}`);
      neighbors.push(`${x + 1}-${y - 1}`);
      neighbors.push(`${x + 1}-${y}`);
      neighbors.push(`${x + 1}-${y + 1}`);
      const filterNeigbours = neighbors.filter((coordId) => {
        return board[coordId] ? coordId : null;
      });
      const minesCount = filterNeigbours.reduce((acumulator, currentKey) => {
        if (boardWithMines[currentKey].isMined) {
          return acumulator + 1;
        } else {
          return acumulator;
        }
      }, 0);
      boardWithMines[item].neighbors = filterNeigbours;
      boardWithMines[item].neighborMineCount = minesCount;
    });
    console.log(findCount());
    const firstOpen = recursionOpen(boardWithMines, id);
    dispatch({ type: START_GAME, payload: firstOpen });
  } else {
    const updatedBoard = board;
    if (updatedBoard[id].isMined) {
      updatedBoard[id].isOpen = true;
      dispatch({ type: GAME_OVER, payload: updatedBoard });
    } else {
      const opensBoard = recursionOpen(updatedBoard, id);

      dispatch({ type: CELL_LEFT_CLICK, payload: opensBoard });
    }
  }
};

export const cellRightClick = (id) => (dispatch, getState) => {
  const { board, flagsCount } = getState().sapper;
  const updatedBoard = board;
  if (updatedBoard[id].isFlagged === true) {
    updatedBoard[id].isFlagged = false;
    dispatch({ type: FLAGS_INCREMENT });
  } else {
    if (flagsCount - 1 < 0) {
    } else {
      updatedBoard[id].isFlagged = true;
      dispatch({ type: FLAGS_DECREMENT });
    }
  }

  dispatch({ type: CELL_RIGHT_CLICK, payload: updatedBoard });
};
