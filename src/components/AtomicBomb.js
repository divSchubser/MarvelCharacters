import "./atomicBomb.css";
const { createElement } = require("../utils/elements");
import bombElement from "../assets/bomb.gif";

const bombImg = createElement("img", { className: "BOOOMB", src: bombElement });

export function createAtomicBomb(onClick) {
  const bombButton = createElement("button", {
    className: "bombButton",
    children: [bombImg],
    ...onClick,
  });

  return bombButton;
}
