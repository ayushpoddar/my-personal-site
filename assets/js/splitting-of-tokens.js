import config from "./config.js";
import helpers from "./helpers.js";
import * as params from "@params";

let id;
if (helpers.isDevMode()) {
  id = config.testCanvasId;
} else {
  id = params.id;
}
const element = document.getElementById(id);
const coinOffsetX = config.canvasWidth / 4;

let coin, coin1, coin2, coin3, table1, table2, tony;
let app = helpers.loadApp({ element: element });

async function init() {
  const coinTexture = await PIXI.Assets.load(helpers.assetPath("3-tokens.png"));
  const coin1Texture = await PIXI.Assets.load(
    helpers.assetPath("10-tokens.png")
  );
  const coin2Texture = await PIXI.Assets.load(
    helpers.assetPath("2-tokens.png")
  );
  const coin3Texture = await PIXI.Assets.load(
    helpers.assetPath("8-tokens.png")
  );

  coin = createCoin(coinTexture);
  coin.x = coin.x - coinOffsetX;
  app.stage.addChild(coin);

  coin1 = createCoin(coin1Texture);
  coin1.x = coin1.x + coinOffsetX;
  app.stage.addChild(coin1);

  coin2 = createCoin(coin2Texture, 0);
  coin2.x = coin1.x;
  app.stage.addChild(coin2);

  coin3 = createCoin(coin3Texture, 0);
  coin3.x = coin1.x;
  app.stage.addChild(coin3);

  const table1Texture = await PIXI.Assets.load(
    helpers.assetPath("splitting-tokens/table1.png")
  );
  table1 = createTable(table1Texture);
  app.stage.addChild(table1);

  const table2Texture = await PIXI.Assets.load(
    helpers.assetPath("splitting-tokens/table2.png")
  );
  table2 = createTable(table2Texture, 0);
  app.stage.addChild(table2);

  const tonyTexture = await PIXI.Assets.load(helpers.assetPath("bob.png"));
  tony = createTony(tonyTexture);
  app.stage.addChild(tony);
}

function startAnimation() {
  const tl = helpers.createGsapTimeline({ delay: 0.7 });
  tl.addLabel("resetCoin1", ">")
    .addLabel("move", "<50%")
    .to(coin1, { alpha: 0, duration: 3 }, "move")
    .to(coin1.scale, { x: 1, duration: 3 }, "resetCoin1")
    .fromTo(
      coin2.scale,
      { x: 0.5, y: 0.5 },
      { x: 1, y: 1, duration: 3 },
      "move"
    )
    .to(coin2, { x: helpers.midX(), alpha: 1, duration: 3 }, "move")
    .to(coin3, { alpha: 1, duration: 3 }, "resetCoin1")
    .to(table1, { alpha: 0, duration: 3 }, "move")
    .to(table2, { alpha: 1, duration: 2.2 }, "move")
    .to(table2, { x: helpers.midX() - app.screen.width / 4, duration: 1 })
    .to(tony, { alpha: 1, duration: 1 }, "<")
    .to(coin, {
      x: tony.x - coin.width * 0.7,
      y: tony.y + coin.height,
      duration: 1,
    })
    .to(coin3, { x: tony.x, y: tony.y + coin3.height * 0.2, duration: 1 }, "<")
    .play();
}

function createTable(texture, alpha = 1) {
  const table = PIXI.Sprite.from(texture);
  table.anchor.set(0.5, 0);
  table.x = helpers.midX();
  table.y = helpers.midY() - app.screen.height / 12;
  table.alpha = alpha;
  return table;
}

function createTony(texture) {
  const tony = PIXI.Sprite.from(texture);
  tony.anchor.set(0.5, 0);
  tony.x = helpers.midX() + app.screen.width / 4;
  tony.y = helpers.midY();
  tony.width = tony.height = 60;
  tony.alpha = 0;
  return tony;
}

function createCoin(texture, alpha = 1) {
  const container = new PIXI.Container();
  const coin = PIXI.Sprite.from(texture);
  container.addChild(coin);

  container.x = helpers.midX();
  container.y = helpers.midY() - app.screen.height / 3.5;
  container.pivot.set(container.width / 2, container.height / 2);
  container.alpha = alpha;
  return container;
}

init().then((_) => {
  helpers.startAnimationOnView(element, startAnimation);
});
