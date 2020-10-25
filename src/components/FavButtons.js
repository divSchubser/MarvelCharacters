import { createElement } from "../utils/elements";
import { removeAllChildNodes } from "../utils/helpers";
import { SearchWeather, GetRandomQuote } from "../utils/api";
import { addRemoveLoading } from "../utils/helpers";
import createWeatherOutput from "../components/WeatherOutput";

// Predefined Fav-Buttons

export const createFavCity = (icon, city, flag, event) => {
  const button = createElement("button", {
    className: "favCity",
    innerText: icon + city + flag,
    ...event,
  });
  return button;
};

export function createFavCities(favouriteCities) {
  const arrayContainer = document.querySelector(".favCitiesBox");
  removeAllChildNodes(arrayContainer);
  const output = document.querySelector(".outputContainer");
  favouriteCities?.map((city) => {
    const newButton = createFavCity("⭐️ ", city, "", {
      onclick: async (event) => {
        event.preventDefault();
        addRemoveLoading(true);
        const weatherObj = await SearchWeather(city);
        const randomQuote = await GetRandomQuote();
        await createWeatherOutput(
          weatherObj,
          output,
          randomQuote,
          favouriteCities
        );
        addRemoveLoading(false);
      },
    });
    arrayContainer.append(newButton);
  });
}
