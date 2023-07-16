import config from "./config.js";
import helpers from "./helpers.js";
// import * as params from "@params";

let id;
if (helpers.isDevMode()) {
  id = config.testCanvasId;
} else {
  id = params.id;
}
const element = document.getElementById(id);
const canvasWidth = helpers.setCanvasWidth(400);
const canvasHeigth = 300;
let app = helpers.loadApp({
  element: element,
  width: canvasWidth,
  height: canvasHeigth,
});

async function init() {
  const bankTexture = await PIXI.Assets.load(helpers.assetPath("bank.png"));
  const tonyTexture = await PIXI.Assets.load(helpers.assetPath("bob.png"));
  const pepperTexture = await PIXI.Assets.load(helpers.assetPath("alice.png"));
  const rhodeyTexture = await PIXI.Assets.load(helpers.assetPath("rhodey.png"));
  const jokerTexture = await PIXI.Assets.load(helpers.assetPath("joker.png"));
  const peterTexture = await PIXI.Assets.load(helpers.assetPath("peter.png"));

  const bank = createObject(bankTexture, "Your app");
  bank.x = 10 + bank.width / 2;

  const tony = createObject(tonyTexture, "Tony");
  tony.y = 5 + tony.height / 2;

  const rhodey = createObject(rhodeyTexture, "Rhodey");
  rhodey.y = helpers.midY(app);

  const joker = createObject(jokerTexture, "Joker");
  joker.y = app.screen.height - (5 + joker.height / 2);

  tony.x = rhodey.x = joker.x = helpers.midX(app) + 20;
}

function createObject(
  texture,
  name,
  { x = helpers.midX(app), y = helpers.midY(app) } = {}
) {
  const container = new PIXI.Container();
  container.x = x;
  container.y = y;

  const sprite = PIXI.Sprite.from(texture);
  helpers.resizeSprite(sprite, { height: 60 });
  container.addChild(sprite);

  const text = new PIXI.Text(name, {
    fontFamily: "Arial",
    fontSize: 12,
    align: "center",
  });
  text.anchor.set(0.5);
  text.x = container.width / 2;
  text.y = sprite.height + 10;
  container.addChild(text);

  container.pivot.set(container.width / 2, container.height / 2);
  app.stage.addChild(container);
  return container;
}

function createBank(texture) {
  const container = new PIXI.Container();
  const sprite = PIXI.Sprite.from(texture);
  helpers.resizeSprite(sprite, { height: 60 });
  container.addChild(sprite);

  const text = new PIXI.Text("Your app", {
    fontFamily: "Arial",
    fontSize: 14,
    // fill: 0x4682b4,
    align: "center",
  });
  text.anchor.set(0.5);
  text.x = container.width / 2 + 5;
  text.y = sprite.height + 10;
  container.addChild(text);

  container.calculateBounds();

  container.pivot.set(container.width / 2, container.height / 2);
  // container.x = 10 + container.width / 2;
  container.y = helpers.midY(app);

  app.stage.addChild(container);
  return container;
}

init();
