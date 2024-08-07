const colorFur = '#F5BB12';
const colorFurLight = '#f5CD3D';
const colorBark = '#FFFFFF';

//// UTILITIES ////
function resize(percentage, val) {
    return (percentage * val) / 100;
}

function resizeYPinned(percentage, val, posY = 432) {
    let offset = resize(percentage, posY) - posY;
    return (percentage * val) / 100 - offset;
}

function noSpill() {
    noFill();
    strokeWeight(1);
    noStroke();
}

function setupFont(fontFamily, fontSize, fontColor, fontAlign) {
    fill(fontColor || 'black');
    textFont(fontFamily);
    textSize(fontSize || 34);
    textAlign(fontAlign || CENTER);
}

function setupFontOutlined(fontFamily, fontSize, fontColor, fontAlign, outlineColor, outlineWeight) {
    setupFont(fontFamily, fontSize, fontColor, fontAlign);
    stroke(outlineColor || 'white');
    strokeWeight(outlineWeight || 3);
    strokeJoin(BEVEL);
}

//// FACTORIES ////
function createCanyon(posX, size, c) {
    let canyon = {
        posX,
        size: size || 100,
        color: c || color(40,30,0),
        draw: function() {
            fill(this.color);
            rect(this.posX, 432, this.size, 144);
            noSpill();
        }
    }
    return canyon;
}

function createCloud(posX, posY, c, size) {
    let cloud = {
        posX,
        posY,
        color: c || color(255, 230, 230),
        size: size || random(20, 80),
        draw: function() {
            fill(this.color);
            ellipse(this.posX, this.posY, resize(this.size, 190), resize(this.size, 180));
            ellipse(this.posX - resize(this.size, 60), this.posY + resize(this.size, 40), resize(this.size, 190), resize(this.size, 160));
            rect(this.posX - resize(this.size, 110), this.posY + resize(this.size, 10), resize(this.size, 250), resize(this.size, 110), 10, 60);
            noSpill();
        }
    }
    return cloud;
}

function createCoin(posX, posY, value, size) {
    let coin = {
        posX,
        posY,
        value: value || 100,
        size: size || 50,
        isFound: false,
        draw: function() {
            if(!this.isFound) {
                const posY = this.posY - this.size / 2;
                const posX = this.posX - (this.size - 30) / 2;
                //backing
                fill('gold');
                rect(posX, posY, this.size - 20, this.size - 15, 200);
                //face
                fill('yellow');
                rect(posX - 5, posY, this.size - 20, this.size - 15, 200);
                //ring
                stroke('gold');
                strokeWeight(3);
                rect(posX - 1, posY + 5, this.size - 30, this.size - 25, 200);
                noSpill();
            }     
        }
    }
    return coin;
}

function createMountain(posX, color, size) {
    let mountain = {
        posX,
        size: size || 50,
        color: color || color(100, 120, 200),
        draw: function() {
            fill(this.color);
            beginShape();
            vertex(this.posX, resizeYPinned(this.size, 432));
            vertex(this.posX + resize(this.size, 200), resizeYPinned(this.size, 256));
            vertex(this.posX + resize(this.size, 280), resizeYPinned(this.size, 300));
            vertex(this.posX + resize(this.size, 380), resizeYPinned(this.size, 210));
            vertex(this.posX + resize(this.size, 724), resizeYPinned(this.size, 432));
            endShape(CLOSE);
            noSpill();
        }
    }
    return mountain;
}

