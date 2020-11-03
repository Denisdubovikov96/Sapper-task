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
  return ~~(Math.random() * (max - min) + min);
};

// export const recursionOpen = (board, id) => {
//   if (!board[id].isOpen) {
//     board[id].isOpen = true;
//   }
//   if (board[id].neighborMineCount === 0) {
//     const notOpenNeighbors = board[id].neighbors.filter((xy) => {
//       return !board[xy].isOpen && !board[xy].isFlagged;
//     });
//     if (notOpenNeighbors.length !== 0) {
//       for (let neighborId of notOpenNeighbors) {
//         if (!board[neighborId].isOpen) {
//           board[neighborId].isOpen = true;
//         }
//         if (board[neighborId].neighborMineCount === 0) {
//           recursionOpen(board, neighborId);
//         }
//       }
//     }
//   }
//   return board;
// };

export const recursionOpen = (board, id, newBoard = {}) => {
  if (!newBoard[id]) {
    newBoard[id] = { ...board[id], isOpen: true };
    if (newBoard[id].neighborMineCount === 0) {
      newBoard[id].neighbors.forEach((xy) => {
        if (!board[xy].isFlagged) {
          recursionOpen(board, xy, newBoard);
        }
      });
    }
    return newBoard;
  }
};
export const alternative = (board, id, arr = []) => {
  if (!arr.includes(id)) {
    arr.push(id);
    if (board[id].neighborMineCount === 0) {
      board[id].neighbors.forEach((xy) => {
        if (!board[xy].isFlagged) {
          alternative(board, xy, arr);
        }
      });
    }
    return arr;
  }
};

export const getTimeString = (sec) => {
  let seconds = sec % 60 < 10 ? `0${sec % 60}` : sec % 60;
  let minutes = ~~(sec / 60) < 10 ? `0${~~(sec / 60)}` : ~~(sec / 60);
  return `${minutes}:${seconds}`;
};

// export const findCountMined = (pseudoArray) => {
//   const count = Object.keys(pseudoArray).filter((key) => {
//     return pseudoArray[key].isMined;
//   });
//   return count.length;
// };

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
    pseudoArray[item].neighbors = filterNeigbours;
  });
};

export const setNeighborsMinesCount = (pseudoArray) => {
  Object.keys(pseudoArray).forEach((item) => {
    const { neighbors } = pseudoArray[item];
    const minesCount = neighbors.reduce(
      (acumulator, currentKey) =>
        pseudoArray[currentKey].isMined ? acumulator + 1 : acumulator,
      0
    );
    pseudoArray[item].neighborMineCount = minesCount;
  });
};
