import {
  INIT_GAME,
  START_GAME,
  CREATE_BOARD,
  CELL_LEFT_CLICK,
  GAME_OVER,
  GAME_WIN,
  CELL_RIGHT_CLICK,
  SET_GAME_OVER_TIME,
  RESTART_GAME,
} from "./actionTypes";

const initialState = {
  board: {},
  gameSize: 10,
  isStarted: false,
  boardMinesCount: 20,
  isGameOver: false,
  flagsCount: 0,
  isGameWin: null,
  score: {
    time: null,
    safeMines: null,
  },
};

export const sapperReduser = (state = initialState, { type, payload }) => {
  // debugger;
  switch (type) {
    case INIT_GAME:
      return {
        ...state,
        board: {},
        gameSize: payload,
        isStarted: false,
        boardMinesCount: payload * 2,
        isGameOver: false,
        flagsCount: 0,
        isGameWin: null,
      };
    case RESTART_GAME:
      return {
        ...state,
        board: {},
        isStarted: false,
        isGameOver: false,
        flagsCount: 0,
        isGameWin: null,
      };
    case CREATE_BOARD:
      return {
        ...state,
        board: payload,
      };
    // ! for recursionOpen
    // case START_GAME:
    //   return {
    //     ...state,
    //     board: {
    //       ...payload.board,
    //       ...payload.openedCells,
    //     },
    //     isStarted: true,
    //     flagsCount: state.boardMinesCount,
    //   };
    // ? for alternative
    case START_GAME:
      return {
        ...state,
        board: {
          ...payload.board,
          ...Object.fromEntries(
            payload.openedCells.map((xy) => [
              xy,
              { ...payload.board[xy], isOpen: true },
            ])
          ),
        },
        isStarted: true,
        flagsCount: state.boardMinesCount,
      };
    // ! for recursionOpen
    // case CELL_LEFT_CLICK:
    //   return {
    //     ...state,
    //     board: { ...state.board, ...payload },
    //   };
    // ? for alternative
    case CELL_LEFT_CLICK:
      return {
        ...state,
        board: {
          ...state.board,
          ...Object.fromEntries(
            payload.map((xy) => [xy, { ...state.board[xy], isOpen: true }])
          ),
        },
      };
    case CELL_RIGHT_CLICK:
      return {
        ...state,
        flagsCount: payload.flagsCount,
        board: {
          ...state.board,
          [payload.cellId]: {
            ...state.board[payload.cellId],
            isFlagged: payload.isFlagged,
          },
        },
      };
    case GAME_OVER:
      return {
        ...state,
        isGameOver: true,
        isGameWin: payload.isGameWin,
        board: {
          ...state.board,
          [payload.cellId]: { ...state.board[payload.cellId], isOpen: true },
        },
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
