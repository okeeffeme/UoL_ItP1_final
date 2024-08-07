/* 
The Game Project
*/

let floorPosY; //I could never decide where this belonged, so I just left it

let gameChar;
let gameState;
let level;

let cameraPosX;

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
	soundPickup.setVolume(0.3);
	soundVictory.setVolume(0.3);
}

function getCameraOffset() {
	if (gameChar.posX - width / 2 >= 0) {
		return gameChar.posX - width / 2;
	}
	return 0;
}

function initChar(floorPosY) {
	gameChar = {
		posX: 260,
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

function initGamestate() {
	gameState = {
		totalWins: 0,
		lives: 3,
		score: 0,
		endGame: false
	};
}


function startGame() {
	level = getCurrentLevel(gameState.totalWins);
	cameraPosX = 0;
}


//// SOUNDS ////
function initCustomSound() {
	env = new p5.Envelope(0.2, 0.3);
	env.setADSR(0.02, 0.2);
	wave = new p5.Oscillator('sawtooth');
	wave.amp(env);
	wave.freq(440)
	wave.start();
}

//Jump and Fall cannot play at the same time, so we're just modifying the same oscillator
function playJumpSound(){
	env.ramp(wave, 0, 0.3, 0);
	wave.freq(600,0.2);
	wave.freq(440);
}

function playFallSound(){
	wave.freq(10,1);
	env.play(wave, 0, 1);
	wave.freq(440);
}

//// SETUP ////
function setup() {
	const w = windowWidth >= 1040 ? windowWidth : 1040;
	const cnv = createCanvas(w, 576);
	cnv.parent('myCanvas');
	floorPosY = height * 3 / 4;
	textFont(font);
	initCustomSound();
	initGamestate();
	initChar(floorPosY);
	startGame();
}

//check finishLine
//TODO look at
function checkFinishline(level) {
	const f = level.finishLine;
	if (dist(f.posX + 35, f.posY, gameChar.posX, gameChar.posY) < 30 && !f.isReached) {
		f.isReached = true;
		soundVictory.play();
	}
	if (gameState.totalWins > 3) {
		gameState.endGame = true;
		drawEndGame(font, fontSandwhich, width/2, height/2, gameState);
	}
}

//handlePlayerMovement
function handlePlayerMovement() {
	if (!level.finishLine.isReached) { //we replace char drawing with finishLine drawing when true
		if (gameChar.isLeft && gameChar.isFalling) {
			drawJakeJumpingLeft(gameChar);
		}
		else if (gameChar.isRight && gameChar.isFalling) {
			drawJakeJumpingRight(gameChar);
		}
		else if (gameChar.isLeft) {
			drawJakeWalkingLeft(gameChar);
		}
		else if (gameChar.isRight) {
			drawJakeWalkingRight(gameChar);
		}
		else if (gameChar.isFalling || gameChar.isPlummeting) {
			drawJakeFrontJumping(gameChar);
		}
		else {
			drawJakeFront(gameChar);
		}
	}
}

///////////INTERACTION CODE//////////
function handleInteraction(level) {
	const withinGameLeft = gameChar.posX >= 40;
	const withinGameRight =  gameChar.posX <= (level.finishLine.posX+(width/2));
	if(!level.finishLine.isReached) {
		let contact = false;
		const p = level.allPlatforms;
		for ( let i = 0; i < p.length; i++) {
			let c = p[i].checkContact(gameChar);
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
		const c = level.allCanyons;
		if (isOverCanyon(c) && gameChar.posY >= floorPosY && !gameChar.isFalling) { //plummeting
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
			const xHeight = height / 2;
			const xWidth = width / 2;
			const nextLife = gameState.lives - 1;
			drawBandageHeart(xWidth, xHeight) //background for all death messages
			if (nextLife === 0) {
				drawRestartDeath(font, xWidth, xHeight);
			} else {
				drawLostLife(font, xWidth, xHeight, nextLife);
			}
		}
	} else {
		initGamestate(); //reset game counters
		startGame();
	}
}

function resetPlayerRun(charInitY) {
	gameState.lives -= 1;
	initChar(charInitY);
}

function nextLevel(charInitY) {
	gameState.totalWins += 1;
	gameState.lives = 3;
	initChar(charInitY);
}

//gather collectable
function gatherCollectable(c) {
	for (let i = 0; i < c.length; i++) {
		let closeEnough = dist(c[i].posX, c[i].posY, gameChar.posX, gameChar.posY) < 45;
		if (closeEnough && !c[i].isFound) {
			soundPickup.play();
			// c[i].size += 8; //grow the collectable before they 'pop'
			// if (c[i].size > 56) {
				c[i].isFound = true;
				gameState.score += c[i].value;
			// }
		}
	}
}

//gather pickle
function picklePickup(p) {
	let closeEnough = dist(p.posX, p.posY, gameChar.posX, gameChar.posY) < 45;
	if (closeEnough && !p.isFound && gameState.lives === 1) {
		soundPickup.play();
		p.isFound = true;
		gameChar.totalJumpPower += p.jumpPower;
	}
}



function draw() {
	cameraPosX = getCameraOffset();
	///////////DRAWING CODE//////////	
	drawBase(gameState.totalWins, floorPosY, width, height);

	push();
	translate(-cameraPosX, 0);

	// canyons is rendered behind everything
	// to handle the cloud level
	drawAssets(level.allCanyons);

	drawAssets(level.allMountains);
	drawAssets(level.allClouds);
	drawAssets(level.allTrees);
 
	drawAssets(level.allPlatforms);
	
	//Interation code
	handleInteraction(level);

	//the game character
	handlePlayerMovement(level);

	drawAssets(level.allCollectables);


	drawFinishline(level.finishLine, font);
	drawPrismo(level.prismo, height);
	if (gameState.lives === 1) {
		drawPickles(level.pickle);
	}
	if (gameState.totalWins === 0) {
		drawLevelDescription(fontSandwhich, font, height);
	}
	pop();

	drawScoreboard(gameState.score, gameState.lives, font);

	gatherCollectable(level.allCollectables);
	picklePickup(level.pickle)
	checkFinishline(level);
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
	} else if (key === 'f' || key === 'F') {
		return 'fInChat';
	}
	return;
}

function keyPressed() {
	// if statements to control the animation of the character when
	// keys are pressed.	
	const validState = !gameChar.isDead && !level.finishLine.isReached;
	const jumpLock = !gameChar.isFalling && !gameChar.isJumping;
	if (validState && !gameChar.isPlummeting) {
		if (checkKey(key) === 'left') {
			gameChar.isLeft = true;
		}
		if (checkKey(key) === 'right') {
			gameChar.isRight = true;
		}
		if (checkKey(key) === 'up' && jumpLock) {
			playJumpSound();
			gameChar.isJumping = true;
		}
	}
	if (gameChar.isDead) { //reset on death
		if (checkKey(key) === 'down' || checkKey(key) === 'fInChat') {
			resetPlayerRun(floorPosY);
		}
	}  
	if (level.finishLine.isReached) { //move to next level
		if (checkKey(key) === 'down' || checkKey(key) === 'fInChat') {
			nextLevel(floorPosY);
			startGame();
		}
	}
	if (gameState.endGame) {
		if(checkKey(key) === 'down' || checkKey(key) === 'fInChat') {
			resetPlayerRun(floorPosY);
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