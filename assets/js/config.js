const loadApp = function ({
  id,
  width = config.canvasWidth,
  height = config.canvasHeight,
} = {}) {
  const app = new PIXI.Application({
    width: width,
    height: height,
    backgroundAlpha: 0,
  });
  globalThis.__PIXI_APP__ = app;
  document.getElementById(id).appendChild(app.view);
  return app;
};


function assetPath(assetName) {
  if (window.location.host.includes("localhost:3000")) {
    return `../../static/images/${assetName}`;
  }
  return `/images/${assetName}`;
}

const config = {
  canvasWidth: 300,
  canvasHeight: 200,
  loadApp: loadApp,
  assetPath: assetPath,
};

export default config;
