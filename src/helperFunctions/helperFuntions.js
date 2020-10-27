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
  if (!board[id].isOpen) {
    board[id].isOpen = true;
  }
  if (board[id].neighborMineCount === 0) {
    const notOpenNeighbors = board[id].neighbors.filter((xy) => {
      return !board[xy].isOpen && !board[xy].isFlagged;
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

export const findCountMined = (pseudoArray) => {
  const count = Object.keys(pseudoArray).filter((key) => {
    return pseudoArray[key].isMined;
  });
  return count.length;
};

export const setNeighbors = (pseudoArray) => {
  Object.keys(pseudoArray).forEach((item) => {
    const { x, y } = pseudoArray[item];
    const neighbors = [];
    neighbors.push(`${x - 1}-${y - 1}`);
    neighbors.push(`${x - 1}-${y}`);
    neighbors.push(`${x - 1}-${y + 1}`);
    neighbors.push(`${x}-${y - 1}`);
    neighbors.push(`${x}-${y + 1}`);
    neighbors.push(`${x + 1}-${y - 1}`);
    neighbors.push(`${x + 1}-${y}`);
    neighbors.push(`${x + 1}-${y + 1}`);
    const filterNeigbours = neighbors.filter((coordId) =>
      pseudoArray[coordId] ? coordId : null
    );
    const minesCount = filterNeigbours.reduce(
      (acumulator, currentKey) =>
        pseudoArray[currentKey].isMined ? acumulator + 1 : acumulator,
      0
    );
    pseudoArray[item].neighbors = filterNeigbours;
    pseudoArray[item].neighborMineCount = minesCount;
  });
};
