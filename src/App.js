import "./app.css";
import "./components/tuesday/tuesday.min.css";

import { createForm } from "./components/Form";
import { createElement } from "./utils/elements";
import { SearchWeather } from "./utils/api";
import createWeatherOutput from "./components/WeatherOutput";
import { GetRandomQuote } from "./utils/api";
import { createClock } from "./components/Watch";
import {
  addRemoveLoading,
  removeAllChildNodes,
  setNewProfilePicture,
} from "./utils/helpers";
import { createFavCity } from "./components/FavButtons";
import { createFooter } from "./components/Footer";
import { generateYourFavs } from "./components/YourFavs";

import dancingRoboImg from "./assets/dancingRobo.gif";
import { createAtomicBomb } from "./components/AtomicBomb";

function App() {
  let loading = false;

  let favouriteCities = JSON.parse(
    localStorage.getItem("favoriteCities") || `["Cologne"]`
  );

  const headerTitle = createElement("h1", {
    innerText: "Robo-Weather",
    className: "header__title  ",
  });

  const favCitiesBox = createElement("div", {
    className: "favCitiesBox",
  });

  (function createInitalFavs() {
    generateYourFavs(favouriteCities, favCitiesBox);
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

  const dancingRobos = createElement("div", {
    className: "dancingRobos",
    children: [],
    onclick: (event) => {
      event.preventDefault;
      buildRobot(1);
      console.log("roboclick");
    },
  });

  let error = false;
  let errorMessage = createElement("p", {
    className: "errorText",
    innerText: "🚀🚀🚀 you already killed all robos! 🦿🦾",
  });
  function destroyRobot(count = 1) {
    if (dancingRobos.lastChild?.className === "dancingRobo") {
      dancingRobos.removeChild(dancingRobos.lastChild);
    } else {
      if (error) {
        return;
      } else {
        error = true;
        dancingRobos.append(errorMessage);
      }
    }
  }
  let atomicBomb = false;

  const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

  function buildRobot(count = 4) {
    if (dancingRobos.children.length > 20 && !atomicBomb) {
      console.log(atomicBomb);
      const bombSrc = "https://media.giphy.com/media/XUFPGrX5Zis6Y/giphy.gif";
      const explosion = createElement("img", {
        className: "bombExplosion",
        src: bombSrc,
      });

      const BOOOMB = createAtomicBomb({
        onclick: async (event) => {
          event.stopPropagation();
          removeAllChildNodes(dancingRobos);
          dancingRobos.append(explosion);
          await sleep(2200);
          removeAllChildNodes(dancingRobos);
          atomicBomb = false;
        },
      });
      dancingRobos.append(BOOOMB);
      atomicBomb = true;
    }
    if (dancingRobos.lastChild?.className === "errorText") {
      dancingRobos.removeChild(dancingRobos.lastChild);
      error = false;
    }
    for (let i = 0; i < count; i++) {
      const dancingRobo = createElement("img", {
        className: "dancingRobo",
        src: dancingRoboImg,
        alt: `dancing Robo ${i + 1}`,
      });
      dancingRobos.append(dancingRobo);
    }
  }

  buildRobot();

  const output = createElement("div", {
    className: "outputContainer",
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

  let imgSrc = localStorage.getItem("imgSrc") || "";

  if (imgSrc === "") {
    imgSrc = setNewProfilePicture();
  } else {
    let dataSrc = localStorage.getItem("imgSrc");
    imgSrc = dataSrc;
    console.log("GET from localstorage");
  }

  const profilePic = createElement("img", {
    className: "profilePicture",
    src: imgSrc,

    onclick: () => {
      profilePic.src = setNewProfilePicture();
    },
  });

  const header = createElement("div", {
    className: "headerContainer",
    children: [
      createClock(),
      headerTitle,
      profilePic,
      subHeading,
      dancingRobos,
      form,
      favCitiesBox,
    ],
  });

  const footer = createFooter({
    onclick: () => destroyRobot(),
  });

  const container = createElement("div", {
    className: "container",
    children: [header, output, footer],
  });

  return container;
}

export default App;
