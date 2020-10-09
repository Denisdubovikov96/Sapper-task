export const createCell = (
  x,
  y,
  isOpen,
  isFlagged,
  isMined,
  neighborMineCount,
  neighbors
) => {
  return {
    id: `${x}-${y}`,
    x: x,
    y: y,
    isOpen: isOpen,
    isFlagged: isFlagged,
    isMined: isMined,
    neighborMineCount: neighborMineCount,
    neighbors: [...neighbors],
  };
};

export const getRanCoord = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const recursionOpen = (board, id) => {
  board[id].isOpen = true;
  if (board[id].neighborMineCount === 0) {
    const notOpenNeighbors = board[id].neighbors.filter((xy) => {
      return board[xy].isOpen === false && board[xy].isFlagged === false;
    });
    for (let neighborId of notOpenNeighbors) {
      board[neighborId].isOpen = true;
      if (board[neighborId].neighborMineCount === 0) {
        recursionOpen(board, neighborId);
      }
    }
  }
  return board;
};
