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
const canvasWidth = helpers.setCanvasWidth(350);
const canvasHeigth = 300;
let app = helpers.loadApp({
  element: element,
  width: canvasWidth,
  height: canvasHeigth,
});

const noteWidth = 40;
const tableHeaderY = helpers.midY(app) - app.screen.height / 5;

let bank, tony, rhodey, joker, peter, pepper;
let tonyNote, jokerNote, rhodeyNote;
let tableHeader, tonyRow, rhodeyRow, jokerRow;
let jokerPepperRow, rhodeyPepperRow, jokerPepperPeterRow;

async function init() {
  const bankTexture = await PIXI.Assets.load(helpers.assetPath("bank.png"));
  const tonyTexture = await PIXI.Assets.load(helpers.assetPath("bob.png"));
  const pepperTexture = await PIXI.Assets.load(helpers.assetPath("alice.png"));
  const rhodeyTexture = await PIXI.Assets.load(helpers.assetPath("rhodey.png"));
  const jokerTexture = await PIXI.Assets.load(helpers.assetPath("joker.png"));
  const peterTexture = await PIXI.Assets.load(helpers.assetPath("peter.png"));
  const noteTexture = await PIXI.Assets.load(helpers.assetPath("note-2.png"));

  bank = createObject(bankTexture, "Your app");
  bank.x = 5 + bank.width / 2;

  tony = createObject(tonyTexture, "Tony");
  tony.y = 5 + tony.height / 2;

  rhodey = createObject(rhodeyTexture, "Rhodey");
  rhodey.y = helpers.midY(app);

  joker = createObject(jokerTexture, "Joker");
  joker.y = app.screen.height - (5 + joker.height / 2);

  tony.x = rhodey.x = joker.x = app.screen.width - tony.width / 2 - 5;

  pepper = createObject(pepperTexture, "Pepper");
  pepper.y = helpers.midY(app);
  pepper.x = app.screen.width + 60;

  peter = createObject(peterTexture, "Peter");
  peter.y = helpers.midY(app);
  peter.x = app.screen.width + 90;

  const tableHeaderTexture = await PIXI.Assets.load(
    helpers.assetPath("transferring-notes/table-header.png")
  );
  tableHeader = createTableRow(tableHeaderTexture, 0);
  tableHeader.alpha = 1;

  const tonyRowTexture = await PIXI.Assets.load(
    helpers.assetPath("transferring-notes/tony-row.png")
  );
  tonyRow = createTableRow(tonyRowTexture, 1);

  const rhodeyRowTexture = await PIXI.Assets.load(
    helpers.assetPath("transferring-notes/rhodey-row.png")
  );
  rhodeyRow = createTableRow(rhodeyRowTexture, 2);

  const jokerRowTexture = await PIXI.Assets.load(
    helpers.assetPath("transferring-notes/joker-row.png")
  );
  jokerRow = createTableRow(jokerRowTexture, 3);

  const jokerPepperRowTexture = await PIXI.Assets.load(
    helpers.assetPath("transferring-notes/joker-pepper-row.png")
  );
  jokerPepperRow = createTableRow(jokerPepperRowTexture, 3);

  const rhodeyPepperRowTexture = await PIXI.Assets.load(
    helpers.assetPath("transferring-notes/rhodey-pepper-row.png")
  );
  rhodeyPepperRow = createTableRow(rhodeyPepperRowTexture, 2);

  const jokerPepperPeterRowTexture = await PIXI.Assets.load(
    helpers.assetPath("transferring-notes/joker-pepper-peter-row.png")
  );
  jokerPepperPeterRow = createTableRow(jokerPepperPeterRowTexture, 3);

  tonyNote = createNote(noteTexture);
  jokerNote = createNote(noteTexture);
  rhodeyNote = createNote(noteTexture);
  tonyNote.x = jokerNote.x = rhodeyNote.x = bank.x;
  tonyNote.y = jokerNote.y = rhodeyNote.y = bank.y;
  app.stage.addChildAt(tonyNote, 0);
  app.stage.addChildAt(jokerNote, 0);
  app.stage.addChildAt(rhodeyNote, 0);
}

