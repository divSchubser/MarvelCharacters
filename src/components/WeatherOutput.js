import { createElement } from "../utils/elements";

export default function createWeatherOutput() {
  const location = createElement("h2", {
    className: "locationName",
    innerText: "Köln",
  });

  const cardBody = createElement("div", {
    className: "card-body",
    children: [
      createElement("h5", {
        className: "card-title",
        innerText: "Temperatur",
      }),
      createElement("p", {
        className: "card-text",
        innerText: "20°C",
      }),
    ],
  });

  const card = createElement("div", {
    className: "card",
    children: [cardBody],
  });

  const outputContainer = createElement("div", {
    className: "outputContainer",
    children: [location, card],
  });

  return outputContainer;
}
