import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import useTimer from "../../helperFunctions/useTimer";
import { setGameOverTime } from "../../store/sapper/actions";

const useStyles = makeStyles({
  pannel: {
    width: "100%",
    minHeight: 50,
    borderBottom: "2px solid #bdbdbd",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    fontSize: 24,
    fontWeight: 100,
  },
});

export default function ControlPanel({ isStarted, isGameOver, flagsCount }) {
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
      <span>{`${time} sec`}</span>
      <span>{flagsCount}</span>
    </div>
  );
}
