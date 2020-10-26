import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  resultPannel: {
    borderTop: "2px solid #bdbdbd",
    fontSize: 18,
    fontWeight: 500,
    "&>h2": {
      margin: 8,
      textAlign: "center",
      fontWeight: 700,
    },
    "&>div": {
      margin: 12,
      display: "flex",
      justifyContent: "space-between",
    },
  },
});
export default function RezultPannel({ isGameWin, score }) {
  const classes = useStyles();
  return (
    <div className={classes.resultPannel}>
      <h2>{`Ваш результат ${isGameWin ? "Победа" : "Поражение"}`}</h2>
      <div>
        <span>{`Время: ${score.time} sec`}</span>
        <span>{`Обезвреженые мины: ${score.safeMines}`}</span>
      </div>
    </div>
  );
}
