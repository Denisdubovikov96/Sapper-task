import {
  createCell,
  getRanCoord,
  recursionOpen,
  setNeighbors,
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
  SET_GAME_OVER_TIME,
  GAME_WIN,
} from "./actionTypes";

export const initGame = (gameSize) => {
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
    const boardWithMines = { ...board };
    boardWithMines[id].isOpen = true;
    let i = 0;
    do {
      const randomId = `${getRanCoord(0, gameSize - 1)}-${getRanCoord(
        0,
        gameSize - 1
      )}`;
      if (!boardWithMines[randomId].isMined && randomId !== id) {
        boardWithMines[randomId].isMined = true;
        i++;
      }
    } while (i < boardMinesCount);
    setNeighbors(boardWithMines);
    const boardAfterFirstOpen = recursionOpen(boardWithMines, id);
    dispatch({ type: START_GAME, payload: boardAfterFirstOpen });
  } else {
    const updatedBoard = { ...board };
    if (updatedBoard[id].isMined) {
      updatedBoard[id].isOpen = true;
      const safeMines = Object.keys(updatedBoard).filter((key) => {
        return (
          updatedBoard[key].isMined === true &&
          updatedBoard[key].isFlagged === true
        );
      });
      dispatch({
        type: GAME_OVER,
        payload: { board: updatedBoard, safeMines: safeMines.length },
      });
    } else {
      const opensBoard = recursionOpen(updatedBoard, id);
      dispatch({ type: CELL_LEFT_CLICK, payload: opensBoard });
    }
  }
};

export const cellRightClick = (id) => (dispatch, getState) => {
  const { board, flagsCount, boardMinesCount } = getState().sapper;
  const updatedBoard = { ...board };
  const currentItem = updatedBoard[id];

  if (currentItem.isFlagged === true) {
    dispatch({
      type: CELL_RIGHT_CLICK,
      payload: {
        cell: { [id]: { ...currentItem, isFlagged: false } },
        flagsCount: flagsCount + 1,
      },
    });
  } else {
    if (flagsCount >= 1) {
      dispatch({
        type: CELL_RIGHT_CLICK,
        payload: {
          cell: { [id]: { ...currentItem, isFlagged: true } },
          flagsCount: flagsCount - 1,
        },
      });
      const {
        flagsCount: countAfterUpdate,
        board: boardAfterUpdate,
      } = getState().sapper;
      if (countAfterUpdate === 0) {
        const safeMines = Object.keys(boardAfterUpdate).filter((key) => {
          return (
            boardAfterUpdate[key].isMined && boardAfterUpdate[key].isFlagged
          );
        });
        if (safeMines.length === boardMinesCount) {
          dispatch({ type: GAME_WIN, payload: safeMines.length });
        }
      }
    }
  }
};

export const setGameOverTime = (time) => {
  return {
    type: SET_GAME_OVER_TIME,
    payload: time,
  };
};
