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

let canyon;
let clouds;
let collectables;
let mountains;
let trees;


function isOverCanyon() {
	let o = false;
	for (let i = 0; i < allCanyons.length; i++) {
		console.log('canyoncheckInner', o)
		if(gameChar_x > allCanyons[i].posX + 10 && gameChar_x < allCanyons[i].posX + (allCanyons[i].size - 10)){
			o = true;
			break;
		}
	}
	return o;
}

function getCameraOffset() {
	if (gameChar_x - initPos >= 0) {
		return gameChar_x - initPos;
	}
	return 0;
}
//draw mountains
function drawMountains() {
	for (let i = 0; i < allMountains.length; i++) {
		drawMountain(allMountains[i].posX, allMountains[i].size);
	}
}

//draw clouds
function drawClouds() {
	for (let i = 0; i < allClouds.length; i++) {
		drawCloud(allClouds[i].posX, allClouds[i].posY, allClouds[i].size);
	}
}

//draw trees
function drawTrees() {
	for (let i = 0; i < allTrees.length; i++) {
		if (allTrees[i] % 3 == 1) {
			drawTree2(allTrees[i], floorPos_y);
		} else if (allTrees[i] % 3 == 2) {
			drawTree3(allTrees[i], floorPos_y);
		} else {
			drawTree1(allTrees[i]);
		}
	}
}

//draw canyons
function drawCanyons() {
	for (let i = 0; i < allCanyons.length; i++) {
		drawCanyon(allCanyons[i]);
	}
}

function checkCollectable(item) {
	if (!item.isFound) {
		return true;
	} else {
		return false;
	}
}

//draw collectable
function drawCollectable(allCollectables) {
	for (let i = 0; i < allCollectables.length; i++) {
		if (checkCollectable(allCollectables[i])) {
			drawCoin(allCollectables[i]);
		}
	}
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

	allTrees = [
		23, 421, 732, 962, 1231
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
			isFound: false
		},
		{
			posX: 600,
			posY: 400,
			size: 50,
			isFound: false
		},
		{
			posX: 800,
			posY: 300,
			size: 50,
			isFound: false
		},
	]

	allCanyons = [
		{
			posX: 120,
			size: 100
		},
		{
			posX: 420,
			size: 100
		},
		{
			posX: 620,
			size: 100
		}
	]

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

	drawMountains();
	drawClouds();
	drawTrees();
	drawCanyons();

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

	drawCollectable(allCollectables);

	pop();



	//gather collectable
	for (let i = 0; i < allCollectables.length; i++) {
		if (dist(allCollectables[i].posX, allCollectables[i].posY, gameChar_x, gameChar_y) < 45) {
			allCollectables[i].size += 5;
			if (allCollectables[i].size > 60) {
				allCollectables[i].isFound = true;
			}
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