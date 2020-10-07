import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Board from "./components/Board/Board";
import { createBoard } from "./store/sapper/actions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(createBoard());
  }, []);
  return (
    <div className="sapper">
      <Board />
    </div>
  );
}

export default App;
