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

let allCanyons;
let allClouds;
let allCollectables;
let allMountains;
let allTrees;
let allPlatforms;

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
		totalJumpPower: 120,
		currentJumpPower: 120,
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
	let isOver = false;
	for (let i = 0; i < c.length; i++) {
		if (gameChar.posX > c[i].posX + 10 && gameChar.posX < c[i].posX + (c[i].size - 10)) {
			isOver = true;
			break;
		}
	}
	return isOver;
}




function startGame() {
	cameraPosX = 0;
	lives = 3;
	score = 0;

	finishLine = {
		posX: 1100,
		posY: floorPosY,
		isReached: false
	};

	allTrees = [
		{ posX: 23 },
		{ posX: 421 },
		{ posX: 732 },
		{ posX: 962 },
		{ posX: 1231, color: colorYellow }
	];

	allClouds = [
	// 	{
	// 	posX: 200,
	// 	posY: 140,
	// 	size: random(10, 60)
	// },
	// {
	// 	posX: 300,
	// 	posY: 60,
	// 	size: random(10, 60)
	// },
	// {
	// 	posX: 600,
	// 	posY: 40,
	// 	size: random(10, 60)
	// },
	// {
	// 	posX: 800,
	// 	posY: 80,
	// 	size: random(10, 60)
	// },
	// {
	// 	posX: 1100,
	// 	posY: 60,
	// 	size: random(10, 60)
	// }
];
	allClouds.push(createCloud(100,100, 'pink'))

	allMountains = [
	// 	{
	// 	posX: 20,
	// 	size: random(20, 60)
	// },
	// {
	// 	posX: 200,
	// 	size: random(20, 60)
	// },
	// {
	// 	posX: 600,
	// 	size: random(20, 60)
	// },
	// {
	// 	posX: 800,
	// 	size: random(20, 60)
	// },
	// {
	// 	posX: 1100,
	// 	size: random(20, 60)
	// }
];
	allMountains.push(createMountains(10, 100, 'pink'))
	allCollectables = [
		// {
		// 	posX: 600,
		// 	posY: 300,
		// 	size: 50,
		// 	isFound: false,
		// 	value: 100
		// },
		// {
		// 	posX: 1000,
		// 	posY: 300,
		// 	size: 50,
		// 	isFound: false,
		// 	value: 100
		// },
		// {
		// 	posX: 800,
		// 	posY: 300,
		// 	size: 50,
		// 	isFound: false,
		// 	value: 100
		// },
	];
	allCollectables.push(createCoin(400,300, 100))
	console.log(allCollectables)

	allCanyons = [];
	allCanyons.push(createCanyon(620))
	allCanyons.push(createCanyon(820))

	allPlatforms = [];
	allPlatforms.push(createPlatforms(300,340,200));
}

function initCustomSound() {
	env = new p5.Envelope();
	env.setADSR(0.04, 0.2);
	wave = new p5.Oscillator('sawtooth');
	wave.amp(env);
	wave.freq(440)
	wave.start();
}

//Jump and Fall cannot play at the same time, so we're just modifying the same oscillator
function playJumpSound(){
	env.ramp(wave, 0, 1.2, 0);
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

///////////INTERACTION CODE//////////
function handleInteraction(b) {
	if(!finishLine.isReached) {
		let contact = false;
		for ( let i = 0; i < allPlatforms.length; i++) {
			let c = allPlatforms[i].checkContact(gameChar);
			if (c) {
				contact = true;
				break
			}
		}
		if (gameChar.isRight) {
			gameChar.posX += 2;
		}
		if (gameChar.isLeft) {
			gameChar.posX -= 2;
		}
		if (gameChar.isJumping && gameChar.currentJumpPower > 0) {
				gameChar.posY -= 8;
				gameChar.currentJumpPower -= 8;
			} else {
				gameChar.isJumping = false;
				gameChar.currentJumpPower = gameChar.totalJumpPower; //reset jump power
			}
		
		if (gameChar.posY < floorPosY && !gameChar.isJumping && !contact) { //falling
				gameChar.isFalling = true;
				gameChar.posY += 4;
		} else {
			gameChar.isFalling = false;
		}
		if (isOverCanyon(allCanyons) && gameChar.posY >= floorPosY && !gameChar.isFalling) { //plummeting
			setIsPlummeting();
			gameChar.posY += 8;
		} else {
			gameChar.isPlummeting = false;
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
			drawBandageHeart(cWidth, cHeight) //background for all death messages
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

function resetPlayerRun(charInitY) {
	lives -= 1;
	initChar(charInitY);
}

function nextLevel(charInitY) {
	totalWins += 1;
	initChar(charInitY);
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
	noStroke();
	background(100, 155, 255); //fill the sky blue
	fill(0, 155, 0);
	rect(0, floorPosY, width, height - floorPosY); //draw some green ground

	push();
	translate(-cameraPosX, 0);

	drawTrees(allTrees);
	
	drawAssets(allCanyons);
	drawAssets(allMountains);
	drawAssets(allClouds);
	drawAssets(allPlatforms);
	
	//Interation code
	handleInteraction();

	//the game character
	handlePlayerMovement();

	// drawCollectable(allCollectables);
	drawAssets(allCollectables);


	drawFinishline(finishLine, font);
	drawLevelDescription(fontSandwhich, font);
	pop();

	drawScoreboard(score, lives, font);

	

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
	if (validState) {
		if (checkKey(key) === 'left') {
			gameChar.isLeft = true;
		}
		if (checkKey(key) === 'right') {
			gameChar.isRight = true;
		}
		if (notFalling) {
			if (checkKey(key) === 'up') {
				playJumpSound();
				gameChar.isJumping = true;
			}
		}
	} else if (gameChar.isDead) { //reset on death
		if (checkKey(key) === 'down' || key === 'f' || key === 'F') {
			resetPlayerRun(floorPosY);
		}
	}  else { //move to next level
		if (checkKey(key) === 'down' || key === 'f' || key === 'F') {
			nextLevel(floorPosY);
			startGame();
		}
	}
}

function keyReleased() {
	// if statements to control the animation of the character when
	// keys are released.
	if (checkKey(key) === "left") {
		gameChar.isLeft = false;
	}
	if (checkKey(key) === "right") {
		gameChar.isRight = false;
	}

}