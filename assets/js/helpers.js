import config from "./config.js";

const isInViewPort = (element) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) * 0.9 &&
    rect.right <= config.windowWidth
  );
};

const isDevMode = () => {
  return window.location.host.includes("localhost:3000");
};

// TODO: This function can be more efficient:
// - DRY the code
// - Every animation element is registering its own scroll
// - event. Can we do all these under one scroll event listener?
const startAnimationOnView = (element, callback) => {
  if (element.dataset.animationStarted == "true") return;
  if (isInViewPort(element)) {
    element.dataset.animationStarted = "true";
    callback();
    return;
  }
  window.addEventListener("scroll", () => {
    if (element.dataset.animationStarted == "true") return;
    if (isInViewPort(element)) {
      element.dataset.animationStarted = "true";
      callback();
    }
  });
};

const loadApp = ({
  element,
  width = config.canvasWidth,
  height = config.canvasHeight,
} = {}) => {
  const app = new PIXI.Application({
    width: width,
    height: height,
    backgroundAlpha: 0,
  });
  globalThis.__PIXI_APP__ = app;
  element.appendChild(app.view);
  return app;
};

function assetPath(assetName) {
  if (isDevMode()) {
    return `../../static/images/${assetName}`;
  }
  return `/images/${assetName}`;
}

// function that takes a function and returns a function
const memoizer = (func) => {
  const results = {};
  return (...args) => {
    const argsKey = JSON.stringify(args);
    if (!results[argsKey]) {
      results[argsKey] = func(...args);
    }
    return results[argsKey];
  };
};

const setCanvasWidth = (desiredWidth) => {
  return Math.min(config.windowWidth, desiredWidth);
};

const midX = (app) => {
  return app.screen.width / 2;
};

const midY = (app) => {
  return app.screen.height / 2;
};

export default {
  isDevMode,
  startAnimationOnView,
  loadApp,
  assetPath,
  memoizer,
  setCanvasWidth,
  midX,
  midY,
};
