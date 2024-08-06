/* 
The Game Project
*/

let gameChar;
let floorPosY;
let initPos;

let gameState;

let cameraPosX;

let allCanyons;
let allClouds;
let allCollectables;
let allMountains;
let allTrees;
let allPlatforms;

//assets
let font;
let fontSandwhich;
let soundPickup;
let soundVictory;
let wave;
let env;

function preload() {
	font = loadFont('./assets/EduSABeginner-VariableFont_wght.ttf');
	fontSandwhich = loadFont('./assets/MacondoSwashCaps-Regular.ttf');
	soundPickup = loadSound('./assets/MayGenko-pickup1.wav');
	soundVictory = loadSound('./assets/MayGenko-victory.wav');
}

function getCameraOffset() {
	if (gameChar.posX - width / 2 >= 0) {
		return gameChar.posX - width / 2;
	}
	return 0;
}

function initChar(floorPosY) {
	initPos = width / 4;
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
	

	gameState = {
		totalWins: 0,
		lives: 3,
		score: 0,
	}

	finishLine = {
		posX: 1100,
		posY: floorPosY,
		isReached: false
	};

	allTrees = [];
	allClouds = [];
	allMountains = [];
	initBackground(10);

	allCollectables = [];
	initAssets('coins', [
		{posX: 400, posY: 280}, 
		{posX: 450, posY: 200}, 
		{posX: 500, posY: 280},
		{posX: 610, posY: 200},
		{posX: 690, posY: 300},
		{posX: 770, posY: 400},
		{posX: 870, posY: 300},
		{posX: 960, posY: 400}, 
	]
	);

	allCanyons = [];
	initAssets('canyon', [620,820]);

	allPlatforms = [];
	allPlatforms.push(createPlatforms(350,340,200));

}

function initAssets(type, args) {
	const l = args.length;
	switch (type) {
		case 'canyon':
			for (let i = 0; i < l; i++) {
				allCanyons.push(createCanyon(args[i]));
			}
			return;
		case 'coins':
			for (let i = 0; i < l; i++) {
				const vals = Object.values(args[i]);
				allCollectables.push(createCoin(...vals))
			}
			return;
		
	}
}

function initBackground(l) {
	const rand = (a, b) => Math.floor(random(a, b));
	for (let i = 0; i < l; i++) {
		let c1 = color(rand(90,100), rand(110,120), rand(180,200));
		allMountains.push(createMountains(rand(i*200, i*340), c1, rand(60, 100)));
		let c2 = color(rand(250,255), rand(200,230), rand(200,230));
		allClouds.push(createCloud(rand(i*220, i*340), rand(i*40, 140), c2));
		let c3 = color(rand(10,30), rand(40,100), rand(60,70));
		allTrees.push(createTrees(rand(i*175, i*200), c3));
	}
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

	// noLoop();
}

//check finishLine
//TODO look at
function checkFinishline() {
	if (dist(finishLine.posX, floorPosY, gameChar.posX, gameChar.posY) < 10 && !finishLine.isReached) {
		finishLine.isReached = true;
		soundVictory.play();
	}
	if(finishLine.isReached) {
	// noLoop();
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
function handleInteraction() {
	const withinGameLeft = gameChar.posX >= 40;
	const withinGameRight =  gameChar.posX <= (finishLine.posX+(width/2));
	if(!finishLine.isReached) {
		let contact = false;
		for ( let i = 0; i < allPlatforms.length; i++) {
			let c = allPlatforms[i].checkContact(gameChar);
			if (c) {
				contact = true;
				break
			}
		}
		if (gameChar.isRight && withinGameRight) {
			gameChar.posX += 3; //speed
		}
		if (gameChar.isLeft && withinGameLeft) {
			gameChar.posX -= 3; //speed
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
	if (gameState.lives > 0) {
		if (isPlayerOutOfWorld) { //reset
			char.isDead = true;
			const cHeight = height / 2;
			const cWidth = width / 2;
			const nextLife = gameState.lives - 1;
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
	gameState.lives -= 1;
	initChar(charInitY);
}

function nextLevel(charInitY) {
	gameState.totalWins += 1;
	initChar(charInitY);
}

//gather collectable
function gatherCollectable(c) {
	for (let i = 0; i < c.length; i++) {
		let closeEnough = dist(c[i].posX, c[i].posY, gameChar.posX, gameChar.posY) < 45;
		if (closeEnough && !c[i].isFound) {
			soundPickup.play();
			c[i].size += 7.5; //grow the collectable before they 'pop'
			if (c[i].size > 65) {
				c[i].isFound = true;
				gameState.score += c[i].value;
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


	drawAssets(allCanyons);
	drawAssets(allMountains);
	drawAssets(allClouds);
	drawAssets(allTrees);

	// drawTrees(allTrees);
 
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

	drawScoreboard(gameState.score, gameState.lives, font);

	gatherCollectable(allCollectables);
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
	const validState = !gameChar.isDead && !finishLine.isReached;
	if (validState && !gameChar.isPlummeting) {
		if (checkKey(key) === 'left') {
			gameChar.isLeft = true;
		}
		if (checkKey(key) === 'right') {
			gameChar.isRight = true;
		}
		if (!gameChar.isFalling) {
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

//todo add prismo at end