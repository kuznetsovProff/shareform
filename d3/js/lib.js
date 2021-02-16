const win = window;

//
// custom curves
//
function Step(context, t) {
  this._context = context;
  this._t = t;
}

Step.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = this._y = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (0 < this._t && this._t < 1 && this._point === 2) this._context.lineTo(this._x, this._y);
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    if (this._line >= 0) this._t = 1 - this._t, this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0:
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
        break;
      case 1:
        this._point = 2; // proceed
      default:
        {
          var xN, yN, mYb, mYa;
          if (this._t <= 0) {
            xN = Math.abs(x - this._x) * 0.25;
            yN = Math.abs(y - this._y) * 0.25;
            mYb = (this._y < y) ? this._y + yN : this._y - yN;
            mYa = (this._y > y) ? y + yN : y - yN;

            this._context.quadraticCurveTo(this._x, this._y, this._x, mYb);
            this._context.lineTo(this._x, mYa);
            this._context.quadraticCurveTo(this._x, y, this._x + xN, y);
            this._context.lineTo(x - xN, y);

          } else {
            var x1 = this._x * (1 - this._t) + x * this._t;

            xN = Math.abs(x - x1) * 0.25;
            yN = Math.abs(y - this._y) * 0.25;
            mYb = (this._y < y) ? this._y + yN : this._y - yN;
            mYa = (this._y > y) ? y + yN : y - yN;

            this._context.quadraticCurveTo(x1, this._y, x1, mYb);
            this._context.lineTo(x1, mYa);
            this._context.quadraticCurveTo(x1, y, x1 + xN, y);
            this._context.lineTo(x - xN, y);
          }
          break;
        }
    }
    this._x = x, this._y = y;
  }
};

stepRound = function(context) {
  return new Step(context, 0.5);
};

stepRoundBefore = function(context) {
  return new Step(context, 0);
};

stepRoundAfter = function(context) {
  return new Step(context, 1);
};

// 
function Natural(context) {
  this._context = context;
}

Natural.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = [];
    this._y = [];
  },
  lineEnd: function() {
    var x = this._x,
        y = this._y,
        n = x.length;

    if (n) {
      this._line ? this._context.lineTo(x[0], y[0]) : this._context.moveTo(x[0], y[0]);
      if (n === 2) {
        this._context.lineTo(x[1], y[1]);
      } else {
        var px = controlPoints(x),
            py = controlPoints(y);
        for (var i0 = 0, i1 = 1; i1 < n; ++i0, ++i1) {
          this._context.bezierCurveTo(px[0][i0], py[0][i0], px[1][i0], py[1][i0], x[i1], y[i1]);
        }
      }
    }

    if (this._line || (this._line !== 0 && n === 1)) this._context.closePath();
    this._line = 1 - this._line;
    this._x = this._y = null;
  },
  point: function(x, y) {
    this._x.push(+x);
    this._y.push(+y);
  }
};

// See https://www.particleincell.com/2012/bezier-splines/ for derivation.
function controlPoints(x) {
    var i,
        n = x.length - 1,
        m,
        a = new Array(n),
        b = new Array(n),
        r = new Array(n);
    a[0] = 0;
    b[0] = 2;
    r[0] = x[0] + 2 * x[1];

    for (i = 1; i < n - 1; ++i) {
        a[i] = 1; 
        b[i] = 4; 
        r[i] = 4 * x[i] + 2 * x[i + 1];
    }
    a[n - 1] = 2, b[n - 1] = 7, r[n - 1] = 8 * x[n - 1] + x[n];

    for (i = 1; i < n; ++i) m = a[i] / b[i - 1], b[i] -= m, r[i] -= m * r[i - 1];
    a[n - 1] = r[n - 1] / b[n - 1];

    for (i = n - 2; i >= 0; --i) a[i] = (r[i] - a[i + 1]) / b[i];
    b[n - 1] = (x[n] + a[n - 1]) / 2;

    for (i = 0; i < n - 1; ++i) b[i] = 2 * x[i + 1] - a[i + 1];
    return [a, b];
}

