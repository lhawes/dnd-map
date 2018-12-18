const obNoContext = function (ctx, boxL, x, y) {
  x = x * boxL;
  y = y * boxL;

  ctx.fillStyle ='rgb(200, 200, 200, 1)';
  ctx.fillRect(x, y, boxL, boxL);
  ctx.fillRect(x - 10, y - 10, boxL, boxL);

  ctx.fillStyle ='rgb(100, 100, 100, 1)';
  ctx.beginPath();
  ctx.moveTo(x + boxL, y + boxL);
  ctx.lineTo(x + boxL - 10, y + boxL - 10);
  ctx.lineTo(x - 10, y + boxL - 10);
  ctx.lineTo(x , y + boxL);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle ='rgb(50, 50, 50, 1)';
  ctx.beginPath();
  ctx.moveTo(x + boxL, y + boxL);
  ctx.lineTo(x + boxL - 10, y + boxL - 10);
  ctx.lineTo(x + boxL - 10, y - 10);
  ctx.lineTo(x + boxL, y);

  ctx.closePath();
  ctx.fill();
}

const map = [
  {x:1 , y:1 },
  {x:4 , y:3 },
  {x:4 , y:2 },
  {x:7 , y:0 },
  {x:8 , y:0 },
  {x:7 , y:2 },
  {x:8 , y:2 },
  {x:7 , y:3 },
  {x:8 , y:3 },
  {x:10 , y:2 },
];

const sortMap = function(map) {
  return map.sort((ob1,ob2) => {
    if (ob1.x > ob2.x) {
        return 1;
    } else if (ob1.x < ob2.x) { 
        return -1;
    }

    // Else go to the 2nd item
    if (ob1.y < ob2.y) { 
        return -1;
    } else if (ob1.y > ob2.y) {
        return 1
    } else { // nothing to split them
        return 0;
    }
  })
}

function draw() {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  
  const width = "425";
  const height = "400";
  const boxL = 25;
  
  const ob = function (x, y) {
    return obNoContext(ctx, boxL, x, y);
  }
  
  
  // transform to isometric
  ctx.transform(1, 0, 0, .5, 0, 0);
  ctx.rotate(45*Math.PI/180)
 
  //build grid
  for (var i = 0; i < height/boxL; i++) {
    for (var j = 0; j < width/boxL; j++) {
      ctx.strokeRect(j * boxL, (i - height/(boxL*2)) * boxL, boxL, boxL)  
      
    }
  }

  
  ob(1, 1);
  
  sortMap(map).forEach((tile) => {
    ob(tile.x, tile.y);
  })


  
}

draw();
