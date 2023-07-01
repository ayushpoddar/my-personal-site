import * as config from "./config.js";
import * as params from "@params";
import * as PIXI from "pixi";
// import { gsap } from "gsap";

let app;

async function init() {
  app = config.loadApp({ id: params.id });
  initialiseTable();
}

function initialiseTable() {
  const tableData = [
    ["Balance", "Expiration Date"],
    ["5", ""],
    ["3", "July 2, 2023"],
    ["10", "July 3, 2023"],
    ["5", "July 6, 2023"],
  ];

  const startX = 50; // Starting position of the table
  const startY = 50;
  const cellWidth = 70;
  const cellHeight = 20;

  tableData.forEach((row, rowIndex) => {
    row.forEach((cell, columnIndex) => {
      const cellText = new PIXI.Text(cell, { fontSize: 16 });
      let offsetX = cellWidth - cellText.width;
      offsetX = Math.max(0, offsetX / 2);
      cellText.x = startX + cellWidth * columnIndex + offsetX;
      cellText.y = startY + cellHeight * rowIndex;
      app.stage.addChild(cellText);
    });
  });
}

init();