function curveNaturalCustom(context) {
  return new Natural(context);
}
//
function Linear(context,t) {
  this._context = context;
  this._t = t;
}

Linear.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._t) {
        case 0:
            break;
        case 1:
            x=x+Math.sqrt(x);
            break;
        case 2:
            x=x-Math.sqrt(x);
            break;
    }

    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; // proceed
      default: this._context.lineTo(x, y); break;
    }
  }
};

function curveLinearCustom(context) {
  return new Linear(context,0);
}

// объект Градиент
function Gradient(spec) {
    let instance = {};
    let id, defs, x1, y1, x2, y2;
    let gradient;
    let type = 'linearGradient';
    let stops = [];

    // присваивание значений при создании
    if (_.isEmpty(spec)) {
        id = 'id_g_' + Date.now();
        x1 = '0%';
        y1 = '0%';
        x2 = '0%';
        y2 = '100%';
    } else {

        if (_.isEmpty(spec.id)) {
            id = 'id_g_' + Date.now();
        } else {
            id = spec.id;
        }

        if (!_.isEmpty(spec.type)) {
            type = spec.type;
        }

        if (_.isEmpty(spec.x1)) {
            x1 = '0%';
        } else {
            x1 = spec.x1;
        }

        if (_.isEmpty(spec.y1)) {
            y1 = '0%';
        } else {
            y1 = spec.y1;
        }

        if (_.isEmpty(spec.x2)) {
            x2 = '0%';
        } else {
            x2 = spec.x2;
        }

        if (_.isEmpty(spec.y2)) {
            y2 = '100%';
        } else {
            y2 = spec.y2;
        }

        if (!_.isEmpty(spec.defs)) {
            defs = spec.defs;
        }
    }

    // присваиваем или получаем Id
    instance.id = (i) => {
        if (_.isEmpty(i)) {
            return id.toString();
        }
        d3.select('#' + id).attr('id', i);
        id = i;
        return instance;
    };

    instance.append = (d) => {

        if (!_.isEmpty(d)) {
            defs = d;
        }

        gradient = defs.append(type)
            .attr('id', id)
            .attr('x1', x1)
            .attr('y1', y1)
            .attr('x2', x2)
            .attr('y2', y2);

        return instance;
    };

    // присваиваем и получаем градиент
    // подумать над заменой на d3
    instance.gradient = (g) => {
        if (!arguments.length) return gradient;
        gradient = g;
        return instance;
    };

    instance.d3 = (g) => {
        if (!arguments.length) return gradient;
        gradient = g;
        return instance;
    };

    instance.stop = (offset, color, opacity) => {
        gradient.append('stop')
            .attr('offset', offset)
            .attr('stop-color', color)
            .attr('stop-opacity', opacity);

        return instance;
    };

    // строка для fill или stroke
    instance.url = () => {
        return 'url(#' + id + ')';
    }

    return instance;
}

// объект Маска
function Mask(spec) {
    let instance = {};
    let id, defs;
    let mask;
    let figures = [];

    if (_.isEmpty(spec)) {
        id = 'id_m_' + Date.now();;
    } else {
        // присваивание значений при создании
        if (_.isEmpty(spec.id)) {
            id = 'id_m_' + Date.now();
        } else {
            id = spec.id;
        }

        if (!_.isEmpty(spec.defs)) {
            defs = spec.defs;
        }
    }
    // присваиваем или получаем Id
    instance.id = (i) => {
        if (_.isEmpty(i)) {
            return id.toString();
        }
        id = i;
        return instance;
    };

    // присваиваем и получаем маску
    // подумать над заменой на d3
    instance.mask = (m) => {
        if (!arguments.length) return mask;
        mask = m;
        return instance;
    };

    instance.d3 = (m) => {
        if (!arguments.length) return mask;
        mask = m;
        return instance;
    };

    instance.url = () => {
        return 'url(#' + id + ')';
    };

    // добавляем маску в defs
    instance.append = (d) => {

        if (!_.isEmpty(d)) {
            defs = d;
        }

        mask = defs.append('mask')
            .attr('id', id);

        return instance;
    };

    instance.rect = (x, y, w, h, f) => {
        let r = mask.append('rect')
            .attr('x', x)
            .attr('y', y)
            .attr('width', w)
            .attr('height', h)
            .attr('fill', f);

        figures.push(r);

        return instance;
    };

    return instance;
}

