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
  width = config.canvasWidth,
  height = config.canvasHeight,
} = {}) => {
  const app = new PIXI.Application({
    width: width,
    height: height,
    backgroundAlpha: 0,
    resolution: window.devicePixelRatio,
  });
  globalThis.__PIXI_APP__ = app;
  return app;
};

function appendApp(element, app) {
  const loadingEle = element.querySelector(".loader");
  console.log(loadingEle);
  gsap.to(loadingEle, {
    alpha: 0,
    duration: 1,
    onComplete: () => {
      loadingEle.classList.add("hidden");
      element.appendChild(app.view);
      animateApp(app.view);
    },
  });

  function animateApp(appCanvas) {
    gsap.fromTo(
      appCanvas,
      {
        alpha: 0,
      },
      {
        alpha: 1,
        duration: 0.3,
      }
    );
  }
}

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

const midX = (app = null) => {
  if (app) return app.screen.width / 2;
  return config.canvasWidth / 2;
};

const midY = (app = null) => {
  if (app) return app.screen.height / 2;
  return config.canvasHeight / 2;
};

function createGsapTimeline({
  delay = 2,
  reverseTimeScale = 4,
  initialTimeScale = 1,
  repeatDelay = 4,
} = {}) {
  const tl = gsap.timeline({
    repeat: isDevMode() ? 2 : -1,
    yoyo: true,
    repeatDelay: repeatDelay,
    onRepeat: toggleTimeScale,
  });

  function toggleTimeScale() {
    tl.timeScale(
      tl.timeScale() == reverseTimeScale ? initialTimeScale : reverseTimeScale
    );
  }
  return tl.delay(delay).timeScale(initialTimeScale);
}

function resizeSprite(sprite, { width, height }) {
  const aspectRatio = sprite.width / sprite.height;
  if (width) {
    sprite.width = width;
    sprite.height = width / aspectRatio;
  } else {
    sprite.height = height;
    sprite.width = height * aspectRatio;
  }
}

export default {
  isDevMode,
  startAnimationOnView,
  loadApp,
  assetPath,
  memoizer,
  setCanvasWidth,
  midX,
  midY,
  createGsapTimeline,
  resizeSprite,
  appendApp,
};
