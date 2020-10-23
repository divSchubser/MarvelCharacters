import "./form.css";
import { createElement } from "../utils/elements";

export const createForm = (props) => {
  // const kittyLabel = createElement("label", {
  //   className: "kittyLabel",
  //   name: "kitty",
  //   innertText: "Kitty",
  // });

  const kittyCheckbox = createElement("input", {
    className: "kittyButton",
    type: "checkbox",
  });
  const kittyBox = createElement("button", {
    className: "kittyBox",
    children: [kittyCheckbox],
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
