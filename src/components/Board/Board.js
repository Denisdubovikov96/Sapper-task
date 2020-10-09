import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import Cell from "./Cell";
import useTimer from "../../helperFunctions/useTimer";

const useStyles = makeStyles({
  board: (props) => ({
    width: `${props.size * 40}px`,
    height: `${props.size * 40}px`,
    display: "grid",
    padding: 2,
    gridTemplateColumns: `repeat(${props.size}, 1fr)`,
    gridTemplateRows: `repeat(${props.size}, 1fr)`,
  }),
  game: (props) => ({
    margin: "20px auto",
    width: `calc(${props.size * 40}px + 4px)`,
    border: "2px solid #bdbdbd",
    borderRadius: 5,
    overflow: "hidden",
    boxShadow: "4px 4px 15px 0px rgba(0,0,0,0.45)",
  }),
  pannel: {
    width: "100%",
    minHeight: 50,
    borderBottom: "2px solid #bdbdbd",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    fontSize: 24,
    fontWeight: 600,
  },
});

export default function Board() {
  const { isStarted, isGameOver, flagsCount } = useSelector(
    (state) => state.sapper
  );
  const [timer, stopTimer] = useTimer(1000, isStarted);

  if (isGameOver) {
    stopTimer();
  }
  const { board, gameSize } = useSelector((state) => state.sapper);
  const classes = useStyles({ size: gameSize });
  return (
    <div className={classes.game}>
      <div className={classes.pannel}>
        <span>{`${timer} sec`}</span>
        <span>{flagsCount}</span>
      </div>
      <div className={classes.board}>
        {Object.keys(board).map((key) => {
          return <Cell key={board[key].id} item={board[key]} />;
        })}
      </div>
    </div>
  );
}
