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

function draw()
{
	background(255);

	//Standing, facing frontwards

	stroke(100);
	noFill();
	rect(20, 60, 50, 80);
	noStroke();
	fill(0);
	text("1. standing front facing", 20, 160);

	gameChar_x = 45;
	gameChar_y = 137;
	//Add your code here ...
	mainBody(gameChar_x, gameChar_y);
	ellipse(gameChar_x+12,gameChar_x+90,10,6) //foot r
	ellipse(gameChar_x-12,gameChar_x+90,10,6) //foot l
	strokeWeight(4);
  	stroke(cFur);
	noFill()
	arc(gameChar_x, gameChar_y-30, 40,50,PI,PI*2); //arms
	arc(gameChar_x, gameChar_y-2, 20,70,PI, PI*2); //legs
	drawEye(gameChar_x,gameChar_y,-8);
	drawEye(gameChar_x,gameChar_y,8);

	stroke(cFurL);
	strokeWeight(6)
	noFill();
	arc(gameChar_x, gameChar_y-45, 8,10,PI,PI*2); //arms
	fill('black')
	noStroke();
	ellipse(gameChar_x,gameChar_x+45,6,4) //nose
	
	//Jumping facing forwards
	stroke(100);
	noFill();
	rect(220, 60, 50, 80);
	noStroke();
	fill(0);
	text("2. jumping facing forwards", 220, 160);

	gameChar_x = 245;
	gameChar_y = 137;
	//Add your code here ...
	

	//Walking, turned left
	stroke(100);
	noFill();
	rect(20, 260, 50, 80);
	noStroke();
	fill(0);
	text("3. Walking left", 20, 360);

	gameChar_x = 45;
	gameChar_y = 337;
	//Add your code here ...


	//Walking, turned right
	stroke(100);
	noFill();
	rect(220, 260, 50, 80);
	noStroke();
	fill(0);
	text("4. Walking right", 220, 360);

	gameChar_x = 245;
	gameChar_y = 337;
	//Add your code here ...


	//Jumping right
	stroke(100);
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
	noFill();
	rect(220, 460, 50, 80);
	noStroke();
	fill(0);
	text("6. Jumping to the left", 220, 560);

	gameChar_x = 245;
	gameChar_y = 537;
	//Add your code here ...

}
