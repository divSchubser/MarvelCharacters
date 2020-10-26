import { generateRandomSeed, removeAllChildNodes } from "../utils/helpers";

const { createElement } = require("../utils/elements");

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
