const colorFur = '#F5BB12';
const colorFurLight = '#f5CD3D';
const colorBark = '#ddcfc8';

const colorGreen = {
    lr: 10,
    lg: 80,
    lb: 60,
    rgb: [10, 80, 60]
};

const colorPink = {
    lr: 229,
    lg: 133,
    lb: 216,
    rgb: [229, 133, 216]
}

const colorYellow = {
    lr: 255,
    lg: 165,
    lb: 0,
    rgb: [255, 165, 0]
}

function resize(percentage, val) {
    return (percentage * val) / 100;
}

function resizeYPinned(percentage, val, posY = 432) {
    let offset = resize(percentage, posY) - posY;
    return (percentage * val) / 100 - offset;
}

function drawCanyon(c) {
    fill(70, 30, 0);
    rect(c.posX, 432, c.size, 144);
}

function drawCloud(c) {
    fill(255, 230, 230);
    ellipse(c.posX, c.posY, resize(c.size, 190), resize(c.size, 180));
    ellipse(c.posX - resize(c.size, 60), c.posY + resize(c.size, 40), resize(c.size, 190), resize(c.size, 160));
    rect(c.posX - resize(c.size, 110), c.posY + resize(c.size, 10), resize(c.size, 250), resize(c.size, 110), 10, 60)
}

function drawCoin(c) {
    const posY = c.posY - c.size / 2;
    const posX = c.posX - (c.size - 30) / 2
    noStroke();
    fill(225, 160, 0);
    rect(posX, posY, c.size - 20, c.size, 200);
    fill(225, 210, 0);
    rect(posX - 6, posY, c.size - 20, c.size, 200);
    stroke(225, 180, 0);
    strokeWeight(3)
    rect(posX - 1, posY + 5, c.size - 30, c.size - 10, 200)
}

function drawMountain(m) {
    fill(100, 120, 200);
    beginShape()
    vertex(m.posX, resizeYPinned(m.size, 432));
    vertex(m.posX + resize(m.size, 200), resizeYPinned(m.size, 256));
    vertex(m.posX + resize(m.size, 280), resizeYPinned(m.size, 300));
    vertex(m.posX + resize(m.size, 380), resizeYPinned(m.size, 210));
    vertex(m.posX + resize(m.size, 724), resizeYPinned(m.size, 432));
    endShape(CLOSE);
}

function drawTree1(t) {
    const posX = t.posX;
    const posY = t?.posY - 105 || 327;
    const leafColor = colorGreen.rgb;
    const leafColorDark = color(colorGreen.lr - 10, colorGreen.lg - 10, colorGreen.lb - 10);
    const leafBranchColor = color(colorGreen.lr, colorGreen.lg + 100, colorGreen.lb + 20);
    const leafBranchColorDark = color(colorGreen.lr, colorGreen.lg + 80, colorGreen.lb + 20);

    //mainLeafBack
    fill(leafColorDark);
    rect(posX - 30, posY - 160, 100, 250, 50, 50, 0);
    //trunk
    fill(colorBark);
    rect(posX, posY, 40, 105, 2);
    //mainLeafFront
    fill(leafColor);
    rect(posX - 50, posY - 260, 140, 300, 70, 70, 0);
    rect(posX - 10, posY - 220, 40, 300);
    rect(posX + 50, posY - 110, 40, 200);
    fill(leafColorDark)
    triangle(posX + 55, posY + 90, posX + 45, posY + 90, posX + 50, posY - 180)
    //secondLeafBack
    fill(leafBranchColorDark);
    rect(posX - 40, posY - 40, 20, 110)
    //branch
    noFill();
    stroke(colorBark);
    strokeCap(SQUARE);
    strokeWeight(20);
    arc(posX - 10, posY, 80, 60, HALF_PI, PI);
    //secondLeafFront
    fill(leafBranchColor);
    noStroke();
    rect(posX - 70, posY - 70, 50, 30, 50, 50, 0);
    rect(posX - 70, posY - 40, 40, 136);
    triangle(posX - 20, posY - 40, posX - 40, posY - 40, posX - 30, posY + 30);
}

