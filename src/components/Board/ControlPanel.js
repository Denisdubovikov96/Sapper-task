import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
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
    fontWeight: 600,
  },
});

export default function ControlPanel() {
  const { isStarted, isGameOver, flagsCount } = useSelector(
    (state) => state.sapper
  );
  const [timer, setTimer] = useState(0);
  const handlerTimer = () => {
    setTimer((p) => p + 1);
  };
  const stopTimer = useTimer(handlerTimer, 1000, isStarted);
  const dispatch = useDispatch();

  const classes = useStyles();

  useEffect(() => {
    if (isGameOver) {
      dispatch(setGameOverTime(timer));
    }
    return stopTimer();
  }, [isGameOver]);

  return (
    <div className={classes.pannel}>
      <span>{`${timer} sec`}</span>
      <span>{flagsCount}</span>
    </div>
  );
}
