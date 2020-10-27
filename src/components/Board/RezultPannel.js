import React from "react";
import classNames from "classnames";

export default function RezultPannel({ isGameWin, score }) {
  const resultPannel = classNames("resultPannel");
  return (
    <div className={resultPannel}>
      <h2>{`${isGameWin ? "Победа" : "Поражение"}`}</h2>
      <div>
        <span>{`Время: ${score.time} sec`}</span>
        <span>{`Обезвреженые мины: ${score.safeMines}`}</span>
      </div>
    </div>
  );
}
