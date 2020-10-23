import "./app.css";
import { createForm } from "./components/Form";
import { createElement } from "./utils/elements";
import { SearchWeather } from "./utils/api";
import createWeather from "./components/WeatherOutput";
import { GetRandomQuote } from "./utils/api";
// import BeanEater from "./assets/beaneater.gif";
import { showTime } from "./components/Watch";
import { removeAllChildNodes } from "./utils/helpers";
function App() {
  let loading = false;

  const headerTitle = createElement("h1", {
    innerText: "Robo-Weather",
    className: "header__title  ",
  });
  const clock = createElement("div", {
    className: "clock",
    innerHTML: "",
  });
  let IntervId = null;

  function startClock() {
    IntervId = setInterval(showTime, 1000);
  }

  // function stopClock() {
  //   clearInterval(IntervId);
  // }

  startClock();

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
        loading = true;
        addRemoveLoading();
        const weatherObj = await SearchWeather(city);
        const randomQuote = await GetRandomQuote();
        await createWeather(weatherObj, output, randomQuote);
        loading = false;
        addRemoveLoading();
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

  function addRemoveLoading() {
    if (loading) {
      removeAllChildNodes(output);
      output.append(loadingImg);
    }
  }

  const form = createForm({
    onsubmit: async (event) => {
      event.preventDefault();
      loading = true;
      addRemoveLoading();
      const input = document.querySelector(".input");
      const weatherObj = await SearchWeather(input.value);
      const randomQuote = await GetRandomQuote();
      input.value = "";
      await createWeather(weatherObj, output, randomQuote);
      loading = false;
      addRemoveLoading();
    },
  });

  const loadingImg = createElement("img", {
    className: "loadingImg",
    src: `https://media1.tenor.com/images/e8252f2679f8c77bcc2732fbacf0eeec/tenor.gif?itemid=5295987`,
    alt: "Bean Eater",
  });

  // const loader = createElement("div", {
  //   children: [loadingImg],
  // });

  const header = createElement("div", {
    className: "headerContainer",
    children: [headerTitle, clock, subHeading, form, robosHeader, favCities],
  });
  const output = createElement("div", {
    className: "outputContainer",
  });

  const container = createElement("div", {
    className: "container",
    children: [header, output],
  });
  return container;
}

export default App;
