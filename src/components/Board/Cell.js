import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { cellLeftClick, cellRightClick } from "../../store/sapper/actions";
import { booom, bombIcon, flag, stomBoob } from "../../statik";

const useStyles = makeStyles({
  cell: (props) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid white",
    borderRadius: 4,
    background: props.isOpen ? "#cfd8dc" : "#ffe082",
    transition: "all 0.1s linear",
    overflow: "hidden",
    boxShadow: "0px 0px 15px 0px white",
    color:
      props.count < 2
        ? "#039be5"
        : props.count >= 2 || props.count <= 3
        ? "#ef6c00"
        : props.count >= 4
        ? "#ff3d00"
        : "white",
    fontSize: 14,
    fontWeight: 900,
    "&:hover": {
      boxShadow: "3px 3px 8px 0px black",
      background: props.isOpen ? null : "white",
      cursor: "pointer",
      cellOpen: props.isOpen ? "#cfd8dc" : null,
    },
    "&>img": {
      width: 22,
      height: 22,
      zIndex: 1000,
    },
  }),
});

export default function Cell({ item }) {
  const classes = useStyles({
    isMined: item.isMined,
    isOpen: item.isOpen,
    count: item.neighborMineCount,
  });
  const { isGameOver, isStarted } = useSelector((state) => state.sapper);

  const dispatch = useDispatch();

  const { neighborMineCount, isOpen, isMined, isFlagged } = item;

  const handlerLeftClick = (id) => {
    if (isGameOver) {
      return;
    } else if (isOpen) {
      return;
    } else {
      dispatch(cellLeftClick(id));
    }
  };

  const handlerRightClick = (e, id) => {
    e.preventDefault();
    if (isGameOver) {
      return;
    } else if (isOpen) {
      return;
    } else if (isStarted) {
      dispatch(cellRightClick(id));
    }
  };

  if (isMined && isGameOver) {
    return (
      <div className={classes.cell}>
        {isOpen ? (
          <img src={booom} alt="aa" />
        ) : isMined && isFlagged ? (
          <img src={stomBoob} alt="aa" />
        ) : (
          <img src={bombIcon} alt="aa" />
        )}
      </div>
    );
  } else if (isFlagged) {
    return (
      <div
        className={classes.cell}
        onContextMenu={(e) => handlerRightClick(e, item.id)}
      >
        <img src={flag} alt="aa" />
      </div>
    );
  } else {
    return (
      <div
        className={classes.cell}
        onClick={() => handlerLeftClick(item.id)}
        onContextMenu={(e) => handlerRightClick(e, item.id)}
      >
        {isOpen ? (neighborMineCount !== 0 ? neighborMineCount : null) : null}
      </div>
    );
  }
}
