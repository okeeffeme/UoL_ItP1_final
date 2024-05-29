/*

The Game Project

1 - Background Scenery

Use p5 drawing functions such as rect, ellipse, line, triangle and
point to draw the scenery as set out in the code comments. The items
should appear next to the text titles.

Each bit of scenery is worth two marks:

0 marks = not a reasonable attempt
1 mark = attempted but it's messy or lacks detail
2 marks = you've used several shape functions to create the scenery

I've given titles and chosen some base colours, but feel free to
imaginatively modify these and interpret the scenery titles loosely to
match your game theme.

WARNING: Do not get too carried away. If you're shape takes more than 15 lines of code to draw then you've probably over done it.


*/

function setup()
{
	createCanvas(1024, 576);
}

const colorGreen = {
	lr: 10,
	lg: 80,
	lb: 60,
	rgb: [10,80,60]
};

function treeA (rootPosX, rootPosY) {
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
	rect(rootPosX,rootPosY,40,105, 18)
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

function cloud(cloudPosX, cloudPosY) {
	fill(255,230,230);
	ellipse(cloudPosX,cloudPosY,190,180);
	ellipse(cloudPosX-60,cloudPosY+40,190,160);
	rect(cloudPosX-110,cloudPosY+10,250,110, 10,60)
}

function draw()
{
	background(100, 155, 255); //fill the sky blue
	noStroke();

	fill(130,90,60);
	rect(0, 432, 1024, 144); //dirt
	fill(color(colorGreen.lr+20, colorGreen.lg+20, colorGreen.lb+20));
	rect(0, 432, 1024, 30); //grass

	//1. a cloud in the sky
	//... add your code here
	cloud(200,100);

	//2. a mountain in the distance
	//text("mountain", 500, 256);
	fill(100, 120, 200);
	beginShape()
	vertex(300,432);
	vertex(500,256);
	vertex(580,300);
	vertex(680,210);
	vertex(1024,432);
	endShape(CLOSE);

	//3. a tree
	treeA(730, 350);
	


	
	//4. a canyon
	//NB. the canyon should go from ground-level to the bottom of the screen
	fill(70,30,0);
	rect(140,432,90,144);
	fill(colorGreen.rgb);
	quad(120,432,250,432,230,462,140,462)
	

	//5. a collectable token - eg. a jewel, fruit, coins
	const gemPosX = 400;
	const gemPosY = 388;
	fill(225,160,0);
	rect(gemPosX, gemPosY,30,50,200);
	fill(225,210,0);
	rect(gemPosX-6, gemPosY,30,50,200);
	stroke(225,180,0);
	strokeWeight(3)
	rect(gemPosX-1,gemPosY+5,20,40,200)
}
