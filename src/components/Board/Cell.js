import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { cellClick } from "../../store/sapper/actions";
const useStyles = makeStyles({
  cell: (props) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid grey",
    background: props.isMined ? "white" : props.isOpen ? "green" : "black",
    transition: "background 0.2s linear",
    fontSize: 12,
    "&:hover": {
      background: "grey",
      cursor: "pointer",
    },
  }),
});

export default function Cell({ item }) {
  const props = { isMined: item.isMined, isOpen: item.isOpen };
  const classes = useStyles(props);
  const dispatch = useDispatch();
  // if (item.isMined) {
  //   console.log(item);
  // }
  return (
    <div className={classes.cell} onClick={() => dispatch(cellClick(item.id))}>
      {item.id}
    </div>
  );
}
