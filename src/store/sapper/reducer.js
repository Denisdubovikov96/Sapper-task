import { INIT_GAME, START_GAME, CREATE_BOARD, CELL_CLICK } from "./actionTypes";

const initialState = {
  board: [],
  gameSize: 15,
  isStarted: false,
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
      };
    case CELL_CLICK:
      return {
        ...state,
        board: payload,
      };

    default:
      return state;
  }
};
