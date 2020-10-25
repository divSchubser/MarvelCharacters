import "./app.css";
import { createForm } from "./components/Form";
import { createElement } from "./utils/elements";
import { SearchWeather } from "./utils/api";
import createWeatherOutput from "./components/WeatherOutput";
import { GetRandomQuote } from "./utils/api";
import { showTime } from "./components/Watch";
import { removeAllChildNodes } from "./utils/helpers";
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
      const newButton = createFavCity("⭐️", city, "⭐️", {
        onclick: async (event) => {
          console.log("geklickt");
          event.preventDefault();
          let loading = true;
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

  const favCities = createElement("div", {
    className: "favCities",
    // children: [favCityOne, favCityTwo, favCityThree],
  });

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
  function addRemoveLoading() {
    if (loading) {
      removeAllChildNodes(output);
      output.append(loadingContainer);
    }
  }

  const loadingText = createElement("marquee", {
    className: "loadingText",
    innerHTML:
      "Please wait, till a <b>Robo</b> fetches your <b>WeatherData</b>...&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...&nbsp;&nbsp;&nbsp;&nbsp;...&nbsp;&nbsp;",
  });
  const loadingImg = createElement("img", {
    className: "loadingImg",
    src: `https://media1.tenor.com/images/e8252f2679f8c77bcc2732fbacf0eeec/tenor.gif?itemid=5295987`,
    alt: "Bean Eater",
  });

  const loadingContainer = createElement("div", {
    className: "loadingContainer",
    children: [loadingText, loadingImg],
  });

  // const loader = createElement("div", {
  //   children: [loadingImg],
  // });

  const header = createElement("div", {
    className: "headerContainer",
    children: [
      headerTitle,
      clock,
      subHeading,
      form,
      robosHeader,
      favCities,
      favCitiesBox,
    ],
  });

  const container = createElement("div", {
    className: "container",
    children: [header, output],
  });

  return container;
}

export default App;
