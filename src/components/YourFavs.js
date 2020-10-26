import { generateRandomSeed, removeAllChildNodes } from "../utils/helpers";

import { createElement } from "../utils/elements";

export const generateYourFavs = (favouriteCities, favCitiesBox) => {
  if (favouriteCities.length > 0) {
    let header = createElement("h6", {
      className: "robosHeader",
      innerHTML: `Your Favourite Cities:`,
    });

    let headerBody = createElement("div", {
      className: "headerBody",
      children: [header],
    });
    favCitiesBox.append(headerBody) || "";
  } else {
    return document.createElement("div");
  }
};
