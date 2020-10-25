import { createElement } from "./elements";

export function removeAllChildNodes(parent) {
  console.log("removed: ", parent.firstChild);
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

const loadingImg = createElement("img", {
  className: "loadingImg",
  src: `https://media1.tenor.com/images/e8252f2679f8c77bcc2732fbacf0eeec/tenor.gif?itemid=5295987`,
  alt: "Bean Eater",
});

const loadingText = createElement("marquee", {
  className: "loadingText",
  innerHTML:
    "Please wait, till a <b>Robo</b> fetches your <b>WeatherData</b>...&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...&nbsp;&nbsp;&nbsp;&nbsp;...&nbsp;&nbsp;",
});

const loadingContainer = createElement("div", {
  className: "loadingContainer",
});

export function addRemoveLoading(loading) {
  let output = document.querySelector(".outputContainer");

  if (loading) {
    loadingContainer.append(loadingText, loadingImg);
    removeAllChildNodes(output);
    output.append(loadingContainer);
  }
}
