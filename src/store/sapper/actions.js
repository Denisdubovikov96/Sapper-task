import {
  recursionOpen,
  createCell,
  getRanCoord,
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

const startGame = (boardWithNeighbor, boardAfterFirsClick) => {
  return {
    type: START_GAME,
    payload: {
      board: boardWithNeighbor,
      openedCells: boardAfterFirsClick,
    },
  };
};

const setBoard = (createdBoard) => {
  return {
    type: CREATE_BOARD,
    payload: createdBoard,
  };
};

const gameOver = (cellId, safeMines, isGameWin) => {
  return {
    type: GAME_OVER,
    payload: {
      cellId: cellId,
      safeMines: safeMines.length,
      isGameWin: isGameWin,
    },
  };
};

const setFlag = (id, isFlagged, flagsCount) => {
  return {
    type: CELL_RIGHT_CLICK,
    payload: {
      cellId: id,
      isFlagged: isFlagged,
      flagsCount: flagsCount,
    },
  };
};

export const setGameOverTime = (time) => {
  return {
    type: SET_GAME_OVER_TIME,
    payload: time,
  };
};

export const changeGameLvl = (gameSize) => (dispatch) => {
  dispatch(initGame(gameSize));
  dispatch(createBoard());
};

export const initGame = (gameSize) => {
  return {
    type: INIT_GAME,
    payload: gameSize,
  };
};

export const restart = () => (dispatch, getState) => {
  const { gameSize } = getState().sapper;
  dispatch(initGame(gameSize));
  dispatch(createBoard());
};

export const createBoard = () => (dispatch, getState) => {
  const { gameSize } = getState().sapper;
  const board = {};
  for (let x = 0; x < gameSize; x++) {
    for (let y = 0; y < gameSize; y++) {
      board[`${x}-${y}`] = createCell(x, y, false, false, false, null, []);
    }
  }
  dispatch(setBoard(board));
};

export const cellLeftClick = (id) => (dispatch, getState) => {
  const { isStarted, board, gameSize, boardMinesCount } = getState().sapper;
  if (!isStarted) {
    const boardWithMines = JSON.parse(JSON.stringify(board));
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
    dispatch(startGame(boardWithMines, boardAfterFirstOpen));
  } else {
    if (board[id].isMined) {
      const safeMines = Object.keys(board).filter((key) => {
        return board[key].isMined && board[key].isFlagged;
      });
      dispatch(gameOver(id, safeMines, false));
    } else {
      const opensBoard = recursionOpen(board, id);
      dispatch({ type: CELL_LEFT_CLICK, payload: opensBoard });
    }
  }
};

export const cellRightClick = (id) => (dispatch, getState) => {
  const { board, flagsCount, boardMinesCount } = getState().sapper;
  if (board[id].isFlagged) {
    dispatch(setFlag(id, false, flagsCount + 1));
  } else {
    if (flagsCount >= 1) {
      dispatch(setFlag(id, true, flagsCount - 1));
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