function createPlatforms(posX, posY, length) {
	let platform = {
		posX,
		posY,
		length,
		draw: function() {
			fill('pink');
			rect(this.posX, this.posY+10, this.length, 5);
            fill('yellow');
			rect(this.posX, this.posY+5, this.length, 5);
            fill('cyan');
			rect(this.posX, this.posY, this.length, 5);
            noSpill();
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
	return platform;
}

//// TREES ////

function drawBigTree(t) {
    const colorGreen = {
        lr: 10,
        lg: 80,
        lb: 60,
        rgb: [10, 80, 60]
    };
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
    fill(leafColorDark);
    triangle(posX + 55, posY + 90, posX + 45, posY + 90, posX + 50, posY - 180);
    //secondLeafBack
    fill(leafBranchColorDark);
    rect(posX - 40, posY - 40, 20, 110);
    //branch
    noFill();
    stroke(colorBark);
    strokeCap(SQUARE);
    strokeWeight(20);
    arc(posX - 10, posY, 80, 60, HALF_PI, PI);
    //secondLeafFront
    noStroke();
    fill(leafBranchColor);
    rect(posX - 70, posY - 70, 50, 30, 50, 50, 0);
    rect(posX - 70, posY - 40, 40, 136);
    triangle(posX - 20, posY - 40, posX - 40, posY - 40, posX - 30, posY + 30);

    noSpill();
}

function createTrees(posX, color) {
    let tree = {
        posX,
        color: color || color(10, 80, 60),
        height: Math.floor(random(10,65)),
        draw: function() {
            if(this.height%3 === 0) {
                drawTree2(this.posX, this.color, this.height);
            } else {
                drawTree3(this.posX, this.color, this.height);
            }
        }
    }
    return tree;
}

function drawTree2(x, c, h, y) { //with branches
    const posX = x;
    const posY = y - 100 || 332;
    const tColor = c || color(229, 133, 216);
    const leafColor = tColor;
    const leafColorDark = color(tColor.levels[0] - 10, tColor.levels[1] - 10, tColor.levels[2] - 10);
    const leafBranchColor = color(tColor.levels[0], tColor.levels[1] + 100, tColor.levels[2] + 20);
    const leafBranchColorDark = color(tColor.levels[0], tColor.levels[1] + 80, tColor.levels[2] + 20);

    //trunk
    fill(colorBark);
    rect(posX, posY - 100-h, 20, 200+h, 2);
    //mainLeafBack
    fill(leafColorDark);
    rect(posX - 60, posY - 160-h, 140, 110+h, 70);
    //mainLeafFront
    fill(leafColor);
    rect(posX - 60, posY - 160-h, 140, 100+h, 70);
    if(h%3 === 0) {
        //secondLeafBack
        fill(leafBranchColorDark);
        rect(posX + 12, posY - 50+h, 60, 50, 70);
        //branch
        noFill();
        stroke(colorBark);
        strokeCap(SQUARE);
        strokeWeight(14);
        arc(posX, posY+h, 80, 60, 2*PI, 190);
        //secondLeafFront
        fill(leafBranchColor);
        noStroke();
        rect(posX + 12, posY - 50+h, 60, 40, 70);
    }
    if(h%2 === 0) {
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

    noSpill();
}

function drawTree3(x, c, h, y) {  //no branches
    const posX = x;
    const posY = y - 100 || 332;
    const tColor = c || color(10, 80, 60);
    const leafColor = tColor;
    const leafColorDark = color(tColor.levels[0] - 10, tColor.levels[1] - 10, tColor.levels[2] - 10);
    const leafBranchColor = color(tColor.levels[0], tColor.levels[1] + 100, tColor.levels[2] + 20);
    const leafBranchColorDark = color(tColor.levels[0], tColor.levels[1] + 80, tColor.levels[2] + 20);
    
    //trunk
    fill(colorBark);
    rect(posX, posY - 100-h, 20, 200+h, 2);
    if(h%2 === 0) {
        //mainLeafBack
        fill(leafColorDark);
        rect(posX - 60, posY - 50-h, 140, 110, 70);
        //mainLeafFront
        fill(leafColor);
        rect(posX - 60, posY - 54-h, 140, 100, 70);
        //secondLeafBack
        fill(leafBranchColorDark);
        rect(posX - 40, posY - 160-h, 100, 80, 70);
        //secondLeafFront
        fill(leafBranchColor);
        rect(posX - 40, posY - 170-h, 100, 80, 70);
    } else {
        //mainLeafBack
        fill(leafColorDark);
        rect(posX - 60, posY - 165-h, 140, 110, 70);
        //mainLeafFront
        fill(leafColor);
        rect(posX - 60, posY - 170-h, 140, 100, 70);
    }

    noSpill();
}


////CHARACTER UTILS////
function drawBody(posX, posY) {
    fill(colorFur);
    rect(posX - 15, posY - 66, 30, 46, 20);
    noSpill();
}

function drawEye(posX, posY, adj, side = 0) {
    fill('white');
    stroke('black');
    strokeWeight(2);
    ellipse(posX + adj, posY - 52, 8 - side, 8) //eye
    noSpill();
}

function drawFoot(posX, posY, adjX, adjY = 2) {
    fill(colorFur);
    noStroke();
    ellipse(posX + adjX, posY - adjY, 10, 6) //foot
    noSpill();
}

function drawMouthFront(posX, posY) {
    stroke(colorFurLight);
    strokeWeight(6);
    noFill();
    arc(posX, posY - 45, 8, 10, PI, PI * 2); //lips
    fill('black');
    noStroke();
    ellipse(posX, posY - 48, 6, 4); //nose
    noSpill();
}

function drawMouthSide(posX, posY, adjX = -20) {
    fill(colorFurLight);
    rect(posX + adjX, posY - 50, 8, 10, 20);
    noSpill();
}

function drawEarSide(posX, posY, adjX = 6) {
    strokeWeight(1.6);
    fill(colorFur);
    stroke('#a67712');
    arc(posX + adjX, posY - 54, 10, 10, 0, PI); //ear
    noSpill();
}

function drawFootVertical(posX, posY, adjX, adjY = 2) {
    fill(colorFur);
    ellipse(posX + adjX, posY - adjY, 6, 10); //foot
    noSpill();
}

function bodySetupStroke(c) {
    noFill();
    c = c || colorFur;
    strokeCap(ROUND);
    strokeWeight(5);
    stroke(c);
}

////CHARACTER////
function drawJakeFront(gc) {
    const {posX, posY} = gc;
    //base
    drawBody(posX, posY);
    drawFoot(posX, posY, 12);
    drawFoot(posX, posY, -12);
    //appendages
    bodySetupStroke();
    arc(posX, posY - 30, 40, 50, PI, PI * 2); //arms
    arc(posX, posY - 2, 20, 70, PI, PI * 2); //legs
    //top
    noSpill();
    drawEye(posX, posY, -8);
    drawEye(posX, posY, 8);
    drawMouthFront(posX, posY);
    noSpill();
}
function drawJakeFrontJumping(gc) {
    const {posX, posY} = gc;
    //base
    drawBody(posX, posY);
    drawFoot(posX, posY, 12, 8);
    drawFoot(posX, posY, -12, 8);
    //appendages
    bodySetupStroke();
    arc(posX, posY - 70, 40, 50, PI * 2, PI); //arms
    arc(posX, posY - 10, 20, 60, PI - .4, PI * 2 + .4); //legs
    //top
    noSpill();
    drawEye(posX, posY, -8);
    drawEye(posX, posY, 8);
    drawMouthFront(posX, posY);
    noSpill();
}
function drawJakeWalkingLeft(gc) {
    const {posX, posY} = gc;

    //appendages base
    bodySetupStroke();
    if(Math.floor(posX%100) > 50) {
        arc(posX, posY - 2, 10, 60, PI, PI * 2); //legs
        noStroke();
        drawFoot(posX-10, posY, 12);
        drawFoot(posX-10, posY, 2);
    } else {
        arc(posX, posY - 2, 20, 70, PI, PI * 2); //legs
        noStroke();
        drawFoot(posX, posY, 8);
        drawFoot(posX, posY, -12, 4);
    }
    //base
    noSpill();
    drawBody(posX, posY);
    //appendages top
    bodySetupStroke(colorFurLight);
    arc(posX - 14, posY - 54, 40, 50, 0.5, PI * .4); //arm front
    //top
    noSpill();
    drawMouthSide(posX, posY);
    drawEarSide(posX, posY);
    drawEye(posX, posY, -11, 2);
    noSpill();
}

function drawJakeWalkingRight(gc) {
    const {posX, posY} = gc;

    //appendages base
    bodySetupStroke();
    if(Math.floor(posX%100) > 50) {
        arc(posX, posY - 2, 10, 60, PI, PI * 2); //legs
        noStroke();
        drawFoot(posX-10, posY, 8);
        drawFoot(posX-10, posY, 18);
    } else {
        arc(posX, posY - 2, 20, 70, PI, PI * 2); //legs
        noStroke();
        drawFoot(posX, posY, -8);
        drawFoot(posX, posY, 12, 4);
    }
    //base
    noSpill();
    drawBody(posX, posY);
    //appendages top
    bodySetupStroke(colorFurLight);
    arc(posX + 14, posY - 54, 40, 50, 1.9, 2.6); //arm front
    //top
    noSpill();
    drawMouthSide(posX, posY, 12);
    drawEarSide(posX, posY, -6);
    drawEye(posX, posY, 11, 2);
    noSpill();
}

function drawJakeJumpingLeft(gc) {
    const {posX, posY} = gc;

    //appendages base
    bodySetupStroke();
    arc(posX, posY - 70, 40, 50, 1, PI); //arms
    arc(posX + 6, posY - 2, 40, 40, 3.4, 4.4); //leg front
    arc(posX + 30, posY - 24, 40, 40, 2.2, 16); //leg back
    //base
    noSpill();
    drawBody(posX, posY);
    drawFoot(posX, posY, -16, 6);
    drawFootVertical(posX, posY, 20, 4);
    //appendages top
    bodySetupStroke(colorFurLight);
    arc(posX - 7, posY - 40, 30, 10, 6, 14); //arm front
    //top
    noSpill();
    drawMouthSide(posX, posY);
    drawEarSide(posX, posY);
    drawEye(posX, posY, -11, 2);
    noSpill();
}

function drawJakeJumpingRight(gc) {
    const {posX, posY} = gc;

    //appendages base
    bodySetupStroke();
    arc(posX, posY - 70, 40, 50, PI * 2, 1); //arms
    arc(posX - 6, posY - 2, 40, 40, 5, 6); //legs
    arc(posX - 26, posY - 25, 40, 40, .2, 1.2); //legs
    //base
    noSpill();
    drawBody(posX, posY);
    drawFootVertical(posX, posY, -19, 4);
    drawFoot(posX, posY, 16, 6);
    drawMouthSide(posX, posY, 12);
    //appendages top
    bodySetupStroke(colorFurLight);
    arc(posX + 10, posY - 40, 30, 10, 2, 3.3); //arm front
    //top
    noSpill();
    drawEarSide(posX, posY, -6);
    drawEye(posX, posY, 11, 2);
    noSpill();
}

function drawJakeWin(gc) {
    const {posX, posY} = gc;

    //base
    drawBody(posX, posY);
    drawFoot(posX, posY, 12);
    drawFoot(posX, posY, -12);
    //appendages
    bodySetupStroke();
    arc(posX, posY - 70, 40, 50, PI * 2, PI); //arms
    arc(posX, posY - 2, 20, 70, PI, PI * 2); //legs
    //top layer
    noSpill();
    drawEye(posX, posY, -8);
    drawEye(posX, posY, 8);
    drawMouthFront(posX, posY);
    noSpill();
}

function drawSandwhich(posX, posY) {
    //bottom bun
    fill(255, 145, 0); 
    rect(posX, posY - 20, 70, 20, 20, 20, 6, 6);
    //ham
    fill('pink');
    rect(posX, posY - 21, 70, 10, 20, 20, 4, 10);
    //tomato
    fill('red');
    rect(posX + 5, posY - 25, 60, 10, 20, 20, 4, 10);
    //lettuce
    fill('green');
    ellipse(posX + 13, posY - 23, 30, 16);
    ellipse(posX + 35, posY - 25, 30, 14);
    ellipse(posX + 58, posY - 23, 30, 18);
    //top bun
    fill(255, 185, 0); 
    rect(posX, posY - 45, 30, 20, 20, 20, 6, 6);
    rect(posX + 20, posY - 45, 30, 20, 20, 20, 6, 6);
    rect(posX + 40, posY - 45, 30, 20, 20, 20, 6, 6);
    noSpill();
}

function drawFinishline(f, font) {
    if (!f.isReached) {
        drawSandwhich(f.posX, f.posY);
    } else {
         //halo
        fill('LightYellow');
        ellipse(f.posX, f.posY - 64, 200, 200);
        //ribbon
        fill('#1b4468');
        rect(f.posX+140,f.posY-216, 80, 80, 20, 0, 0, 20); //ribbon ends
        rect(f.posX-200,f.posY-216, 80, 80, 0, 20, 20, 0);
        fill('#024e91');
        rect(f.posX-180,f.posY-230, 360, 80, 20, 20, 6, 6); //ribbon body
        //ribbon message
        setupFont(font, 60, 'yellow');
        textAlign(CENTER);
        text('You did it!', f.posX, f.posY - 170);
        //sandwhich
        drawSandwhich(f.posX - 33, f.posY - 80);
        //jake
        drawJakeWin(f);
        //continue message
        setupFontOutlined(font, 60);
        text('Press F', f.posX - 180, f.posY);
        text('to continue', f.posX + 200, f.posY);
        noSpill();
    }
}

function drawPickles(pickle) {
    if(!pickle.isFound) {
        //jar
        fill('PowderBlue');
        stroke('LightBlue');
        strokeWeight(4);
        rect(pickle.posX,pickle.posY-50, 40,50, 10, 10, 4,4); 
        //jar lid
        noSpill();
        fill('lightgrey');
        rect(pickle.posX,pickle.posY-60, 40,10); 
        //pickle juice
        fill('Aquamarine');
        rect(pickle.posX,pickle.posY-40,40,40,0,0,4,4);
        noSpill();
        //pickle
        stroke('OliveDrab');
        strokeWeight(12);
        arc(pickle.posX+9,pickle.posY-25,30,40,12.2, 13.5); 
        noSpill();
    }
}

function drawPrismo(prismo, h) {
    const mid = (h / 2) - 100;
    //face
    fill('pink');
    ellipse(prismo.posX, mid, 300, 200); 
    //neck
    rect(prismo.posX-20, mid+90, 40, 40);
    //body above ground
    rect(prismo.posX-120, mid+130, 240, 440, 20,20,0);
    //body below ground
    fill('lightpink');
    rect(prismo.posX-120, prismo.posY, 240, 440);
    //hair
    fill('pink');
    ellipse(prismo.posX, mid-100, 60); 
    ellipse(prismo.posX+50, mid-100, 60);
    ellipse(prismo.posX+100, mid-80, 60);
    ellipse(prismo.posX+130, mid-45, 60);
    ellipse(prismo.posX+150, mid, 60);
    ellipse(prismo.posX+130, mid+45, 60);
    //nose
    beginShape();
    curveVertex(prismo.posX-110, mid+20);
    curveVertex(prismo.posX-110, mid+20);
    curveVertex(prismo.posX-180, mid-10);
    curveVertex(prismo.posX-90, mid-70);
    curveVertex(prismo.posX-90, mid-70);
    endShape();
    //eye
    fill('yellow');
    ellipse(prismo.posX-40, mid-20, 80, 40);
    //iris
    fill('cyan');
    ellipse(prismo.posX-40, mid-20, 38);
    //skeptical eyelid
    fill('pink')
    beginShape();
    curveVertex(prismo.posX-90, mid-40);
    curveVertex(prismo.posX-90, mid-40);
    curveVertex(prismo.posX-40, mid-30);
    curveVertex(prismo.posX+20, mid-40);
    curveVertex(prismo.posX-20, mid-40);
    endShape();
    //mouth
    stroke('LightCoral');
    strokeCap(ROUND);
    strokeWeight(10);
    noFill();
    arc(prismo.posX-90, mid+40, 120, 40, 2*PI, 90);
    //arm
    stroke('pink');
    strokeWeight(34);
    arc(prismo.posX-220, mid+241, 140, 127, 55, 12.6);
    noStroke();
    //arm above ground
    fill('pink');
    rect(prismo.posX-167, mid+241, 34, 180);
    //arm below ground
    fill('lightpink');
    rect(prismo.posX-167, prismo.posY, 34, 180);
    //fingers
    fill('pink');
    rect(prismo.posX-256, mid+160, 45, 15, 20);
    rect(prismo.posX-245, mid+170, 45, 15, 20);
    rect(prismo.posX-235, mid+180, 45, 15, 20);
    noSpill();
}

//render assets
function drawAssets(a) {
    if (!a) { //sometimes we might not want to have a certain type of asset
        return;
    }
    for (let i = 0; i < a.length; i++) {
        a[i].draw();
    }
}

function drawScoreboard(s, l, font) {
    //score
    setupFontOutlined(font, 60, 'black', LEFT);
    text('dosh ' + s, 15, 70);
    noStroke();
    //lives
    textFont('Arial');
    for (let i = 0; i < l; i++) {
        text('❤️', i * 70, 130);
    }
    noSpill();
}

function drawLevelDescription(font1, font2, h) {
    //main
    setupFont(font1, 80, 'green', LEFT);
    text('Sandwhich Time', 40, h - 60);
    //sub
    setupFontOutlined(font2, 26, 'white', LEFT, 'white', 1);
    text('Help Jake find his sandwhich... W, A, D to move.', 80, h - 30);
    noSpill();
}

function drawBandageHeart(w, h) { //reminder: this is half width and height
    //darken background
    fill(0, 0, 0, 90);
    rect(0, 0, w*2, h*2);
    //heart
    fill(0, 0, 0, 1000);
    textSize(450);
    textAlign(CENTER);
    textFont('Arial');
    text('❤️‍🩹', w, h + 150);
    noSpill();
}

function drawRestartDeath(font, w, h) { //reminder: this is half width and height
    //main message
    setupFontOutlined(font, 34, 'black', CENTER, 'grey', 1);
    text('Give all your dosh', w, h - 50);
    text('to Doctor Princess!', w, h - 10);
    noSpill();
    //plaster
    fill('#c9752f');
    rect(w - 200, h, 400, 100, 50);
    fill('#e49658');
    rect(w - 50, h + 5, 100, 90, 20);
    //continue message
    fill('black');
    text('Press F to try again', w, h + 60);
    noSpill();
}

function drawLostLife(font, w, h, l) { //reminder: this is half width and height
    const pointsMessage = l === 1 ? 'stretch' : 'stretches';
    //continue message
    setupFontOutlined(font, 34, 'black', CENTER, 'grey', 1);
    text('Press F to ', w, h - 50);
    text('stretch out of the hole...', w, h - 10);
    noSpill();
    //plaster
    fill('#c9752f');
    rect(w - 200, h, 400, 100, 50);
    fill('#e49658');
    rect(w - 50, h + 5, 100, 90, 20);
    //main message
    fill('black');
    text('Jake has ' + (l) + ' ' + pointsMessage + ' left.', w, h + 60);
    //pickles hint
    if (l === 1) {
        fill('yellow');
        rect(w-280,h+80, 560, 60);
        fill('black');
        text('Hint: Pickles boost your jumping power!', w, h + 120);
        noStroke();
    }
    noSpill();
}

function drawEndGame(font1, font2, w, h, game) { //reminder: this is half width and height
    //fill background
    fill('gold');
    rect(0, 0, w*2, h*2);
    //thanks message
    setupFont(font2, 80, 'yellow');
    text('Thanks for playing', w, h - 80);
    setupFontOutlined(font1, 34, 'black', CENTER, 'grey', 1);
    text('Chill with ya boi, Prismo', w, h - 10);
    noSpill();
    //dosh message
    fill('black');
    text('Wow, you gathered ' + (game.score) + ' dosh!', w, h + 60);
    //all the dosh message
    if (game.score === 3000) {
        // fill('yellow');
        // rect(w-280,h+80, 560, 60);
        fill('black');
        text('That is all the dosh!', w, h + 120);
        noStroke();
    }
    noSpill();
}