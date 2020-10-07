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
