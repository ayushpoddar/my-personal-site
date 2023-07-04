import helpers from "./helpers.js";
import * as params from "@params";

const id = params.id;
const element = document.getElementById(id);
const canvasWidth = helpers.setCanvasWidth(400);
const initialCoinX = canvasWidth + 30;
const cellBgColor = 0x4a55a2;
const cellTextColor = 0xf7f1e5;

let hiddenCells, coin, finalCoinX;
let runAnimation = true;
let app = helpers.loadApp({ element: element, width: canvasWidth });

async function init() {
  const coinTexture = await PIXI.Assets.load(helpers.assetPath("coins.png"));
  coin = createCoin(coinTexture);

  const tableContainer = initialiseTable();
  hiddenCells = tableContainer.children.slice(-2);

  finalCoinX = tableContainer.x + tableContainer.width / 2;
}

function startAnimation() {
  setInterval(() => {
    if (runAnimation) {
      moveCoin();
      runAnimation = false;
    }
  }, 500);
}

function moveCoin() {
  gsap.fromTo(
    coin,
    { x: initialCoinX },
    {
      x: finalCoinX,
      delay: 0.5,
      duration: 2.5,
      onComplete: displayHiddenCells,
    }
  );
}

function displayHiddenCells() {
  hiddenCells.forEach((cell) => {
    gsap.fromTo(
      cell,
      { alpha: 0 },
      {
        alpha: 1,
        duration: 0.3,
        delay: 0.1,
        onComplete: reset,
      }
    );
  });
}

function reset() {
  hiddenCells.forEach((cell) => {
    gsap.to(cell, {
      alpha: 0,
      duration: 0.3,
      delay: 2.5,
      onComplete: () => {
        runAnimation = true;
      },
    });
  });
}

function createCoin(texture) {
  const coins = PIXI.Sprite.from(texture);
  coins.anchor.set(0.5);
  coins.x = initialCoinX;
  coins.y = app.screen.height / 2;
  app.stage.addChildAt(coins, 0);
  return coins;
}

function initialiseTable() {
  const container = new PIXI.Container();
  appendTableData(container);
  container.x = (app.screen.width - container.width * 1.5) / 2;
  container.y = (app.screen.height - container.height) / 2;
  addTitle(container);
  app.stage.addChild(container);
  return container;
}

function addTitle(container) {
  const text = new PIXI.Text("Pepper Potts", {
    fontSize: 16,
    fill: cellBgColor,
    fontWeight: "300",
  });
  text.anchor.set(0.5);
  text.x = container.width / 2;
  text.y = -text.height;
  container.addChildAt(text, 0);
}

function appendTableData(container) {
  const tableData = [
    ["Balance", "Expiration Date"],
    ["5", "null"],
    ["3", "July 2, 2023"],
    ["10", "July 3, 2023"],
    ["5", "July 6, 2023"],
    ["5", "July 7, 2023"],
  ];

  const cellWidth1 = 60;
  const cellWidth2 = 110;
  const cellHeight = 20;

  tableData.forEach((row, rowIndex) => {
    let textStyle,
      hidden = false;
    if (rowIndex === 0) {
      textStyle = { fontSize: 14, fontWeight: "300" };
    } else {
      textStyle = { fontSize: 12, fontWeigh: "200" };
    }
    if (rowIndex == tableData.length - 1) {
      hidden = true;
    }
    row.forEach((cell, columnIndex) => {
      const cellContainer = createTableCell(
        columnIndex == 0 ? cellWidth1 : cellWidth2,
        cellHeight,
        cell,
        textStyle,
        hidden
      );
      cellContainer.x = columnIndex == 0 ? 0 : cellWidth1;
      cellContainer.y = cellHeight * rowIndex;
      cellContainer.calculateBounds();
      container.addChild(cellContainer);
    });
  });
  container.calculateBounds();
}

function createTableCell(cellWidth, cellHeight, text, textStyle, hidden) {
  const container = new PIXI.Container();
  container.height = cellHeight;
  container.width = cellWidth;

  const textGraphics = new PIXI.Text(text, textStyle);
  textGraphics.anchor.set(0.5);
  textGraphics.x = cellWidth / 2;
  textGraphics.y = cellHeight / 2;
  textGraphics.style.fill = cellTextColor;

  const cellBgSprite = createCellBgTexture(cellWidth, cellHeight);
  const cellBg = new PIXI.Sprite(cellBgSprite);

  container.calculateBounds();
  container.addChild(cellBg);
  container.addChild(textGraphics);
  if (hidden) {
    container.alpha = 0;
  }
  return container;
}

const createCellBgTexture = helpers.memoizer((width, height) => {
  const border = new PIXI.Graphics();
  border.beginFill(cellBgColor, 1);
  border.drawRect(0, 0, width, height);
  border.endFill();

  return app.renderer.generateTexture(border);
});

init().then((_) => {
  helpers.startAnimationOnView(element, startAnimation);
});
