import "./form.css";
import { createElement } from "../utils/elements";

export const createForm = (props) => {
  const searchButton = createElement("button", {
    className: "searchButton",
    innerText: "☀️",
    ...props,
  });

  const input = createElement("input", {
    className: "input",
    placeholder: "ENTER YOUR LOCATION",
  });

  const form = createElement("form", {
    className: "form",
    children: [input, searchButton],
  });
  return form;
};
