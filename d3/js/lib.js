            // объект Градиент
            function Gradient(spec) {
                let instance = {};
                let id, defs, x1, y1, x2, y2;
                let gradient;
                let type = 'linearGradient';
                let stops = [];

                // присваивание значений при создании
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

                // присваиваем или получаем Id
                instance.id = (i) => {
                    if (_.isEmpty(i)) {
                        return id.toString();
                    }
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
                instance.gradient = (g) => {
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

                return instance;
            }
            
            // объект Маска
            function Mask(spec) {
                let instance = {};
                let id, defs;
                let mask;
                let figures = [];

                // присваивание значений при создании
                if (_.isEmpty(spec.id)) {
                    id = 'id_m_' + Date.now();
                } else {
                    id = spec.id;
                }

                if (!_.isEmpty(spec.defs)) {
                    defs = spec.defs;
                }

                // присваиваем или получаем Id
                instance.id = (i) => {
                    if (_.isEmpty(i)) {
                        return id.toString();
                    }
                    id = i;
                    return instance;
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

                // присваиваем и получаем градиент
                instance.mask = (m) => {
                    if (!arguments.length) return mask;
                    mask = m;
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

                    let r = parent.append('rect')
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
            let Line = (d) => {
                let l = d3.line()
                    .x(function(d) {
                        return d.x;
                    })
                    .y(function(d) {
                        return d.y;
                    });
                return l(d);
            };

            // объект - область
            let Area = (d, h, m) => {
                let a = d3.area()
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

                let opacity, fill, fillopacity, mask, stroke, strokeopacity, strokewidth;

                let strokedasharray, strokelinecap, strokelinejoin; //--

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

                    let path = parent.append('path')
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
                let fill, stroke;
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

                    let dots = parent.selectAll('.' + cls)
                        .data(data)
                        .enter()
                        .append(type)
                        .attr('class', cls)
                        .attr('r', r)
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

                    return instance;
                }

                return instance;
            };