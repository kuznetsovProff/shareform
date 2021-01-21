
let colors = [
            '#f5f8fe',
            '#e2eafc',
            '#cfdcfa',
            '#bccff8',
            '#a8c1f6',
            '#95b3f4',
            '#82a5f2',
            '#6f97f0',
            '#5c89ee',
            '#487cec',
            '#356eea',
            '#2260e8',
            '#1755dd',
            '#154eca',
            '#1346b7',
            '#113fa3',
            '#0f3890',
            '#0d307d',
            '#0b296a',
            '#092157',
            '#071a43',
            '#051330',
            '#030b1d',
            '#01040a'
        ];

        let data = [{
                x: 1,
                y: 10
            }];
        let data2 = [{
            x: 1,
            y: 35
        }, {
            x: 2,
            y: 37
        }, {
            x: 3,
            y: 24
        }, {
            x: 4,
            y: 33
        }, {
            x: 5,
            y: 26
        }, {
            x: 6,
            y: 24
        }, {
            x: 7,
            y: 26
        }, {
            x: 8,
            y: 19
        }, {
            x: 9,
            y: 22
        }, {
            x: 10,
            y: 38
        }, {
            x: 11,
            y: 50
        }, {
            x: 12,
            y: 47
        }];

        let data3 = [{
            x: 1,
            y: 35
        }, {
            x: 2,
            y: 47
        }, {
            x: 3,
            y: 54
        }, {
            x: 4,
            y: 43
        }, {
            x: 5,
            y: 36
        }, {
            x: 6,
            y: 24
        }, {
            x: 7,
            y: 26
        }, {
            x: 8,
            y: 29
        }, {
            x: 9,
            y: 32
        }, {
            x: 10,
            y: 48
        }, {
            x: 11,
            y: 60
        }, {
            x: 12,
            y: 57
        }, {
            x: 13,
            y: 50
        }];

        let data4 = [{
            x: 1,
            y: 45
        }, {
            x: 2,
            y: 57
        }, {
            x: 3,
            y: 64
        }, {
            x: 4,
            y: 53
        }, {
            x: 5,
            y: 46
        }, {
            x: 6,
            y: 24
        }, {
            x: 7,
            y: 26
        }, {
            x: 8,
            y: 29
        }, {
            x: 9,
            y: 32
        }, {
            x: 10,
            y: 78
        }, {
            x: 11,
            y: 70
        }, {
            x: 12,
            y: 67
        }, {
            x: 13,
            y: 60
        }, {
            x: 14,
            y: 56
        }];

        let data5 = [{
            x: 1,
            y: 55
        }, {
            x: 2,
            y: 67
        }, {
            x: 3,
            y: 74
        }, {
            x: 4,
            y: 63
        }, {
            x: 5,
            y: 56
        }, {
            x: 6,
            y: 24
        }, {
            x: 7,
            y: 26
        }, {
            x: 8,
            y: 29
        }, {
            x: 9,
            y: 42
        }, {
            x: 10,
            y: 88
        }, {
            x: 11,
            y: 80
        }, {
            x: 12,
            y: 77
        }, {
            x: 13,
            y: 70
        }, {
            x: 14,
            y: 66
        }, {
            x: 15,
            y: 47
        }, {
            x: 16,
            y: 68
        }];
        
        let gradientData1 = {
            id: "Gradient1",
            x1: "0",
            x2: "0",
            y1: "0",
            y2: "1",
            stops: [{
                "offset": "0%",
                "stop-color": colors[colors.length - 18],
                "stop-opacity": "1"
            }, {
                "offset": "55%",
                "stop-color": colors[colors.length - 18],
                "stop-opacity": "1"
            }, {
                "offset": "100%",
                "stop-color": colors[colors.length - 4],
                "stop-opacity": "1"
            }]
        };
        let gradientData2 = {
            id: "Gradient2",
            x1: "0",
            x2: "0",
            y1: "0",
            y2: "1",
            stops: [{
                "offset": "0%",
                "stop-color": colors[colors.length - 14],
                "stop-opacity": "1"
            }, {
                "offset": "40%",
                "stop-color": colors[colors.length - 14],
                "stop-opacity": "1"
            }, {
                "offset": "100%",
                "stop-color": colors[colors.length - 18],
                "stop-opacity": "1"
            }]
        };
        let gradientData3 = {
            id: "Gradient3",
            x1: "0",
            x2: "0",
            y1: "0",
            y2: "1",
            stops: [{
                "offset": "0%",
                "stop-color": colors[colors.length - 10],
                "stop-opacity": "1"
            }, {
                "offset": "60%",
                "stop-color": colors[colors.length - 10],
                "stop-opacity": "1"
            }, {
                "offset": "100%",
                "stop-color": colors[colors.length - 14],
                "stop-opacity": "1"
            }]
        };
        let gradientData4 = {
            id: "Gradient4",
            x1: "0",
            x2: "0",
            y1: "0",
            y2: "1",
            stops: [{
                "offset": "0%",
                "stop-color": colors[colors.length - 6],
                "stop-opacity": "1"
            }, {
                "offset": "80%",
                "stop-color": colors[colors.length - 7],
                "stop-opacity": "1"
            }, {
                "offset": "100%",
                "stop-color": colors[colors.length - 8],
                "stop-opacity": "0.5"
            }]
        };
        let gradientData5 = {
            id: "Gradient5",
            x1: "0",
            x2: "0",
            y1: "0",
            y2: "1",
            stops: [{
                "offset": "0%",
                "stop-color": colors[colors.length - 2],
                "stop-opacity": "1"
            }, {
                "offset": "95%",
                "stop-color": colors[colors.length - 2],
                "stop-opacity": "1"
            }, {
                "offset": "100%",
                "stop-color": colors[colors.length - 3],
                "stop-opacity": "1"
            }]
        };
        