// прямоугольник
let Rect = (spec) => {
    let instance = {};
    let id, x, y, width, height, fill, mask;
    let rect;
    let parent;

    if (_.isEmpty(spec.id)) {
        id = 'id_r_' + Date.now();
    } else {
        id = spec.id;
    }

    if (_.isEmpty(spec.x)) {
        x = '0';
    } else {
        x = spec.x;
    }

    if (_.isEmpty(spec.y)) {
        y = '0';
    } else {
        y = spec.x;
    }

    if (_.isEmpty(spec.width)) {
        width = win.innerWidth;
    } else {
        width = spec.width;
    }

    if (_.isEmpty(spec.height)) {
        height = win.innerHeight;
    } else {
        height = spec.height;
    }

    if (_.isEmpty(spec.fill)) {
        fill = 'white';
    } else {
        fill = spec.fill;
    }

    if (_.isEmpty(spec.mask)) {
        mask = 'white';
    } else {
        mask = spec.mask;
    }

    if (!_.isEmpty(spec.parent)) {
        parent = spec.parent;
    }

    // присваиваем или получаем Id
    instance.id = (i) => {
        if (_.isEmpty(i)) {
            return id.toString();
        }
        id = i;
        return instance;
    };

    // присваиваем и получаем прямоугольник
    // подумать над заменой на d3
    instance.rect = (r) => {
        if (!arguments.length) return rect;
        rect = r;
        return instance;
    };

    instance.d3 = (r) => {
        if (!arguments.length) return rect;
        rect = r;
        return instance;
    };

    // присваиваем или получаем parent
    instance.parent = (p) => {
        if (_.isEmpty(p)) {
            return parent;
        }
        parent = p;
        return instance;
    };

    instance.append = (p) => {

        if (!_.isEmpty(p)) {
            parent = p;
        }

        // добавить проверку на наличие объекта в rect
        rect = parent.append('rect')
            .attr('id', id)
            .attr('x', x)
            .attr('y', y)
            .attr('width', width)
            .attr('height', height)
            .attr('fill', fill)
            .attr('mask', mask);

        return instance;
    }

    return instance;
};


let AxisLength = (a, m) => {
    // a - axis width or height
    // m - margin
    return a - 2 * m;
};
let AxisScale = (l, d) => {
    // l - axis length
    // d - domain array
    // реализовать обратное направление
    return d3.scaleLinear()
        .domain(d)
        .range([0, l]);
};

// вспомогательные функции для отрисовки точек, линий и областей
let LineDots = (r, x, y, m) => {
    // r - rawData
    // x - scaleX
    // y - scaleY
    // m - margin
    let dots = [];
    for (i = 0; i < r.length; i++)
        dots.push({
            x: x(r[i].x) + m,
            y: y(r[i].y) + m
        });
    return dots;
};

// объект - линия
// переделать в полноценный объект
/*
d3.curveBasis(context)
d3.curveBasisClosed(context)
d3.curveBasisOpen(context)
d3.curveBundle(context)
    bundle.beta(range 0..1)
d3.curveCardinal(context)
d3.curveCardinalClosed(context)
d3.curveCardinalOpen(context)
    cardinal.tension(range 0..1)
d3.curveCatmullRom(context)
d3.curveCatmullRomClosed(context)
d3.curveCatmullRomOpen(context)
    catmullrom.alpha(range 0..1)
d3.curveLinear(context)
d3.curveLinearClosed(context)
d3.curveLinearOpen(context)
d3.curveMonotoneX(context)
d3.curveMonotoneY(context)
d3.curveNatural(context)
d3.curveStep(context)
d3.curveStepAfter(context)
d3.curveStepBefore(context)
*/
let Line = (d) => {
    let l = d3.line()
        .curve(curveLinearCustom)
        .x(function(d) {
            return d.x;
        })
        .y(function(d) {
            return d.y;
        });
    return l(d);
};