function runAnimation() {
  const tl = helpers.createGsapTimeline({ reverseTimeScale: 6 });
  tl.addLabel("stage1")
    .to(tonyNote, { x: tony.x, y: tony.y, duration: 2 }, "stage1")
    .to(tonyRow, { alpha: 1, duration: 1 }, "stage1+=30%")
    .fromTo(
      tonyRow,
      { x: tonyRow.x - 60 },
      { x: tonyRow.x, duration: 1 },
      "stage1+=15%"
    )
    .addLabel("stage2")
    .to(rhodeyNote, { x: rhodey.x, y: rhodey.y, duration: 2 }, "stage2")
    .to(rhodeyRow, { alpha: 1, duration: 1 }, "stage2+=30%")
    .fromTo(
      rhodeyRow,
      { x: rhodeyRow.x - 60 },
      { x: rhodeyRow.x, duration: 1 },
      "stage2+=15%"
    )
    .addLabel("stage3")
    .to(jokerNote, { x: joker.x, y: joker.y, duration: 2 }, "stage3")
    .to(jokerRow, { alpha: 1, duration: 1 }, "stage3+=30%")
    .fromTo(
      jokerRow,
      { x: jokerRow.x - 60 },
      { x: jokerRow.x, duration: 1 },
      "stage3+=15%"
    )
    .addLabel("stage4", "+=1")
    .to(bank, { x: -50 }, "stage4-=60%")
    .to(rhodey, { x: bank.x }, "stage4")
    .to(tony, { x: bank.x }, "stage4")
    .to(joker, { x: bank.x }, "stage4")
    .to(tonyNote, { x: bank.x }, "stage4")
    .to(jokerNote, { x: bank.x }, "stage4")
    .to(rhodeyNote, { x: bank.x }, "stage4")
    .to(pepper, { x: tony.x }, "stage4+=85%")
    .addLabel("stage5", "+=1")
    .to(rhodeyNote, { x: rhodey.x - 5, y: pepper.y, duration: 2 }, "stage5")
    .to(rhodeyRow, { alpha: 0, duration: 1 }, "stage5+=10%")
    .to(rhodeyPepperRow, { alpha: 1, duration: 1 }, "stage5+=40%")
    .addLabel("stage6")
    .to(jokerNote, { x: joker.x - 8, y: pepper.y + 15, duration: 2 }, "stage6")
    .to(jokerRow, { alpha: 0, duration: 1 }, "stage6+=10%")
    .to(jokerPepperRow, { alpha: 1, duration: 1 }, "stage6+=40%")
    .addLabel("stage7, +=1")
    .to(tony, { x: -60 }, "stage7-=60%")
    .to(tonyNote, { x: -60 }, "stage7-=60%")
    .to(joker, { x: -60 }, "stage7-=60%")
    .to(rhodey, { x: -60 }, "stage7-=60%")
    .to(pepper, { x: bank.x }, "stage7")
    .to(rhodeyNote, { x: bank.x - 15 }, "stage7")
    .to(jokerNote, { x: bank.x - 20 }, "stage7")
    .to(peter, { x: tony.x }, "stage7+=85%")
    .addLabel("stage8", "+=1")
    .to(jokerNote, { x: rhodey.x - 5, y: peter.y, duration: 2 }, "stage8")
    .to(jokerPepperRow, { alpha: 0, duration: 1 }, "stage8+=10%")
    .to(jokerPepperPeterRow, { alpha: 1, duration: 1 }, "stage8+=40%")
    .play();
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
  helpers.resizeSprite(sprite, { height: 50 });
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

function createNote(texture) {
  const note = PIXI.Sprite.from(texture);
  helpers.resizeSprite(note, { width: noteWidth });
  note.anchor.set(0.5);
  return note;
}

function createTableRow(texture, pos = 1) {
  const row = PIXI.Sprite.from(texture);
  row.anchor.set(0.5, 0);
  row.x = helpers.midX(app);
  if (pos === 0) {
    row.y = tableHeaderY;
  } else {
    row.y = tableHeaderY + tableHeader.height * pos;
  }
  row.alpha = 0;
  app.stage.addChild(row);
  return row;
}

init().then((_) => {
  helpers.startAnimationOnView(element, runAnimation);
});
