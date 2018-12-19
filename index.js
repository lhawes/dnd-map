const boxMaker = function (config, x, y) {
  x = x * config.boxL;
  y = y * config.boxL;
  const ctx = config.ctx;
  const wallheight = config.wallHeight;
  const boxL = config.boxL;

  // top
  ctx.fillStyle ='rgb(200, 200, 200, 1)';
  ctx.fillRect(x, y, boxL, boxL);
  ctx.fillRect(x - wallheight, y - wallheight, boxL, boxL);

  // left wall
  ctx.fillStyle ='rgb(100, 100, 100, 1)';
  ctx.beginPath();
  ctx.moveTo(x + boxL, y + boxL);
  ctx.lineTo(x + boxL - wallheight, y + boxL - wallheight);
  ctx.lineTo(x - wallheight, y + boxL - wallheight);
  ctx.lineTo(x , y + boxL);
  ctx.closePath();
  ctx.fill();

  // right wall
  ctx.fillStyle ='rgb(50, 50, 50, 1)';
  ctx.beginPath();
  ctx.moveTo(x + boxL, y + boxL);
  ctx.lineTo(x + boxL - wallheight, y + boxL - wallheight);
  ctx.lineTo(x + boxL - wallheight, y - wallheight);
  ctx.lineTo(x + boxL, y);
  ctx.closePath();
  ctx.fill();
}

const map = [
  [{type: 'half'}, null, null, null, null, null, null, null, null, {type: 'full'}],
  [null, {type: 'half'}, null, null, null, null, null, null, null, null],
  [null, null, null, {type: 'half'}, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [{type: 'half'}, null, null, null, null, null, null, null, null, {type:'full'}],
]

function draw() {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  
  const width = "425";
  const height = "400";
  const boxL = 25;
  
  const halfBox = (x, y) => boxMaker({ wallHeight: 10, ctx: ctx, boxL: boxL}, x, y);
  const fullBox = (x, y) => boxMaker({ wallHeight: 20, ctx: ctx, boxL: boxL}, x, y);
  const flat = (x, y) => boxMaker({ wallHeight: 0, ctx: ctx, boxL: boxL}, x, y);
  
  
  // transform to isometric
  ctx.transform(1, 0, 0, .5, 0, 0);
  ctx.rotate(45*Math.PI/180)
 
  //build grid
  for (var y = 0; y < map.length; y++) {
    for (var x = 0; x < map[y].length; x++) {

      const tile = map[y][x];
      if (tile) {

          let fn;
          switch(tile.type) {
            case 'full':
              fn = fullBox;
              break;
            case 'half':
              fn = halfBox;
              break;
            default:
              fn = halfBox;
          }
          fn(x, y);
      } else {
        flat(x, y);
        ctx.strokeRect(x * boxL, y * boxL, boxL, boxL);
      }
    }
  }
  
}

draw();
