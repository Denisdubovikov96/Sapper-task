import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { booom, bombIcon, flag, stopBoom } from "../../statik";

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
      boxShadow: props.isOpen
        ? "0px 0px 15px 0px white"
        : "3px 3px 8px 0px black",
      background: props.isOpen ? "#cfd8dc" : "white",
      cursor: "pointer",
    },
    "&>img": {
      width: 22,
      height: 22,
      zIndex: 1000,
    },
  }),
});

export default function Cell({ item, isGameOver }) {
  const classes = useStyles({
    isMined: item.isMined,
    isOpen: item.isOpen,
    count: item.neighborMineCount,
  });

  const { neighborMineCount, isOpen, isMined, isFlagged, id } = item;

  if (isMined && isGameOver) {
    return (
      <div data-id={id} className={classes.cell}>
        {isOpen ? (
          <img src={booom} alt="aa" />
        ) : isMined && isFlagged ? (
          <img src={stopBoom} alt="aa" />
        ) : (
          <img src={bombIcon} alt="aa" />
        )}
      </div>
    );
  } else {
    return (
      <div data-id={id} className={classes.cell}>
        {isOpen ? (
          neighborMineCount !== 0 ? (
            neighborMineCount
          ) : null
        ) : isFlagged ? (
          <img src={flag} alt="aa" />
        ) : null}
      </div>
    );
  }
}
