import config from "./config.js";

const isInViewPort = (element) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) * 0.9 &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

const startAnimationOnView = (element, callback) => {
  window.addEventListener("scroll", () => {
    if (element.dataset.animationStarted == "true") return;
    if (isInViewPort(element)) {
      element.dataset.animationStarted = "true";
      callback();
    }
  });
};

export default {
  startAnimationOnView,
};
