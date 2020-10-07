import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import Cell from "./Cell";

const useStyles = makeStyles({
  board: (props) => ({
    width: `${props.size * 40}px`,
    height: `${props.size * 40}px`,
    margin: "100px auto",
    border: "1px solid grey",
    display: "grid",
    gridTemplateColumns: `repeat(${props.size}, 1fr)`,
    gridTemplateRows: `repeat(${props.size}, 1fr)`,
  }),
  cell: (props) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid grey",
    background: props.isMined ? "white" : "black",
    transition: "background 0.2s linear",
    "&:hover": {
      background: "grey",
      cursor: "pointer",
    },
  }),
});

export default function Board() {
  const { board, gameSize } = useSelector((state) => state.sapper);
  const props = { size: gameSize };
  const classes = useStyles(props);
  return (
    <div className={classes.board}>
      {/* На случай рефактора под Object */}
      {/* {Object.keys(board).map((key) => {
        return <Cell key={board[key].id} item={board[key]} />;
      })} */}
      {board.map((item) => {
        return <Cell key={item.id} item={item} />;
      })}
    </div>
  );
}
