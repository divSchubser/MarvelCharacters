import { createElement } from "../utils/elements";

// Predefined Fav-Buttons

export const createFavCity = (icon, city, flag, event) => {
  const button = createElement("button", {
    className: "favCity",
    innerText: icon + city + flag,
    ...event,
  });
  return button;
};
