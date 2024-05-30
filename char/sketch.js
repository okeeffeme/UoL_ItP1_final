/*

The Game Project

2 - Game character

Use p5 drawing functions such as rect, ellipse, line, triangle and
point to draw the different states of your game character.

Write the code so that your character appears inside the box for each
state.

IMPORTANT: For each box the variables gameChar_x & gameChar_y are set to the bottom
center of the box. You must combine these variables with arithmetic to
determine the position of each shape that you draw. This will later allow
you to adjust the position of your game character.

Each state is worth two marks:

//standing front facing = 2
//jumping facing forwards = 2
//walking left = 2
//walking right = 2
//jumping left and jumping right = 2

0 marks = not a reasonable attempt
1 mark = attempted but it lacks detail and you didn't use gameChar_x and gameChar_y correctly
2 marks = you've used a selction of shape functions and made consistent use of gameChar_x and gameChar_y

WARNING: Do not get too carried away. Around 10-20 lines of code should work for each state of your game character.

*/

var gameChar_x = 0;
var gameChar_y = 0;
let cFur = '#F5BB12';
let cFurL = '#f5CD3D';

function setup()
{
	createCanvas(400, 600);
}

function mainBody(posX, posY) {
	fill(cFur);
	rect(posX-15, posY-66,30,46,20);
}
function drawEye(posX, posY, adj) {
	fill('white');
	stroke('black');
	strokeWeight(2);
	ellipse(posX+adj,posY-52,8,8) //eye;
}

function drawFoot(posX,posY, adjX, adjY=2) {
	fill(cFur);
	ellipse(posX+adjX,posY-adjY,10,6) //foot r
}

function drawMouthFront(posX, posY) {
	stroke(cFurL);
	strokeWeight(6)
	noFill();
	arc(posX, posY-45, 8,10,PI,PI*2); //lips
	fill('black')
	noStroke();
	ellipse(posX,posY-48,6,4) //nose
}

function drawMouthSide(posX,posY, adjX=-20) {
	fill(cFurL);
	rect(posX+adjX, posY-50, 8,10,20);
}

function drawArmSide(posX,posY, adjX=-5) {
	
}


function draw()
{
	background(255);

	//Standing, facing frontwards

	stroke(100);
	strokeWeight(2);
	noFill();
	rect(20, 60, 50, 80);
	noStroke();
	fill(0);
	text("1. standing front facing", 20, 160);

	gameChar_x = 45;
	gameChar_y = 137;
	//Add your code here ...
	mainBody(gameChar_x, gameChar_y);

	drawFoot(gameChar_x,gameChar_y,12);
	drawFoot(gameChar_x,gameChar_y,-12);

	strokeWeight(5);
  	stroke(cFur);
	noFill()
	arc(gameChar_x, gameChar_y-30, 40,50,PI,PI*2); //arms
	arc(gameChar_x, gameChar_y-2, 20,70,PI, PI*2); //legs
	drawEye(gameChar_x,gameChar_y,-8);
	drawEye(gameChar_x,gameChar_y,8);
	drawMouthFront(gameChar_x,gameChar_y);
	
	
	
	//Jumping facing forwards
	stroke(100);
	strokeWeight(2);
	noFill();
	rect(220, 60, 50, 80);
	noStroke();
	fill(0);
	text("2. jumping facing forwards", 220, 160);

	gameChar_x = 245;
	gameChar_y = 137;
	//Add your code here ...
	mainBody(gameChar_x, gameChar_y);
	drawFoot(gameChar_x,gameChar_y,12,8);
	drawFoot(gameChar_x,gameChar_y,-12,8);

	strokeWeight(5);
  	stroke(cFur);
	noFill()
	arc(gameChar_x, gameChar_y-70, 40,50,PI*2,PI); //arms
	arc(gameChar_x, gameChar_y-10, 20,60,PI-.4, PI*2+.4); //legs
	drawEye(gameChar_x,gameChar_y,-8);
	drawEye(gameChar_x,gameChar_y,8);
	drawMouthFront(gameChar_x,gameChar_y);
	
	

	//Walking, turned left
	stroke(100);
	strokeWeight(2);
	noFill();
	rect(20, 260, 50, 80);
	noStroke();
	fill(0);
	text("3. Walking left", 20, 360);

	gameChar_x = 45;
	gameChar_y = 337;
	//Add your code here ...
	strokeWeight(5);
  	stroke(cFur);
	noFill()
	arc(gameChar_x, gameChar_y-2, 20,70,PI, PI*2); //legs
	noStroke();
	mainBody(gameChar_x, gameChar_y);
	drawFoot(gameChar_x,gameChar_y,8);
	drawFoot(gameChar_x,gameChar_y,-12,4);
	drawMouthSide(gameChar_x,gameChar_y);
	
	
	strokeWeight(5);
	noFill()
	stroke(cFurL);
	arc(gameChar_x-14, gameChar_y-54, 40,50,0.5,PI*.4); //arm front

	strokeWeight(1);
	fill(cFur)
	stroke('#4f2d0c');
	arc(gameChar_x+6,gameChar_y-54, 10,10,0,PI); //ear
	drawEye(gameChar_x,gameChar_y,-11);


	//Walking, turned right
	stroke(100);
	strokeWeight(2);
	noFill();
	rect(220, 260, 50, 80);
	noStroke();
	fill(0);
	text("4. Walking right", 220, 360);

	gameChar_x = 245;
	gameChar_y = 337;
	//Add your code here ...

	strokeWeight(5);
	stroke(cFur);
	noFill()
	arc(gameChar_x, gameChar_y-2, 20,70,PI, PI*2); //legs
	noStroke();
	mainBody(gameChar_x, gameChar_y);
	drawFoot(gameChar_x,gameChar_y,-8);
	drawFoot(gameChar_x,gameChar_y,12,4);
	drawMouthSide(gameChar_x,gameChar_y,12);
	
	
	strokeWeight(5);
	noFill()
	stroke(cFurL);
	arc(gameChar_x+14, gameChar_y-54, 40,50,1.9,2.6); //arm front

	strokeWeight(1);
	fill(cFur)
	stroke('#4f2d0c');
	arc(gameChar_x-6,gameChar_y-54, 10,10,0,PI); //ear
	drawEye(gameChar_x,gameChar_y,11);


	//Jumping right
	stroke(100);
	strokeWeight(2);
	noFill();
	rect(20, 460, 50, 80);
	noStroke();
	fill(0);
	text("5. Jumping to the right", 20, 560);

	gameChar_x = 45;
	gameChar_y = 537;
	//Add your code here ...


	//Jumping to the left
	stroke(100);
	strokeWeight(2);
	noFill();
	rect(220, 460, 50, 80);
	noStroke();
	fill(0);
	text("6. Jumping to the left", 220, 560);

	gameChar_x = 245;
	gameChar_y = 537;
	//Add your code here ...

}
