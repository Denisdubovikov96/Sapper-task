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

const initialState = {
  board: {},
  gameSize: 20,
  isStarted: false,
  boardMinesCount: 40,
  isGameOver: false,
  flagsCount: 0,
  isGameWin: null,
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
        board: payload,
      };
    case GAME_OVER:
      return {
        ...state,
        isGameOver: true,
        board: payload,
      };
    case FLAGS_DECREMENT:
      return {
        ...state,
        flagsCount: state.flagsCount - 1,
      };
    case FLAGS_INCREMENT:
      return {
        ...state,
        flagsCount: state.flagsCount + 1,
      };

    default:
      return state;
  }
};

// { ...state.board, payload: { ...state.board[payload], isFlagged: true } }
