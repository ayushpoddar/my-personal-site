import config from "./config.js";
import helpers from "./helpers.js";
import * as params from "@params";

let id;
if (helpers.isDevMode()) {
  id = config.testCanvasId;
} else {
  id = params.id;
}
const initialAliceBalance = 10;
const initialBobBalance = 0;
const numTransfers = 4;
const element = document.getElementById(id);

let aliceBalance = initialAliceBalance;
let bobBalance = initialBobBalance;
let alice, aliceBalanceText, bob, bobBalanceText, coin;

let app = helpers.loadApp({ element: element });

async function init() {
  const bobTexture = await PIXI.Assets.load(helpers.assetPath("alice.png"));
  const aliceTexture = await PIXI.Assets.load(helpers.assetPath("bob.png"));
  const coinTexture = await PIXI.Assets.load(helpers.assetPath("token.png"));
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

  coin = createCoin(coinTexture);
  app.stage.addChildAt(coin, 0);
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

function createCoin(texture) {
  const coinSprite = PIXI.Sprite.from(texture);
  coinSprite.anchor.set(0.5);
  coinSprite.x = alice.x;
  coinSprite.y = alice.y;
  coinSprite.width = config.canvasWidth / 10;
  coinSprite.height = coinSprite.width;

  return coinSprite;
}

function updateBalanceText(person) {
  if (person === "alice") {
    aliceBalanceText.text = `Balance: ${aliceBalance}`;
  } else {
    bobBalanceText.text = `Balance: ${bobBalance}`;
  }
}

function transferCoins() {
  const tl = helpers.createGsapTimeline({ reverseTimeScale: 6 });
  for (let i = 1; i <= numTransfers; i++) {
    tl.fromTo(
      coin,
      {
        x: alice.x,
        y: alice.y,
      },
      {
        x: bob.x,
        y: bob.y,
        duration: 1.25,
        onComplete: () => {
          aliceBalance--;
          bobBalance++;
          updateBalanceText("alice");
          updateBalanceText("bob");
        },
        onReverseComplete: () => {
          aliceBalance++;
          bobBalance--;
          updateBalanceText("alice");
          updateBalanceText("bob");
        },
      },
      "+=0.25"
    );
  }
  tl.play();
}

init().then(() => {
  helpers.startAnimationOnView(element, transferCoins);
});
