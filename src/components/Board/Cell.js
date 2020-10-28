import React from "react";
import classNames from "classnames";
import { booom, bombIcon, flag, stopBoom } from "../../statik";

export default function Cell({ item, isGameOver }) {
  const { neighborMineCount, isOpen, isMined, isFlagged, id } = item;

  if (isMined && isGameOver) {
    const cls = classNames("cell", {
      cellOpen: isOpen,
      cellOpenMined: isMined && isOpen,
      cellSaved: isMined && isFlagged,
    });
    const src = isOpen ? booom : isMined && isFlagged ? stopBoom : bombIcon;
    return (
      <div data-id={id} className={cls}>
        <img src={src} alt="aa" />
      </div>
    );
  } else {
    const cls = classNames("cell", `cellColor-${neighborMineCount}`, {
      cellOpen: isOpen,
      cellOpenMined: isMined && isOpen,
    });
    return (
      <div data-id={id} className={cls}>
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
