/* 
The Game Project
*/

let gameChar;
let floorPosY;
let initPos;
let isRunning;

let cameraPosX;
let totalWins;
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

let font;
let sandwhichFont;
let soundPickup;

function preload() {
	font = loadFont('./EduSABeginner-VariableFont_wght.ttf');
	sandwhichFont = loadFont('./MacondoSwashCaps-Regular.ttf');
	soundPickup = loadSound('./MayGenko-pickup.wav');
	soundPickup1 = loadSound('./MayGenko-pickup1.wav');
	soundFall = loadSound('./MayGenko-fall.wav');
}

function isOverCanyon(c) {
	let o = false;
	for (let i = 0; i < c.length; i++) {
		if (gameChar.x > c[i].posX + 10 && gameChar.x < c[i].posX + (c[i].size - 10)) {
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

function initChar(floorPosY) {
	isLeft = false;
	isRight = false;
	isJumping = false;
	isFalling = false;
	isPlummeting = false;

	initPos = width / 2;
	gameChar = {
		x: initPos,
		y: floorPosY,
		isDead: false,
	}
}

function startGame() {
	cameraPosX = 0;
	lives = 3;
	score = 0;

	finishLine = {
		posX: 1100,
		posY: floorPosY,
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
			posX: 600,
			posY: 300,
			size: 50,
			isFound: false,
			value: 100
		},
		{
			posX: 1000,
			posY: 300,
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
	textFont(font);
	floorPosY = height * 3 / 4;
	initChar(floorPosY);
	startGame();
	totalWins = 0;
	noLoop();
}

function runGame() {
	isRunning = true;
	loop(); 
}

//check finishLine
function checkFinishline() {
	if (dist(finishLine.posX, floorPosY, gameChar.x, gameChar.y) < 10) {
		finishLine.isReached = true;
	}
	if(finishLine.isReached) {
		console.log('found')

	}
}

//check player death, checkPlayerDie
function checkPlayerDeath(char) {
	const isPlayerOutOfWorld = char.y > height;
	if (lives > 0) {
		if (isPlayerOutOfWorld) { //reset
			char.isDead = true;

			const cHeight = height / 2;
			const cWidth = width / 2;
			const nextLife = lives - 1;
			drawBandageHeart(cWidth, cHeight)
			
			if (nextLife === 0) {
				drawEndGame(font, cWidth, cHeight);
			} else {
				drawLostLife(font, cWidth, cHeight, nextLife);
			}
		}
	} else {
		startGame();
	}
}

function resetPlayerRun(floorPosY) {
	lives -= 1;
	initChar(floorPosY);
}

function nextLevel(floorPosY) {
	totalWins += 1;
	initChar(floorPosY);
}

//gather collectable
function gatherCollectable(c) {
	for (let i = 0; i < c.length; i++) {
		let closeEnough = dist(c[i].posX, c[i].posY, gameChar.x, gameChar.y) < 45;
		if (closeEnough && !c[i].isFound) {
			c[i].size += 7; //grow the collectable before they 'pop'
			if (c[i].size > 65) {
				c[i].isFound = true;
				score += c[i].value;
				soundPickup1.play();
			}
		}
	}
}



function draw() {
	if(isRunning) {
		console.log('running')
	}
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
	if (!finishLine.isReached) { //we replace char with finishLine when true
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
	}

	drawCollectable(allCollectables);
	drawFinishline(finishLine, font);
	drawLevelDescription(sandwhichFont, font);
	pop();

	drawScoreboard(score, lives, font);

	///////////INTERACTION CODE//////////
	//Put conditional statements to move the game character below here
	if(!finishLine.isReached) {
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
		if (isOverCanyon(allCanyons) && gameChar.y >= floorPosY && !isFalling) { //plummeting
			isLeft = false;
			isRight = false;
			isPlummeting = true;
			gameChar.y += 8;
		} else {
			isPlummeting = false;
		}
	}

	gatherCollectable(allCollectables, score);
	checkFinishline();
	checkPlayerDeath(gameChar);

}

function checkKey(key) {
	if (key === 'a' || key === 'A' || key === 'ArrowLeft') {
		return 'left';
	} else if (key === 'd' || key === 'D' || key === 'ArrowRight') {
		return 'right';
	} else if (key === 'w' || key === 'W' || key === 'ArrowUp') {
		return 'up';
	} else if (key === 's' || key === 'S' || key === 'ArrowDown') {
		return 'down';
	}
}

function keyPressed() {
	// if statements to control the animation of the character when
	// keys are pressed.	
	const notFalling = !isFalling && !isPlummeting;
	const validState = !gameChar.isDead && !finishLine.isReached;
	if (validState) {
		if (checkKey(key) === 'left') {
			isLeft = true;
		}
		if (checkKey(key) === 'right') {
			isRight = true;
		}
		if (notFalling) {
			if (checkKey(key) === 'up') {
				soundPickup.play();
				isJumping = true;
			}
		}
	} else if (gameChar.isDead) {
		if (checkKey(key) === 'down' || key === 'f' || key === 'F') {
			resetPlayerRun(floorPosY);
		}
	}  else {
		if (checkKey(key) === 'down' || key === 'f' || key === 'F') {
			nextLevel(floorPosY);
			startGame();
		}
	}
}

function keyReleased() {
	// if statements to control the animation of the character when
	// keys are released.
	if(key === 'a') {
		runGame();
	}
	if (checkKey(key) === "left") {
		isLeft = false;
	}
	if (checkKey(key) === "right") {
		isRight = false;
	}

}