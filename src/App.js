import "./app.css";
import { createForm } from "./components/Form";
import { createElement } from "./utils/elements";
import { SearchWeather } from "./utils/api";
import createWeather from "./components/WeatherOutput";
import { GetRandomQuote } from "./utils/api";

function App() {
  const headerTitle = createElement("h1", {
    innerText: "Robo-Weather",
    className: "header__title  ",
  });

  const subHeading = createElement("h2", {
    className: "header__sub",
    innerHTML:
      "Maybe you'll get your weather, ...<br> ...if the robots are not killing humans.",
  });

  const form = createForm({
    onclick: async (event) => {
      event.preventDefault();
      const input = document.querySelector(".input");
      const weatherObj = await SearchWeather(input.value);
      const randomQuote = await GetRandomQuote();
      input.value = "";
      await createWeather(weatherObj, output, randomQuote);
    },
  });

  const output = createElement("div", {
    className: "outputContainer",
  });

  const container = createElement("div", {
    className: "container",
    children: [headerTitle, subHeading, form, output],
  });
  return container;
}

export default App;
