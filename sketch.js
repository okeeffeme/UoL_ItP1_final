/* 
The Game Project
*/

let gameChar;
let floorPosY;
let initPos;

let cameraPosX;
let lives;
let score;

let isLeft;
let isRight;
let isJumping;
let isFalling;
let isPlummeting;

let canyon;
let clouds;
let collectables;
let mountains;
let trees;


function isOverCanyon() {
	let o = false;
	for (let i = 0; i < allCanyons.length; i++) {
		if (gameChar.x > allCanyons[i].posX + 10 && gameChar.x < allCanyons[i].posX + (allCanyons[i].size - 10)) {
			o = true;
			break;
		}
	}
	return o;
}

function getCameraOffset() {
	if (gameChar.x - initPos >= 0) {
		return gameChar.x - initPos;
	}
	return 0;
}

function startGame() {
	cameraPosX = 0;
	lives = 3;
	score = 0;

	isLeft = false;
	isRight = false;
	isJumping = false;
	isFalling = false;
	isPlummeting = false;

	finishLine = {
		posX: 1000,
		posY: floorPosY - 100,
		isReached: false
	}

	allTrees = [
		{ posX: 23 },
		{ posX: 421 },
		{ posX: 732 },
		{ posX: 962 },
		{ posX: 1231, color: colorYellow }
	]

	allClouds = [{
		posX: 200,
		posY: 140,
		size: random(10, 60)
	},
	{
		posX: 300,
		posY: 60,
		size: random(10, 60)
	},
	{
		posX: 600,
		posY: 40,
		size: random(10, 60)
	},
	{
		posX: 800,
		posY: 80,
		size: random(10, 60)
	},
	{
		posX: 1100,
		posY: 60,
		size: random(10, 60)
	}]

	allMountains = [{
		posX: 20,
		size: random(20, 60)
	},
	{
		posX: 200,
		size: random(20, 60)
	},
	{
		posX: 600,
		size: random(20, 60)
	},
	{
		posX: 800,
		size: random(20, 60)
	},
	{
		posX: 1100,
		size: random(20, 60)
	}]

	allCollectables = [
		{
			posX: 700,
			posY: 200,
			size: 50,
			isFound: false,
			value: 100
		},
		{
			posX: 600,
			posY: 400,
			size: 50,
			isFound: false,
			value: 100
		},
		{
			posX: 800,
			posY: 300,
			size: 50,
			isFound: false,
			value: 100
		},
	]

	allCanyons = [
		{
			posX: 120,
			size: 100
		},
		{
			posX: 620,
			size: 100
		},
		{
			posX: 820,
			size: 100
		}
	]
}

function setup() {
	createCanvas(1024, 576);
	initPos = width / 2;
	floorPosY = height * 3 / 4;
	gameChar = {
		x: initPos,
		y: floorPosY,
	}
	startGame();
}

//check finishLine
function checkFinishline(){
	if (dist(finishLine.posX, floorPosY, gameChar.x, gameChar.y) < 10) {
		finishLine.isReached = true;
	}
}

//check player death
function checkJakeFall(){
	if(lives > 0){
		if (gameChar.y > height) { //reset
			textSize(500);
			text('❤️‍🩹', (width / 2) - 340, (height / 2) + 150)
			if (gameChar.y > height + 300) {
				lives -= 1;
				isFalling = false;
				isPlummeting = false;
				gameChar.y = floorPosY;
				gameChar.x = width / 2;
			}
		}
	} else {
		startGame();
	}
	
}

function draw() {
	cameraPosX = getCameraOffset();
	///////////DRAWING CODE//////////
	background(100, 155, 255); //fill the sky blue
	noStroke();
	fill(0, 155, 0);
	rect(0, floorPosY, width, height - floorPosY); //draw some green ground


	push();
	translate(-cameraPosX, 0);

	drawMountains(allMountains);
	drawClouds(allClouds);
	drawTrees(allTrees);
	drawCanyons(allCanyons);

	//the game character
	if (isLeft && isFalling) {
		drawJakeJumpingLeft(gameChar.x, gameChar.y);
	}
	else if (isRight && isFalling) {
		drawJakeJumpingRight(gameChar.x, gameChar.y);
	}
	else if (isLeft) {
		drawJakeWalkingLeft(gameChar.x, gameChar.y);
	}
	else if (isRight) {
		drawJakeWalkingRight(gameChar.x, gameChar.y);
	}
	else if (isFalling || isPlummeting) {
		drawJakeFrontJumping(gameChar.x, gameChar.y);
	}
	else {
		drawJakeFront(gameChar.x, gameChar.y);
	}

	drawCollectable(allCollectables);
	drawFinishline(finishLine);

	
	pop();

	textSize(60);
	fill(225, 210, 0);

	text(`dosh ` + score, 15, 70);

	for (let i = 0; i < lives; i++) {
		text('❤️', i * 70, 130)
	}

	//gather collectable
	for (let i = 0; i < allCollectables.length; i++) {
		let closeEnough = dist(allCollectables[i].posX, allCollectables[i].posY, gameChar.x, gameChar.y) < 45;
		if (closeEnough && !allCollectables[i].isFound) {
			allCollectables[i].size += 5;
			if (allCollectables[i].size > 70) {
				allCollectables[i].isFound = true;
				score += allCollectables[i].value;
			}
		}
	}

	///////////INTERACTION CODE//////////
	//Put conditional statements to move the game character below here
	if (isRight) {
		gameChar.x += 2;
	}
	if (isLeft) {
		gameChar.x -= 2;
	}
	if (isJumping) {
		gameChar.y -= 8;
		if (gameChar.y < floorPosY - 120) {
			isJumping = false;
		}
	}
	if (gameChar.y < floorPosY && !isJumping) { //falling
		isFalling = true;
		gameChar.y += 4;
	} else {
		isFalling = false;
	}
	if (isOverCanyon() && gameChar.y >= floorPosY && !isFalling) { //plummeting
		isLeft = false;
		isRight = false;
		isPlummeting = true;
		gameChar.y += 8;
	} else {
		isPlummeting = false;
	}
	
	checkJakeFall();
	checkFinishline();
}


function keyPressed() {
	// if statements to control the animation of the character when
	// keys are pressed.
	const notFalling = !isFalling && !isPlummeting;
	if (key === 'a' || key === 'ArrowLeft') {
		isLeft = true;
	}
	if (key === 'd' || key === 'ArrowRight') {
		isRight = true;
	}
	if (key === 'w' && notFalling || key === 'ArrowUp' && notFalling) {
		isJumping = true;
	}
}

function keyReleased() {
	// if statements to control the animation of the character when
	// keys are released.

	if (key === 'a' || key === 'ArrowLeft') {
		isLeft = false;
	}
	if (key === 'd' || key === 'ArrowRight') {
		isRight = false;
	}
}