function drawTree2(t) {
    const posX = t.posX;
    const posY = t?.posY - 100 || 332;
    const tColor = t?.color || colorPink;
    const leafColor = tColor.rgb;
    const leafColorDark = color(tColor.lr - 10, tColor.lg - 10, tColor.lb - 10);
    const leafBranchColor = color(tColor.lr, tColor.lg + 100, tColor.lb + 20);
    const leafBranchColorDark = color(tColor.lr, tColor.lg + 80, tColor.lb + 20);

    //trunk
    fill(colorBark);
    rect(posX, posY - 100, 20, 200, 2);
    //mainLeafBack
    fill(leafColorDark);
    rect(posX - 60, posY - 160, 140, 110, 70);
    //mainLeafFront
    fill(leafColor);
    rect(posX - 60, posY - 160, 140, 100, 70);
    //secondLeafBack
    fill(leafBranchColorDark);
    rect(posX - 70, posY - 50, 60, 50, 70);
    //branch
    noFill();
    stroke(colorBark);
    strokeCap(SQUARE);
    strokeWeight(14);
    arc(posX, posY, 80, 60, HALF_PI, PI);
    //secondLeafFront
    fill(leafBranchColor);
    noStroke();
    rect(posX - 70, posY - 50, 60, 40, 70);
}

function drawTree3(t) {
    const posX = t.posX;
    const posY = t?.posY - 100 || 332;
    const tColor = t?.color || colorGreen;
    const leafColor = tColor.rgb;
    const leafColorDark = color(tColor.lr - 10, tColor.lg - 10, tColor.lb - 10);
    const leafBranchColor = color(tColor.lr, tColor.lg + 100, tColor.lb + 20);
    const leafBranchColorDark = color(tColor.lr, tColor.lg + 80, tColor.lb + 20);

    //trunk
    fill(colorBark);
    rect(posX, posY - 100, 20, 200, 2);
    //mainLeafBack
    fill(leafColorDark);
    rect(posX - 60, posY - 50, 140, 110, 70);
    //mainLeafFront
    fill(leafColor);
    rect(posX - 60, posY - 54, 140, 100, 70);
    //secondLeafBack
    fill(leafBranchColorDark);
    rect(posX - 40, posY - 160, 100, 80, 70);

    //secondLeafFront
    fill(leafBranchColor);
    rect(posX - 40, posY - 170, 100, 80, 70);
}



function drawBody(posX, posY) {
    fill(colorFur);
    rect(posX - 15, posY - 66, 30, 46, 20);
}
function drawEye(posX, posY, adj, side = 0) {
    fill('white');
    stroke('black');
    strokeWeight(2);
    ellipse(posX + adj, posY - 52, 8 - side, 8) //eye
}
function drawFoot(posX, posY, adjX, adjY = 2) {
    fill(colorFur);
    ellipse(posX + adjX, posY - adjY, 10, 6) //foot
}
function drawMouthFront(posX, posY) {
    stroke(colorFurLight);
    strokeWeight(6)
    noFill();
    arc(posX, posY - 45, 8, 10, PI, PI * 2); //lips
    fill('black')
    noStroke();
    ellipse(posX, posY - 48, 6, 4) //nose
}
function drawMouthSide(posX, posY, adjX = -20) {
    fill(colorFurLight);
    rect(posX + adjX, posY - 50, 8, 10, 20);
}
function drawEarSide(posX, posY, adjX = 6) {
    strokeWeight(1.6);
    fill(colorFur);
    stroke('#a67712');
    arc(posX + adjX, posY - 54, 10, 10, 0, PI); //ear
}
function drawFootVertical(posX, posY, adjX, adjY = 2) {
    fill(colorFur);
    ellipse(posX + adjX, posY - adjY, 6, 10) //foot
}