// объект - область
// переделать в полноценный объект
let Area = (d, h=0, m=0) => {
    let a = d3.area()
        .curve(d3.curveLinear)
        .x(function(d) {
            return d.x;
        })
        .y0(h - m)
        .y1(function(d) {
            return d.y;
        });
    return a(d);
};

// объект - путь
let Path = (spec) => {
    let instance = {};
    let id, d, pathLength, cls;

    let path;

    let opacity, fill, fillopacity, mask, stroke, strokeopacity, strokewidth;

    let strokedasharray, strokelinecap, strokelinejoin;

    let parent;

    if (_.isEmpty(spec)) {
        id = 'id_p_' + Date.now();
        fill = 'none';
        mask = 'white';
    } else {

        if (_.isEmpty(spec.id)) {
            id = 'id_p_' + Date.now();
        } else {
            id = spec.id;
        }

        if (!_.isEmpty(spec.d)) d = spec.d;

        if (!_.isEmpty(spec.pathLength)) pathLength = spec.pathLength;

        if (!_.isEmpty(spec.cls)) cls = spec.cls;

        if (!_.isEmpty(spec.opacity)) opacity = spec.opacity;

        if (_.isEmpty(spec.fill)) {
            fill = 'none';
        } else {
            fill = spec.fill;
        }

        if (!_.isEmpty(spec.fillopacity)) fillopacity = spec.fillopacity;

        if (_.isEmpty(spec.mask)) {
            mask = 'white';
        } else {
            mask = spec.mask;
        }

        if (!_.isEmpty(spec.stroke)) stroke = spec.stroke;

        if (!_.isEmpty(spec.strokeopacity)) strokeopacity = spec.strokeopacity;

        if (!_.isEmpty(spec.strokewidth)) strokewidth = spec.strokewidth;

        if (!_.isEmpty(spec.strokedasharray)) strokedasharray = spec.strokedasharray;

        if (!_.isEmpty(spec.strokelinecap)) strokelinecap = spec.strokelinecap;

        if (!_.isEmpty(spec.strokelinejoin)) strokelinejoin = spec.strokelinejoin;

        if (!_.isEmpty(spec.parent)) parent = spec.parent;
    }
    // присваиваем или получаем Id
    instance.id = (i) => {
        if (_.isEmpty(i)) {
            return id.toString();
        }
        id = i;
        return instance;
    };

    // присваиваем или получаем d
    instance.d = (v) => {
        if (_.isEmpty(v)) {
            return d;
        }
        d = v;
        return instance;
    };

    // присваиваем или получаем pathLength
    instance.pathLength = (p) => {
        if (_.isEmpty(p)) {
            return pathLength;
        }
        pathLength = p;
        return instance;
    };

    // присваиваем или получаем cls
    instance.cls = (c) => {
        if (_.isEmpty(c)) {
            return cls;
        }
        cls = c;
        return instance;
    };

    // присваиваем или получаем opacity
    instance.opacity = (o) => {
        if (_.isEmpty(o)) {
            return opacity;
        }
        opacity = o;
        return instance;
    };

    // присваиваем или получаем fill
    instance.fill = (f) => {
        if (_.isEmpty(f)) {
            return fill;
        }
        fill = f;
        return instance;
    };

    // присваиваем или получаем fillopacity
    instance.fillopacity = (f) => {
        if (_.isEmpty(f)) {
            return fillopacity;
        }
        fillopacity = f;
        return instance;
    };

    // присваиваем или получаем stroke
    instance.stroke = (s) => {
        if (_.isEmpty(s)) {
            return stroke;
        }
        stroke = s;
        return instance;
    };

    // присваиваем или получаем strokewidth
    instance.strokewidth = (s) => {
        if (typeof(s) == 'number') {
            s = s.toString();
        }
        if (_.isEmpty(s)) {
            return strokewidth;
        }
        strokewidth = s;
        return instance;
    };

    // присваиваем или получаем strokeopacity
    instance.strokeopacity = (s) => {
        if (_.isEmpty(s)) {
            return strokeopacity;
        }
        strokeopacity = s;
        return instance;
    };

    // присваиваем или получаем strokedasharray
    instance.strokedasharray = (s) => {
        if (_.isEmpty(s)) {
            return strokedasharray;
        }
        strokedasharray = s;
        return instance;
    };

    // присваиваем или получаем strokelinecap
    instance.strokelinecap = (s) => {
        if (_.isEmpty(s)) {
            return strokelinecap;
        }
        strokelinecap = s;
        return instance;
    };

    // присваиваем или получаем strokelinejoin
    instance.strokelinejoin = (s) => {
        if (_.isEmpty(s)) {
            return strokelinejoin;
        }
        strokelinejoin = s;
        return instance;
    };

    // присваиваем и получаем путь
    // подумать над заменой на d3
    instance.path = (p) => {
        if (!arguments.length) return path;
        path = p;
        return instance;
    };

    instance.d3 = (p) => {
        if (!arguments.length) return path;
        path = p;
        return instance;
    };

    // присваиваем или получаем parent
    instance.parent = (p) => {
        if (_.isEmpty(p)) {
            return parent;
        }
        parent = p;
        return instance;
    };

    instance.append = (p) => {

        if (!_.isEmpty(p)) {
            parent = p;
        }

        // добавить проверку на существование объекта в path

        path = parent.append('path')
            .attr('id', id)
            .attr('d', d);

        if (!_.isEmpty(pathLength)) {
            path.style('path-length', pathLength);
        }

        if (!_.isEmpty(cls)) {
            path.attr('class', cls);
        }

        if (!_.isEmpty(opacity)) {
            path.style('opacity', opacity);
        }

        if (!_.isEmpty(fill)) {
            path.style('fill', fill);
        }

        if (!_.isEmpty(fillopacity)) {
            path.style('fill-opacity', fillopacity);
        }

        if (!_.isEmpty(mask)) {
            path.attr('mask', mask);
        }

        if (!_.isEmpty(stroke)) {
            path.style('stroke', stroke);
        }

        if (!_.isEmpty(strokeopacity)) {
            path.style('stroke-opacity', strokeopacity);
        }

        if (!_.isEmpty(strokewidth)) {
            path.style('stroke-width', strokewidth);
        }

        if (!_.isEmpty(strokedasharray)) {
            path.style('stroke-dasharray', strokedasharray);
        }

        if (!_.isEmpty(strokelinecap)) {
            path.style('stroke-linecap', strokelinecap);
        }

        if (!_.isEmpty(strokelinejoin)) {
            path.style('stroke-linejoin', strokelinejoin);
        }

        return instance;
    }
    return instance;
};

