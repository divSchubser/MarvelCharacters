import { createElement } from "../utils/elements";

export default function createWeatherOutput(weatherObj, outputContainer) {
  // weatherObj || console.log(weatherObj.title);

  const weather = weatherObj.consolidated_weather[0];
  const location = createElement("h2", {
    className: "locationName",
    innerText: weatherObj.title,
  });

  const cardBody = createElement("div", {
    className: "card-body",
    children: [
      location,
      createElement("h5", {
        className: "card-title",
        innerText: "Temperatur",
      }),
      createElement("p", {
        className: "card-text",
        innerText: `${Math.round(weather.the_temp)} °C`,
      }),
    ],
  });

  const card = createElement("div", {
    className: "card",
    children: [cardBody],
  });
  outputContainer.append(card);
  // const outputContainer = createElement("div", {
  //   className: "outputContainer",
  //   children: [location, card],
  // });

  return outputContainer;
}
