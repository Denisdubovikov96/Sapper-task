import React from "react";
import classNames from "classnames";
import { getTimeString } from "../../helperFunctions/helperFuntions";

export default function RezultPannel({ isGameWin, score }) {
  const resultPannel = classNames("resultPannel");
  return (
    <div className={resultPannel}>
      <h2>{`${isGameWin ? "Победа" : "Поражение"}`}</h2>
      <div>
        <span>{`Время: ${getTimeString(score.time)}`}</span>
        <span>{`Обезвреженые мины: ${score.safeMines}`}</span>
      </div>
    </div>
  );
}
