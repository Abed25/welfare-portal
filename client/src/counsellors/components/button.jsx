import React from "react";
import "../styles/button.css";

export default function DynamicButton(props) {
  const { style, name, click, notify, value } = props;
  const badgeStyle = {
    position: "absolute",
    top: "-20px",
    right: "-10px",
    backgroundColor: "#655bfa",
    border: "black solid 1px",
    color: "white",
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: "bold",
  };
  return (
    <button className="buttons" onClick={click} style={style}>
      {name}
      {notify && <span style={badgeStyle}>{value}</span>}
    </button>
  );
}
