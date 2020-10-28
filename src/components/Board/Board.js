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

  const gameClassName = classNames("game");
  const boardClassName = classNames("board", { overlay: isGameOver });

  useEffect(() => {
    dispatch(createBoard());
  }, [dispatch]);

  const handlerRightClick = (e) => {
    e.preventDefault();
    let id = e.target.closest("div").dataset.id;
    if (!board[id]) {
      return;
    }
    if (!isGameOver && !board[id].isOpen && isStarted) {
      dispatch(cellRightClick(id));
    }
  };
  const handlerLeftClick = (e) => {
    let id = e.target.closest("div").dataset.id;
    if (!board[id]) {
      return;
    }
    if (!isGameOver && !board[id].isOpen && !board[id].isFlagged) {
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
    <div
      className={gameClassName}
      style={{ width: `calc(${gameSize * 40}px + 4px)` }}
    >
      <ControlPanel
        isStarted={isStarted}
        isGameOver={isGameOver}
        flagsCount={flagsCount}
      />
      <div
        className={boardClassName}
        style={{
          width: `${gameSize * 40}px`,
          height: `${gameSize * 40}px`,
          gridTemplateColumns: `repeat(${gameSize}, 1fr)`,
          gridTemplateRows: `repeat(${gameSize}, 1fr)`,
        }}
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
