import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import useTimer from "../../helperFunctions/useTimer";
import { initGame, setGameOverTime } from "../../store/sapper/actions";
import { useState } from "react";

const useStyles = makeStyles({
  pannel: {
    minHeight: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    fontSize: 24,
    fontWeight: 400,
    zIndex: 1,
    padding: "0 20px",
  },
  controllers: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 20,
  },
  menuButton: {
    background: "#ffe082",
    border: "2px solid #3f51b5",
    width: 35,
    height: 35,
    borderRadius: 4,
    fontSize: 20,
    color: "#3f51b5",
    transition: "all 0.2s linear",
    cursor: "pointer",
    "&:hover": {
      background: "#3f51b5",
      color: "#fff",
    },
  },
  controlButtons: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    padding: 5,
    zIndex: -1,
    position: "absolute",
    top: "50px",
    left: "0px",
    background: "#fff",
    width: 50,
    height: 200,
    border: "2px solid #bdbdbd",
    transition: "all 0.3s linear",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    opacity: 1,
    "&$expanded": {
      zIndex: -1,
      left: "-50px",
      opacity: 1,
    },
  },
  expanded: {},
});

export default function ControlPanel({ isStarted, isGameOver, flagsCount }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { time, stop, start } = useTimer();
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (isGameOver) {
      stop();
      dispatch(setGameOverTime(time));
    }
    return () => {
      stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGameOver]);

  useEffect(() => {
    if (isStarted) {
      start();
    }
    return () => {
      stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStarted]);

  return (
    <div className={classes.pannel}>
      <button
        className={classes.menuButton}
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
      <div className={classes.controllers}>
        <span>{`${time} sec`}</span>
        <span>{flagsCount}</span>
      </div>
      <div
        className={`${classes.controlButtons} ${
          isExpanded ? classes.expanded : ""
        }`}
      >
        <button
          onClick={() => dispatch(initGame(10))}
          className={classes.menuButton}
        >
          S
        </button>
        <button
          onClick={() => dispatch(initGame(15))}
          className={classes.menuButton}
        >
          M
        </button>
        <button
          onClick={() => dispatch(initGame(20))}
          className={classes.menuButton}
        >
          B
        </button>
      </div>
    </div>
  );
}
