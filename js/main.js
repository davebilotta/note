var colorPurple = "#cb3594";
var colorGreen = "#659b41";
var colorYellow = "#ffcf33";
var colorBrown = "#986928";

var clickColor = new Array();

var context;
var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();

var drawerVisible,context, curColor, paint, lineWidth;
var bgColor, bgLineColor, bgLineSpacing, bgLineWidth, bgLineMode;

var width, height;

//ctx = canvas.getContext("2d");
$(document).ready(function () {

	init();

$('#canvas').mousedown(function(e){
  var mouseX = e.pageX - this.offsetLeft;
  var mouseY = e.pageY - this.offsetTop;
		
  paint = true;
  addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
  redraw();
});

$('#canvas').mousemove(function(e){
  if(paint){
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
    redraw();
  }
});

$('#canvas').mouseup(function(e){
  paint = false;
});

$('#canvas').mouseleave(function(e){
  paint = false;
});

$("#toggle").click(function() {
	toggleDrawer();
});

});

function addClick(x, y, dragging)
{
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
  clickColor.push(curColor);
}

function redraw(){
  /* context.strokeStyle = "#df4b26"; */
	renderBackground();
 	renderForeground();
}

function toggleDrawer() {
	if (drawerVisible) hideDrawer();
	else showDrawer();

}

function showDrawer() {
	drawerVisible = true;

	$("#drawer").slideDown("fast");
}

function hideDrawer() {
	drawerVisible = false;

	$("#drawer").slideUp("fast");
}

function init() {
	context = canvas.getContext("2d");
	paint = false;
	drawerVisible = false;
	// TODO: Need to adjust the canvas size accordingly
	// TODO: Need to adjust when screen is resized
	width = window.innerWidth;
	height = window.innerHeight;

	// Defaults - eventually pulled from saved preferences
	lineJoin = "round";
	lineWidth = 2;
	curColor = colorBrown;

	// Background - eventually pulled from saved preferences
	bgColor = "#FFFFFF";          // any hex value
	bgLineColor = "#000000";      // any hex value
	bgLineSpacing = "small";      // small, medium or large
	bgLineWidth = 1;               // 1-10
	bgLineMode = "both";    // horizontal, vertical, both
}

//----------------------------------------
// Render background
//----------------------------------------
function renderBackground() {
	
	// Always render background color

	var spacing = determineSpacing();
	// Render lines as well
	switch (bgLineMode) {
		case "horizontal": renderBgHorizontal(spacing);
			break;
		case "vertical": renderBgVertical(spacing);
			break;
		case "both": renderBgGrid(spacing);
			break;
		default: renderBgGrid(spacing);
			break;
	}
}

// THis should probably be stored in a variable
function determineSpacing() {
	switch(bgLineSpacing) {
		case "tiny": spacing = 40;
		     break;
		case "small": spacing = 35;
			break;
		case "medium": spacing = 20;
			break;
		case "large": spacing = 10;
			break;
		default: spacing = 20;
			break;
	}
	return spacing;
}

function renderBgHorizontal(spacing) {
	// TODO: Need to do this
	bgColor = "#FFFFFF";     // any hex value
	context.strokeStyle = bgLineColor;
	context.lineJoin = "round";
  	context.lineWidth = bgLineWidth;
			
	var lines = Math.floor(height/spacing);
	var lineSpacing = Math.floor(height/lines);
	//console.log("lines = " + lines + " lineSpacing = "+lineSpacing);

  	for (var i=0; i < lines; i++)	{		
    	context.beginPath();
    	context.moveTo(0,(i*lineSpacing));
    	context.lineTo(width,(i*lineSpacing));
	    context.closePath();
	    context.stroke();    
    }

}

function renderBgVertical(spacing) {
	// TODO: Need to do this
	bgColor = "#FFFFFF";     // any hex value
	context.strokeStyle = bgLineColor;
	context.lineJoin = "round";
  	context.lineWidth = bgLineWidth;
			
	var lines = Math.floor(width/spacing);
	var lineSpacing = Math.floor(width/lines);
	console.log("lines = " + lines + " lineSpacing = "+lineSpacing);

  	for (var i=0; i < lines; i++)	{		
    	context.beginPath();
    	context.moveTo((i*lineSpacing),0);
    	context.lineTo((i*lineSpacing),height);
	    context.closePath();
	    context.stroke();    
    }
}

function renderBgGrid(spacing) {
	renderBgHorizontal(spacing);
	renderBgVertical(spacing);
}

//----------------------------------------
// Render foreground
//----------------------------------------
function renderForeground() {
 	context.lineJoin = lineJoin;
  	context.lineWidth = lineWidth;
			
  	for(var i=0; i < clickX.length; i++)
  	{		
    	context.beginPath();
    	if (clickDrag[i] && i){
      		context.moveTo(clickX[i-1], clickY[i-1]);
    	}
    	else {
    		context.moveTo(clickX[i]-1, clickY[i]);
    	}
    context.lineTo(clickX[i], clickY[i]);
    context.closePath();
    context.strokeStyle = clickColor[i];
    context.stroke();
  }
}