/*

The Game Project

Week 3

Game interaction

*/
let gameChar_x;
let gameChar_y;
let floorPos_y;

let isLeft = false;
let isRight = false;
let isFalling = false;
let isPlummeting = false;

const colorFur = '#F5BB12';
const colorFurLight = '#f5CD3D';

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

function setup() {
	createCanvas(1024, 576);
	floorPos_y = height * 3 / 4;
	gameChar_x = width / 2;
	gameChar_y = floorPos_y;
}

function draw() {
	///////////DRAWING CODE//////////

	background(100, 155, 255); //fill the sky blue


	noStroke();
	fill(0, 155, 0);
	rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground

	//draw the canyon
	fill(70, 30, 0);
	rect(120, 432, 110, 144);
	
	if (gameChar_y < floorPos_y) {
		isFalling = true;
		gameChar_y += 1;
	} else {
		isFalling = false;
	}

	//the game character
	if (isLeft && isFalling) {
		strokeWeight(5);
		stroke(colorFur);
		noFill()
		arc(gameChar_x + 6, gameChar_y - 2, 40, 40, 3.4, 4.4); //leg front
		arc(gameChar_x + 30, gameChar_y - 24, 40, 40, 2.2, 16); //leg back
		noStroke();
		drawBody(gameChar_x, gameChar_y);
		drawFoot(gameChar_x, gameChar_y, -16, 6);
		drawFootVertical(gameChar_x, gameChar_y, 20, 4);
		drawMouthSide(gameChar_x, gameChar_y);

		strokeWeight(5);
		noFill();
		stroke(colorFurLight);
		arc(gameChar_x - 7, gameChar_y - 40, 30, 10, 6, 14); //arm front

		drawEarSide(gameChar_x, gameChar_y);
		drawEye(gameChar_x, gameChar_y, -11, 2);
	}
	else if (isRight && isFalling) {
		strokeWeight(5);
		stroke(colorFur);
		noFill();
		arc(gameChar_x - 6, gameChar_y - 2, 40, 40, 5, 6); //legs
		arc(gameChar_x - 26, gameChar_y - 25, 40, 40, .2, 1.2); //legs
		noStroke();
		drawBody(gameChar_x, gameChar_y);
		drawFootVertical(gameChar_x, gameChar_y, -19, 4);
		drawFoot(gameChar_x, gameChar_y, 16, 6);
		drawMouthSide(gameChar_x, gameChar_y, 12);

		strokeWeight(5);
		noFill();
		stroke(colorFurLight);
		arc(gameChar_x + 10, gameChar_y - 40, 30, 10, 2, 3.3); //arm front

		drawEarSide(gameChar_x, gameChar_y, -6);
		drawEye(gameChar_x, gameChar_y, 11, 2);
	}
	else if (isLeft) {
		gameChar_x -= 1;
		strokeWeight(5);
		stroke(colorFur);
		noFill();
		arc(gameChar_x, gameChar_y - 2, 20, 70, PI, PI * 2); //legs
		noStroke();
		drawBody(gameChar_x, gameChar_y);
		drawFoot(gameChar_x, gameChar_y, 8);
		drawFoot(gameChar_x, gameChar_y, -12, 4);
		drawMouthSide(gameChar_x, gameChar_y);

		strokeWeight(5);
		noFill();
		stroke(colorFurLight);
		arc(gameChar_x - 14, gameChar_y - 54, 40, 50, 0.5, PI * .4); //arm front

		drawEarSide(gameChar_x, gameChar_y);
		drawEye(gameChar_x, gameChar_y, -11, 2);
	}
	else if (isRight) {
		gameChar_x += 1;
		strokeWeight(5);
		stroke(colorFur);
		noFill();
		arc(gameChar_x, gameChar_y - 2, 20, 70, PI, PI * 2); //legs
		noStroke();
		drawBody(gameChar_x, gameChar_y);
		drawFoot(gameChar_x, gameChar_y, -8);
		drawFoot(gameChar_x, gameChar_y, 12, 4);
		drawMouthSide(gameChar_x, gameChar_y, 12);

		strokeWeight(5);
		noFill();
		stroke(colorFurLight);
		arc(gameChar_x + 14, gameChar_y - 54, 40, 50, 1.9, 2.6); //arm front

		drawEarSide(gameChar_x, gameChar_y, -6);
		drawEye(gameChar_x, gameChar_y, 11, 2);

	}
	else if (isFalling || isPlummeting) {
		drawBody(gameChar_x, gameChar_y);
		drawFoot(gameChar_x, gameChar_y, 12, 8);
		drawFoot(gameChar_x, gameChar_y, -12, 8);

		strokeWeight(5);
		stroke(colorFur);
		noFill();
		arc(gameChar_x, gameChar_y - 70, 40, 50, PI * 2, PI); //arms
		arc(gameChar_x, gameChar_y - 10, 20, 60, PI - .4, PI * 2 + .4); //legs
		drawEye(gameChar_x, gameChar_y, -8);
		drawEye(gameChar_x, gameChar_y, 8);
		drawMouthFront(gameChar_x, gameChar_y);
	}
	else {
		drawBody(gameChar_x, gameChar_y);
		drawFoot(gameChar_x, gameChar_y, 12);
		drawFoot(gameChar_x, gameChar_y, -12);
		strokeWeight(5);
		stroke(colorFur);
		noFill();
		arc(gameChar_x, gameChar_y - 30, 40, 50, PI, PI * 2); //arms
		arc(gameChar_x, gameChar_y - 2, 20, 70, PI, PI * 2); //legs
		drawEye(gameChar_x, gameChar_y, -8);
		drawEye(gameChar_x, gameChar_y, 8);
		drawMouthFront(gameChar_x, gameChar_y);
	}

	///////////INTERACTION CODE//////////
	//Put conditional statements to move the game character below here
	circle(mouseX, mouseY, 20);

}


function keyPressed() {
	// if statements to control the animation of the character when
	// keys are pressed.
	if (key === 'a' || keyCode === 65) {
		isLeft = true;
	}
	if (key === 'd' || keyCode === 68) {
		isRight = true;
	}
	if (key === 'w' && isFalling === false) {
		gameChar_y -= 100;
	}

	//open up the console to see how these work
	console.log("keyPressed key: " + key + " keyPressed keyCode: " + keyCode);
	console.log('isLeft ' + isLeft + ' isRight ' + isRight);
}

function keyReleased() {
	// if statements to control the animation of the character when
	// keys are released.

	if (key === 'a' || keyCode === 65) {
		isLeft = false;
	}
	if (key === 'd' || keyCode === 68) {
		isRight = false;
	}
	// if (key === 'w' || keyCode === 87) {
	// 	gameChar_y += 100;
	// }

	console.log("keyReleased: " + key + " keyReleased: " + keyCode);
	console.log('isLeft ' + isLeft + ' isRight ' + isRight);

}