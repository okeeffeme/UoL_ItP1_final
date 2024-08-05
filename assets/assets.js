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
    lg: 127,
    lb: 0,
    rgb: [255, 127, 0]
}

function resize(percentage, val) {
    return (percentage * val) / 100;
}

function resizeYPinned(percentage, val, posY = 432) {
    let offset = resize(percentage, posY) - posY;
    return (percentage * val) / 100 - offset;
}

function createCanyon(posX, size) {
    let c = {
        posX,
        size: size || 100,
        draw: function() {
            fill(70,30,0);
            rect(c.posX, 432, c.size, 144);
        }
    }
    return c;
}

function createCloud(posX, posY, color, size) {
    let c = {
        posX,
        posY,
        color: color || '255, 230, 230',
        size: size || random(10, 60),
        draw: function() {
            fill(this.color);
            ellipse(this.posX, this.posY, resize(this.size, 190), resize(this.size, 180));
            ellipse(this.posX - resize(this.size, 60), this.posY + resize(this.size, 40), resize(this.size, 190), resize(this.size, 160));
            rect(this.posX - resize(this.size, 110), this.posY + resize(this.size, 10), resize(this.size, 250), resize(this.size, 110), 10, 60)
        }
    }
    return c;
}


function createCoin(posX, posY, value, size) {
    let c = {
        posX,
        posY,
        value: value || 100,
        size: size || 50,
        isFound: false,
        draw: function() {
            if(!this.isFound) {
                const posY = this.posY - this.size / 2;
                const posX = this.posX - (this.size - 30) / 2
                noStroke();
                fill(225, 160, 0);
                rect(posX, posY, this.size - 20, this.size, 200);
                fill(225, 210, 0);
                rect(posX - 6, posY, this.size - 20, this.size, 200);
                stroke(225, 180, 0);
                strokeWeight(3)
                rect(posX - 1, posY + 5, this.size - 30, this.size - 10, 200)
            }     
        }
    }
    return c;
}

function createMountains(posX, size, color) {
    let m = {
        posX,
        size: size || 50,
        color: color || '100, 120, 200',
        draw: function() {
            fill(color);
            beginShape()
            vertex(this.posX, resizeYPinned(this.size, 432));
            vertex(this.posX + resize(this.size, 200), resizeYPinned(this.size, 256));
            vertex(this.posX + resize(this.size, 280), resizeYPinned(this.size, 300));
            vertex(this.posX + resize(this.size, 380), resizeYPinned(this.size, 210));
            vertex(this.posX + resize(this.size, 724), resizeYPinned(this.size, 432));
            endShape(CLOSE);
        }
    }
    return m;
}

