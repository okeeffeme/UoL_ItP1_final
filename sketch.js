/*

The Game Project

Midterm

Scrolling

*/
let gameChar_x;
let gameChar_y;
let floorPos_y;
let initPos;

let cameraPosX;

let isLeft;
let isRight;
let isJumping;
let isFalling;
let isPlummeting;

let canyons;
let clouds;
let collectables;
let mountains;
let trees;


function isOverCanyon() {
	return gameChar_x > canyons.x_pos + 10 && gameChar_x < canyons.x_pos + (canyons.size - 10);
}

function getCameraOffset() {
	if (gameChar_x - initPos >= 0) {
		return gameChar_x - initPos;
	}
	return 0;
}

function setup() {
	createCanvas(1024, 576);
	initPos = width / 2;
	floorPos_y = height * 3 / 4;
	gameChar_x = initPos;
	gameChar_y = floorPos_y;

	cameraPosX = 0;

	isLeft = false;
	isRight = false;
	isJumping = false;
	isFalling = false;
	isPlummeting = false;

	trees = [
		23, 421, 732, 962, 1231
	]

	clouds = [{
		x_pos: 200,
		y_pos: 140,
		size: random(10,60)
	},
	{
		x_pos: 300,
		y_pos: 60,
		size: random(10,60)
	},
	{
		x_pos: 600,
		y_pos: 40,
		size: random(10,60)
	},
	{
		x_pos: 800,
		y_pos: 80,
		size: random(10,60)
	},
	{
		x_pos: 1100,
		y_pos: 60,
		size: random(10,60)
	}]

	mountains = [{
		x_pos: 20,
		size: random(20,60)
	},
	{
		x_pos: 200,
		size: random(20,60)
	},
	{
		x_pos: 600,
		size: random(20,60)
	},
	{
		x_pos: 800,
		size: random(20,60)
	},
	{
		x_pos: 1100,
		size: random(20,60)
	}]

	collectable = {
		x_pos: 800,
		y_pos: 300,
		size: 50,
		isFound: false
	}

	canyons = {
		x_pos: 120,
		size: 100
	}

}

function draw() {
	cameraPosX = getCameraOffset();
	///////////DRAWING CODE//////////

	background(100, 155, 255); //fill the sky blue


	noStroke();
	fill(0, 155, 0);
	rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground

	push();
	translate(-cameraPosX, 0);

	//draw mountains
	for (let i = 0; i < mountains.length; i++) {
		drawMountain(mountains[i].x_pos, mountains[i].size);
	}
	//draw clouds
	for (let i = 0; i < clouds.length; i++) {
		drawCloud(clouds[i].x_pos, clouds[i].y_pos, clouds[i].size);
	}
	//draw trees
	for (let i = 0; i < trees.length; i++) {
 		if (trees[i]%3 == 1) {
			drawTree2(trees[i], floorPos_y);
		} else if(trees[i]%3 == 2) {
			drawTree3(trees[i], floorPos_y);
		} else {
			drawTree1(trees[i]);
		}
	}
	


	//draw the canyon
	drawCanyon(canyons.x_pos, canyons.size);

	//the game character
	if (isLeft && isFalling) {
		drawJakeJumpingLeft(gameChar_x, gameChar_y);
	}
	else if (isRight && isFalling) {
		drawJakeJumpingRight(gameChar_x, gameChar_y);
	}
	else if (isLeft) {
		drawJakeWalkingLeft(gameChar_x, gameChar_y);
	}
	else if (isRight) {
		drawJakeWalkingRight(gameChar_x, gameChar_y);
	}
	else if (isFalling || isPlummeting) {
		drawJakeFrontJumping(gameChar_x, gameChar_y);
	}
	else {
		drawJakeFront(gameChar_x, gameChar_y);
	}
	//draw collectable
	if (!collectable.isFound) {
		drawCoin(collectable.x_pos, collectable.y_pos, collectable.size);
	}
	pop();



	//gather collectable
	if (dist(collectable.x_pos, collectable.y_pos, gameChar_x, gameChar_y) < 45) {
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
		if (gameChar_y < floorPos_y - 120) {
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
	if (gameChar_y > height + 400) { //reset
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
}