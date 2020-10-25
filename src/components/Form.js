import "./form.css";
import { createElement } from "../utils/elements";

export const createForm = (props) => {
  const kittyLabel = createElement("label", {
    className: "kittyLabel",
  });

  kittyLabel.setAttribute("for", "kittyCheck");

  const kittyCheckbox = createElement("input", {
    className: "kittyCheckbox",
    id: "kittyCheck",
    type: "checkbox",
  });
  const kittyBox = createElement("div", {
    className: "kittyBox",
    children: [kittyCheckbox, kittyLabel],
  });
  const searchButton = createElement("button", {
    type: "submit",
    className: "searchButton",
    innerText: "🤖",
    required: "true",
  });

  const input = createElement("input", {
    className: "input",
    placeholder: "ENTER YOUR LOCATION",
    type: "text",
    required: "true",
  });

  const form = createElement("form", {
    className: "form",
    children: [kittyBox, input, searchButton],
    ...props,
  });
  return form;
};
