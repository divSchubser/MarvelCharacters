import { createElement } from "../utils/elements";
import "./watch.css";

let IntervId = null;
let ampm = JSON.parse(localStorage.getItem("ampm") || false);

export async function showTime(clockContainer, ampm) {
  const time = new Date();
  let hour = time.getHours();
  let min = time.getMinutes();
  let sec = time.getSeconds();
  let am_pm = "";

  if (ampm && hour > 12) {
    hour -= 12;
    am_pm = " PM";
  }
  if (ampm && hour <= 12) {
    am_pm = " AM";
  }
  hour = hour < 10 ? "0" + hour : hour;
  min = min < 10 ? "0" + min : min;
  sec = sec < 10 ? "0" + sec : sec;

  let currentTime = ` ${hour} : ${min}: ${sec} ${ampm ? "<br>" : ""}${
    ampm ? am_pm : ""
  } `;
  clockContainer.innerHTML = currentTime;
}

export function createClock() {
  return clock;
}
const clock = createElement("div", {
  className: "clock",
  innerHTML: "",
  onclick: (event) => {
    event.preventDefault;
    console.log("Click");
    ampm = !ampm;
    localStorage.setItem("ampm", JSON.stringify(ampm));
  },
});

(() => (IntervId = setInterval(() => showTime(clock, ampm), 1000)))();
