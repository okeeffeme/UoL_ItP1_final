/*

The Game Project

2b - using variables

*/

var floorPos_y;

var gameChar_x;
var gameChar_y;

var treePos_x;
var treePos_y;

var canyon;
var collectable;

var mountain;
var cloud;

const colorFur = '#F5BB12';
const colorFurLight = '#f5CD3D';
const colorGreen = {
	lr: 10,
	lg: 80,
	lb: 60,
	rgb: [10,80,60]
};

function setup()
{
	createCanvas(1024, 576);
	floorPos_y = 432; //NB. we are now using a variable for the floor position

	//NB. We are now using the built in variables height and width
	gameChar_x = width/2;
	gameChar_y = floorPos_y;

	treePos_x = width/2;
	treePos_y = height/2;

	canyon = {
		x_pos: 0, 
		width: 100
	}
}

function mainBody(posX, posY) {
	fill(colorFur);
	rect(posX-15, posY-66,30,46,20);
}
function drawEye(posX, posY, adj, side=0) {
	fill('white');
	stroke('black');
	strokeWeight(2);
	ellipse(posX+adj,posY-52,8-side,8) //eye
}
function drawFoot(posX,posY, adjX, adjY=2) {
	fill(colorFur);
	ellipse(posX+adjX,posY-adjY,10,6) //foot
}
function drawMouthFront(posX, posY) {
	stroke(colorFurLight);
	strokeWeight(6)
	noFill();
	arc(posX, posY-45, 8,10,PI,PI*2); //lips
	fill('black')
	noStroke();
	ellipse(posX,posY-48,6,4) //nose
}
function drawCanyon (posX, w) {
	fill(70,30,0);
	rect(posX+20,432,90,144);
	fill(colorGreen.rgb);
	quad(posX,432,posX+130,432,posX+110,462,posX+20,462)

}
function treeA (rootPosX, rootPosY) {
	rootPosY = rootPosY+46;
	const leafColor = colorGreen.rgb;
	const leafColorDark = color(colorGreen.lr-10, colorGreen.lg-10, colorGreen.lb-10);
	const leafBranchColor = color(colorGreen.lr, colorGreen.lg+100, colorGreen.lb+20);
	const leafBranchColorDark = color(colorGreen.lr, colorGreen.lg+80, colorGreen.lb+20);
	const barkColor = '#ddcfc8';

	//mainLeafBack
	fill(leafColorDark);
	rect(rootPosX-30,rootPosY-160,100,250, 50,50,0);
	//trunk
	fill(barkColor);
	rect(rootPosX,rootPosY,40,105, 10);
	//mainLeafFront
	fill(leafColor);
	rect(rootPosX-50,rootPosY-260,140,300,70,70,0);
	rect(rootPosX-10,rootPosY-220,40,300);
	rect(rootPosX+50,rootPosY-110,40,200);
	fill(leafColorDark)
	triangle(rootPosX+55, rootPosY+90,rootPosX+45, rootPosY+90, rootPosX+50, rootPosY-180)
	//secondLeafBack
	fill(leafBranchColorDark);
	rect(rootPosX-40,rootPosY-40,20,110)
	//branch
	noFill();
	stroke(barkColor);
	strokeCap(SQUARE);
	strokeWeight(20);
	arc(rootPosX-10, rootPosY, 80, 60, HALF_PI, PI);
	//secondLeafFront
	fill(leafBranchColor);
	noStroke();
	rect(rootPosX-70,rootPosY-70,50,30,50,50,0);
	rect(rootPosX-70,rootPosY-40,40,136);
	triangle(rootPosX-20,rootPosY-40,rootPosX-40,rootPosY-40,rootPosX-30,rootPosY+30);
}

function draw()
{
	background(100, 155, 255); //fill the sky blue

	noStroke();
	fill(0, 155, 0);
	rect(0, floorPos_y, height, width - floorPos_y); //draw some green ground

	//char
	mainBody(gameChar_x, gameChar_y);
	drawFoot(gameChar_x,gameChar_y,12);
	drawFoot(gameChar_x,gameChar_y,-12);
	strokeWeight(5);
  	stroke(colorFur);
	noFill();
	arc(gameChar_x, gameChar_y-30, 40,50,PI,PI*2); //arms
	arc(gameChar_x, gameChar_y-2, 20,70,PI, PI*2); //legs
	drawEye(gameChar_x,gameChar_y,-8);
	drawEye(gameChar_x,gameChar_y,8);
	drawMouthFront(gameChar_x,gameChar_y);

	//tree
	treeA(treePos_x, treePos_y);

	//canyon
	drawCanyon(canyon.x_pos);

}

function mousePressed()
{
	gameChar_x = mouseX;
	gameChar_y = mouseY;

}
