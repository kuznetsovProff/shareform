/*
 * Путь
 */

let pathPie = (x, y, startx, starty, radius1, radius2, longArcFlag, sweepArcFlag, endx, endy) => {
    return [
        "M", x, y,
        "L", startx, starty,
        "A", radius1, radius2, 0, longArcFlag, sweepArcFlag, endx, endy,
        "L", x, y
    ].join(" ");

};

function describeArc(x, y, radius, startAngle, endAngle) {
    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var arcSweep = startAngle < endAngle ? "0" : "1";

    var arcLong = endAngle - startAngle <= 180 ? "0" : "1";
    /*
                return [
                    "M", start.x, start.y,
                    "A", radius, radius, 0, arcLong, arcSweep, end.x, end.y,
                    "L", x, y,
                    "L", start.x, start.y
                ].join(" ");*/

    return pathPie(x, y, start.x, start.y, radius, radius, arcLong, arcSweep, end.x, end.y);
}

function describeArcIntersection(n) {
    var x = n.circles[0].x;
    var y = n.circles[0].y;
    var a = {
        x: x,
        y: y
    };
    var b = {
        x: n.dots[0].x,
        y: n.dots[0].y
    };
    var c = {
        x: n.dots[1].x,
        y: n.dots[1].y
    };
    var radius = n.circles[0].r;
    var startAngleRad = findAngleByTwoDots(a, b);
    var startAngle = getAngleInDegrees(startAngleRad);
    var endAngleRad = findAngleByTwoDots(a, c);
    var endAngle = getAngleInDegrees(endAngleRad);
    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var arcSweep;
    arcSweep = startAngle < endAngle ? "0" : "1";
    var arcLong;
    arcLong = endAngle - startAngle <= 180 ? "0" : "1";

    if (startAngle < 0 && endAngle > 0) {
        if (arcLong == "0" && (startAngle * -1 + endAngle) < 180) {
            arcLong = "0";
            arcSweep = "0";
        } else {
            arcLong = "0";
            arcSweep = "1";
        }

    } else if (startAngle > 0 && endAngle < 0) {
        if (arcLong == "0" && (endAngle * -1 + startAngle) < 180) {
            arcLong = "0";
            arcSweep = "1";
        } else if (arcLong == "0" && (endAngle * -1 + startAngle) > 180) {
            arcLong = "1";
            arcSweep = "1";
        }
    }

    /*return [
        "M", start.x, start.y,
        "A", radius, radius, 0, arcLong, arcSweep, end.x, end.y,
        "L", x, y,
        "L", start.x, start.y
    ].join(" ");*/
    return pathPie(x, y, start.x, start.y, radius, radius, arcLong, arcSweep, end.x, end.y);
}


/*
            //https://stackoverflow.com/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle#18473154
//https://jsbin.com/quhujowota/1/edit?html,js,output


            */