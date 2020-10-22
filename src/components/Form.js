import { createElement } from "../utils/elements";
import "./form.css";

export const createForm = () => {
  const input = createElement("input", {
    className: "input",
    placeholder: "ENTER YOUR LOCATION",
  });

  const searchButton = createElement("button", {
    className: "searchButton",
    innerText: "☀️",
  });

  const form = createElement("form", {
    className: "form",
    children: [input, searchButton],
  });
  return form;
};
