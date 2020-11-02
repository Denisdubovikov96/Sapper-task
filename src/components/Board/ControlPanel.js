import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import classNames from "classnames";
import useTimer from "../../helperFunctions/useTimer";
import {
  setGameOverTime,
  restart,
  changeGameLvl,
} from "../../store/sapper/actions";
import { useState } from "react";
import { getTimeString } from "../../helperFunctions/helperFuntions";

const buttons = [
  { gameSize: 10, label: "S" },
  { gameSize: 15, label: "M" },
  { gameSize: 20, label: "X" },
  { gameSize: 30, label: "XX" },
];

export default function ControlPanel({ isStarted, isGameOver, flagsCount }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { time, stop, start } = useTimer();
  const dispatch = useDispatch();
  const btn = classNames("btn");
  const pannel = classNames("pannel");
  const sideBar = classNames("sideBar", { expanded: isExpanded });
  const controllers = classNames("controllers");
  const iconCls = classNames(
    "fas",
    `fa-${isExpanded ? "compress" : "expand"}-arrows-alt`
  );

  useEffect(() => {
    if (isGameOver) {
      dispatch(setGameOverTime(time));
      stop();
    }
    return () => {
      stop();
    };
  }, [isGameOver]);

  useEffect(() => {
    if (isStarted) {
      start();
      setIsExpanded(false);
    } else {
      stop();
    }
    return () => {
      stop();
    };
  }, [isStarted]);

  return (
    <div className={pannel}>
      <button
        className={btn}
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
      >
        <i className={iconCls} />
      </button>
      <div className={controllers}>
        <span>{getTimeString(time)}</span>
        <span>{flagsCount}</span>
      </div>
      <div className={sideBar}>
        <button onClick={() => dispatch(restart())} className={btn}>
          <i className="fas fa-sync-alt" />
        </button>
        {buttons.map((el) => {
          return (
            <button
              key={el.gameSize}
              onClick={() => dispatch(changeGameLvl(el.gameSize))}
              className={btn}
            >
              {el.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
