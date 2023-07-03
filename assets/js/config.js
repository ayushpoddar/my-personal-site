// function that takes a function and returns a function
const memoize = (func) => {
  const results = {};
  return (...args) => {
    const argsKey = JSON.stringify(args);
    if (!results[argsKey]) {
      results[argsKey] = func(...args);
    }
    return results[argsKey];
  };
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
  memoizer: memoize,
  assetPath: assetPath,
};

export default config;
