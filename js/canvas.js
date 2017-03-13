var c = document.querySelector('.c') /* the canvas element */,

    ctx = c.getContext('2d') /* canvas context */,

    t = 0 /* time variable */,

    round = Math.round,
    min = Math.min, max= Math.max,
    PI = Math.PI,
    sin = Math.sin, cos = Math.cos /* just me being lazy */;


/* FUNCTIONS */
var trimUnit = function(input_str, unit) {
  return parseInt(input_str.split(unit)[0], 10);
};

var canvasSize = function() {
  var s /* canvas style set via CSS */ ;

  setTimeout(function() {
    s = getComputedStyle(c);
    c.width = trimUnit(s.width, 'px');
    c.height = trimUnit(s.height, 'px');
  }, 0);
};

var bubbly = function() {
  var t_step = PI/36 /* time step, an advance of 5 degrees */,

      m = 10 /* number of rows */,
      n = 10 /* number of colums */,

      u = c.width/(m + 10),
      v = c.height/(n + 10),
      max_unit = max(u, v),

      r, alpha, /* radius & phase describing movement*/

      x, y,
      hue, grad;

  if(u/max_unit < 0.75 || v/max_unit < 0.75) {
    u = v = max_unit;
    m = round(c.width/max_unit) - 1;
    n = round(c.height/max_unit) - 1;
  }

  r = min(u, v)/1.6;

  ctx.clearRect(0, 0, c.width, c.height);

  for(var i = 0; i < m; i ++) {

    for(var j = 0; j < n; j++) {
      alpha = (i/m + j/n)*2*PI + t;

      x = round((i + 1)*u + r*cos(alpha));
      y = round((j + 1)*v + r*sin(alpha));

      ctx.beginPath();
      ctx.arc(x, y, round(r/1), 0, 2*PI);

      hue = 180*(1 + sin((i + j)/(m + n) + t/5)*2*PI);
      grad = ctx.createRadialGradient(x, y, round(r/5), x, y, r);
      grad.addColorStop(0.5, 'hsla(' + hue + ', 85%, 80%, .99)');
      grad.addColorStop(1, 'hsla(' + hue + ', 48%, 59%, .01)');

      ctx.fillStyle = grad;
      ctx.fill();
    }
  }


  t += t_step;

  requestAnimationFrame(bubbly);
};


/* STEPS */
canvasSize();
bubbly();

/* fix looks on resize */
addEventListener('resize', canvasSize, false);
