import React from "react";
import { booom, bombIcon, flag, stopBoom } from "../../statik";

export default function Cell({ item, isGameOver, cellClassNames }) {
  const { neighborMineCount, isOpen, isMined, isFlagged, id } = item;
  const cls = `${isOpen ? cellClassNames.cellOpen : ""} ${cellClassNames.cell}`;
  const fontColor = (count) => {
    switch (count) {
      case 0:
      case 1:
        return "#039be5";
      case 2:
      case 3:
        return "#ef6c00";
      case 4:
        return "#ff3d00";
      default:
        return "white";
    }
  };
  if (isMined && isGameOver) {
    return (
      <div
        data-id={id}
        className={cls}
        style={{ color: fontColor(neighborMineCount) }}
      >
        {isOpen ? (
          <img src={booom} alt="aa" />
        ) : isMined && isFlagged ? (
          <img src={stopBoom} alt="aa" />
        ) : (
          <img src={bombIcon} alt="aa" />
        )}
      </div>
    );
  } else {
    return (
      <div
        data-id={id}
        className={cls}
        style={{ color: fontColor(neighborMineCount) }}
      >
        {isOpen ? (
          neighborMineCount !== 0 ? (
            neighborMineCount
          ) : null
        ) : isFlagged ? (
          <img src={flag} alt="aa" />
        ) : null}
      </div>
    );
  }
}
