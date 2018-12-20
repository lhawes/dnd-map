const boxMaker = function (config, xcor, ycor, wallheight) {
  const ctx = config.ctx;
  const boxL = config.boxL;

  // top
  ctx.fillStyle ='rgb(200, 200, 200, 1)';
  ctx.fillRect(xcor, ycor, boxL, boxL);
  ctx.fillRect(xcor - wallheight, ycor - wallheight, boxL, boxL);

  // left wall
  ctx.fillStyle ='rgb(100, 100, 100, 1)';
  ctx.beginPath();
  ctx.moveTo(xcor + boxL, ycor + boxL);
  ctx.lineTo(xcor + boxL - wallheight, ycor + boxL - wallheight);
  ctx.lineTo(xcor - wallheight, ycor + boxL - wallheight);
  ctx.lineTo(xcor , ycor + boxL);
  ctx.closePath();
  ctx.fill();

  // right wall
  ctx.fillStyle ='rgb(50, 50, 50, 1)';
  ctx.beginPath();
  ctx.moveTo(xcor + boxL, ycor + boxL);
  ctx.lineTo(xcor + boxL - wallheight, ycor + boxL - wallheight);
  ctx.lineTo(xcor + boxL - wallheight, ycor - wallheight);
  ctx.lineTo(xcor + boxL, ycor);
  ctx.closePath();
  ctx.fill();
}

function imageMaker(config, xcor, ycor, image) {
  // used to offset up + left
  const offset = 25;
  
  base_image = new Image();
  base_image.src = image;
  base_image.onload = function(){
    config.ctx.drawImage(base_image, xcor - offset, ycor - offset);
  }
}

function emptyMaker(config, xcor, ycor) {
  config.ctx.strokeRect(xcor, ycor, config.boxL, config.boxL);
}

const blankMap = [
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
]

const map = (function(){
  let newMap = blankMap.slice();
  
  newMap[0][0] = { type: 'half'};
  newMap[0][9] = { type: 'full'};
  newMap[4][0] = { type: 'half'};
  newMap[4][9] = { type: 'full'};
  newMap[1][1] = { type: 'half'};
  newMap[2][2] = { type: 'full'};
  newMap[2][8] = { type: 'img'};
  
  return newMap;
})();

// MAIN FUNC
function draw() {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  
  const width = "425";
  const height = "400";
  const gridDimensions = 25;
  
  const xcor = (n) => n * gridDimensions + globalXOffset;
  const ycor = (n) => n * gridDimensions + globalYOffset;
  
  const globalXOffset = 100;
  const globalYOffset = -77;
  
  const config = {ctx: ctx, boxL: gridDimensions}
  
  const halfBox = (x, y) => boxMaker(config, x, y, 10);
  const fullBox = (x, y) => boxMaker(config, x, y, 20);
  const flat = (x, y) => boxMaker(config, x, y, 0);
  const img = (x, y) => imageMaker(config, x, y, 'https://via.placeholder.com/50x50/0000FF/');
  const emptyGrid = (x, y) => emptyMaker(config, x, y);

  
  // transform to isometric
  ctx.transform(1, 0, 0, .5, 0, 0);
  ctx.rotate(45*Math.PI/180)
  
  
  //build grid
  for (var y = 0; y < map.length; y++) {
    for (var x = 0; x < map[y].length; x++) {

      const tile = map[y][x];
      if (tile) {
          emptyGrid(xcor(x), ycor(y));
          let fn;
          switch(tile.type) {
            case 'full':
              fn = fullBox;
              break;
            case 'half':
              fn = halfBox;
              break;
            case 'img':
              fn = img;
              break;
            default:
              fn = halfBox;
          }
          fn(xcor(x), ycor(y));
      } else if (tile === null) {
        flat(xcor(x), ycor(y));
        emptyGrid(xcor(x), ycor(y));
      } else {
        emptyGrid(xcor(x), ycor(y));
      }
    }
  }
  
}

draw();
