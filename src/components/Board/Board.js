import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import Cell from "./Cell";
import ControlPanel from "./ControlPanel";

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
  },
  resultPannel: {
    borderTop: "2px solid #bdbdbd",
    fontSize: 18,
    fontWeight: 600,
    "&>h2": {
      margin: 8,
      textAlign: "center",
    },
    "&>div": {
      margin: 12,
      display: "flex",
      justifyContent: "space-between",
    },
  },
});

export default function Board() {
  const { board, gameSize, score, isGameOver } = useSelector(
    (state) => state.sapper
  );

  const classes = useStyles({ size: gameSize });

  return (
    <div className={classes.game}>
      <ControlPanel />
      <div className={classes.board}>
        {Object.keys(board).map((key) => {
          return <Cell key={board[key].id} item={board[key]} />;
        })}
      </div>
      {isGameOver ? (
        <div className={classes.resultPannel}>
          <h2>Ваш результат</h2>
          <div>
            <span>{`Время: ${score.time}`}</span>
            <span>{`Обезвреженые мины: ${score.safeMines}`}</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
