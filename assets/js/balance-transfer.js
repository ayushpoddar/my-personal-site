import * as config from "./config.js";
import * as params from "@params";

const initialAliceBalance = 10;
const initialBobBalance = 0;
const numTransfers = 5;
const id = params.id;

let aliceBalance = initialAliceBalance;
let bobBalance = initialBobBalance;
let app,
  alice,
  aliceBalanceText,
  bob,
  bobBalanceText,
  reloadButton,
  coin,
  overlay;

async function init() {
  app = config.loadApp({ id: id });
  const bobTexture = await PIXI.Assets.load(assetPath("alice.png"));
  const aliceTexture = await PIXI.Assets.load(assetPath("bob.png"));
  const coinTexture = await PIXI.Assets.load(assetPath("token.png"));
  const reloadTexture = await PIXI.Assets.load(assetPath("reload.png"));
  ({ container: alice, balanceText: aliceBalanceText } = setUpAliceBob(
    aliceTexture,
    50,
    aliceBalance,
    "Tony"
  ));
  ({ container: bob, balanceText: bobBalanceText } = setUpAliceBob(
    bobTexture,
    250,
    bobBalance,
    "Pepper"
  ));
  overlay = createOverlay();
  reloadButton = createReloadButton(reloadTexture);

  coin = createCoin(coinTexture);
  app.stage.addChildAt(coin, 0);

  transferCoins();
}

function setUpAliceBob(texture, xPos, balance, person) {
  const container = new PIXI.Container();
  container.x = xPos;
  container.y = app.screen.height / 2;
  app.stage.addChild(container);

  const sprite = PIXI.Sprite.from(texture);
  sprite.anchor.set(0.5);
  sprite.width = sprite.height = config.canvasWidth / 5;
  container.addChild(sprite);

  const balanceText = new PIXI.Text(`Balance: ${balance}`, {
    fontFamily: "Arial",
    fontSize: 16,
    fill: 0x4682b4,
    align: "center",
  });
  balanceText.anchor.set(0.5);
  balanceText.x = 0;
  balanceText.y = sprite.height + 3;
  container.addChild(balanceText);

  const name = new PIXI.Text(person, {
    fontFamily: "Arial",
    fontSize: 20,
    fill: 0x2f4f4f,
    align: "center",
  });
  name.anchor.set(0.5);
  name.x = 0;
  name.y = -sprite.height;
  container.addChild(name);

  return { container, balanceText };
}

function createReloadButton(texture) {
  const reloadSprite = PIXI.Sprite.from(texture);

  reloadSprite.anchor.set(0.5);
  reloadSprite.x = app.screen.width / 2;
  reloadSprite.y = app.screen.height / 2;
  reloadSprite.alpha = 0.8;
  reloadSprite.height = reloadSprite.width = config.canvasWidth / 8;

  app.stage.addChild(reloadSprite);

  reloadSprite.on("click", function () {
    aliceBalance = initialAliceBalance;
    updateBalanceText("alice");

    bobBalance = initialBobBalance;
    updateBalanceText("bob");

    overlay.visible = false;
    reloadButton.visible = false;
    transferCoins();
  });
  reloadSprite.visible = false;
  return reloadSprite;
}

function createOverlay() {
  const obj = new PIXI.Graphics();
  obj.beginFill(0x000000, 0.2);
  obj.drawRect(0, 0, config.canvasWidth, config.canvasHeight);
  obj.visible = false;

  app.stage.addChild(obj);
  return obj;
}

function createCoin(texture) {
  const coinSprite = PIXI.Sprite.from(texture);
  coinSprite.anchor.set(0.5);
  coinSprite.x = alice.x;
  coinSprite.y = alice.y;
  coinSprite.width = config.canvasWidth / 10;
  coinSprite.height = coinSprite.width;

  return coinSprite;
}

function displayReload() {
  setTimeout(function () {
    overlay.visible = true;
    reloadButton.visible = true;
    reloadButton.eventMode = "static";
    reloadButton.buttonMode = true;
  }, 400);
}

function updateBalanceText(person) {
  if (person === "alice") {
    aliceBalanceText.text = `Balance: ${aliceBalance}`;
  } else {
    bobBalanceText.text = `Balance: ${bobBalance}`;
  }
}

function transferCoins() {
  for (let i = 1; i <= numTransfers; i++) {
    gsap.fromTo(
      coin,
      {
        x: alice.x,
        y: alice.y,
      },
      {
        x: bob.x,
        y: bob.y,
        delay: i * 1.4,
        duration: 1.25,
        onComplete: function () {
          aliceBalance--;
          bobBalance++;
          updateBalanceText("alice");
          updateBalanceText("bob");
          if (i === numTransfers) displayReload();
        },
      }
    );
  }
}

function assetPath(assetName) {
  return `/images/${assetName}`;
}

init();
