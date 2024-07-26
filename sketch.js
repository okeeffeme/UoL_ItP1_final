let Game = {
    isRunning: false,
    totalWins: 0,
    stateToggle: function () {
        this.isRunning = !this.isRunning; //toggle the isRunning state
        // if (this.isRunning) {
        //     loop();
        // } else {
        //     noLoop();
        // };
    },
    stateStop: function () {
        // noLoop();
        this.isRunning = false;
    }
}
let Options = {
    main: [
        {title: 'Continue', action: 'playGame'},
        {title: 'New Game', action: 'playGame'},
        {title: 'View/Edit Controls', action: 'controls'},
        {title: 'Readme', action: 'readme'}
    ],
    controls: [
        {title: 'Up', action: 'main'},
        {title: 'Down', action: 'main'},
        {title: 'Left', action: 'main'},
        {title: 'Right', action: 'main'},
        {title: 'Pause', action: 'main'},
        {title: 'Submit', action: 'main'},
        {title: 'Back to Main Menu', action: 'main'}
    ],
    readme: [
        {title: 'a', action: 'main'},
        {title: 'Back to Main Menu', action: 'main'}
    ],
}
let Menu = {
    selection: 0,
    currentMenu: Options.main,
    getCurrentOptions: function () {
        return this.currentMenu.map(value => value.title);
    },
    renderSelection: function (c) {
        fill(c);
        text('>', (width / 2) - 20, (height / 2) + (this.selection * 30));
    },
    renderMenu: function () {
        let options = this.getCurrentOptions();
        for (let i = 0; i < options?.length; i++) {
            text(options[i], width / 2, (height / 2) + (i * 30));
        }
        this.renderSelection('yellow');
    },
    navigate: function (input, menu) {
        // soundPickup.play();
        if (input === 'down' && this.selection < menu?.length - 1) {
            this.selection += 1;
        } else if (input === 'up' && this.selection > 0) {
            this.selection -= 1;
        } else if (input === 'right') {
            this.handleAction(menu[this.selection].action);
        } else if (input === 'left') {
            this.handleAction('main');
        }
    },
    handleAction: function(action) {
        switch (action) {
            case 'playGame':
                this.selection = 0;
                return Game.stateToggle();
            default:
                this.currentMenu = Options[action];
                this.selection = 0;
                break;
        }
    }
}

let isLeft;
let isRight;
let isJumping;
let isFalling;
let isPlummeting;

function preload() {
    font = loadFont('./EduSABeginner-VariableFont_wght.ttf');
    sandwhichFont = loadFont('./MacondoSwashCaps-Regular.ttf');
    soundPickup = loadSound('./MayGenko-pickup.wav');
    soundPickup1 = loadSound('./MayGenko-pickup1.wav');
    soundFall = loadSound('./MayGenko-fall.wav');
}

let x, y;


function setup() {
    createCanvas(window?.innerWidth || 1024, 576);
    textFont(font);
    textSize(24);
    noStroke();
    floorPosY = height * 3 / 4;
    x = 0;
    y = 0;
    // initChar(floorPosY);
    // startGame();
    // noLoop();
}

function drawBlue() {
    fill('blue');
    rect(0, 0, width, height);
}

function draw() {
    if (Game.isRunning) {
        background(100, 155, 255); //fill the sky blue
        fill('green');
        text('Running', 100, 100);
        rect(x, y, 40, 40, 20)
        x += 1;
        y += 1;
    } else {
        background(255, 145, 0); //fill the menu orange
        fill('red');
        text('Paused', 100, 100);
        Menu.renderMenu();
    }
}

function checkKey(k) {
    switch (k) {
        case 'a': case 'A': case 'ArrowLeft':
            return 'left';
        case 'd': case 'D': case 'ArrowRight':
            return 'right';
        case 'w': case 'W': case 'ArrowUp':
            return 'up';
        case 's': case 'S': case 'ArrowDown':
            return 'down';
        case 'Escape':
            return 'pause';
        default:
            return;
    }
}

function keyPressed() {
    if (Game.isRunning) {
        switch (checkKey(key)) {
            case 'left':
                return 'left';
            case 'right':
                return 'right';
            case 'up':
                return 'up';
            case 'down':
                Game.stateStop();
                drawBlue();
                break;
            case 'pause':
                Game.stateStop();
                soundFall.play();
                break;
            default:
                return;
        }
    } else {
        switch (checkKey(key)) {
            case 'left':
                Menu.navigate('left', Menu.currentMenu);
                break;
                case 'right':
                Menu.navigate('right', Menu.currentMenu);
                break;
            case 'up':
                Menu.navigate('up', Menu.currentMenu);
                break;
            case 'down':
                Menu.navigate('down', Menu.currentMenu);
                break;
            case 'pause':
                Game.stateToggle();
                break;
            default:
                return;
        }
    }
}