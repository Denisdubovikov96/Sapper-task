import {
  INIT_GAME,
  START_GAME,
  CREATE_BOARD,
  CELL_LEFT_CLICK,
  GAME_OVER,
  GAME_WIN,
  CELL_RIGHT_CLICK,
  SET_GAME_OVER_TIME,
} from "./actionTypes";

const initialState = {
  board: {},
  gameSize: 17,
  isStarted: false,
  boardMinesCount: 45,
  isGameOver: false,
  flagsCount: 0,
  isGameWin: null,
  score: {
    time: null,
    safeMines: null,
  },
};

export const sapperReduser = (state = initialState, { type, payload }) => {
  switch (type) {
    case INIT_GAME:
      return {
        ...state,
        gameSize: payload,
      };
    case CREATE_BOARD:
      return {
        ...state,
        board: payload,
      };
    case START_GAME:
      return {
        ...state,
        board: payload,
        isStarted: true,
        flagsCount: state.boardMinesCount,
      };
    case CELL_LEFT_CLICK:
      return {
        ...state,
        board: payload,
      };
    case CELL_RIGHT_CLICK:
      return {
        ...state,
        flagsCount: payload.flagsCount,
        board: {
          ...state.board,
          ...payload.cell,
        },
      };
    case GAME_OVER:
      return {
        ...state,
        isGameOver: true,
        isGameWin: false,
        board: payload.board,
        score: { ...state.score, safeMines: payload.safeMines },
      };
    case GAME_WIN:
      return {
        ...state,
        isGameOver: true,
        isGameWin: true,
        score: { ...state.score, safeMines: payload },
      };
    case SET_GAME_OVER_TIME:
      return {
        ...state,
        score: { ...state.score, time: payload },
      };
    default:
      return state;
  }
};

// { ...state.board, payload: { ...state.board[payload], isFlagged: true } }
