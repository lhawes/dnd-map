function draw() {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  
  const width = "425";
  const height = "400";
  const boxL = 25;
  
  function ob (x, y) {
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
  ob(4, 2);
  ob(4, 4);
  ob(7, 0);
  ob(8, 0);
  ob(7, 2);
  ob(8, 2);
  ob(7, 3);
  ob(8, 3);
  ob(10, 2);

  
}

draw();
