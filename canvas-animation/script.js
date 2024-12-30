const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

let engine;
let items = [];
let lastMouseX = -1;
let lastMouseY = -1;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  engine = Engine.create();
  engine.world.gravity.y = 0;

  addBoudaries();

  for (let i = 0; i < 12; i++) {
    let x = random(100, width - 100);
    let y = random(100, height - 100);
    items.push(new Item(x, y, `./images/img${i + 1}.webp`));
  }
}

function addBoudaries() {
  const thickness = 50;
  console.log("addBoudaries running");

  World.add(engine.world, [
    Bodies.rectangle(width / 2, -thickness / 2, width, thickness, {
      isStatic: true,
    }),
    Bodies.rectangle(width / 2, height + thickness / 2, width, thickness, {
      isStatic: true,
    }),
    Bodies.rectangle(-thickness / 2, height / 2, thickness, height, {
      isStatic: true,
    }),
    Bodies.rectangle(width + thickness / 2, height / 2, thickness, width, {
      isStatic: true,
    }),
  ]);
}

function draw() {
  background("black");
  Engine.update(engine);
  items.forEach((item) => item.update());
}

class Item {
  constructor(x, y, imagePath) {
    let options = {
      frictionAir: 0.075,
      restitution: 0.25,
      density: 0.002,
      angle: Math.random() * Math.PI * 2, //đây
    };

    this.body = Bodies.rectangle(x, y, 100, 200, options);
    World.add(engine.world, this.body);

    this.div = document.createElement("div");
    this.div.className = "item";
    this.div.style.left = `${this.body.position.x - 50}px`;
    this.div.style.top = `${this.body.position.y - 100}px`;
    const img = document.createElement("img");
    img.src = imagePath;
    this.div.appendChild(img);
    document.body.appendChild(this.div);
  }
  update() {
    this.div.style.left = `${this.body.position.x - 50}px`;
    this.div.style.top = `${this.body.position.y - 100}px`;
    this.div.style.transform = `rotate(${this.body.angle}rad)`;
  }
}

function mouseMoved() {

  if (dist(mouseX, mouseY, lastMouseX, lastMouseY) > 10) {
    lastMouseX = mouseX;
    lastMouseY = mouseY;

    items.forEach((item) => {
      console.log(dist(mouseX, mouseY, item.body.position.x, item.body.position.y));
      
      if (
        dist(mouseX, mouseY, item.body.position.x, item.body.position.y) < 1500//đây
      ) {
        console.log(1);

        let forceMagnitude =3;
        Body.applyForce(
          item.body,
          {
            x: item.body.position.x,
            y: item.body.position.y,
          },
          {
            x: random(-forceMagnitude, forceMagnitude),
            y: random(-forceMagnitude, forceMagnitude),
          }
        );
      }
    });
  }
}
