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

  const subHeading = createElement("h6", {
    className: "header__sub",
    innerHTML:
      "Maybe you'll get your weather, ...<br> ...if the robots are not killing humans.",
  });

  const createFavCity = (icon, city, flag) => {
    const button = createElement("button", {
      className: "favCity",
      innerText: icon + city + flag,
      onclick: async (event) => {
        event.preventDefault();
        const weatherObj = await SearchWeather(city);
        const randomQuote = await GetRandomQuote();
        await createWeather(weatherObj, output, randomQuote);
      },
    });
    return button;
  };

  const favCityOne = createFavCity("🌞 ", "Abidjan", " 🇨🇮");
  const favCityTwo = createFavCity("🏔 ", "Anchorage", " 🇺🇸");
  const favCityThree = createFavCity("☔️ ", "The Hague", " 🇳🇱");

  const favCities = createElement("div", {
    className: "favCities",
    children: [favCityOne, favCityTwo, favCityThree],
  });

  const robosHeader = createElement("h6", {
    className: "robosHeader",
    innerText: "Robos Favourite Cities:",
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
    children: [headerTitle, subHeading, form, robosHeader, favCities, output],
  });
  return container;
}

export default App;
