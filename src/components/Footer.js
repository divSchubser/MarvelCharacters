import "./footer.css";
import { createElement } from "../utils/elements";
import { generateRandomSeed } from "../utils/helpers";

export const createFooter = (onclickProps) => {
  const humanCheckbox = createElement("input", {
    className: "humanCheckbox",
    type: "checkbox",
    id: "humanCheck",
  });

  let footerSrc = localStorage.getItem("FooterSrc") || "";

  if (footerSrc === "") {
    let randomSeed = generateRandomSeed(5);
    footerSrc = `https://robohash.org/you-${randomSeed}.svg?set=set5`;
    localStorage.setItem("FooterSrc", footerSrc);
    console.log("SET to localstorage");
  } else {
    let dataSrc = localStorage.getItem("FooterSrc");
    footerSrc = dataSrc;
    console.log("GET from localstorage");
  }

  const footerImg = createElement("img", {
    className: "footer__img",
    src: footerSrc,
  });
  const humanLabel = createElement("label", {
    className: "humanLabel",
    children: [footerImg],
  });
  humanLabel.setAttribute("for", "humanCheck");

  const humanShoutOut = createElement("div", {
    className: "humanShoutOut",
    innerText: "   …  Humans 4tw 👾",
  });
  const human = createElement("div", {
    className: "human",
    children: [humanCheckbox, humanLabel],
  });
  const humanContainer = createElement("div", {
    className: "humanContainer",
    children: [human, humanShoutOut],
  });

  const credits = createElement("div", {
    className: "credits",
    innerHTML:
      "made with 🚀 by Team <a href='https://github.com/divSchubser/'>divSchubser</a> ",
  });

  const placeholder = createElement("div", {
    className: "placeholder",
  });

  const footer = createElement("footer", {
    className: "footer",
    children: [placeholder, humanContainer, credits],
    ...onclickProps,
  });

  return footer;
};
