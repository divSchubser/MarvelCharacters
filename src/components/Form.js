import { createElement } from "../utils/elements";
import "./form.css";

import { getWeather, createWeatherElements } from "../utils/api";

export const createForm = () => {
  const searchButton = createElement("button", {
    className: "searchButton",
    innerText: "☀️",

    onclick: async (event) => {
      event.preventDefault();
      let weatherObj = getWeather(input.value);
      createWeatherElements(weatherObj);
    },
  });

  const input = createElement("input", {
    className: "input",
    placeholder: "ENTER YOUR LOCATION",
  });

  const form = createElement("form", {
    className: "form",
    children: [input, searchButton],
  });
  return form;
};
