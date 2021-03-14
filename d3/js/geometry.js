/*
 * Геометрия
 */

function getPositions(radius, angle) {
    //calculate positions
    let posX = radius * Math.cos(angle);
    let posY = radius * Math.sin(angle);
    return {
        x: posX,
        y: posY
    };
}

let getX = (c, r, a) => {
    // calculate x
    // r - radius
    // a - angle
    return c.x + r * Math.cos(a);
};

let getXFromCenter = (r, a) => {
    // calculate x
    // r - radius
    // a - angle
    return r * Math.cos(a);
};

let getY = (r, a) => {
    // calculate y
    // r - radius
    // a - angle
    return c.y + r * Math.sin(a);
};

let getYFromCenter = (r, a) => {
    // calculate y
    // r - radius
    // a - angle
    return r * Math.sin(a);
};

let getXY = (c, r, a) => {
    // calculate positions
    // r - radius
    // a - angle
    return {
        x: c.x + r * Math.cos(a),
        y: c.y + r * Math.sin(a)
    };
};

let getXYFromCenter = (r, a) => {
    // calculate positions
    // r - radius
    // a - angle
    return {
        x: r * Math.cos(a),
        y: r * Math.sin(a)
    };
};

let getChord = (r, a) => {
    // c - хорда
    // R - радиус
    // a - центральный угол
    // c = 2R*sin(a/2)
    return 2 * r * Math.sin(a / 2);
};

let getArc = (r, a) => {
    // L - длина дуги
    // R - радиус
    // a - центральный угол
    // L = r*a
    return r * a;
};

let getHeight = (r, a) => {
    // Высота сегмента
    // R - радиус
    // a - центральный угол
    // h = R(1-cos(a/2))
    return r * (1 - Math.cos(a / 2));
};

let getSegment = (r, a) => {
    //площадь сегмента
    //S = 1/2*(R*R)(a-sin(a))
    return 1 / 2 * (Math.pow(r)) * (a - Math.sin(a));
};

let getAngleByArc = (r, l) => {
    // угол по длине дуги
    return l / r;
};

let getAngleByChord = (r, c) => {
    // угол по длине хорды
    // a = 2 * arcsin(c/(2*R))
    return 2 * Math.asin(c / (2 * r));
};

let getDistance = (a, b) => {
    // длина отрезка между двумя точками
    return Math.sqrt(Math.pow(Math.abs(a.x - b.x)) + Math.pow(Math.abs(a.y - b.y)));
};

let findAngleByTwoDots = (a, b) => {
    //an_rad = Math.atan2(b.y-a.y, b.x-a.x);
    return Math.atan2(b.y - a.y, b.x - a.x);
};

let findAngleByThreeDots = (a, b, c) => {
    // A first point
    // B center point
    // C second point
    var ab = Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
    var bc = Math.sqrt(Math.pow(b.x - c.x, 2) + Math.pow(b.y - a.y, 2));
    var ac = Math.sqrt(Math.pow(c.x - a.x, 2) + Math.pow(c.y - a.y, 2));
    return Math.acos((bc * bc + ab * ab - ac * ac) / (2 * bc * ab));
};

let getAngleInDegrees = (an_rad) => {
    //deg_an = an_rad * 180 / Math.Pi
    return ((an_rad) * 180) / Math.PI;
};

let getAngleInRadians = (an_deg) => {
    //deg_rad = an_deg * Math.Pi / 180 
    return ((an_deg) * Math.PI) / 180.0;
};

let polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    var angleInRadians = ((angleInDegrees) * Math.PI) / 180.0;

    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
};