// объект - точки
let Dots = (spec) => {
    let instance = {};
    let data, type, cls, r, scalex, scaley, margin;
    let dots;
    let fill, stroke, strokewidth;
    let parent;

    if (_.isEmpty(spec)) {
        type = 'circle';
        cls = 'dot';
        r = '3.5';
        margin = 0;
    } else {
        if (!_.isEmpty(spec.data)) data = spec.data;
        if (_.isEmpty(spec.type)) {
            type = 'circle';
        } else {
            type = spec.type;
        }
        if (_.isEmpty(spec.cls)) {
            cls = 'dot';
        } else {
            cls = spec.cls;
        }
        if (_.isEmpty(spec.r)) {
            r = '3.5';
        } else {
            r = spec.r;
        }
        if (!_.isEmpty(spec.scaleX)) scalex = spec.scaleX;
        if (!_.isEmpty(spec.scaleY)) scalex = spec.scaleY;
        if (!_.isEmpty(spec.margin)) margin = spec.margin;
        if (!_.isEmpty(spec.fill)) fill = spec.fill;
        if (!_.isEmpty(spec.stroke)) stroke = spec.stroke;
        if (!_.isEmpty(spec.strokewidth)) strokewidth = spec.strokewidth;
        if (!_.isEmpty(spec.parent)) parent = spec.parent;
    }

    instance.data = (d) => {
        if (_.isEmpty(d)) {
            return data;
        }
        data = d;
        return instance;
    };

    instance.type = (t) => {
        if (_.isEmpty(t)) {
            return type;
        }
        type = t;
        return instance;
    };

    instance.cls = (c) => {
        if (_.isEmpty(c)) {
            return cls;
        }
        cls = c;
        return instance;
    };

    instance.r = (v) => {
        if (typeof(v) == 'number') {
            v = v.toString();
        }
        if (_.isEmpty(v)) {
            return r;
        }
        r = v;
        return instance;
    };

    instance.scaleX = (x) => {
        if (_.isEmpty(x)) {
            return scalex;
        }
        scalex = x;
        return instance;
    };

    instance.scaleY = (y) => {
        if (_.isEmpty(y)) {
            return scaley;
        }
        scaley = y;
        return instance;
    };

    instance.margin = (m) => {
        if (_.isEmpty(m)) {
            return margin;
        }
        margin = m;
        return instance;
    };

    instance.fill = (f) => {
        if (_.isEmpty(f)) {
            return fill;
        }
        fill = f;
        return instance;
    };

    instance.stroke = (s) => {
        if (_.isEmpty(s)) {
            return stroke;
        }
        stroke = s;
        return instance;
    };
    instance.strokewidth = (s) => {
        if (typeof(s) == 'number') {
            s = s.toString();
        }
        if (_.isEmpty(s)) {
            return strokewidth;
        }
        strokewidth = s;
        return instance;
    };

    // присваиваем и получаем точки
    // подумать над заменой на d3
    instance.dots = (d) => {
        if (!arguments.length) return dots;
        dots = d;
        return instance;
    };

    instance.d3 = (d) => {
        if (!arguments.length) return dots;
        dots = d;
        return instance;
    };

    instance.parent = (p) => {
        if (_.isEmpty(p)) {
            return parent;
        }
        parent = p;
        return instance;
    };

    instance.append = (p) => {

        if (!_.isEmpty(p)) {
            parent = p;
        }

        // добавить проверку на существование объекта в dots
        dots = parent.selectAll('.' + cls)
            .data(data)
            .enter()
            .append(type)
            .attr('class', cls)
            .attr('r', function(d) {
                let _r = r;
                let ratio = win.innerHeight/100;
                if (typeof(d.r) == 'number') {
                   
                    let n = d.r * ratio;
                    _r = n.toString();
                } 
                if (!_.isEmpty(d.r)) {
                    _r=d.r*ratio;
                };
                return _r;
            })
            .attr('cx', function(d) {
                return scalex(d.x) + margin;
            })
            .attr('cy', function(d) {
                return scaley(d.y) + margin;
            });

        if (!_.isEmpty(fill)) {
            dots.style('fill', fill);
        }
        if (!_.isEmpty(stroke)) {
            dots.style('stroke', stroke);
        }
        if (!_.isEmpty(strokewidth)) {
            dots.style('stroke-width', strokewidth);
        }

        return instance;
    }

    return instance;
};

