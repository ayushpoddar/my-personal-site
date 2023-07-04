const windowWidth = window.innerWidth || document.documentElement.clientWidth;
const canvasWidth = Math.min(windowWidth, 300);
const canvasHeight = 200;
const testCanvasId = "test";

export default {
  windowWidth,
  canvasWidth,
  canvasHeight,
  testCanvasId,
};