function drawJakeFront(posX, posY) {
    strokeCap(ROUND);
    drawBody(posX, posY);
    drawFoot(posX, posY, 12);
    drawFoot(posX, posY, -12);
    strokeWeight(5);
    stroke(colorFur);
    noFill();
    arc(posX, posY - 30, 40, 50, PI, PI * 2); //arms
    arc(posX, posY - 2, 20, 70, PI, PI * 2); //legs
    drawEye(posX, posY, -8);
    drawEye(posX, posY, 8);
    drawMouthFront(posX, posY);
}
function drawJakeFrontJumping(posX, posY) {
    strokeCap(ROUND);
    drawBody(posX, posY);
    drawFoot(posX, posY, 12, 8);
    drawFoot(posX, posY, -12, 8);

    strokeWeight(5);
    stroke(colorFur);
    noFill();
    arc(posX, posY - 70, 40, 50, PI * 2, PI); //arms
    arc(posX, posY - 10, 20, 60, PI - .4, PI * 2 + .4); //legs
    drawEye(posX, posY, -8);
    drawEye(posX, posY, 8);
    drawMouthFront(posX, posY);
}
function drawJakeWalkingLeft(posX, posY) {
    strokeCap(ROUND);
    strokeWeight(5);
    stroke(colorFur);
    noFill();
    arc(posX, posY - 2, 20, 70, PI, PI * 2); //legs
    noStroke();
    drawBody(posX, posY);
    drawFoot(posX, posY, 8);
    drawFoot(posX, posY, -12, 4);
    drawMouthSide(posX, posY);

    strokeWeight(5);
    noFill();
    stroke(colorFurLight);
    arc(posX - 14, posY - 54, 40, 50, 0.5, PI * .4); //arm front

    drawEarSide(posX, posY);
    drawEye(posX, posY, -11, 2);
}
function drawJakeWalkingRight(posX, posY) {
    strokeCap(ROUND);
    strokeWeight(5);
    stroke(colorFur);
    noFill();
    arc(posX, posY - 2, 20, 70, PI, PI * 2); //legs
    noStroke();
    drawBody(posX, posY);
    drawFoot(posX, posY, -8);
    drawFoot(posX, posY, 12, 4);
    drawMouthSide(posX, posY, 12);

    strokeWeight(5);
    noFill();
    stroke(colorFurLight);
    arc(posX + 14, posY - 54, 40, 50, 1.9, 2.6); //arm front

    drawEarSide(posX, posY, -6);
    drawEye(posX, posY, 11, 2);
}
function drawJakeJumpingLeft(posX, posY) {
    strokeCap(ROUND);
    strokeWeight(5);
    stroke(colorFur);
    noFill()
    arc(posX, posY - 70, 40, 50, 1, PI); //arms
    arc(posX + 6, posY - 2, 40, 40, 3.4, 4.4); //leg front
    arc(posX + 30, posY - 24, 40, 40, 2.2, 16); //leg back
    noStroke();
    drawBody(posX, posY);
    drawFoot(posX, posY, -16, 6);
    drawFootVertical(posX, posY, 20, 4);
    drawMouthSide(posX, posY);

    strokeWeight(5);
    noFill();
    stroke(colorFurLight);
    arc(posX - 7, posY - 40, 30, 10, 6, 14); //arm front

    drawEarSide(posX, posY);
    drawEye(posX, posY, -11, 2);
}
function drawJakeJumpingRight(posX, posY) {
    strokeCap(ROUND);
    strokeWeight(5);
    stroke(colorFur);
    noFill();
    arc(posX, posY - 70, 40, 50, PI * 2, 1); //arms
    arc(posX - 6, posY - 2, 40, 40, 5, 6); //legs
    arc(posX - 26, posY - 25, 40, 40, .2, 1.2); //legs
    noStroke();
    drawBody(posX, posY);
    drawFootVertical(posX, posY, -19, 4);
    drawFoot(posX, posY, 16, 6);
    drawMouthSide(posX, posY, 12);

    strokeWeight(5);
    noFill();
    stroke(colorFurLight);
    arc(posX + 10, posY - 40, 30, 10, 2, 3.3); //arm front

    drawEarSide(posX, posY, -6);
    drawEye(posX, posY, 11, 2);
}

//render all canyons
function drawCanyons(c) {
	for (let i = 0; i < c.length; i++) {
		drawCanyon(c[i]);
	}
}

//render all clouds
function drawClouds(c) {
	for (let i = 0; i < c.length; i++) {
		drawCloud(c[i]);
	}
}

//render all collectable
function drawCollectable(c) {
	for (let i = 0; i < c.length; i++) {
		if (!c[i].isFound) {
			drawCoin(c[i]);
		}
	}
}

//render all mountains
function drawMountains(m) {
	for (let i = 0; i < m.length; i++) {
		drawMountain(m[i]);
	}
}

//render all trees
function drawTrees(t) {
	for (let i = 0; i < t.length; i++) {
		if (t[i].posX % 3 == 1) {
			drawTree2(t[i]);
		} else if (t[i].posX % 3 == 2) {
			drawTree3(t[i]);
		} else {
			drawTree1(t[i]);
		}
	}
}