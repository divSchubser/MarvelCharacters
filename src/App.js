import "./app.css";
import { createForm } from "./components/Form";
import createWeatherOutput from "./components/WeatherOutput";
import { createElement } from "./utils/elements";

function App() {
  const headerTitle = createElement("h1", {
    innerText: "The Weather Company",
    className: "header__title  ",
  });

  const form = createForm();

  const output = createWeatherOutput();

  const container = createElement("div", {
    className: "container",
    children: [headerTitle, form, output],
  });
  return container;
}

export default App;
