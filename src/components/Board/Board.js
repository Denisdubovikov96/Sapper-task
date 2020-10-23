import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import Cell from "./Cell";
import ControlPanel from "./ControlPanel";
import { cellLeftClick, cellRightClick } from "../../store/sapper/actions";

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
    color: "#3f51b5",
  }),
  cell: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid white",
    borderRadius: 4,
    transition: "all 0.1s linear",
    overflow: "hidden",
    boxShadow: "0px 0px 15px 0px white",
    fontSize: 14,
    fontWeight: 900,
    "&:hover": {
      cursor: "pointer",
    },
    "&>img": {
      width: 22,
      height: 22,
      zIndex: 1000,
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

  const classes = useStyles({ size: gameSize });

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
    if (!isGameOver && !board[id].isOpen) {
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
        className={classes.board}
        onClick={(e) => handlerLeftClick(e)}
        onContextMenu={(e) => handlerRightClick(e)}
      >
        {Object.keys(board).map((key) => {
          return (
            <Cell
              key={board[key].id}
              item={board[key]}
              isGameOver={isGameOver}
              cellClassName={classes.cell}
            />
          );
        })}
      </div>
      {isGameOver ? (
        <div className={classes.resultPannel}>
          <h2>{`Ваш результат ${isGameWin ? "Победа" : "Поражение"}`}</h2>
          <div>
            <span>{`Время: ${score.time} sec`}</span>
            <span>{`Обезвреженые мины: ${score.safeMines}`}</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
