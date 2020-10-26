import "./weatherOutput.css";

import { createElement } from "../utils/elements";
import { createFavCities } from "../components/FavButtons";

export default function createWeatherOutput(
  weatherObj,
  outputContainer,
  randomQuote,
  favouriteCities
) {
  const cityName = weatherObj.title;
  const showKitties = document.querySelector(".kittyCheckbox").checked;
  const showHumans = document.querySelector(".humanCheckbox").checked;
  const weatherToday = weatherObj.consolidated_weather[0];
  let avatarSet = () => (showHumans ? "set5" : showKitties ? "set4" : "set1");
  // Fav Cities
  let favOrNot = favouriteCities.includes(cityName);
  let starIcon = favOrNot ? "fas" : "far";

  const avatar = createElement("img", {
    className: "roboFace",
    src: `https://robohash.org/${
      weatherToday.weather_state_abbr
    }.png?set=${avatarSet()}`,
    alt: "Robo-Face",
  });

  const favCityIcon = createElement("i", {
    className: `${starIcon} fa-star`,
  });

  const favCityButton = createElement("btn", {
    className: "favCityButton",
    children: [favCityIcon],

    onclick: (event) => {
      event.preventDefault;
      favOrNot = !favOrNot;
      console.log("itsme");
      let starIcon = favOrNot ? "fas" : "far";
      let favCitiesBox = document.querySelector(".favCitiesBox");

      favCityIcon.className = `${starIcon} fa-star`;
      if (favOrNot) {
        favouriteCities.push(cityName);
      } else {
        favouriteCities = favouriteCities.filter((city) => city !== cityName);
      }
      localStorage.setItem("favoriteCities", JSON.stringify(favouriteCities));
      createFavCities(favouriteCities);
    },
  });

  const location = createElement("h2", {
    className: "locationName",
    innerText: weatherObj.title,
  });

  const cardHeader = createElement("div", {
    className: "card-header",
    children: [location, favCityButton],
  });
  const cardBody = createElement("div", {
    className: "card-body",
    children: [
      cardHeader,
      createElement("h5", {
        className: "card-title",
        innerText: "Temperatur",
      }),
      createElement("p", {
        className: "card-text",
        innerText: `${Math.round(weatherToday.the_temp)} °C`,
      }),
      createElement("img", {
        className: "card-image",
        src: `https://www.metaweather.com/static/img/weather/${weatherToday.weather_state_abbr}.svg`,
        alt: weatherToday.weather_state_name,
      }),
      createElement("marquee", {
        className: "card-randomQuote",
        innerText: randomQuote,
      }),
    ],
  });

  const card = createElement("div", {
    className: "card",
    children: [cardBody],
  });
  outputContainer.innerHTML = "";
  outputContainer.append(avatar, card);

  return outputContainer;
}
