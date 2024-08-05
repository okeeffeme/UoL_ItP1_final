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

let canyon;
let clouds;
let collectables;
let mountains;
let trees;

let font;
let fontSandwhich;
let soundPickup;
let wave;
let env;

function preload() {
	font = loadFont('./assets/EduSABeginner-VariableFont_wght.ttf');
	fontSandwhich = loadFont('./assets/MacondoSwashCaps-Regular.ttf');
	soundPickup = loadSound('./assets/MayGenko-pickup1.wav');
}

function getCameraOffset() {
	if (gameChar.posX - initPos >= 0) {
		return gameChar.posX - initPos;
	}
	return 0;
}

function initChar(floorPosY) {
	initPos = width / 2;
	gameChar = {
		posX: initPos,
		posY: floorPosY,
		isLeft: false,
		isRight: false,
		isJumping: false,
		isFalling: false,
		isPlummeting: false,
		isDead: false,
	}
}

function setIsPlummeting() {
	if(!gameChar.isPlummeting) {
		gameChar.isFalling = false;
		gameChar.isLeft = false;
		gameChar.isRight = false;
		gameChar.isPlummeting = true;
		playFallSound();
	}
}


function isOverCanyon(c) {
	let o = false;
	for (let i = 0; i < c.length; i++) {
		if (gameChar.posX > c[i].posX + 10 && gameChar.posX < c[i].posX + (c[i].size - 10)) {
			o = true;
			break;
		}
	}
	return o;
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

function initCustomSound() {
	env = new p5.Envelope();
	env.setADSR(0.04, 0.2);
	wave = new p5.Oscillator('sawtooth');
	wave.amp(env);
	wave.freq(440)
	wave.start();
}

//Jump and Fall cannot play at the same time, so we're just modifying the same wave
function playJumpSound(){
	env.ramp(wave, 0, 1.2, 0);
	// env.play();
	wave.freq(600,0.2);
	wave.freq(440);
}

function playFallSound(){
	wave.freq(10,1);
	env.play(wave, 0, 1);
	wave.freq(440);
}

function setup() {
	createCanvas(1024, 576);
	textFont(font);
	floorPosY = height * 3 / 4;
	initChar(floorPosY);
	initCustomSound();
	startGame();
	totalWins = 0;
	// noLoop();
}

function runGame() {
	isRunning = true;
	loop(); 
}

//check finishLine
function checkFinishline() {
	if (dist(finishLine.posX, floorPosY, gameChar.posX, gameChar.posY) < 10) {
		finishLine.isReached = true;
	}
	if(finishLine.isReached) {
		console.log('found')
	}
}

//handlePlayerMovement
function handlePlayerMovement() {
	if (!finishLine.isReached) { //we replace char drawing with finishLine drawing when true
		if (gameChar.isLeft && gameChar.isFalling) {
			drawJakeJumpingLeft(gameChar.posX, gameChar.posY);
		}
		else if (gameChar.isRight && gameChar.isFalling) {
			drawJakeJumpingRight(gameChar.posX, gameChar.posY);

		}
		else if (gameChar.isLeft) {
			drawJakeWalkingLeft(gameChar.posX, gameChar.posY);
		}
		else if (gameChar.isRight) {
			drawJakeWalkingRight(gameChar.posX, gameChar.posY);
		}
		else if (gameChar.isFalling || gameChar.isPlummeting) {
			drawJakeFrontJumping(gameChar.posX, gameChar.posY);
		}
		else {
			drawJakeFront(gameChar.posX, gameChar.posY);
		}
	}
}

//checkPlayerDie
function checkPlayerDeath(char) {
	const isPlayerOutOfWorld = char.posY > height;
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
		let closeEnough = dist(c[i].posX, c[i].posY, gameChar.posX, gameChar.posY) < 45;
		if (closeEnough && !c[i].isFound) {
			soundPickup.play();
			c[i].size += 7; //grow the collectable before they 'pop'
			if (c[i].size > 65) {
				c[i].isFound = true;
				score += c[i].value;
			}
		}
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
	handlePlayerMovement();

	drawCollectable(allCollectables);
	drawFinishline(finishLine, font);
	drawLevelDescription(fontSandwhich, font);
	pop();

	drawScoreboard(score, lives, font);

	///////////INTERACTION CODE//////////
	//Put conditional statements to move the game character below here
	if(!finishLine.isReached) {
		if (gameChar.isRight) {
			gameChar.posX += 2;
		}
		if (gameChar.isLeft) {
			gameChar.posX -= 2;
		}
		if (gameChar.isJumping) {
			gameChar.posY -= 8;
			if (gameChar.posY < floorPosY - 120) {
				gameChar.isJumping = false;
			}
			
			
		}
		if (gameChar.posY < floorPosY && !gameChar.isJumping) { //falling
			gameChar.isFalling = true;
			gameChar.posY += 4;
		} else {
			gameChar.isFalling = false;
		}
		if (isOverCanyon(allCanyons) && gameChar.posY >= floorPosY && !gameChar.isFalling) { //plummeting
			setIsPlummeting()
			gameChar.posY += 8;
		} else {
			gameChar.isPlummeting = false;
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
	const notFalling = !gameChar.isFalling && !gameChar.isPlummeting;
	const validState = !gameChar.isDead && !finishLine.isReached;
	console.log('gameChar.isDead', gameChar.isDead)
	if (validState) {
		if (checkKey(key) === 'left') {
			gameChar.isLeft = true;
		}
		if (checkKey(key) === 'right') {
			gameChar.isRight = true;
		}
		if (notFalling) {
			if (checkKey(key) === 'up') {
				// soundPickup.play();
				//env.play();
				playJumpSound();
				gameChar.isJumping = true;
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
	// if(key === 'a') {
	// 	runGame();
	// }
	if (checkKey(key) === "left") {
		gameChar.isLeft = false;
	}
	if (checkKey(key) === "right") {
		gameChar.isRight = false;
	}

}