function drawBase(level) {
	switch (level) {
		case 0: //treehouse
			background('CornflowerBlue'); //sky
			fill(0, 155, 0);
			rect(0, floorPosY, width, height - floorPosY); //ground
			break;
		case 1: //candykingdom
			background('LavenderBlush'); //sky
			fill('SlateBlue');
			rect(0, floorPosY, width, height - floorPosY); //ground
			break;
		case 2: //sky
			background('lavender'); //fill the sky
			break;
		default: //prismo
			background('yellow'); //wall
			fill('gold');
			rect(0, floorPosY, width, height - floorPosY); //floor
			break;
	}
}

function initAssets(type, args) {
	const l = args.length;
	switch (type) {
		case 'canyon':
			for (let i = 0; i < l; i++) {
				const vals = Object.values(args[i]);
				allCanyons.push(createCanyon(...vals));
			}
			return;
		case 'coins':
			for (let i = 0; i < l; i++) {
				const vals = Object.values(args[i]);
				allCollectables.push(createCoin(...vals))
			}
			return;
		case 'platforms':
			for (let i = 0; i < l; i++) {
				const vals = Object.values(args[i]);
				allPlatforms.push(createPlatforms(...vals))
			}
			return;

	}
}

function initBackground(type, num, c, ...extra) { //color is expecting an obj
	const rand = (a, b) => Math.floor(random(a, b));
	switch (type) {
		case 'mountains':
			for (let i = 0; i <= num; i++) {
				const cRand = color(rand(c.rl, c.rh), rand(c.gl, c.gh), rand(c.bl, c.bh),);
				allMountains.push(createMountains(rand(i * 200, i * 340), cRand, rand(60, 100)));
			}
			return;
		case 'clouds':
			for (let i = 0; i <= num; i++) {
				const cRand = color(rand(c.rl, c.rh), rand(c.gl, c.gh), rand(c.bl, c.bh),);
				let yLock = 140; 
				if(extra[0] === 'extraClouds') { 
					yLock = height; //handle the Y-axis for the sky level
				}
				allClouds.push(createCloud(rand(i * 100, i * 200), rand(20, yLock), cRand)); 
			}
			return;
		case 'trees':
			for (let i = 0; i <= num; i++) {
				const cRand = color(rand(c.rl, c.rh), rand(c.gl, c.gh), rand(c.bl, c.bh),);
				allTrees.push(createTrees(rand(i * 175, i * 200), cRand));
			}
			return;

	}
}


function initLevel_0() { //treehouse
	finishLine = {
		posX: 1100,
		posY: floorPosY,
		isReached: false
	};

	prismo = {
		posX: finishLine.posX + (width / 2) + 300,
		posY: floorPosY,
	}
	
	pickle = {
		posX: 100,
		posY: floorPosY,
		isFound: false,
		value: 0,
		jumpPower: 20
	}

	allTrees = [];
	initBackground('trees', 10, { rl: 10, rh: 30, gl: 40, gh: 100, bl: 60, bh: 70 });
	allClouds = [];
	initBackground('clouds', 10, { rl: 210, rh: 220, gl: 200, gh: 220, bl: 220, bh: 240 });

	allMountains = [];
	initBackground('mountains', 10, { rl: 90, rh: 100, gl: 110, gh: 120, bl: 180, bh: 200 });

	allCollectables = [];
	initAssets('coins', [
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

	]
	);

	allCanyons = [];
	initAssets('canyon', [{posX: 620}, {posX: 820}]);

	allPlatforms = [];
	initAssets('platforms', [
		{ posX: 350, posY: 340, length: 200},
	]
	);
}

function initLevel_1() { //candykingdom
	finishLine = {
		posX: 1100,
		posY: floorPosY,
		isReached: false
	};

	prismo = {
		posX: finishLine.posX + (width / 2) + 300,
		posY: floorPosY,
	}
	
	pickle = {
		posX: 100,
		posY: floorPosY,
		isFound: false,
		value: 0,
		jumpPower: 20
	}

	allTrees = [];
	initBackground('trees', 10,  { 
		rl: 230, 
		rh: 255, 
		gl: 80, 
		gh: 115, 
		bl: 120, 
		bh: 180
	});
	allClouds = [];
	initBackground('clouds', 20,  { 
		rl: 250, 
		rh: 255, 
		gl: 200, 
		gh: 230, 
		bl: 200, 
		bh: 230 
	});

	allMountains = [];
	initBackground('mountains', 10, { 
		rl: 138, 
		rh: 216, 
		gl: 112, 
		gh: 191, 
		bl: 216, 
		bh: 226 
	});

	allCollectables = [];
	initAssets('coins', [
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
	]
	);

	allCanyons = [];
	initAssets('canyon', [
		{posX: 560, length: 140}, 
		{posX: 820, length: 140}]
	);

	allPlatforms = [];
	initAssets('platforms', [
		{ posX: 350, posY: 340, length: 200},
		{ posX: 604, posY: 220, length: 200},
		{ posX: 872, posY: 120, length: 200},
	]
	);
}

function initLevel_2() { //sky
	finishLine = {
		posX: 1080,
		posY: floorPosY,
		isReached: false
	};

	prismo = {
		posX: finishLine.posX + (width / 2) + 300,
		posY: floorPosY,
	}

	pickle = {
		posX: 100,
		posY: floorPosY,
		isFound: false,
		value: 0,
		jumpPower: 20
	}

	allTrees = []; //no trees for cloud level
	allMountains = []; //no mountains for cloud level
	allClouds = [];
	initBackground('clouds', 40,  { 
		rl: 240, 
		rh: 248, 
		gl: 248, 
		gh: 255, 
		bl: 200, 
		bh: 255 
	}, 'extraClouds');


	allCollectables = [];
	initAssets('coins', [
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

	]
	);

	allCanyons = [];
	initAssets('canyon', [
		{posX: 280, length: width, fill: 'lavender'}, 
	],
	);

	allPlatforms = [];
	initAssets('platforms', [
		{ posX: 80, posY: floorPosY, length: 200},
		{ posX: 350, posY: 340, length: 200},
		{ posX: 604, posY: 220, length: 200},
		{ posX: 872, posY: 120, length: 200},
	]
	);
}


function initLevel_3() { //prismo
	finishLine = {
		posX: 700,
		posY: floorPosY,
		isReached: false
	};

	prismo = {
		posX: finishLine.posX + 300,
		posY: floorPosY,
	}

	allTrees = [];
	allClouds = [];
	allMountains = [];
	allCollectables = [];
	allCanyons = [];
	allPlatforms = [];
}