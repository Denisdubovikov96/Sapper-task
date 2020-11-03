import React, { useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import Cell from "./Cell";
import ControlPanel from "./ControlPanel";
import { cellLeftClick, cellRightClick } from "../../store/sapper/actions";
import { createBoard } from "../../store/sapper/actions";
import "./board.css";
const RezultPannel = lazy(() => import("./RezultPannel"));

export default function Board() {
  const {
    board,
    gameSize,
    score,
    isGameOver,
    isGameWin,
    isStarted,
    flagsCount,
  } = useSelector(({ sapper }) => sapper);
  const dispatch = useDispatch();

  const gameClassName = classNames("game", `g-size-${gameSize}`);
  const boardClassName = classNames("board", `b-size-${gameSize}`, {
    overlay: isGameOver,
  });

  useEffect(() => {
    dispatch(createBoard());
  }, [dispatch]);

  const handlerRightClick = (e) => {
    e.preventDefault();
    let id = e.target.closest("div").dataset.id;
    if (!!board[id] && !isGameOver && !board[id].isOpen && isStarted) {
      dispatch(cellRightClick(id));
    }
  };
  const handlerLeftClick = (e) => {
    let id = e.target.closest("div").dataset.id;
    if (
      !!board[id] &&
      !isGameOver &&
      !board[id].isOpen &&
      !board[id].isFlagged
    ) {
      dispatch(cellLeftClick(id));
    }
  };

  const renderedCells = (cells) => {
    return Object.keys(cells).map((key) => {
      return (
        <Cell key={board[key].id} item={board[key]} isGameOver={isGameOver} />
      );
    });
  };

  return (
    <div className={gameClassName}>
      <ControlPanel
        isStarted={isStarted}
        isGameOver={isGameOver}
        flagsCount={flagsCount}
      />
      <div
        className={boardClassName}
        onClick={(e) => handlerLeftClick(e)}
        onContextMenu={(e) => handlerRightClick(e)}
      >
        {renderedCells(board)}
      </div>
      <Suspense fallback={null}>
        {isGameOver ? (
          <RezultPannel isGameWin={isGameWin} score={score} />
        ) : null}
      </Suspense>
    </div>
  );
}
