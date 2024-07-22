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
let isJumping = false;
let isFalling = false;
let isPlummeting = false;

let collectable = {
	posX: 400,
	posY: 400,
	size: 50, 
	isFound: false
}

let canyon = {
	posX: 120,
	size: 100
}

function setup() {
	createCanvas(1024, 576);
	floorPos_y = height * 3 / 4;
	gameChar_x = width / 2;
	gameChar_y = floorPos_y;
}

function isOverCanyon() {
	return gameChar_x > canyon.posX+10 && gameChar_x < canyon.posX+(canyon.size- 10) ;
}

function draw() {
	///////////DRAWING CODE//////////

	background(100, 155, 255); //fill the sky blue


	noStroke();
	fill(0, 155, 0);
	rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground

	//draw the canyon
	drawCanyon(canyon.posX, canyon.size);

	//the game character
	if (isLeft && isFalling) {
		drawJakeJumpingLeft(gameChar_x,gameChar_y);
	}
	else if (isRight && isFalling) {
		drawJakeJumpingRight(gameChar_x,gameChar_y);
	}
	else if (isLeft) {
		drawJakeWalkingLeft(gameChar_x,gameChar_y);
	}
	else if (isRight) {
		drawJakeWalkingRight(gameChar_x,gameChar_y);
	}
	else if (isFalling || isPlummeting) {
		drawJakeFrontJumping(gameChar_x,gameChar_y);
	}
	else {
		drawJakeFront(gameChar_x,gameChar_y);
	}

	if (!collectable.isFound) {
		drawCoin(collectable.posX, collectable.posY, collectable.size);
	}

	if (dist(collectable.posX, collectable.posY, gameChar_x,gameChar_y) < 45) {
		collectable.size += 5;
		if (collectable.size > 60) {
			collectable.isFound = true;
		}
	} 

	///////////INTERACTION CODE//////////
	//Put conditional statements to move the game character below here
	if (isRight) {
		gameChar_x += 2;
	}
	if (isLeft) {
		gameChar_x -= 2;
	}
	if (isJumping) {
		gameChar_y -= 8;
		if(gameChar_y < floorPos_y-120) {
			isJumping = false;
		}
	}
	if (gameChar_y < floorPos_y && !isJumping) { //falling
		isFalling = true;
		gameChar_y += 4;
	} else {
		isFalling = false;
	}
	if (isOverCanyon() && gameChar_y >= floorPos_y && !isFalling) { //plummeting
		isLeft = false;
		isRight = false;
		isPlummeting = true;
		gameChar_y += 8;
	} else {
		isPlummeting = false;
	}
	if (gameChar_y > height+400) { //reset
		isFalling = false;
		isPlummeting = false;
		gameChar_y = floorPos_y;
		gameChar_x = width / 2;
	}
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
	if (key === 'w' && !isFalling && !isPlummeting) {
		isJumping = true;
	}

	//open up the console to see how these work
	let consoleCheck = [
		{k: 'keyCode', v: keyCode},
		{k: 'isLeft', v: isLeft},
		{k: 'isRight', v: isRight},
		{k: 'isFalling', v: isFalling},
		{k: 'isPlummeting', v: isPlummeting},
	]
	console.table(consoleCheck);
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

	// console.log("keyReleased: " + key + " keyReleased: " + keyCode);
	// console.log('isLeft ' + isLeft + ' isRight ' + isRight);
	let consoleCheck = [
		{k: 'KeyReleased', v: key},
		{k: 'isLeft', v: isLeft},
		{k: 'isRight', v: isRight},
		{k: 'isFalling', v: isFalling},
		{k: 'isPlummeting', v: isPlummeting},
	]
	console.table(consoleCheck);

}