function createPlatforms(posX, posY, length) {
	let p = {
		posX,
		posY,
		length,
		draw: function() {
			fill('red');
			rect(this.posX, this.posY, this.length, 20);
		},
		checkContact: function(gc) {
			let d = this.posY - gc.posY;
			if(gc.posX + 10 > this.posX && gc.posX < this.posX + 10 + this.length) {
				
				if (d >= 0 && d < 3) {
					return true;
				}
			}
			return false;
		}
	}	
	return p;
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


////CHARACTER////
//helpers//
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
    noStroke();
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
////CHARACTER////
//main bodies
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
function drawJakeWin(posX, posY) {
    strokeCap(ROUND);
    drawBody(posX, posY);
    drawFoot(posX, posY, 12);
    drawFoot(posX, posY, -12);
    strokeWeight(5);
    stroke(colorFur);
    noFill();
    arc(posX, posY - 70, 40, 50, PI * 2, PI); //arms
    arc(posX, posY - 2, 20, 70, PI, PI * 2); //legs
    drawEye(posX, posY, -8);
    drawEye(posX, posY, 8);
    drawMouthFront(posX, posY);
}

function drawSandwhich(posX, posY) {
    noStroke();
    fill(255, 145, 0) //bottom bun
    rect(posX, posY - 20, 70, 20, 20, 20, 6, 6);
    fill('pink') //ham
    rect(posX, posY - 21, 70, 10, 20, 20, 4, 10);
    fill('red') //tomato
    rect(posX + 5, posY - 25, 60, 10, 20, 20, 4, 10);
    fill('green'); //lettuce
    ellipse(posX + 13, posY - 23, 30, 16);
    ellipse(posX + 35, posY - 25, 30, 14);
    ellipse(posX + 58, posY - 23, 30, 18);
    fill(255, 185, 0) //top bun
    rect(posX, posY - 45, 30, 20, 20, 20, 6, 6);
    rect(posX + 20, posY - 45, 30, 20, 20, 20, 6, 6);
    rect(posX + 40, posY - 45, 30, 20, 20, 20, 6, 6);
}

function drawFinishline(f, font) {
    if (!f.isReached) {
        drawSandwhich(f.posX, f.posY);
    } else {
        noStroke();
        fill('yellow');
        textAlign(CENTER);
        strokeJoin(BEVEL);
        textFont(font);
        text('You did it!', f.posX, f.posY - 180);
        ellipse(f.posX, f.posY - 64, 200, 200);
        drawSandwhich(f.posX - 33, f.posY - 80);
        drawJakeWin(f.posX, f.posY);
        fill('black');
        stroke('white');
        strokeJoin(BEVEL);
        textFont(font);
        text('Press F', f.posX - 180, f.posY);
        text('to continue', f.posX + 200, f.posY);
    }
}

//render assets
function drawAssets(a) {
    for (let i = 0; i < a.length; i++) {
        a[i].draw();
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

function drawScoreboard(s, l, font) {
    textSize(60);
    textAlign(LEFT);
    fill(225, 210, 0);
    textFont(font)
    text('dosh ' + s, 15, 70);
    // text('total wins ' + totalWins, 0, height - 20);
    textFont('Arial');
    for (let i = 0; i < l; i++) {
        text('❤️', i * 70, 130)
    }
}

function drawLevelDescription(font1, font2) {
    textFont(font1);
    textSize(80);
    textAlign(LEFT);
    fill('green')
    text('Sandwhich Time', 40, height - 50);
    textFont(font2);
    textSize(26);
    fill('white');
    stroke('white');
    strokeJoin(BEVEL);
    strokeWeight(1);
    text('Help Jake find his sandwhich... W, A, D to move.', 80, height - 20);
    noStroke();
}

function drawBandageHeart(w, h) {
    textSize(450);
    fill(0, 0, 0, 90);
    rect(0, 0, width, height);
    fill(0, 0, 0, 1000);
    textAlign(CENTER);
    textFont('Arial');
    text('❤️‍🩹', w, h + 150);
}

function drawEndGame(font, w, h) {
    textFont(font);
    textSize(34);
    stroke('grey');
    strokeJoin(BEVEL);
    text('Give all your dosh', w, h - 50);
    text('to Doctor Princess!', w, h - 10);
    noStroke();
    fill('#c9752f');
    rect(w - 200, h, 400, 100, 50);
    fill('#e49658');
    rect(w - 50, h + 5, 100, 90, 20);
    fill('black')
    text('Press F to try again', w, h + 60);
}

function drawLostLife(font, w, h, l) {
    const pointsMessage = l === 1 ? 'stretch' : 'stretches';
    textFont(font);
    textSize(34);
    stroke('grey');
    strokeJoin(BEVEL);
    text('Press F to ', w, h - 50);
    text('stretch out of the hole...', w, h - 10);
    noStroke();
    fill('#c9752f');
    rect(w - 200, h, 400, 100, 50);
    fill('#e49658');
    rect(w - 50, h + 5, 100, 90, 20);
    fill('black')
    text('Jake has ' + (l) + ' ' + pointsMessage + ' left.', w, h + 60);
}