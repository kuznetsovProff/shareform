 rawData = [{
                    x: 0,
                    y: 0
                }, {
                    x: 10,
                    y: 67
                }, {
                    x: 20,
                    y: 74
                }, {
                    x: 30,
                    y: 63
                }, {
                    x: 40,
                    y: 56
                }, {
                    x: 50,
                    y: 24
                }, {
                    x: 60,
                    y: 26
                }, {
                    x: 70,
                    y: 19
                }, {
                    x: 80,
                    y: 42
                }, {
                    x: 90,
                    y: 88
                }, {
                    x: 100,
                    y: 70
                }],
                linedots = [];
            /*
                        let svg = d3.select("body").append("svg")
                            .attr("class", "axis")
                            .attr("viewBox", "0 0 " + width + " " + height)
                            .attr("width", width)
                            .attr("height", height);

                        win.onresize = () => {
                            svg.attr("width", win.innerWidth);
                            svg.attr("height", win.innerHeight);
                        };
            */
            // длина оси X= ширина контейнера svg - отступ слева и справа
            let xAxisLength = width - 2 * margin;

            // длина оси Y = высота контейнера svg - отступ сверху и снизу
            let yAxisLength = height - 2 * margin;

            function oldVersion() {

                // функция интерполяции значений на ось Х  
                let scaleXAxisFromData = (data) => {
                    return d3.scaleLinear()
                        .domain([1, data.length + 1])
                        .range([0, xAxisLength]);
                };

                let scaleX = [];
                datas.forEach((data) => {
                    scaleX.push(scaleXAxisFromData(data));
                });

                var scaleXline = d3.scaleLinear()
                    .domain([0, 100])
                    .range([0, xAxisLength]);

                // функция интерполяции значений на ось Y
                let scaleY = d3.scaleLinear()
                    .domain([100, 0])
                    .range([0, yAxisLength]);

                // масштабирование реальных данных в данные для нашей координатной системы

                for (i = 0; i < rawData.length; i++)
                    linedots.push({
                        x: scaleXline(rawData[i].x) + margin,
                        y: scaleY(rawData[i].y) + margin
                    });
                /*
                            rawData.forEach((r) => {
                                linedots.push({
                                    x: scaleXline(r.x) + margin,
                                    y: scaleY(r.i) + margin
                                });
                            });*/
                let defs = svg.append("defs");

                function createBackgroundGradient(mainColor, gradientColor) {

                    let whiteGradient = defs.append("linearGradient")
                        .attr("id", "whiteGradient")
                        .attr("x1", "0%")
                        .attr("y1", "0%")
                        .attr("x2", "0%")
                        .attr("y2", "100%");

                    whiteGradient.append("stop")
                        .attr("offset", "0")
                        .attr("stop-color", gradientColor)
                        .attr("stop-opacity", "0.25");

                    whiteGradient.append("stop")
                        .attr("offset", "1")
                        .attr("stop-color", gradientColor)
                        .attr("stop-opacity", "1");

                    let gradientMask = defs.append("mask")
                        .attr("id", "gradientMask");

                    let rectMask = gradientMask.append("rect")
                        .attr("x", "0")
                        .attr("y", "0")
                        .attr("width", width)
                        .attr("height", height)
                        .attr("fill", "url(#whiteGradient)");

                    svg.append("rect")
                        .attr("x", "0")
                        .attr("y", "0")
                        .attr("width", width)
                        .attr("height", height)
                        .attr("fill", mainColor)
                        .attr("mask", "url(#gradientMask)");
                }

                createBackgroundGradient(colors[8], "white"); // "#061639"

                function createGradient(data) {
                    let Gradient = defs.append("linearGradient")
                        .attr("id", data.id)
                        .attr("x1", data.x1)
                        .attr("x2", data.x2)
                        .attr("y1", data.y1)
                        .attr("y2", data.y2);

                    d3.select('#' + data.id).selectAll("stop").data(data.stops).enter().append("stop");
                    d3.select('#' + data.id).selectAll('stop').data(data.stops).attr("offset", function(d) {
                        return d['offset'];
                    });
                    d3.select('#' + data.id).selectAll('stop').data(data.stops).attr("stop-color", function(d) {
                        return d['stop-color'];
                    });
                    d3.select('#' + data.id).selectAll('stop').data(data.stops).attr("stop-opacity", function(d) {
                        return d['stop-opacity'];
                    });
                    d3.select('#' + data.id).selectAll('stop').data(data.stops).exit().remove();

                    return Gradient;
                }

                gradients.forEach((gradient) => {
                    createGradient(gradient);
                });

                function createLayer(index, data, fill, stroke, scaleX, scaleY) {
                    let m = defs.append("mask")
                        .attr("id", "Mask" + index);

                    // создаем объект g для прямоугольников
                    let g = m.append("g")
                        .attr("class", "body")
                        .attr("transform", // сдвиг объекта вправо
                            "translate(" + margin + ", 0 )");
                    // связываем данные с прямоугольниками

                    g.selectAll("rect.bar")
                        .data(data)
                        .enter()
                        .append("rect")
                        .attr("class", "bar")
                        .attr("fill", fill)
                        .attr("stroke", stroke);

                    // устанавливаем параметры прямоугольников
                    g.selectAll("rect.bar")
                        .data(data)
                        .attr("x", function(d) {
                            return scaleX(d.x);
                        })
                        .attr("y", function(d) {
                            return scaleY(d.y) + margin;
                        })
                        .attr("height", function(d) {
                            return yAxisLength - scaleY(d.y);
                        })
                        .attr("width", function(d) {

                            return Math.floor(xAxisLength / data.length) - padding;
                        });

                    let r = svg.append("rect")
                        .attr("id", "Rect" + index)
                        .attr("x", "0")
                        .attr("y", "0")
                        .attr("width", width)
                        .attr("height", height)
                        //.attr("fill", "url(#Gradient" + index + ")")
                        .attr("fill", "url(#Gradient" + index + ")")
                        .attr("mask", "url(#Mask" + index + ")");

                }

                datas.forEach((d, i) => {
                    createLayer(i, datas[datas.length - i - 1], "#fff", "#fff", scaleX[scaleX.length - i - 1], scaleY);
                });

                // функция, создающая по массиву точек линии
                var line = d3.line()
                    .x(function(d) {
                        return d.x;
                    })
                    .y(function(d) {
                        return d.y;
                    });
                // добавляем путь
                svg.append("g").append("path")
                    .attr("d", line(linedots))
                    .style("stroke", "steelblue")
                    .style("stroke-width", 2);

                // функция, создающая область
                var area = d3.area()
                    .x(function(d) {
                        return d.x;
                    })
                    .y0(height - margin)
                    .y1(function(d) {
                        return d.y;
                    });

                var g = svg.append("g");
                g.append("path")
                    .attr("d", area(linedots))
                    .style("fill", 'url(#Gradient3)'); //"lightblue");
                g.append("path")
                    .attr("d", line(linedots))
                    .style("stroke", 'url(#Gradient3)') //"steelblue")
                    .style("stroke-width", 2);

                // добавляем отметки к точкам
                svg.selectAll(".dot")
                    .data(rawData)
                    .enter().append("circle")
                    .attr("class", "dot")
                    .attr("r", 3.5)
                    .attr("cx", function(d) {
                        return scaleXline(d.x) + margin;
                    })
                    .attr("cy", function(d) {
                        return scaleY(d.y) + margin;
                    });

            }

            //oldVersion();