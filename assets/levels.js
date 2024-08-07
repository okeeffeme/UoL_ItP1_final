function drawBase(level, floorY, w, h) {
	switch (level) {
		case 0: //treehouse
			background('CornflowerBlue'); //sky
			fill(0, 155, 0);
			rect(0, floorY, w, h - floorY); //ground
			break;
		case 1: //candykingdom
			background('LavenderBlush'); //sky
			fill('SlateBlue');
			rect(0, floorY, w, h - floorY); //ground
			break;
		case 2: //sky
			background('lavender'); //fill the sky
			break;
		default: //prismo
			background('yellow'); //wall
			fill('gold');
			rect(0, floorY, w, h - floorY); //floor
			break;
	}
}

function handleType(level, type, options) {
	switch (type) {
		case 'canyon':
			return level.allCanyons.push(createCanyon(...options));
		case 'clouds':
			return level.allClouds.push(createCloud(...options)); 
		case 'coins':
			return level.allCollectables.push(createCoin(...options));
		case 'mountains':
			return level.allMountains.push(createMountain(...options));
		case 'platforms':
			return level.allPlatforms.push(createPlatforms(...options));
		case 'trees':
			return level.allTrees.push(createTrees(...options));
		default:
			return;
	}
}

function createOptions(i, type, c, extra) {
	const rand = (a, b) => Math.floor(random(a, b));
	const cRand = color(rand(c.rl, c.rh), rand(c.gl, c.gh), rand(c.bl, c.bh));
	switch (type) {
		case 'mountains':
			return [rand(i * 200, i * 340), cRand, rand(60, 100)];
		case 'clouds':
			return [rand(i * 100, i * 200), rand(20, extra), cRand];
		case 'trees':
			return [rand(i * 175, i * 200), cRand];
		default:
			return;
	}
}

function initAssets(level, type, options) {
	const l = options.length;
	for (let i = 0; i < l; i++) {
		const vals = Object.values(options[i]);
		handleType(level, type, vals);
	}
};

function initBackground(level, type, num, c, extra) {
	const yLock = extra === 'extraClouds' ? height : 140; 
	for (let i = 0; i <= num; i++) {
		const options = createOptions(i, type, c, yLock);
		handleType(level, type, options);
	}
}

function initLevel (floor, finish) {
	const l = {
		allTrees: [],
		allClouds: [],
		allMountains: [],
		allCollectables: [],
		allCanyons: [],
		allPlatforms: [],
		finishLine: {
			posX: finish,
			posY: floor,
			isReached: false
		},
		pickle: {
			posX: 100,
			posY: floor,
			isFound: false,
			value: 0,
			jumpPower: 20
		},
		prismo: {
			posX: finish + (width / 2) + 300,
			posY: floor,
		}
	};

	return l;
}

function initLevel_0(floorPosY) { //treehouse
	let level = new initLevel(floorPosY, 1100);
	
	initBackground(level, 'trees', 10, { 
		rl: 10, 
		rh: 30, 
		gl: 40, 
		gh: 100, 
		bl: 60, 
		bh: 70 
	});

	initBackground(level,'clouds', 10, { 
		rl: 210, 
		rh: 220, 
		gl: 200, 
		gh: 220, 
		bl: 220, 
		bh: 240 
	});

	initBackground(level,'mountains', 10, { 
		rl: 90, 
		rh: 100, 
		gl: 110, 
		gh: 120, 
		bl: 180, 
		bh: 200 
	});

	initAssets(level, 'coins', [
		{ posX: 400, posY: 280 },
		{ posX: 450, posY: 200 },
		{ posX: 500, posY: 280 },
		{ posX: 450, posY: 400, value: 50, size: 40 },
		{ posX: 600, posY: 400, value: 50, size: 40 },
		{ posX: 610, posY: 200 },
		{ posX: 690, posY: 300 },
		{ posX: 770, posY: 400 },
		{ posX: 870, posY: 300 },
		{ posX: 960, posY: 400 },
		{ posX: 1300, posY: 400, value: 50, size: 40 },
		{ posX: 1600, posY: 400, value: 50, size: 40 },

	]);

	initAssets(level, 'canyon', [{posX: 620}, {posX: 820}]);

	initAssets(level, 'platforms', [
		{ posX: 350, posY: 340, length: 200},
	]
	);

	return level;
}

function initLevel_1() { //candykingdom
	let level = new initLevel(floorPosY, 1100);

	initBackground(level, 'trees', 10,  { 
		rl: 230, 
		rh: 255, 
		gl: 80, 
		gh: 115, 
		bl: 120, 
		bh: 180
	});

	initBackground(level, 'clouds', 20, { 
		rl: 250, 
		rh: 255, 
		gl: 200, 
		gh: 230, 
		bl: 200, 
		bh: 230 
	});

	initBackground(level, 'mountains', 10, { 
		rl: 138, 
		rh: 216, 
		gl: 112, 
		gh: 191, 
		bl: 216, 
		bh: 226 
	});

	initAssets(level, 'coins', [
		{ posX: 400, posY: 280 },
		{ posX: 450, posY: 200 },
		{ posX: 500, posY: 280 },
		{ posX: 640, posY: 180 },
		{ posX: 700, posY: 180 },
		{ posX: 760, posY: 180 },
		{ posX: 910, posY: 80 },
		{ posX: 970, posY: 80 },
		{ posX: 1030, posY: 80 },
		{ posX: 760, posY: 400, value: 50, size: 40 },
		{ posX: 980, posY: 400, value: 50, size: 40 },
	]);

	initAssets(level, 'canyon', [
		{posX: 560, length: 140}, 
		{posX: 820, length: 140}]
	);

	initAssets(level, 'platforms', [
		{ posX: 350, posY: 340, length: 200},
		{ posX: 604, posY: 220, length: 200},
		{ posX: 872, posY: 120, length: 200},
	]);

	return level;
}


function initLevel_2() { //sky
	let level = new initLevel(floorPosY, 1080);

	//no trees or mountains for cloud level

	initBackground(level, 'clouds', 40, { 
		rl: 240, 
		rh: 248, 
		gl: 248, 
		gh: 255, 
		bl: 200, 
		bh: 255 
	}, 'extraClouds');

	initAssets(level, 'coins', [
		{ posX: 390, posY: 300 },
		{ posX: 440, posY: 300 },
		{ posX: 490, posY: 300 },
		{ posX: 650, posY: 180 },
		{ posX: 700, posY: 180 },
		{ posX: 750, posY: 180 },
		{ posX: 920, posY: 80 },
		{ posX: 970, posY: 80 },
		{ posX: 1020, posY: 80 },
		{ posX: 1110, posY: 200, value: 50, size: 40 },
		{ posX: 1110, posY: 300, value: 50, size: 40 },
	]);

	initAssets(level, 'canyon', [
		{posX: 280, length: width, fill: 'lavender'}, 
	]);

	initAssets(level, 'platforms', [
		{ posX: 80, posY: floorPosY, length: 200},
		{ posX: 350, posY: 340, length: 200},
		{ posX: 604, posY: 220, length: 200},
		{ posX: 872, posY: 120, length: 200},
	]);

	return level;
}


function initLevel_3(level) { //prismo
	level = new initLevel(floorPosY, 700);

	//just prismo on the final level

	level.prismo = {
		posX: level.finishLine.posX + 300,
	}

	return level;
}

function getCurrentLevel(wins) {
	switch (wins) {
		case 0:
			return initLevel_0(floorPosY);
		case 1:
			return initLevel_1(floorPosY);
		case 2:
			return initLevel_2(floorPosY);
		default:
			return initLevel_3(floorPosY);
	}
}