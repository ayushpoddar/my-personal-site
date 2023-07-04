const windowWidth = window.innerWidth || document.documentElement.clientWidth;
const canvasWidth = Math.min(windowWidth, 300);
const canvasHeight = 200;

export default {
  windowWidth,
  canvasWidth,
  canvasHeight,
};
