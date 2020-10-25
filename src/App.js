import "./app.css";
import { createForm } from "./components/Form";
import { createElement } from "./utils/elements";
import { SearchWeather } from "./utils/api";
import createWeatherOutput from "./components/WeatherOutput";
import { GetRandomQuote } from "./utils/api";
import { showTime } from "./components/Watch";
import { addRemoveLoading } from "./utils/helpers";
import { createFavCity } from "./components/FavButtons";

function App() {
  let loading = false;

  // TODO: Maybe check local Storage for inital Load
  let favouriteCities = JSON.parse(
    localStorage.getItem("favoriteCities") || "[]"
  );
  const favCitiesBox = createElement("div", {
    className: "favCitiesBox",
    // innerHTML: `${favouriteCities}`,
  });

  const headerTitle = createElement("h1", {
    innerText: "Robo-Weather",
    className: "header__title  ",
  });
  const clock = createElement("div", {
    className: "clock",
    innerHTML: "",
  });
  let IntervId = null;

  (function startClock() {
    IntervId = setInterval(showTime, 1000);
  })();

  (function createInitalFavs() {
    favouriteCities?.map((city) => {
      const newButton = createFavCity("⭐️ ", city, "", {
        onclick: async (event) => {
          event.preventDefault();
          loading = true;
          addRemoveLoading(loading);
          const weatherObj = await SearchWeather(city);
          const randomQuote = await GetRandomQuote();
          await createWeatherOutput(
            weatherObj,
            output,
            randomQuote,
            favouriteCities
          );
          loading = false;
          addRemoveLoading(loading);
        },
      });
      favCitiesBox.append(newButton);
    });
  })();

  const subHeading = createElement("p", {
    className: "header__sub",
    innerHTML:
      "Maybe you'll get your weather, ...<br> ...if the robots are not killing humans.",
  });
  const output = createElement("div", {
    className: "outputContainer",
  });

  // const favCityOne = createFavCity("🌞 ", "Abidjan", " 🇨🇮", {
  //   onclick: async (event) => {
  //     event.preventDefault();
  //     let loading = true;
  //     addRemoveLoading(loading);
  //     const weatherObj = await SearchWeather("Abidjan");
  //     const randomQuote = await GetRandomQuote();
  //     await createWeatherOutput(
  //       weatherObj,
  //       output,
  //       randomQuote,
  //       favouriteCities
  //     );
  //     loading = false;
  //     addRemoveLoading(loading);
  //   },
  // });
  // const favCityTwo = createFavCity("🏔 ", "Anchorage", " 🇺🇸", {
  //   onclick: async (event) => {
  //     event.preventDefault();
  //     let loading = true;
  //     addRemoveLoading(loading);
  //     const weatherObj = await SearchWeather("Anchorage");
  //     const randomQuote = await GetRandomQuote();
  //     await createWeatherOutput(
  //       weatherObj,
  //       output,
  //       randomQuote,
  //       favouriteCities
  //     );
  //     loading = false;
  //     addRemoveLoading(loading);
  //   },
  // });
  // const favCityThree = createFavCity("☔️ ", "The Hague", " 🇳🇱", {
  //   onclick: async (event) => {
  //     event.preventDefault();
  //     let loading = true;
  //     addRemoveLoading(loading);
  //     const weatherObj = await SearchWeather("The Hague");
  //     const randomQuote = await GetRandomQuote();
  //     await createWeatherOutput(
  //       weatherObj,
  //       output,
  //       randomQuote,
  //       favouriteCities
  //     );
  //     loading = false;
  //     addRemoveLoading(loading);
  //   },
  // });

  // const favCities = createElement("div", {
  //   className: "favCities",
  //   children: [favCityOne, favCityTwo, favCityThree],
  // });

  const robosHeader = createElement("h6", {
    className: "robosHeader",
    innerText: "Robos Favourite Cities:",
  });

  const form = createForm({
    onsubmit: async (event) => {
      event.preventDefault();
      loading = true;
      addRemoveLoading(loading);
      const input = document.querySelector(".input");
      const weatherObj = await SearchWeather(input.value);
      const randomQuote = await GetRandomQuote();
      input.value = "";
      await createWeatherOutput(
        weatherObj,
        output,
        randomQuote,
        favouriteCities
      );
      loading = false;
      addRemoveLoading(loading);
    },
  });

  const header = createElement("div", {
    className: "headerContainer",
    children: [headerTitle, clock, subHeading, form, robosHeader, favCitiesBox],
  });

  const container = createElement("div", {
    className: "container",
    children: [header, output],
  });

  return container;
}

export default App;
