import "./app.css";
import { createForm } from "./components/Form";
import { createElement } from "./utils/elements";
import { SearchWeather } from "./utils/api";
import createWeather from "./components/WeatherOutput";

function App() {
  const headerTitle = createElement("h1", {
    innerText: "Robo Weather",
    className: "header__title  ",
  });

  const form = createForm({
    onclick: async (event) => {
      event.preventDefault();
      const input = document.querySelector(".input");
      const weatherObj = await SearchWeather(input.value);
      input.value = "";
      await createWeather(weatherObj, output);
    },
  });

  const output = createElement("div", {
    className: "outputContainer",
  });

  const container = createElement("div", {
    className: "container",
    children: [headerTitle, form, output],
  });
  return container;
}

export default App;
