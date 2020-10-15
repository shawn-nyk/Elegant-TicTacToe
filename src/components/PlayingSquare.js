import React from "react";
import "./PlayingSquare.css";

const PlayingSquare = (props) => {
  return (
    <div className={props.owner} onClick={props.onClickHandler}>
    </div>
  );
};

export default PlayingSquare;