let Layer = (spec) => {
    let instance = {};
    let id, g;
    let data, width, height, margin, fill, stroke;
    let parent;

    if (_.isEmpty(spec)) {
        id = 'id_l_' + Date.now();
        width = win.innerWidth;
        height = win.innerHeight;
        margin = 0;
        fill = 'white';
        stroke = 'white';
    } else {
        if (_.isEmpty(spec.id)) {
            id = 'id_l_' + Date.now();
        } else {
            id = spec.id;
        }
        if (!_.isEmpty(spec.g)) g = spec.g;
        if (!_.isEmpty(spec.data)) data = spec.data;
        if (_.isEmpty(spec.width)) {
            width = win.innerWidth;
        } else {
            width = spec.width;
        }
        if (_.isEmpty(spec.height)) {
            height = win.innerheight;
        } else {
            height = spec.height;
        }
        if (_.isEmpty(spec.margin)) {
            margin = '0';
        } else {
            margin = spec.margin;
        }
        if (_.isEmpty(spec.fill)) {
            fill = 'white';
        } else {
            fill = spec.fill;
        }
        if (_.isEmpty(spec.stroke)) {
            stroke = 'white';
        } else {
            stroke = spec.stroke;
        }

        if (!_.isEmpty(spec.parent)) parent = spec.parent;
    }
    // присваиваем или получаем Id
    instance.id = (i) => {
        if (_.isEmpty(i)) {
            return id.toString();
        }
        id = i;
        return instance;
    };

    // присваиваем или получаем g
    instance.g = (v) => {
        if (_.isEmpty(v)) {
            return g;
        }
        g = v;
        return instance;
    };

    // присваиваем или получаем data
    instance.data = (d) => {
        if (_.isEmpty(d)) {
            return data;
        }
        data = d;
        return instance;
    };

    // присваиваем или получаем width
    instance.width = (w) => {
        if (typeof(w) == 'number') {
            w = w.toString();
        }
        if (_.isEmpty(w)) {
            return width;
        }
        width = w;
        return instance;
    };

    // присваиваем или получаем height
    instance.height = (h) => {
        if (typeof(h) == 'number') {
            h = h.toString();
        }
        if (_.isEmpty(h)) {
            return height;
        }
        height = h;
        return instance;
    };

    // присваиваем или получаем margin
    instance.margin = (m) => {
        if (_.isEmpty(m) && m != 0) {
            return margin;
        }
        margin = m;
        return instance;
    };

    // присваиваем или получаем parent
    instance.parent = (p) => {
        if (_.isEmpty(p)) {
            return parent;
        }
        parent = p;
        return instance;
    };

    // присваиваем или получаем fill
    instance.fill = (f) => {
        if (_.isEmpty(f)) {
            return fill;
        }
        fill = f;
        return instance;
    };

    // присваиваем или получаем stroke
    instance.stroke = (s) => {
        if (_.isEmpty(s)) {
            return stroke;
        }
        stroke = s;
        return instance;
    };

    instance.append = (p) => {

        if (!_.isEmpty(p)) {
            parent = p;
        }

        g = parent.append('g')
        g.attr('id', id);
        g.attr("transform", // сдвиг слоя вправо
            "translate(" + margin + ", 0 )");

        return instance;
    }

    instance.appendArea = (a) => {

        if (_.isEmpty(a)) {
            a = data;
        }

        let linedots = interpolate(a);
        let area = Path()
            .d(Area(linedots, height, margin))
            .fill(fill)
            .append(g);

        return instance;
    };

    instance.appendLine = (l) => {
        if (_.isEmpty(l)) {
            l = data;
        }
        let linedots = interpolate(l);
        let line = Path()
            .d(Line(linedots))
            .stroke(stroke)
            .strokewidth(2)
            .fill('none')
            .append(g);

        return instance;
    };

    instance.appendDots = (d) => {
        if (_.isEmpty(d)) {
            d = data;
        }

        let linedots = interpolate(d);
        let dots = Dots()
            .data(d)
            .cls('dot-2')
            .scaleX(scaleX)
            .scaleY(scaleY)
            .fill(fill)
            .stroke(stroke)
            .strokewidth(2)
            .append(g);

        return instance;
    };

    let interpolate = (data) => {
        // длина оси X= ширина слоя - отступ слева и справа
        xAxisLength = AxisLength(width, margin);
        // длина оси Y = высота слоя - отступ сверху и снизу
        yAxisLength = AxisLength(height, margin);
        // функция интерполяции значений на ось X
        scaleX = AxisScale(xAxisLength, [0, 100]);
        // функция интерполяции значений на ось Y
        scaleY = AxisScale(yAxisLength, [100, 0]);
        // расположение точек линии с учетом интерполяции
        return LineDots(data, scaleX, scaleY, margin);
    };

    return instance;
}