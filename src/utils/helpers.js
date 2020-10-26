import { createElement } from "./elements";
// import loadingGif from "../assets/loading-robot.gif";

export function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

const loadingImg = createElement("div", {
  className: "lds-ripple",
  children: [createElement("div"), createElement("div")],
});
const loadingText = createElement("marquee", {
  className: "loadingText",
  innerHTML:
    "Please wait, till a <b>Robo</b> fetches your <b>WeatherData</b>...&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...&nbsp;&nbsp;&nbsp;&nbsp;...&nbsp;&nbsp;",
});

const loadingContainer = createElement("div", {
  className: "loadingContainer animated  tdDropInLeft",
});

export function addRemoveLoading(loading) {
  let output = document.querySelector(".outputContainer");

  if (loading) {
    loadingContainer.append(loadingText, loadingImg);
    removeAllChildNodes(output);
    output.append(loadingContainer);
  }
}

export function generateRandomSeed(length) {
  let randomSeed = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    randomSeed += characters.charAt(
      Math.floor(Math.random() * charactersLength)
    );
  }
  return randomSeed;
}

export function getBase64Image(img) {
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);

  const dataURL = canvas.toDataURL("image/png");

  return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

export function setNewProfilePicture() {
  let randomSeed = generateRandomSeed(5);
  let imgSrc = `https://robohash.org/you-${randomSeed}.svg?set=set5`;
  localStorage.setItem("imgSrc", imgSrc);
  console.log("SET to localstorage");
  return imgSrc;
}
