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

  useEffect(() => {
    if (isGameOver) {
      dispatch(setGameOverTime(time));
      stop();
    }
    return () => {
      stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStarted]);

  return (
    <div className={pannel}>
      <button
        className={btn}
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
      >
        {isExpanded ? (
          <i className="fas fa-compress-arrows-alt" />
        ) : (
          <i className="fas fa-expand-arrows-alt" />
        )}
      </button>
      <div className={controllers}>
        <span>{`${time} sec`}</span>
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
