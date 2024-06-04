const colorFur = '#F5BB12';
const colorFurLight = '#f5CD3D';
const colorGreen = {
    lr: 10,
    lg: 80,
    lb: 60,
    rgb: [10, 80, 60]
};

function resize(percentage, val) {
    return (percentage * val) / 100;
}

function resizeYPinned(percentage, val, posY = 432) {
    let offset = resize(percentage, posY) - posY;
    return (percentage * val) / 100 - offset;
}

export function drawMountain(posX, sizePercentage) {
    fill(100, 120, 200);
    beginShape()
    vertex(posX, resizeYPinned(sizePercentage, 432));
    vertex(posX + resize(sizePercentage, 200), resizeYPinned(sizePercentage, 256));
    vertex(posX + resize(sizePercentage, 280), resizeYPinned(sizePercentage, 300));
    vertex(posX + resize(sizePercentage, 380), resizeYPinned(sizePercentage, 210));
    vertex(posX + resize(sizePercentage, 724), resizeYPinned(sizePercentage, 432));
    endShape(CLOSE);
}

export function drawCloud(posX, posY, sizePercentage) {
    fill(255, 230, 230);
    ellipse(posX, posY, resize(sizePercentage, 190), resize(sizePercentage, 180));
    ellipse(posX - resize(sizePercentage, 60), posY + resize(sizePercentage, 40), resize(sizePercentage, 190), resize(sizePercentage, 160));
    rect(posX - resize(sizePercentage, 110), posY + resize(sizePercentage, 10), resize(sizePercentage, 250), resize(sizePercentage, 110), 10, 60)
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

export function drawJakeFront(posX, posY) {
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

export function drawJakeFrontJumping(posX, posY) {
    mainBody(posX, posY);
    drawFoot(posX, posY, 12, 8);
    drawFoot(posX, posY, -12, 8);

    strokeWeight(5);
    stroke(cFur);
    noFill();
    arc(posX, posY - 70, 40, 50, PI * 2, PI); //arms
    arc(posX, posY - 10, 20, 60, PI - .4, PI * 2 + .4); //legs
    drawEye(posX, posY, -8);
    drawEye(posX, posY, 8);
    drawMouthFront(posX, posY);
}

export function drawJakeWalkingLeft(posX, posY) {
    strokeWeight(5);
    stroke(cFur);
    noFill();
    arc(posX, posY - 2, 20, 70, PI, PI * 2); //legs
    noStroke();
    mainBody(posX, posY);
    drawFoot(posX, posY, 8);
    drawFoot(posX, posY, -12, 4);
    drawMouthSide(posX, posY);

    strokeWeight(5);
    noFill();
    stroke(cFurL);
    arc(posX - 14, posY - 54, 40, 50, 0.5, PI * .4); //arm front

    drawEarSide(posX, posY);
    drawEye(posX, posY, -11, 2);
}

export function drawJakeWalkingRight(posX, posY) {
    strokeWeight(5);
    stroke(cFur);
    noFill();
    arc(posX, posY - 2, 20, 70, PI, PI * 2); //legs
    noStroke();
    mainBody(posX, posY);
    drawFoot(posX, posY, -8);
    drawFoot(posX, posY, 12, 4);
    drawMouthSide(posX, posY, 12);


    strokeWeight(5);
    noFill();
    stroke(cFurL);
    arc(posX + 14, posY - 54, 40, 50, 1.9, 2.6); //arm front

    drawEarSide(posX, posY, -6);
    drawEye(posX, posY, 11, 2);
}

export function drawJakeJumpingLeft(posX, posY) {
    strokeWeight(5);
    stroke(cFur);
    noFill()
    arc(posX + 6, posY - 2, 40, 40, 3.4, 4.4); //leg front
    arc(posX + 30, posY - 24, 40, 40, 2.2, 16); //leg back
    noStroke();
    mainBody(posX, posY);
    drawFoot(posX, posY, -16, 6);
    drawFootVertical(posX, posY, 20, 4);
    drawMouthSide(posX, posY);

    strokeWeight(5);
    noFill();
    stroke(cFurL);
    arc(posX - 7, posY - 40, 30, 10, 6, 14); //arm front

    drawEarSide(posX, posY);
    drawEye(posX, posY, -11, 2);
}

export function drawJakeJumpingRight(posX, posY) {
    strokeWeight(5);
    stroke(cFur);
    noFill();
    arc(posX - 6, posY - 2, 40, 40, 5, 6); //legs
    arc(posX - 26, posY - 25, 40, 40, .2, 1.2); //legs
    noStroke();
    mainBody(posX, posY);
    drawFootVertical(posX, posY, -19, 4);
    drawFoot(posX, posY, 16, 6);
    drawMouthSide(posX, posY, 12);

    strokeWeight(5);
    noFill();
    stroke(cFurL);
    arc(posX + 10, posY - 40, 30, 10, 2, 3.3); //arm front

    drawEarSide(posX, posY, -6);
    drawEye(posX, posY, 11, 2);
}

export function drawCanyon(posX, w) {
    fill(70, 30, 0);
    rect(posX + 20, 432, w, 144);
    fill(colorGreen.rgb);
    quad(posX, 432, posX + (w + 40), 432, posX + (w + 20), 462, posX + 20, 462)

}

export function drawTree(posX, posY) {
    posY = posY + 40;
    const leafColor = colorGreen.rgb;
    const leafColorDark = color(colorGreen.lr - 10, colorGreen.lg - 10, colorGreen.lb - 10);
    const leafBranchColor = color(colorGreen.lr, colorGreen.lg + 100, colorGreen.lb + 20);
    const leafBranchColorDark = color(colorGreen.lr, colorGreen.lg + 80, colorGreen.lb + 20);
    const barkColor = '#ddcfc8';

    //mainLeafBack
    fill(leafColorDark);
    rect(posX - 30, posY - 160, 100, 250, 50, 50, 0);
    //trunk
    fill(barkColor);
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
    stroke(barkColor);
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

export function drawCoin(posX, posY, size) {
    posY = posY - size / 2;
    posX = posX - (size - 30) / 2
    fill(225, 160, 0);
    rect(posX, posY, size - 20, size, 200);
    fill(225, 210, 0);
    rect(posX - 6, posY, size - 20, size, 200);
    stroke(225, 180, 0);
    strokeWeight(3)
    rect(posX - 1, posY + 5, size - 30, size - 10, 200)
}