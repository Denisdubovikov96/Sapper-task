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
  SET_GAME_OVER_TIME,
  GAME_WIN,
} from "./actionTypes";

export const initGame = (gameSize) => {
  return {
    type: INIT_GAME,
    payload: gameSize,
  };
};

const startGame = (boardAfterFirsClick) => {
  return {
    type: START_GAME,
    payload: boardAfterFirsClick,
  };
};

const setBoard = (createdBoard) => {
  return {
    type: CREATE_BOARD,
    payload: createdBoard,
  };
};

export const changeGameLvl = (gameSize) => (dispatch) => {
  // let time1 = performance.now();
  dispatch(initGame(gameSize));
  dispatch(createBoard());
  // let time2 = performance.now();
  // console.log("change lvl", time2 - time1);
};

export const restart = () => (dispatch, getState) => {
  // let time1 = performance.now();
  const { gameSize } = getState().sapper;
  dispatch(initGame(gameSize));
  dispatch(createBoard());
  // let time2 = performance.now();
  // console.log("restart", time2 - time1);
};

export const createBoard = () => (dispatch, getState) => {
  // let time1 = performance.now();
  const { gameSize } = getState().sapper;
  const board = {};
  for (let x = 0; x < gameSize; x++) {
    for (let y = 0; y < gameSize; y++) {
      board[`${x}-${y}`] = createCell(x, y, false, false, false, null, []);
    }
  }
  dispatch(setBoard(board));
  // let time2 = performance.now();
  // console.log("create board", time2 - time1);
};

export const cellLeftClick = (id) => (dispatch, getState) => {
  // let time1 = performance.now();
  const { isStarted, board, gameSize, boardMinesCount } = getState().sapper;
  if (!isStarted) {
    // ?------------------
    const boardWithMines = JSON.parse(JSON.stringify(board));
    // const boardWithMines = { ...board };
    // const boardWithMines = Object.assign({}, board);
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
    dispatch(startGame(boardAfterFirstOpen));
  } else {
    // ?------------------
    // const updatedBoard = JSON.parse(JSON.stringify(board));
    const updatedBoard = { ...board };
    // const updatedBoard = Object.assign({}, board);
    if (updatedBoard[id].isMined) {
      updatedBoard[id].isOpen = true;
      const safeMines = Object.keys(updatedBoard).filter((key) => {
        return updatedBoard[key].isMined && updatedBoard[key].isFlagged;
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
  // let time2 = performance.now();
  // console.log("Left click", time2 - time1);
};

export const cellRightClick = (id) => (dispatch, getState) => {
  // let time1 = performance.now();
  const {
    board: updatedBoard,
    flagsCount,
    boardMinesCount,
  } = getState().sapper;
  // ?------------------
  // const updatedBoard = JSON.parse(JSON.stringify(board));
  // const updatedBoard = { ...board };
  // const updatedBoard = Object.assign({}, board);
  // const currentItem = updatedBoard[id];
  if (updatedBoard[id].isFlagged) {
    dispatch({
      type: CELL_RIGHT_CLICK,
      payload: {
        cell: { [id]: { ...updatedBoard[id], isFlagged: false } },
        flagsCount: flagsCount + 1,
      },
    });
  } else {
    if (flagsCount >= 1) {
      dispatch({
        type: CELL_RIGHT_CLICK,
        payload: {
          cell: { [id]: { ...updatedBoard[id], isFlagged: true } },
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
  // let time2 = performance.now();
  // console.log("Right click", time2 - time1);
};

export const setGameOverTime = (time) => {
  return {
    type: SET_GAME_OVER_TIME,
    payload: time,
  };
};
