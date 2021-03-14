/*
 * Функции для работы с пересечениями окружностей
 */

let intersection = (a, b) => {
    let x0 = a.x,
        y0 = a.y,
        r0 = a.r;
    let x1 = b.x,
        y1 = b.y,
        r1 = b.r;
    let c, dx, dy, d, h, rx, ry;
    let x2, y2;

    /* dx and dy are the vertical and horizontal distances between
     * the circle centers.
     */
    dx = x1 - x0;
    dy = y1 - y0;

    /* Determine the straight-line distance between the centers. */
    d = Math.sqrt((dy * dy) + (dx * dx));

    /* Check for solvability. */
    if (d > (r0 + r1)) {
        /* no solution. circles do not intersect. */
        return false;
    }
    if (d < Math.abs(r0 - r1)) {
        /* no solution. one circle is contained in the other */
        return false; //return 'contained';
    }

    /* 'point 2' is the point where the line through the circle
     * intersection points crosses the line between the circle
     * centers.  
     */

    /* Determine the distance from point 0 to point 2. */
    c = ((r0 * r0) - (r1 * r1) + (d * d)) / (2.0 * d);

    /* Determine the coordinates of point 2. */
    x2 = x0 + (dx * c / d);
    y2 = y0 + (dy * c / d);

    /* Determine the distance from point 2 to either of the
     * intersection points.
     */
    h = Math.sqrt((r0 * r0) - (c * c));

    /* Now determine the offsets of the intersection points from
     * point 2.
     */
    rx = -dy * (h / d);
    ry = dx * (h / d);

    /* Determine the absolute intersection points. */
    var xi = x2 + rx;
    var xi_prime = x2 - rx;
    var yi = y2 + ry;
    var yi_prime = y2 - ry;

    return {
        cx0: xi,
        cy0: yi,
        cx1: xi_prime,
        cy1: yi_prime,
        circles: [
            a,
            b
        ]
    }

};

// Get Intersection Dots
let getIntersectionDots = (arr, _1stDot, _2ndDot) => {
    let intersect = intersection(_1stDot, _2ndDot);
    if (intersect) {
        let cross1 = {
            x: intersect.cx0,
            y: intersect.cy0,
            r: 3
        };
        if (!_.isNaN(cross1.x) && !_.isNaN(cross1.y)) arr.push(cross1);
        let cross2 = {
            x: intersect.cx1,
            y: intersect.cy1,
            r: 3
        };
        if (!_.isNaN(cross2.x) && !_.isNaN(cross2.y)) arr.push(cross2);
    }
};

// Get Intersection Dots with Circles
let getIntersection = (arr, _1stDot, _2ndDot) => {
    let intersect = intersection(_1stDot, _2ndDot);
    if (intersect) {
        let _1stCross = {
            x: intersect.cx0,
            y: intersect.cy0,
            r: 3
        };
        let _2ndCross = {
            x: intersect.cx1,
            y: intersect.cy1,
            r: 3
        };
        if (!_.isNaN(_1stCross.x) && !_.isNaN(_1stCross.y) && !_.isNaN(_2ndCross.x) && !_.isNaN(_2ndCross.y)) {
            arr.push({
                "dots": [_1stCross, _2ndCross],
                "circles": [intersect.circles[0], intersect.circles[1]]
            });
        };

    }
};

let findAllIntersectionDots = (arr) => {
    // arr - dots
    // arr2 - intersections dots
    let arr2 = [];
    let arrFind1 = [],
        arrFind2 = [],
        i = 0;
    arr.forEach((item) => {
        if (i == 0) {
            arrFind1.push(item);
        } else {
            arrFind1.push(item);
            arrFind2.push(item);
        }
        i = i + 1;
    });
    arrFind1.forEach((i1) => {
        arrFind2.forEach((i2) => {
            getIntersectionDots(arr2, i1, i2);
        });
    });

    return arr2;
};

let findAllIntersections = (arr) => {
    // arr - dots
    // arr2 - intersections - complex data
    let arr2 = [];
    let arrFind1 = [],
        arrFind2 = [],
        i = 0;
    arr.forEach((item) => {
        //if (i == 0) {
        //    arrFind1.push(item);
        //} else {
        arrFind1.push(item);
        arrFind2.push(item);
        //}
        i = i + 1;
    });
    arrFind1.forEach((i1) => {
        arrFind2.forEach((i2) => {
            getIntersection(arr2, i1, i2);
        });
    });

    return arr2;
};