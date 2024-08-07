class Game {
    #isRunning = false;
    #totalWins = 0;

    constructor() {
        this.stateToggle = this.stateToggle.bind(this);
        this.stateStop = this.stateStop.bind(this);
    }

    stateToggle () {
        this.isRunning = !this.isRunning; //toggle the isRunning state
        // if (this.isRunning) {
        //     loop();
        // } else {
        //     noLoop();
        // };
    };
    stateStop () {
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
class Menu {
    #selection  ;
    #currentMenu;
    #game;
    constructor(game){
        this.getCurrentOptions = this.getCurrentOptions.bind(this);
        this.renderSelection = this.renderSelection.bind(this);
        this.renderMenu = this.renderMenu.bind(this);
        this.navigate = this.navigate.bind(this);
        this.handleAction = this.handleAction.bind(this);
        this.game = game;
        this.currentMenu = Options.main;
        this.selection = 0;
    }
    getCurrentOptions () {
        return this.currentMenu.map(value => value.title);
    };
    renderSelection (c) {
        fill(c);
        text('>', (width / 2) - 20, (height / 2) + (this.selection * 30));
    };
    renderMenu () {
        let options = this.getCurrentOptions();
        for (let i = 0; i < options?.length; i++) {
            text(options[i], width / 2, (height / 2) + (i * 30));
        }
        this.renderSelection('yellow');
    };
    navigate (input, menu) {
        // soundPickup.play();
        if (input === 'down' && this.selection < menu?.length - 1) {
            this.selection += 1;
        } else if (input === 'up' && this.selection > 0) {
            this.selection -= 1;
        } else if (input === 'right') {
            this.handleAction(menu[this.selection].action, menu[this.selection].title);
        } else if (input === 'left') {
            this.handleAction('main');
        }
    };
    handleAction (action, title) {
        console.log(action, title)
        switch (action) {
            case 'playGame':
                this.selection = 0;
                return this.game.stateToggle();
            default:
                this.currentMenu = Options[action];
                this.selection = 0;
                break;
        }
    };
}

let isLeft;
let isRight;
let isJumping;
let isFalling;
let isPlummeting;

function preload() {
    font = loadFont('./assets/EduSABeginner-VariableFont_wght.ttf');
    sandwhichFont = loadFont('./assets/MacondoSwashCaps-Regular.ttf');
    soundPickup = loadSound('./assets/MayGenko-pickup.wav');
    soundPickup1 = loadSound('./assets/MayGenko-pickup1.wav');
    soundFall = loadSound('./assets/MayGenko-fall.wav');
}

let x, y;
let CurrentGame;
let GameMenu;


function setup() {
    createCanvas(window?.innerWidth || 1024, 576);
    textFont(font);
    textSize(24);
    noStroke();
    floorPosY = height * 3 / 4;
    x = 0;
    y = 0;
    CurrentGame = new Game();
    GameMenu = new Menu(CurrentGame);
    // initChar(floorPosY);
    // startGame();
    // noLoop();
}

function drawBlue() {
    fill('blue');
    rect(0, 0, width, height);
}

function draw() {
    if (CurrentGame.isRunning) {
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
        GameMenu.renderMenu();
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
    if (CurrentGame.isRunning) {
        switch (checkKey(key)) {
            case 'left':
                return 'left';
            case 'right':
                return 'right';
            case 'up':
                return 'up';
            case 'down':
                CurrentGame.stateStop();
                drawBlue();
                break;
            case 'pause':
                CurrentGame.stateStop();
                soundFall.play();
                break;
            default:
                return;
        }
    } else {
        switch (checkKey(key)) {
            case 'left':
                GameMenu.navigate('left', GameMenu.currentMenu);
                break;
                case 'right':
                GameMenu.navigate('right', GameMenu.currentMenu);
                break;
            case 'up':
                GameMenu.navigate('up', GameMenu.currentMenu);
                break;
            case 'down':
                GameMenu.navigate('down', GameMenu.currentMenu);
                break;
            case 'pause':
                CurrentGame.stateToggle();
                break;
            default:
                return;
        }
    }
}