import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import Cell from "./Cell";
import ControlPanel from "./ControlPanel";
import { cellLeftClick, cellRightClick } from "../../store/sapper/actions";
import { createBoard } from "../../store/sapper/actions";
import RezultPannel from "./RezultPannel";

const useStyles = makeStyles({
  game: (props) => ({
    background: "white",
    margin: "20px auto",
    width: `calc(${props.size * 40}px + 4px)`,
    border: "2px solid #bdbdbd",
    borderRadius: 5,
    boxShadow: "4px 4px 15px 0px rgba(0,0,0,0.45)",
    color: "#3f51b5",
    userSelect: "none",
    position: "relative",
    zIndex: 1,
  }),
  board: (props) => ({
    width: `${props.size * 40}px`,
    height: `${props.size * 40}px`,
    display: "grid",
    padding: 2,
    gridTemplateColumns: `repeat(${props.size}, 1fr)`,
    gridTemplateRows: `repeat(${props.size}, 1fr)`,
    borderTop: "2px solid #bdbdbd",
    background: "white",
    overflow: "hidden",
    zIndex: 100,
    position: "relative",
  }),
  overlay: {
    "&:before": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      fontSize: 50,
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: 10000,
      background: "rgba(184, 184, 184, 0.7)",
      content: "'Game Over'",
    },
  },
  cell: {
    zIndex: 1000,
    background: "#ffe082",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid white",
    borderRadius: 4,
    transition: "all 0.1s linear",
    overflow: "hidden",
    boxShadow: "0px 0px 15px 0px white",
    fontSize: 16,
    fontWeight: 900,
    "&:hover": {
      boxShadow: "3px 3px 8px 0px black",
      background: "white",
      cursor: "pointer",
    },
    "&>img": {
      width: 22,
      height: 22,
      zIndex: 1000,
    },
  },
  cellOpen: {
    background: "#cfd8dc",
    "&:hover": {
      boxShadow: "0px 0px 15px 0px white",
      background: "#cfd8dc",
      cursor: "default",
    },
  },
  pannel: {
    width: "100%",
    minHeight: 50,
    borderBottom: "2px solid #bdbdbd",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
});

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

  useEffect(() => {
    dispatch(createBoard());
  }, [dispatch, gameSize]);

  const classes = useStyles({ size: gameSize, isGameOver: isGameOver });

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
    if (!isGameOver && !!board[id]) {
      dispatch(cellLeftClick(id));
    }
  };
  return (
    <div className={classes.game}>
      <ControlPanel
        isStarted={isStarted}
        isGameOver={isGameOver}
        flagsCount={flagsCount}
      />
      <div
        className={`${classes.board} ${isGameOver ? classes.overlay : ""}`}
        onClick={(e) => handlerLeftClick(e)}
        onContextMenu={(e) => handlerRightClick(e)}
      >
        {Object.keys(board).map((key) => {
          return (
            <Cell
              key={board[key].id}
              item={board[key]}
              isGameOver={isGameOver}
              cellClassNames={{
                cell: classes.cell,
                cellOpen: classes.cellOpen,
              }}
            />
          );
        })}
      </div>
      {isGameOver ? <RezultPannel isGameWin={isGameWin} score={score} /> : null}
    </div>
  );
}
